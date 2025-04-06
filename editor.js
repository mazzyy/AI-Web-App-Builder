class EditorComponent {
    constructor(containerId, projectFiles) {
      this.container = document.getElementById(containerId);
      this.projectFiles = projectFiles;
      this.currentFile = Object.keys(projectFiles)[0] || 'index.html';
      this.lineCount = 50; // Default number of lines to display
      this.init();
    }
  
    init() {
      this.render();
      
      // Get the code output element
      this.codeOutput = this.container.querySelector('#codeOutput');
      
      // Make code editable
      this.makeCodeEditable();
      
      // Update content for the current file
      this.updateContent();
    }
  
    makeCodeEditable() {
      if (!this.codeOutput) return;
      
      // Add handler for the contenteditable element
      this.codeOutput.addEventListener('input', (e) => {
        // Get the content - need to carefully extract the text without the highlighting
        const content = this.getEditedContent();
        
        // Save the content to the current file
        if (this.projectFiles[this.currentFile]) {
          this.projectFiles[this.currentFile].content = content;
          
          // Update line numbers
          this.updateLineNumbers(content);
          
          // Dispatch a content change event
          const event = new CustomEvent('contentchanged', {
            bubbles: true,
            detail: { 
              fileName: this.currentFile,
              content: content
            }
          });
          this.container.dispatchEvent(event);
        }
      });
      
      // Add keyboard shortcuts
      this.codeOutput.addEventListener('keydown', (e) => {
        // Handle tab key for indentation
        if (e.key === 'Tab') {
          e.preventDefault();
          
          // Insert tab at cursor position
          document.execCommand('insertText', false, '    ');
        }
      });
    }
    
    // Get the actual text content from the editable highlighted code
    getEditedContent() {
      if (!this.codeOutput) return '';
      
      // Get the text from the code element inside the pre
      const codeEl = this.codeOutput.querySelector('code');
      if (codeEl) {
        return codeEl.textContent;
      }
      
      // Fallback if code element doesn't exist
      return this.codeOutput.textContent;
    }
  
    render() {
      // Create editor content container
      const editorContent = document.createElement('div');
      editorContent.className = 'editor-content';
      
      // Add line numbers - will be updated dynamically
      const lineNumbers = document.createElement('div');
      lineNumbers.className = 'line-numbers';
      
      // Add code editor area
      const codeEditor = document.createElement('div');
      codeEditor.className = 'code-editor';
      
      const codeOutput = document.createElement('pre');
      codeOutput.id = 'codeOutput';
      codeOutput.className = 'code-output';
      codeOutput.textContent = ''; // Will be filled by updateContent
      
      // Add scroll sync between code and line numbers
      codeOutput.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeOutput.scrollTop;
      });
      
      codeEditor.appendChild(codeOutput);
      
      // Assemble the component
      editorContent.appendChild(lineNumbers);
      editorContent.appendChild(codeEditor);
      
      // Clear and update container
      this.container.innerHTML = '';
      this.container.appendChild(editorContent);
    }
  
    // Update the editor content with the current file
    updateContent() {
      if (!this.codeOutput) return;
      
      const fileContent = this.projectFiles[this.currentFile]?.content || '';
      
      // Apply syntax highlighting based on file type
      const fileType = this.getFileType(this.currentFile);
      this.applyHighlighting(fileContent, fileType);
      
      // Update line numbers based on content
      this.updateLineNumbers(fileContent);
    }
    
    // Get file type from extension
    getFileType(fileName) {
      const extension = fileName.split('.').pop().toLowerCase();
      switch (extension) {
        case 'html':
          return 'html';
        case 'css':
          return 'css';
        case 'js':
          return 'javascript';
        default:
          return 'plaintext';
      }
    }
    
    // Apply syntax highlighting
    applyHighlighting(content, fileType) {
      // Clear previous content
      this.codeOutput.innerHTML = '';
      
      // Create a temporary container for highlighting
      const preEl = document.createElement('code');
      preEl.className = `hljs language-${fileType}`;
      preEl.textContent = content;
      
      // Apply highlighting if hljs is available
      if (window.hljs) {
        window.hljs.highlightElement(preEl);
      }
      
      // Put the highlighted content into the editor
      this.codeOutput.appendChild(preEl);
      
      // Make it editable
      this.codeOutput.setAttribute('contenteditable', 'true');
      preEl.setAttribute('contenteditable', 'true');
    }
  
    // Update the line numbers based on content
    updateLineNumbers(content) {
      const lineCount = (content.match(/\n/g) || []).length + 1;
      const lineNumbers = this.container.querySelector('.line-numbers');
      
      // Only update if we need more lines
      if (lineCount > this.lineCount) {
        lineNumbers.innerHTML = '';
        this.lineCount = Math.max(lineCount, this.lineCount);
        
        for (let i = 1; i <= this.lineCount; i++) {
          const lineNumber = document.createElement('div');
          lineNumber.textContent = i;
          lineNumbers.appendChild(lineNumber);
        }
      }
    }
  
    // Switch to a different file
    switchFile(fileName) {
      if (this.projectFiles[fileName]) {
        this.currentFile = fileName;
        this.updateContent();
      }
    }
  
    // Get the current file name
    getCurrentFile() {
      return this.currentFile;
    }
  
    // Update content for a specific file
    updateFile(fileName, content) {
      if (this.projectFiles[fileName]) {
        this.projectFiles[fileName].content = content;
        
        // If it's the current file, update the display
        if (fileName === this.currentFile) {
          this.updateContent();
        }
        
        // Dispatch a content change event
        const event = new CustomEvent('contentchanged', {
          bubbles: true,
          detail: { 
            fileName: fileName,
            content: content
          }
        });
        this.container.dispatchEvent(event);
      }
    }
  }
  
  // Export for use in other files
  window.EditorComponent = EditorComponent;