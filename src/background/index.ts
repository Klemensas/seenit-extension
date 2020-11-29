import { getStorageValue } from '../common/storage';
import { debugLog } from '../main';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  const isResponseAsync = false;
  if (request.popupMounted) debugLog('eventPage notified that Popup.tsx has mounted.');

  if (request.loggedIn) chrome.browserAction.setIcon({ path: 'icon48.png' });

  return isResponseAsync;
});

chrome.runtime.onInstalled.addListener(async (event) => {
  // chrome.browserAction.setIcon({ path: 'icon48-inactive.png' });

  const { token } = await getStorageValue<{ token: string | null }>('token');

  if (!token) chrome.browserAction.setIcon({ path: 'icon48-inactive.png' });
});

// Listen for when tab updates?
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Ignroe pending updates
  if (!changeInfo || changeInfo.status !== 'complete') return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.length) return;

    chrome.tabs.sendMessage(tabs[0].id, { type: 'tabUpdate', changeInfo, tab });
  });
});

function setupVideoContentPort(port: chrome.runtime.Port) {
  // videoContentPorts.push(port);
}

function setupIframeContentPort(port: chrome.runtime.Port) {
  port.onMessage.addListener((message) => {
    chrome.tabs.sendMessage(port.sender.tab.id, message);
  });
}

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case 'videoContent': {
      setupVideoContentPort(port);
      break;
    }

    case 'iframeContent': {
      setupIframeContentPort(port);
      break;
    }

    default:
      break;
  }
});
