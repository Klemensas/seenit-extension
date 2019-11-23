import { debugLog } from './main';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  const isResponseAsync = false;
  if (request.popupMounted) {
    debugLog('eventPage notified that Popup.tsx has mounted.');
  }

  return isResponseAsync;
});

const state = {
  token: null,
};
const tokenLoadPromise = new Promise(resolve => {
  chrome.storage.sync.get(['token'], token => {
    state.token = token;
    resolve(token);
  });
});

const eventList = [
  'onBeforeNavigate',
  'onCreatedNavigationTarget',
  'onCommitted',
  'onCompleted',
  'onDOMContentLoaded',
  'onErrorOccurred',
  'onReferenceFragmentUpdated',
  'onTabReplaced',
  'onHistoryStateUpdated',
];

// const state = {
//   tabChangeCallbacks: [],
// }
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Listen only to complete status
  if (!changeInfo || changeInfo.status !== 'complete') {
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs || !tabs.length) {
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, { type: 'tabUpdate', changeInfo, tab });
  });
});

function setupVideoContentPort(port: chrome.runtime.Port) {
  // videoContentPorts.push(port);
}

function setupIframeContentPort(port: chrome.runtime.Port) {
  port.onMessage.addListener(message => {
    chrome.tabs.sendMessage(port.sender.tab.id, message);
  });
}

chrome.runtime.onConnect.addListener(port => {
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

// eventList.forEach(function(e) {
//   chrome.webNavigation[e].addListener(function(data) {
//     if (typeof data)
//       debugLog(chrome.i18n.getMessage('inHandler'), e, data);
//     else
//       debugLog(chrome.i18n.getMessage('inHandlerError'), e);
//   });
// });
