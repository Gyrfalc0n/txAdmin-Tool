// Sound variables definition
const audioHome = new Audio(chrome.runtime.getURL('sounds/home.mp3'));
const audioAlert = new Audio(chrome.runtime.getURL('sounds/alert.mp3'));
const volume = 0.5;
audioHome.volume = volume;
audioAlert.volume = volume;

// Function definition
function isKill(text) { // if text suggest a kill
  if (text.includes('by') && text.includes('died')) {
    return true;
  }
  return false;
}

// Main
// Check if txAdmin is detected
if (document.querySelector('meta[name="description"][content="txAdmin - remotely Manage & Monitor your GTA5 FiveM Server"]')) {
  audioHome.play();
  console.log('[txAdmin Tool] - txAdmin detected');
}
// Get element logContainer
const logContainer = document.getElementById('logContainer');
// Observer to watch for new log
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    const addedText = mutation.addedNodes[0]?.textContent;

    // Text added
    if (addedText) {
      if (addedText.includes('died') || addedText.includes('explosion')) {
        const addedElement = mutation.addedNodes[0];
        // Format log line
        if (isKill(addedText)) {
          addedElement.style.backgroundColor = 'red';
          addedElement.style.border = '1px solid yellow';
          // Play sound alert
          audioAlert.play();
        } else {
          addedElement.style.border = '1px solid red';
        }
        // Log entry in browser console
        console.log('[txAdmin Tool] - Alert : ' + addedText);
      }
    }
  });
});

observer.observe(logContainer, { childList: true });
