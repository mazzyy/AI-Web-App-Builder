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
      
      // Set text content directly for editing
      this.codeOutput.textContent = fileContent;
      
      // Update line numbers based on content
      this.updateLineNumbers(fileContent);
      
      // Add simple syntax colors based on file type
      this.applySimpleSyntaxColors();
    }
  
    // Apply some basic syntax colors without changing the text content
    applySimpleSyntaxColors() {
      // Add a CSS class based on file type
      const fileType = this.currentFile.split('.').pop();
      this.codeOutput.className = `code-output ${fileType}-code`;
    }
  
    // Update line numbers based on content
    updateLineNumbers(content) {
      const lines = content.split('\n');
      const lineCount = Math.max(lines.length, 30);
      const lineNumbers = this.container.querySelector('.line-numbers');
      
      // Clear existing line numbers
      lineNumbers.innerHTML = '';
      
      // Add new line numbers
      for (let i = 1; i <= lineCount; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
      }
      
      // Add a few extra line numbers to allow for new content
      for (let i = lineCount + 1; i <= lineCount + 10; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
      }
    }
  
    makeCodeEditable() {
      if (!this.codeOutput) return;
      
      // Add contenteditable attribute
      this.codeOutput.setAttribute('contenteditable', 'true');
      
      // Add event listener for changes
      this.codeOutput.addEventListener('input', () => {
        // Save changes to project files
        if (this.projectFiles[this.currentFile]) {
          // Get the content directly from the element
          const content = this.codeOutput.textContent;
          this.projectFiles[this.currentFile].content = content;
          
          // Update line numbers
          this.updateLineNumbers(content);
          
          // Dispatch content change event
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
      
      // Add keyboard shortcuts and prevent tab from losing focus
      this.codeOutput.addEventListener('keydown', (e) => {
        // Handle tab key for indentation
        if (e.key === 'Tab') {
          e.preventDefault();
          
          // Insert tab at cursor position
          document.execCommand('insertText', false, '    ');
        }
      });
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