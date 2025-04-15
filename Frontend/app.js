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

// Enhanced modal initialization for AppManager
initModalEvents() {
  // Ensure all DOM elements are selected correctly
  this.fileModal = document.getElementById('newFileModal');
  this.closeModalBtn = document.querySelector('#newFileModal .close-modal');
  this.cancelBtn = document.querySelector('#newFileModal .cancel-btn');
  this.createFileBtn = document.querySelector('#newFileModal .create-btn');
  this.newFileName = document.getElementById('newFileName');
  this.fileType = document.getElementById('fileType');

  // Debug logging
  console.log('Modal Elements:', {
    fileModal: this.fileModal,
    closeModalBtn: this.closeModalBtn,
    cancelBtn: this.cancelBtn,
    createFileBtn: this.createFileBtn,
    newFileName: this.newFileName,
    fileType: this.fileType
  });

  // Close modal events
  if (this.closeModalBtn) {
    this.closeModalBtn.addEventListener('click', () => {
      this.closeFileModal();
    });
  } else {
    console.error('Close modal button not found');
  }
  
  if (this.cancelBtn) {
    this.cancelBtn.addEventListener('click', () => {
      this.closeFileModal();
    });
  } else {
    console.error('Cancel button not found');
  }
  
  // Create file event
  if (this.createFileBtn) {
    this.createFileBtn.addEventListener('click', () => {
      this.createNewFile();
    });
  } else {
    console.error('Create file button not found');
  }

  // Optional: Add keyboard support
  if (this.newFileName) {
    this.newFileName.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.createNewFile();
      }
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
    const currentContent = this.projectFiles[currentFile].content;
    
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
          currentFile: currentFile,
          currentContent: currentContent // Send current content to API
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
    // Re-select modal elements to ensure they exist
    this.fileModal = document.getElementById('newFileModal');
    this.newFileName = document.getElementById('newFileName');
    this.fileType = document.getElementById('fileType');
  
    if (!this.fileModal) {
      console.error('File modal not found');
      return;
    }
  
    this.fileModal.classList.add('show');
    
    if (this.newFileName) {
      this.newFileName.value = ''; // Clear previous input
      this.newFileName.focus();
    }
  
    // Reset file type to default
    if (this.fileType) {
      this.fileType.selectedIndex = 0;
    }
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
//  async downloadProject() {
//   try {
//     const zip = new JSZip();

//     // Add files to ZIP
//     for (const [fileName, fileData] of Object.entries(this.projectFiles)) {
//       zip.file(fileName, fileData.content);
//     }

//     // Generate ZIP blob
//     const content = await zip.generateAsync({ type: "blob" });

//     // Create a blob URL
//     const blobUrl = URL.createObjectURL(content);

//     // Create a download link
//     const downloadLink = document.createElement("a");
//     downloadLink.href = blobUrl;
//     downloadLink.download = "web-project.zip";
//     downloadLink.style.display = "none"; // Ensure it's not visible

//     // Append, click, and remove
//     document.body.appendChild(downloadLink);
//     setTimeout(() => {
//       downloadLink.click();
//       URL.revokeObjectURL(blobUrl); // Free up memory
//       downloadLink.remove();
//     }, 100); // Give DOM time to process

//     this.showNotification("Project downloaded successfully");
//   } catch (error) {
//     console.error("Download error:", error);
//     this.showNotification("Error downloading project: " + error.message, "error");
//   }
// }
async downloadProject() {
  try {
    const zip = new JSZip();

    // Add files to ZIP
    for (const [fileName, fileData] of Object.entries(this.projectFiles)) {
      zip.file(fileName, fileData.content);
    }

    // Generate ZIP blob
    const content = await zip.generateAsync({ type: "blob" });

    // Create a blob URL
    const blobUrl = URL.createObjectURL(content);

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = "web-project.zip";
    downloadLink.style.display = "none"; // Ensure it's not visible

    // Append, click, and remove
    document.body.appendChild(downloadLink);
    setTimeout(() => {
      downloadLink.click();
      URL.revokeObjectURL(blobUrl); // Free up memory
      downloadLink.remove();
    }, 100); // Give DOM time to process

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
  
  // Add these methods to your AppManager class in app.js
// Only include these, not the entire file, to integrate with the popup

// Add this to your initTemplateSystem method in AppManager class
// or create the method if it doesn't exist
// Add these methods to your AppManager class in app.js
// Only include these, not the entire file, to integrate with the popup

// Add this to your initTemplateSystem method in AppManager class
// or create the method if it doesn't exist
initTemplateSystem() {
  // Initialize template buttons
  const templateBtn = document.getElementById('templateBtn');
  if (templateBtn) {
    templateBtn.addEventListener('click', () => {
      const templateModal = document.getElementById('templateModal');
      if (templateModal) {
        templateModal.classList.add('show');
      }
    });
  }
  
  // Listen for template selection
  document.addEventListener('click', (e) => {
    const templateCard = e.target.closest('.template-card');
    if (templateCard) {
      const templateKey = templateCard.dataset.template;
      if (templateKey && window.templateOptions && window.templateOptions[templateKey]) {
        // Show template prompt popup
        if (window.showTemplatePromptPopup) {
          window.showTemplatePromptPopup(window.templateOptions[templateKey]);
        }
        
        // Close the template selection modal
        const templateModal = document.getElementById('templateModal');
        if (templateModal) {
          templateModal.classList.remove('show');
        }
      }
    }
  });
}

// Generate code from prompt - Make sure it's accessible to the popup
generateCode(prompt) {
  const currentFile = this.editorComponent.getCurrentFile();
  const currentContent = this.projectFiles[currentFile].content;
  
  // Show loading state
  this.commandComponent.setLoading(true);
  
  // Close the prompt popup if it's open
  if (window.closeTemplatePromptPopup) {
    window.closeTemplatePromptPopup();
  }
  
  fetch(this.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      prompt: prompt,
      currentFile: currentFile,
      currentContent: currentContent
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Update the project files
    this.projectFiles[currentFile].content = data.code;
    
    // Update the editor
    this.editorComponent.updateFile(currentFile, data.code);
    
    // Update the preview
    this.updatePreview();
  })
  .catch(error => {
    alert(`Error: ${error.message}`);
    console.error('Generation error:', error);
  })
  .finally(() => {
    // Reset loading state
    this.commandComponent.setLoading(false);
  });
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
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>AI Web Builder</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(to right, #121212, #1e1e1e);
          color: #e0e0e0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex-direction: column;
          position: relative;
        }
        
        .headline {
          font-size: 2.5rem;
          font-weight: 600;
          color: #00aaff;
        }
        
        .subline {
          font-size: 1.1rem;
          color: #bbbbbb;
          margin: 10px 0 20px;
        }
        
        .pulse {
          width: 40px;
          height: 40px;
          background: #00aaff;
          border-radius: 50%;
          animation: pulse 2s infinite ease-in-out;
          margin-top: 30px;
        }
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        /* Arrow container */
        .arrow {
          position: fixed;
          bottom: 15px;           /* above the Generate button */
          left: 70px;             /* near left side to point right */
          width: 48px;
          height: 48px;
          animation: bounce 1.5s infinite;
          z-index: 10;
        }
        /* Horizontal bounce */
        @keyframes bounce {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(8px); }
        }
    
        /* Tooltip text (optional) */
        .tooltip {
          position: fixed;
          bottom: 120px;
          left: 20px;
          color: #ccc;
          font-size: 12px;
          font-style: italic;
        }
    
        /* SVG arrow drawing */
        .arrow svg {
          width: 100%;
          height: 100%;
          fill: none;
          stroke: #00aaff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      </style>
    </head>
    <body>
      <div>
        <div class="headline">Let’s build something amazing.</div>
        <div class="subline">Describe your website below and click <strong>Generate</strong></div>
        <div class="pulse"></div>
      </div>
    
      <!-- (Optional) Tooltip above the arrow -->
      <div class="tooltip">Click Generate </div>
    
      <!-- 
           The arrow with a single pivot on the left:
           - Middle line (straight right) 
           - Upper line (diagonal up)
           - Lower line (diagonal down)
      -->
      <div class="arrow">
        <svg viewBox="0 0 20 24">
          <!-- 
               Lines from (2,12) => pivot
                 - to (14,12)  (straight line to the right)
                 - to (6,8)    (up/left)
                 - to (6,16)   (down/left)
          -->
          <path d="M2 12 L14 12 M2 12 L6 8 M2 12 L6 16" />
        </svg>
      </div>
    </body>
    </html>`;
    
  }
}



// Debug utility for AppManager
class AppManagerDebug {
  constructor(appManager) {
    this.appManager = appManager;
  }

  // Comprehensive debug logging for file operations
  logFileOperations() {
    console.group('📁 File Operations Debug');
    console.log('Total Files:', Object.keys(this.appManager.projectFiles).length);
    console.log('Current Files:', Object.keys(this.appManager.projectFiles));
    console.log('Current Active File:', this.appManager.editorComponent.getCurrentFile());
    console.groupEnd();
  }

  // Debug modal and file creation process
  debugNewFileModal() {
    console.group('🔍 New File Modal Debug');
    
    // Check modal elements
    const elements = {
      fileModal: document.getElementById('newFileModal'),
      closeModalBtn: document.querySelector('.close-modal'),
      cancelBtn: document.querySelector('.cancel-btn'),
      createFileBtn: document.querySelector('.create-btn'),
      newFileName: document.getElementById('newFileName'),
      fileType: document.getElementById('fileType')
    };

    console.log('Modal Elements:');
    Object.entries(elements).forEach(([name, element]) => {
      console.log(`${name}: ${element ? '✅ Found' : '❌ Missing'}`);
    });

    // Check event listeners
    console.log('\nEvent Listener Check:');
    if (elements.createFileBtn) {
      console.log('Create File Button Event Listeners:', 
        elements.createFileBtn.hasAttribute('data-listeners') ? '✅ Attached' : '❌ Not Attached');
    }

    console.groupEnd();
  }

  // Detailed preview debug
  debugPreview() {
    console.group('🖥️ Preview Debug');
    
    const previewContent = document.getElementById('previewContent');
    const iframe = previewContent ? previewContent.querySelector('iframe') : null;
    
    console.log('Preview Container:', previewContent ? '✅ Found' : '❌ Missing');
    console.log('Iframe in Preview:', iframe ? '✅ Exists' : '❌ Not Found');
    
    if (iframe) {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        console.log('Iframe Content:', iframeDoc.body.innerHTML);
      } catch (error) {
        console.error('Cannot access iframe content:', error);
      }
    }
    
    console.groupEnd();
  }

  // Comprehensive system check
  performFullSystemCheck() {
    console.group('🔬 Full System Diagnostic');
    
    // Check core components
    const components = {
      headerComponent: this.appManager.headerComponent,
      editorComponent: this.appManager.editorComponent,
      commandComponent: this.appManager.commandComponent
    };

    console.log('Core Components:');
    Object.entries(components).forEach(([name, component]) => {
      console.log(`${name}: ${component ? '✅ Initialized' : '❌ Missing'}`);
    });

    // File system check
    this.logFileOperations();
    
    // Modal debug
    this.debugNewFileModal();
    
    // Preview debug
    this.debugPreview();
    
    console.groupEnd();
  }

  // Add debug methods to global window for console access
  attachGlobalDebugMethods() {
    window.debugAppManager = {
      logFiles: () => this.logFileOperations(),
      checkModal: () => this.debugNewFileModal(),
      checkPreview: () => this.debugPreview(),
      fullSystemCheck: () => this.performFullSystemCheck()
    };
  }
}


// Modify AppManager to include debug functionality
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to ensure AppManager is fully initialized
  setTimeout(() => {
    if (window.appManager) {
      const appManagerDebugger = new AppManagerDebug(window.appManager);
      appManagerDebugger.attachGlobalDebugMethods();
      
      // Optional: Perform initial system check
      appManagerDebugger.performFullSystemCheck();
    }
  }, 100);
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  window.appManager = new AppManager();
});

// design new templates 
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("universalSiteModal");
  const openBtn = document.getElementById("openGeneralGenerator");
  const closeBtn = document.getElementById("closeUniversalModal");
  const genBtn = document.getElementById("generateUniversalSite");

  if (openBtn) openBtn.onclick = () => modal.classList.add("show");
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove("show");
  window.onclick = (e) => e.target === modal && modal.classList.remove("show");

  genBtn.onclick = () => {
    const values = {
      description: document.getElementById("genDescription").value,
      color: document.getElementById("genColor").value,
      gradient: `linear-gradient(to right, ${document.getElementById("genGradientStart").value}, ${document.getElementById("genGradientEnd").value})`,

      font: document.getElementById("genFont").value,
      hero: document.getElementById("genHero").value,
      about: document.getElementById("genAbout").value,
      features: document.getElementById("genFeatures").value,
      contact: document.getElementById("genContact").value,
      notes: document.getElementById("genNotes").value
    };

    const base = templateOptions.universal.prompt;
    const prompt = fillUniversalPrompt(base, values);

    const promptInput = document.getElementById("promptInput");
    const textarea = document.getElementById("prompt-popup-textarea");

    if (promptInput && textarea) {
      promptInput.value = prompt;
      textarea.value = prompt;

      const appManager = window.appManager;
      if (appManager?.generateCode) {
        appManager.generateCode(prompt);
      }
    }

    modal.classList.remove("show");
  };
});


