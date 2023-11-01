// contentScript.js

const audioHome = new Audio(chrome.runtime.getURL('sounds/home.mp3'));
const audioAlert = new Audio(chrome.runtime.getURL('sounds/alert.mp3'));
const volume = 0.5;
audioHome.volume = volume;
audioAlert.volume = volume;

function isKill(text) { // if text suggest a kill
  if (text.includes('by') && text.includes('died')) {
    return true;
  }
  return false;
}

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
        console.log('[txAdmin Tool] - Alert : ' + addedText);
        const addedElement = mutation.addedNodes[0];
        // format
        if (isKill(addedText)) {
          addedElement.style.backgroundColor = 'red';
          addedElement.style.border = '1px solid yellow';
        } else {
          addedElement.style.border = '1px solid red';
        }
        

      }
    }
  });
});

observer.observe(logContainer, { childList: true });
