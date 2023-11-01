// Sound variables definition
const audioHome = new Audio(chrome.runtime.getURL('sounds/home.mp3'));
const audioAlert = new Audio(chrome.runtime.getURL('sounds/alert.mp3'));
const volume = 0.5;
audioHome.volume = volume;
audioAlert.volume = volume;

// Function definition
function isKill(text) { // if text suggest a kill
  if (text.includes('by') && text.includes('died') && !text.includes('suicide')) {
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
      const addedElement = mutation.addedNodes[0];
      if (addedText.includes('died')) {
        // Format log line
        if (isKill(addedText)) {
          addedElement.style.backgroundColor = 'red';
          // Play sound alert
          audioAlert.play();
        } else {
          addedElement.style.backgroundColor = 'grey';
        }
        // Log entry in browser console
        console.log('[txAdmin Tool] - Death alert : ' + addedText);
      } else if (addedText.includes('explosion')){
        addedElement.style.backgroundColor = 'orange';
        console.log('[txAdmin Tool] - Explosion alert : ' + addedText);
      }
    }
  });
});

observer.observe(logContainer, { childList: true });
