chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      updateAction(tab.id, tab.url);
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' || changeInfo.url) {
    updateAction(tabId, tab.url);
  }
});

function updateAction(tabId, url) {
  const targetUrlPattern = /^https:\/\/.*\.cloud\.panopto\.eu\/Panopto\/Pages\/Viewer\.aspx/;
  if (targetUrlPattern.test(url)) {
    chrome.action.enable(tabId); // Enable the icon
  } else {
    chrome.action.disable(tabId); // Disable the icon for all other pages
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const screenContainer = document.getElementById('secondaryScreen');
      if (!screenContainer) {
        alert('Secondary screen not found.');
        return;
      }

      const video = Array.from(screenContainer.getElementsByTagName('video')).find(v => {
        const style = window.getComputedStyle(v);
        return style.display !== 'none' && style.visibility !== 'hidden' && v.offsetParent !== null;
      });

      if (!video) {
        alert('No visible video found in secondary screen.');
        return;
      }

      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        video.requestPictureInPicture().catch((error) => {
          console.error('Failed to enter Picture-in-Picture:', error);
          alert('Unable to enter Picture-in-Picture mode.');
        });
      }
    }
  });
});
