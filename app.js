class AppManager {
    constructor() {
      // File storage
      this.projectFiles = {
        'index.html': {
          content: this.getDefaultHtmlContent(),
          type: 'html'
        }
      };
      
      // API endpoint
      this.API_URL = 'http://localhost:5000/api/generate';
      
      // DOM elements for modals
      this.fileModal = document.getElementById('newFileModal');
      this.closeModalBtn = document.querySelector('.close-modal');
      this.cancelBtn = document.querySelector('.cancel-btn');
      this.createFileBtn = document.querySelector('.create-btn');
      this.newFileName = document.getElementById('newFileName');
      this.fileType = document.getElementById('fileType');
      
      // Preview content
      this.previewContent = document.getElementById('previewContent');
      
      // Initialize components
      this.initComponents();
      this.initPreview();
      this.initFolders();
      this.initModalEvents();
    }
  
    initComponents() {
      // Initialize the header component
      this.headerComponent = new HeaderComponent('header-component', this.projectFiles);
      
      // Initialize the editor component
      this.editorComponent = new EditorComponent('editor-component', this.projectFiles);
      
      // Initialize the command component
      this.commandComponent = new CommandComponent('command-component');
      
      // Set up event handlers
      this.headerComponent.onTabChanged((fileName) => {
        this.editorComponent.switchFile(fileName);
        this.updatePreview();
      });
      
      this.commandComponent.onGenerateCommand((prompt) => {
        this.generateCode(prompt);
      });
      
      // Listen for new tab event
      document.getElementById('header-component').addEventListener('newtab', () => {
        this.showFileModal();
      });
      
      // Listen for delete tab event
      document.getElementById('header-component').addEventListener('deletetab', (e) => {
        this.deleteFile(e.detail.fileName);
      });
    }
  
    initPreview() {
      this.updatePreview();
    }
  
    initFolders() {
      const folders = document.querySelectorAll('.folder');
      
      folders.forEach(folder => {
        folder.addEventListener('click', function(e) {
          // Prevent click event from propagating to parent folders
          e.stopPropagation();
          
          // Toggle folder open/closed
          const icon = this.querySelector('.folder-icon');
          if (icon.textContent === '▶') {
            icon.textContent = '▼';
          } else {
            icon.textContent = '▶';
          }
          
          // Toggle visibility of child file list
          const fileList = this.querySelector('.file-list');
          if (fileList) {
            fileList.style.display = fileList.style.display === 'none' ? 'block' : 'none';
          }
        });
      });
      
      // Set up file click handlers
      document.querySelectorAll('.file').forEach(file => {
        file.addEventListener('click', (e) => {
          e.stopPropagation();
          const fileName = file.getAttribute('data-file');
          if (fileName && this.projectFiles[fileName]) {
            this.switchToFile(fileName);
          }
        });
      });
    }
  
    initModalEvents() {
      // Close modal events
      if (this.closeModalBtn) {
        this.closeModalBtn.addEventListener('click', () => {
          this.closeFileModal();
        });
      }
      
      if (this.cancelBtn) {
        this.cancelBtn.addEventListener('click', () => {
          this.closeFileModal();
        });
      }
      
      // Create file event
      if (this.createFileBtn) {
        this.createFileBtn.addEventListener('click', () => {
          this.createNewFile();
        });
      }
    }
  
    // Generate code from prompt
    async generateCode(prompt) {
      const currentFile = this.editorComponent.getCurrentFile();
      
      // Show loading state
      this.commandComponent.setLoading(true);
      
      try {
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            prompt: prompt,
            currentFile: currentFile
          })
        });
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Update the project files
        this.projectFiles[currentFile].content = data.code;
        
        // Update the editor
        this.editorComponent.updateFile(currentFile, data.code);
        
        // Update the preview
        this.updatePreview();
        
      } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Generation error:', error);
      } finally {
        // Reset loading state
        this.commandComponent.setLoading(false);
      }
    }
  
    // Show file creation modal
    showFileModal() {
      this.fileModal.classList.add('show');
      this.newFileName.focus();
    }
  
    // Close file creation modal
    closeFileModal() {
      this.fileModal.classList.remove('show');
      this.newFileName.value = '';
    }
  
    // Create a new file
    createNewFile() {
      const fileName = this.newFileName.value.trim();
      const selectedType = this.fileType.value;
      
      if (!fileName) {
        alert('Please enter a file name');
        return;
      }
      
      // Add file extension if not provided
      let fullFileName = fileName;
      if (!fullFileName.includes('.')) {
        fullFileName += `.${selectedType}`;
      }
      
      // Check if file already exists
      if (this.projectFiles[fullFileName]) {
        alert('File already exists');
        return;
      }
      
      // Create default content
      const defaultContent = this.getDefaultContent(fullFileName, selectedType);
      
      // Add file to storage
      this.projectFiles[fullFileName] = {
        content: defaultContent,
        type: selectedType
      };
      
      // Add file to UI
      this.headerComponent.addTab(fullFileName);
      this.addFileToSidebar(fullFileName);
      
      // Switch to the new file
      this.switchToFile(fullFileName);
      
      // Close modal
      this.closeFileModal();
    }
  
    // Delete a file
    deleteFile(fileName) {
      // Don't delete the last file if it's index.html
      if (fileName === 'index.html' && Object.keys(this.projectFiles).length === 1) {
        alert("Cannot delete the last remaining file.");
        return;
      }
      
      // Confirm deletion
      if (!confirm(`Are you sure you want to delete ${fileName}?`)) {
        return;
      }
      
      // Get current active file
      const currentFile = this.editorComponent.getCurrentFile();
      
      // Remove file from project files
      delete this.projectFiles[fileName];
      
      // Remove file from sidebar
      const sidebarFile = document.querySelector(`.file[data-file="${fileName}"]`);
      if (sidebarFile) {
        sidebarFile.remove();
      }
      
      // If the deleted file was the active one, switch to another file
      if (currentFile === fileName) {
        const nextFile = Object.keys(this.projectFiles)[0];
        if (nextFile) {
          this.switchToFile(nextFile);
        }
      }
      
      // Refresh tabs
      this.headerComponent.render();
      this.headerComponent.setActiveTab(this.editorComponent.getCurrentFile());
      
      // Update preview
      this.updatePreview();
    }
  
    // Add file to sidebar
    addFileToSidebar(fileName) {
      const projectFilesList = document.querySelector('.project-files .file-list');
      const newFile = document.createElement('li');
      newFile.className = 'file';
      newFile.setAttribute('data-file', fileName);
      newFile.textContent = fileName;
      
      projectFilesList.appendChild(newFile);
      
      // Add click event
      newFile.addEventListener('click', (e) => {
        e.stopPropagation();
        this.switchToFile(fileName);
      });
    }
  
    // Switch to a file
    switchToFile(fileName) {
      // Update header component
      this.headerComponent.setActiveTab(fileName);
      
      // Update editor component
      this.editorComponent.switchFile(fileName);
      
      // Update active file in sidebar
      document.querySelectorAll('.file').forEach(file => {
        file.classList.remove('active-file');
        if (file.getAttribute('data-file') === fileName) {
          file.classList.add('active-file');
        }
      });
      
      // Update preview if it's an HTML file
      this.updatePreview();
    }
  
    // Update the preview with the current HTML file
    updatePreview() {
      // Find the current file
      const currentFile = this.editorComponent.getCurrentFile();
      
      // Find an HTML file to preview
      let htmlFile = currentFile;
      if (!htmlFile.endsWith('.html')) {
        // Try to find index.html or another HTML file
        htmlFile = Object.keys(this.projectFiles).find(file => file.endsWith('.html')) || '';
      }
      
      if (htmlFile && this.projectFiles[htmlFile]) {
        // Create an iframe for isolated rendering
        this.previewContent.innerHTML = '';
        
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        // Append the iframe to the preview container
        this.previewContent.appendChild(iframe);
        
        // Prepare the HTML content with CSS and JS
        const htmlContent = this.prepareHtmlWithAssets(htmlFile);
        
        // Write the code to the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
    }
  
    // Prepare HTML with all assets
    prepareHtmlWithAssets(htmlFile) {
      let htmlContent = this.projectFiles[htmlFile].content;
      
      // Check if we need to inject CSS
      const cssFiles = Object.keys(this.projectFiles).filter(file => file.endsWith('.css'));
      if (cssFiles.length > 0 && !htmlContent.includes('<style>')) {
        // Find where to inject CSS (before </head>)
        const headEnd = htmlContent.indexOf('</head>');
        if (headEnd !== -1) {
          let cssContent = '<style>\n';
          cssFiles.forEach(cssFile => {
            cssContent += `/* ${cssFile} */\n${this.projectFiles[cssFile].content}\n\n`;
          });
          cssContent += '</style>\n';
          
          htmlContent = htmlContent.substring(0, headEnd) + cssContent + htmlContent.substring(headEnd);
        }
      }
      
      // Check if we need to inject JS
      const jsFiles = Object.keys(this.projectFiles).filter(file => file.endsWith('.js'));
      if (jsFiles.length > 0 && !htmlContent.includes('<script>')) {
        // Find where to inject JS (before </body>)
        const bodyEnd = htmlContent.indexOf('</body>');
        if (bodyEnd !== -1) {
          let jsContent = '<script>\n';
          jsFiles.forEach(jsFile => {
            jsContent += `// ${jsFile}\n${this.projectFiles[jsFile].content}\n\n`;
          });
          jsContent += '</script>\n';
          
          htmlContent = htmlContent.substring(0, bodyEnd) + jsContent + htmlContent.substring(bodyEnd);
        }
      }
      
      return htmlContent;
    }
  
    // Get default content for new files
    getDefaultContent(fileName, fileType) {
      switch (fileType) {
        case 'html':
          return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${fileName}</title>
  </head>
  <body>
      <h1>Welcome to ${fileName}</h1>
      <p>This is a new page. Start building your content here.</p>
  </body>
  </html>`;
        case 'css':
          return `/* Styles for ${fileName} */
  
  body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f8f9fa;
      color: #333;
  }
  
  h1 {
      color: #0066ff;
  }`;
        case 'js':
          return `// JavaScript for ${fileName}
  
  document.addEventListener('DOMContentLoaded', function() {
      console.log('${fileName} loaded!');
      
      // Your code here
  });`;
        default:
          return `// Content for ${fileName}`;
      }
    }
  
    // Get default HTML content
    getDefaultHtmlContent() {
      return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <style>
          color: #acacac;
          font-size: 32px;
      </style>
  </head>
  <body>
      <h1>
          <span>I'm ready to work,</span><br />
          Ask me anything.
      </h1>
      <img src="https://enzostivs-deepsite.hf.space/arrow.svg">
      <script></script>
  </body>
  </html>`;
    }
  }
  
  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', function() {
    window.appManager = new AppManager();
  });