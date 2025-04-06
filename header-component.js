// Add this to header-component.js to debug tab closing
deleteTab(fileName) {
  console.log(`Attempting to delete tab: ${fileName}`);
  
  // Check if it's the last file
  if (Object.keys(this.projectFiles).length <= 1) {
    console.log("Cannot delete the last remaining file.");
    alert("Cannot delete the last remaining file.");
    return;
  }
  
  // Dispatch custom event for tab deletion
  console.log(`Dispatching delete event for: ${fileName}`);
  const event = new CustomEvent('deletetab', {
    bubbles: true,
    detail: { fileName: fileName }
  });
  this.container.dispatchEvent(event);
  console.log("Event dispatched");
}

// Add this to app-manager.js to debug tab deletion
document.getElementById('header-component').addEventListener('deletetab', (e) => {
  console.log(`Delete tab event received for: ${e.detail.fileName}`);
  this.deleteFile(e.detail.fileName);
});

// Add this to deleteFile method
deleteFile(fileName) {
  console.log(`deleteFile called for: ${fileName}`);
  
  // Don't delete the last file if it's index.html
  if (fileName === 'index.html' && Object.keys(this.projectFiles).length === 1) {
    console.log("Cannot delete the last remaining file.");
    alert("Cannot delete the last remaining file.");
    return;
  }
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete ${fileName}?`)) {
    console.log("Deletion cancelled by user");
    return;
  }
  
  console.log(`Proceeding with deletion of: ${fileName}`);
  
  // Get current active file
  const currentFile = this.editorComponent.getCurrentFile();
  console.log(`Current active file: ${currentFile}`);
  
  // Remove file from project files
  delete this.projectFiles[fileName];
  console.log(`Removed ${fileName} from project files`);
  
  // Remove file from sidebar
  const sidebarFile = document.querySelector(`.file[data-file="${fileName}"]`);
  if (sidebarFile) {
    sidebarFile.remove();
    console.log(`Removed ${fileName} from sidebar`);
  }
  
  // If the deleted file was the active one, switch to another file
  if (currentFile === fileName) {
    const nextFile = Object.keys(this.projectFiles)[0];
    console.log(`Need to switch to another file, selected: ${nextFile}`);
    if (nextFile) {
      this.switchToFile(nextFile);
    }
  }
  
  // Refresh tabs
  console.log("Refreshing tabs");
  this.headerComponent.render();
  this.headerComponent.setActiveTab(this.editorComponent.getCurrentFile());
  
  // Update preview
  this.updatePreview();
  console.log("File deletion complete");
}