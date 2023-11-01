// contentScript.js

const audioHome = new Audio(chrome.runtime.getURL('sounds/home.mp3'));
const audioAlert = new Audio(chrome.runtime.getURL('sounds/alert.mp3'));
const volume = 0.5;
audioHome.volume = volume;
audioAlert.volume = volume;

// Detect if the page contains txAdmin
if (document.querySelector('meta[name="description"][content="txAdmin - remotely Manage & Monitor your GTA5 FiveM Server"]')) {
  audioHome.play();
  console.log('[txAdmin Tool] - txAdmin detected');
}

const logContainer = document.getElementById('logContainer');

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    const addedText = mutation.addedNodes[0]?.textContent;

    if (addedText) {
      if (addedText.includes('died') || addedText.includes('explosion')) {
        //play sound
        audioAlert.play();
        console.log('[txAdmin Tool] - Alert');
      }
    }
  });
});

observer.observe(logContainer, { childList: true });
