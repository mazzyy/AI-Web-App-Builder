class AppManager {
    constructor() {
      // File storage
      this.projectFiles = {
        'index.html': {
          content: this.getDefaultHtmlContent(),
          type: 'html'
        },
      
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
      this.initDownloadButtons();
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
      
      // Listen for content changes in the editor for real-time preview updates
      document.getElementById('editor-component').addEventListener('contentchanged', (e) => {
        // Use requestAnimationFrame to ensure UI updates are smooth
        requestAnimationFrame(() => {
          this.updatePreview();
          console.log(`Content changed in ${e.detail.fileName}, updating preview`);
        });
      });
      
      // Add keyboard shortcut for save (Ctrl+S)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          this.saveCurrentFile();
        }
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
  
    // Initialize download buttons
    initDownloadButtons() {
      const downloadBtn = document.getElementById('downloadProjectBtn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
          this.downloadProject();
        });
      }
      
      const downloadCurrentBtn = document.getElementById('downloadCurrentBtn');
      if (downloadCurrentBtn) {
        downloadCurrentBtn.addEventListener('click', () => {
          const currentFile = this.editorComponent.getCurrentFile();
          this.downloadFile(currentFile);
        });
      }
      
      const exportHtmlBtn = document.getElementById('exportHtmlBtn');
      if (exportHtmlBtn) {
        exportHtmlBtn.addEventListener('click', () => {
          this.exportAsSingleHtml();
        });
      }
    }
  
    // Generate code from prompt
    async generateCode(prompt) {
      const currentFile = this.editorComponent.getCurrentFile();
      
      console.log("Sending generation request:", {
          prompt: prompt,
          currentFile: currentFile
      });
      
      try {
          const response = await fetch('http://localhost:5000/api/generate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                  prompt: prompt,
                  currentFile: currentFile
              })
          });
          
          console.log("Raw response:", response);
          
          if (!response.ok) {
              const errorText = await response.text();
              console.error("Error response:", errorText);
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }
          
          const data = await response.json();
          console.log("Received data:", data);
          
          // Rest of the method remains the same
          this.projectFiles[currentFile].content = data.code;
          this.editorComponent.updateFile(currentFile, data.code);
          this.updatePreview();
          
      } catch (error) {
          console.error('Full generation error:', error);
          alert(`Error: ${error.message}`);
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
  
    // Save the current file
    saveCurrentFile() {
      const currentFile = this.editorComponent.getCurrentFile();
      const content = this.projectFiles[currentFile].content;
      
      // Here you could implement an actual save to server
      // For now, just show a confirmation message
      this.showNotification(`${currentFile} saved successfully`);
      
      console.log(`File ${currentFile} saved with content:`, content);
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
  
    // Download the entire project as zip
    async downloadProject() {
      try {
        // Create a new JSZip instance directly
        const zip = new JSZip();
        
        // Add all files to the zip
        for (const [fileName, fileData] of Object.entries(this.projectFiles)) {
          zip.file(fileName, fileData.content);
        }
        
        // Generate and download the zip
        const content = await zip.generateAsync({type: "blob"});
        
        // Create download link and trigger download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(content);
        downloadLink.download = "web-project.zip";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        this.showNotification("Project downloaded successfully");
      } catch (error) {
        console.error("Download error:", error);
        this.showNotification("Error downloading project: " + error.message, "error");
      }
    }
  
    // Download a single file
    downloadFile(fileName) {
      if (!this.projectFiles[fileName]) {
        this.showNotification("File not found", "error");
        return;
      }
      
      try {
        // Create a blob with the file content
        const mimeType = this.getMimeType(fileName);
        const blob = new Blob([this.projectFiles[fileName].content], {type: mimeType});
        
        // Create download link and trigger download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        this.showNotification(`${fileName} downloaded successfully`);
      } catch (error) {
        console.error(`Error downloading ${fileName}:`, error);
        this.showNotification(`Error downloading file: ${error.message}`, "error");
      }
    }
    
    // Export as single HTML file
    exportAsSingleHtml() {
      try {
        // Find an HTML file to use as base
        const htmlFile = Object.keys(this.projectFiles).find(file => file.endsWith('.html')) || '';
        
        if (!htmlFile || !this.projectFiles[htmlFile]) {
          throw new Error("No HTML file found");
        }
        
        // Get the HTML with all assets
        const htmlContent = this.prepareHtmlWithAssets(htmlFile);
        
        // Create download link
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "exported-project.html";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        this.showNotification("Project exported successfully");
      } catch (error) {
        console.error("Export error:", error);
        this.showNotification("Error exporting project: " + error.message, "error");
      }
    }
  
    // Get MIME type for file
    getMimeType(fileName) {
      const extension = fileName.split('.').pop().toLowerCase();
      const mimeTypes = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'json': 'application/json',
        'txt': 'text/plain'
      };
      return mimeTypes[extension] || 'text/plain';
    }
  
    // Show notification
    showNotification(message, type = "success") {
      const notification = document.createElement('div');
      notification.className = 'save-message';
      if (type === "error") {
        notification.style.backgroundColor = "#f44336";
      }
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
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
          body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
              color: #333;
              text-align: center;
          }
          h1 {
              color: #0066ff;
              margin-bottom: 1rem;
          }
          span {
              display: block;
              color: #666;
          }
          img {
              margin-top: 2rem;
              width: 50px;
              height: 50px;
          }
      </style>
  </head>
  <body>
      <h1>
          <span>I'm ready to work,</span>
          Ask me anything.
      </h1>
      <p>Type your website description in the command area below and click Generate</p>
      <img src="arrow.svg">
      <script></script>
  </body>
  </html>`;
    }
  }
  
  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', function() {
    window.appManager = new AppManager();
  });