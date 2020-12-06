import { addStoreChangeListener, getStorageValue } from '../common/storage';
import { debugLog } from '../main';

chrome.runtime.onInstalled.addListener(async (event) => {
  // chrome.browserAction.setIcon({ path: 'icon48-inactive.png' });

  const { token } = await getStorageValue<{ token: string | null }>('token');

  if (!token) chrome.browserAction.setIcon({ path: 'icon48-inactive.png' });
});

addStoreChangeListener(({ newValue }) => {
  const isActive = !!newValue;
  const iconPath = `icon48${isActive ? '' : '-inactive'}.png`;

  chrome.browserAction.setIcon({ path: iconPath });
}, 'token');

// Listen for when tab updates?
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Ignroe pending updates
  if (!changeInfo || changeInfo.status !== 'complete') return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.[0].id) return;

    chrome.tabs.sendMessage(tabs[0].id, { type: 'tabUpdate', changeInfo, tab });
  });
});

function setupVideoContentPort(port: chrome.runtime.Port) {
  // videoContentPorts.push(port);
}

function setupIframeContentPort(port: chrome.runtime.Port) {
  const tabId = port.sender?.tab?.id;

  if (!tabId) return;

  port.onMessage.addListener((message) => {
    chrome.tabs.sendMessage(tabId, message);
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
