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
      
      // Update content for the current file
      this.updateContent();
    }
  
    render() {
      // Create editor content container
      const editorContent = document.createElement('div');
      editorContent.className = 'editor-content';
      
      // Add line numbers
      const lineNumbers = document.createElement('div');
      lineNumbers.className = 'line-numbers';
      
      for (let i = 1; i <= this.lineCount; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
      }
      
      // Add code editor area
      const codeEditor = document.createElement('div');
      codeEditor.className = 'code-editor';
      
      const codeOutput = document.createElement('pre');
      codeOutput.id = 'codeOutput';
      codeOutput.className = 'code-output';
      codeOutput.textContent = ''; // Will be filled by updateContent
      
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
      this.codeOutput.textContent = fileContent;
      
      // Update line numbers based on content
      this.updateLineNumbers(fileContent);
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
      }
    }
  }
  
  // Export for use in other files
  window.EditorComponent = EditorComponent;