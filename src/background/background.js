// 
console.log('Background script loaded');
// 

// 
chrome.runtime.onInstalled.addListener(() => {
  console.log(`
js(entry) -- configuration/background.js
js -- src/background/index.js
connection: src/background/index.js -- configuration/background.js -(*build*)- dist/background.js`);
});
// 
// Inject content script when extension is activated
// Prevents having to refresh the page to activate the content script
chrome.runtime.onInstalled.addListener(() => {
    // Query all open tabs with http or https URLs
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (tab.url && /^https?:\/\//.test(tab.url)) { // Ensure the URL is http or https
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
        }
      }
    });
  });
  

  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'content-script') {
      port.onMessage.addListener((message) => {
        if (message.action === 'openModal') {
          console.log('Opening modal...');
          openModalWindow()
        }
      });
    }
  });
  
  function openModalWindow() {
    chrome.windows.create({
      url: chrome.runtime.getURL('backgroundModal.html'),
      type: 'popup',
      width: 400,
      height: 300,
    });
  }