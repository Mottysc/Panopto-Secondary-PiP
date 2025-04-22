chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const screenContainer = document.getElementById('secondaryScreen');
      if (!screenContainer) {
        alert('Secondary screen not found.');
        return;
      }

      const visibleVideo = Array.from(screenContainer.getElementsByTagName('video')).find(video => {
        const style = window.getComputedStyle(video);
        return style.display !== 'none' && style.visibility !== 'hidden' && video.offsetParent !== null;
      });

      if (!visibleVideo) {
        alert('No visible video found in secondary screen.');
        return;
      }

      const video = visibleVideo;

      let player = null;
      if (window.videojs && typeof window.videojs === 'function') {
        try {
          player = videojs(video);
        } catch (e) {
          console.warn('Failed to initialise video.js player:', e);
        }
      }

      video.addEventListener('pause', () => {
        console.log('Pause event detected. Forcing video to pause.');
        try {
          video.pause();
        } catch (e) {
          console.warn('video.pause() failed:', e);
        }

        if (player) {
          try {
            player.pause();
          } catch (e) {
            console.warn('player.pause() failed:', e);
          }
        }
      });

      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        video.requestPictureInPicture()
          .then(() => {
            console.log('Entered Picture-in-Picture mode');
          })
          .catch((error) => {
            console.error('Failed to enter Picture-in-Picture:', error);
            alert('Unable to enter Picture-in-Picture mode.');
          });
      }
    }
  });
});
