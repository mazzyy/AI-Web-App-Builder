class HeaderComponent {
  constructor(containerId, projectFiles) {
    this.container = document.getElementById(containerId);
    this.projectFiles = projectFiles;
    this.onTabChange = null;
    this.init();
  }

  init() {
    // Render the initial tabs
    this.render();
    
    // Add event listeners to the new tab button and other elements
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    // Add event listener for new tab button
    const newTabBtn = this.container.querySelector('.new-tab');
    if (newTabBtn) {
      newTabBtn.addEventListener('click', () => {
        // Dispatch custom event for new tab
        const event = new CustomEvent('newtab', {
          bubbles: true
        });
        this.container.dispatchEvent(event);
      });
    }
  }

  render() {
    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'editor-tabs';
    
    // Add tabs for each file
    Object.keys(this.projectFiles).forEach(fileName => {
      const tabElement = document.createElement('div');
      tabElement.className = 'tab';
      tabElement.setAttribute('data-file', fileName);
      
      // Create tab content with close button
      const tabContent = document.createElement('span');
      tabContent.className = 'tab-name';
      tabContent.textContent = fileName;
      tabElement.appendChild(tabContent);
      
      // Add delete button (except for index.html if it's the only file)
      if (!(fileName === 'index.html' && Object.keys(this.projectFiles).length === 1)) {
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tab-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.title = 'Close tab';
        
        // Add delete event to button
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent tab switch
          this.deleteTab(fileName);
        });
        
        tabElement.appendChild(closeBtn);
      }
      
      // Add click event to switch tabs
      tabElement.addEventListener('click', () => {
        if (this.onTabChange) {
          this.onTabChange(fileName);
        }
      });
      
      tabsContainer.appendChild(tabElement);
    });
    
    // Add new tab button
    const newTabBtn = document.createElement('div');
    newTabBtn.className = 'new-tab';
    newTabBtn.title = 'Create new file';
    newTabBtn.textContent = '+';
    tabsContainer.appendChild(newTabBtn);
    
    // Clear and update container
    this.container.innerHTML = '';
    this.container.appendChild(tabsContainer);
    
    // Re-attach event listeners (important after redrawing tabs)
    this.attachEventListeners();
  }

  // Set active tab
  setActiveTab(fileName) {
    const tabs = this.container.querySelectorAll('.tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-file') === fileName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  // Add a new tab
  addTab(fileName) {
    const tabsContainer = this.container.querySelector('.editor-tabs');
    const newTabBtn = this.container.querySelector('.new-tab');
    
    const tabElement = document.createElement('div');
    tabElement.className = 'tab';
    tabElement.setAttribute('data-file', fileName);
    
    // Create tab content with close button
    const tabContent = document.createElement('span');
    tabContent.className = 'tab-name';
    tabContent.textContent = fileName;
    tabElement.appendChild(tabContent);
    
    // Add delete button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'tab-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.title = 'Close tab';
    
    // Add delete event to button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent tab switch
      this.deleteTab(fileName);
    });
    
    tabElement.appendChild(closeBtn);
    
    // Add click event to switch tabs
    tabElement.addEventListener('click', () => {
      if (this.onTabChange) {
        this.onTabChange(fileName);
      }
    });
    
    // Insert before the + button
    tabsContainer.insertBefore(tabElement, newTabBtn);
    
    // Set this tab as active
    this.setActiveTab(fileName);
  }

  // Delete a tab
  deleteTab(fileName) {
    // Check if it's the last file
    if (Object.keys(this.projectFiles).length <= 1) {
      alert("Cannot delete the last remaining file.");
      return;
    }
    
    // Dispatch custom event for tab deletion
    const event = new CustomEvent('deletetab', {
      bubbles: true,
      detail: { fileName: fileName }
    });
    this.container.dispatchEvent(event);
  }

  // Set callback for tab change
  onTabChanged(callback) {
    this.onTabChange = callback;
  }
}

// Export for use in other files
window.HeaderComponent = HeaderComponent;