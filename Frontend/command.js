class CommandComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.onGenerate = null;
    this.init();
  }

  init() {
    this.render();
    
    // Get elements
    this.promptInput = this.container.querySelector('#promptInput');
    this.generateBtn = this.container.querySelector('#generateBtn');
    this.generateSpinner = this.container.querySelector('#generateSpinner');
    
    // Initialize template selection if available
    if (window.initTemplateSelection) {
      window.initTemplateSelection();
    }
    
    // Add event listeners
    if (this.generateBtn) {
      this.generateBtn.addEventListener('click', () => {
        this.handleGenerate();
      });
    }
    
    if (this.promptInput) {
      this.promptInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleGenerate();
        }
      });
    }
  }

  render() {
    // Create command footer
    const editorFooter = document.createElement('div');
    editorFooter.className = 'editor-footer';
    
    // Create command input area
    const commandInput = document.createElement('div');
    commandInput.className = 'command-input';
    
    // Add icon
    const commandIcon = document.createElement('span');
    commandIcon.className = 'command-icon';
    commandIcon.textContent = '⚙️';
    
    // Add input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'promptInput';
    inputField.className = 'command-text';
    inputField.placeholder = 'Describe the website you want to create...';
    
    // Add generate button
    const generateBtn = document.createElement('button');
    generateBtn.id = 'generateBtn';
    generateBtn.className = 'generate-btn';
    
    const spinner = document.createElement('span');
    spinner.id = 'generateSpinner';
    spinner.className = 'spinner-border spinner-border-sm d-none';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-hidden', 'true');
    
    generateBtn.appendChild(spinner);
    generateBtn.appendChild(document.createTextNode('Generate'));
    
    // Assemble the component
    commandInput.appendChild(commandIcon);
    commandInput.appendChild(inputField);
    commandInput.appendChild(generateBtn);
    
    editorFooter.appendChild(commandInput);
    
    // Clear and update container
    this.container.innerHTML = '';
    this.container.appendChild(editorFooter);
  }

  // Handle generate button click
  handleGenerate() {
    const prompt = this.promptInput.value.trim();
    
    if (!prompt) {
      alert('Please enter a description for your website');
      return;
    }
    
    // Call the callback if set
    if (this.onGenerate) {
      this.onGenerate(prompt);
    }
  }

  // Set loading state
  setLoading(isLoading) {
    if (isLoading) {
      this.generateBtn.disabled = true;
      this.generateSpinner.classList.remove('d-none');
    } else {
      this.generateBtn.disabled = false;
      this.generateSpinner.classList.add('d-none');
      this.promptInput.value = '';
    }
  }

  // Set callback for generate
  onGenerateCommand(callback) {
    this.onGenerate = callback;
  }
}

// Export for use in other files
window.CommandComponent = CommandComponent;