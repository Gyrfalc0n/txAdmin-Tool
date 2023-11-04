// Sound variables definition
const audioHome = new Audio(chrome.runtime.getURL('sounds/home.mp3'));
const audioAlert = new Audio(chrome.runtime.getURL('sounds/alert.mp3'));
const volume = 0.5;
audioHome.volume = volume;
audioAlert.volume = volume;

// Colors

var color_vehicle = '#154360'; // dark blue
var color_explosion = 'orange'; // orange
var color_kill = 'red'; // red
var color_death = '#4D5656'; // light grey
var color_txadmin = '#9C640C'; // dark orange

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
          addedElement.style.backgroundColor = color_kill;
          // Play sound alert
          audioAlert.play();
        } else {
          addedElement.style.backgroundColor = color_death;
        }
        // Log entry in browser console
        console.log('[txAdmin Tool] - Death alert : ' + addedText);
      } else if (addedText.includes('explosion')){
        addedElement.style.backgroundColor = color_explosion;
        console.log('[txAdmin Tool] - Explosion alert : ' + addedText);
      } else if (addedText.includes('their vehicle')){
        addedElement.style.backgroundColor = color_vehicle;
        console.log('[txAdmin Tool] - Vehicle modification alert : ' + addedText);
      } else if (addedText.includes('txAdmin')){
        addedElement.style.backgroundColor = color_txadmin;
        console.log('[txAdmin Tool] - txAdmin message : ' + addedText);
      }
    }
  });
});

observer.observe(logContainer, { childList: true });
