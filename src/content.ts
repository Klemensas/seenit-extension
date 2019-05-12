console.log('ey');

const port = chrome.runtime.connect({ name: 'videoContent' });
// port.onMessage.addListener(function(msg) {
//   if (msg.question == "Who's there?")
//     port.postMessage({answer: "Madame"});
//   else if (msg.question == "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });
// port.postMessage({joke: "Knock knock"});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Page change
  if (request.type === 'tabUpdate') {
    console.log(request, sender) // new url is now in content scripts!
  }
  initPage();
});

const state = {
  mutationObserver: null,
  videoEl: null,
  videoData: null,
  // playbackStartTime: null,
  // duration: null,
  // startTimestamp: null,
}
initPage();

function initPage() {
  resetState();
  getVideoElement();
}

function resetState() {
  removeMutationObserver();
  state.videoEl = null;
  state.videoData = null;
}

function getVideoElement() {
  const videoEl = document.querySelector('video');
  if (videoEl) { return registerVideo(videoEl); }

  state.mutationObserver = new MutationObserver(() => {
    const vEl = document.querySelector('video');
    if (!vEl) { return; }
    state.mutationObserver.disconnect();
    registerVideo(vEl);
  });
  state.mutationObserver.observe(document.body, { childList: true, subtree: true });
}

function removeMutationObserver() {
  if (state.mutationObserver) {
    state.mutationObserver.disconnect();
    state.mutationObserver = null;
  }
}

function registerVideo(videoEl: HTMLVideoElement) {
  state.videoEl = videoEl;

  videoEl.addEventListener('play', (event) => { console.log('play', event); onVideoPlay(state.videoEl, event); })
  videoEl.addEventListener('pause', (event) => { console.log('pause', event); onVideoPause(state.videoEl, event); })
  // Endedd triggers pause on netflix, does it everywhere?
  videoEl.addEventListener('ended', (event) => { console.log('ended', event); onVideoEnd(state.videoEl, event); })

  if (!videoEl.paused) {
    onVideoPlay(videoEl)
  }
}

function onVideoPlay(videoEl: HTMLVideoElement, event?: Event) {
  const timeTs = videoEl.currentTime;
  if (!state.videoData) {
    onStartVideo(videoEl);
  } else if (state.videoData.lastTimestamp !== timeTs) {
    console.log('woosh', event, timeTs, state.videoData);
  } else {
    console.log('ts matches!')
  }

  state.videoData = {
    ...state.videoData,
    isPlaying: true,
    startTimestamp: timeTs,
    lastTimestamp: timeTs,
  }
}

function onVideoPause(videoEl: HTMLVideoElement, event?: Event) {
  state.videoData = {
    ...state.videoData,
    isPlaying: false,
    lastTimestamp: videoEl.currentTime,
  }
}

function onVideoEnd(videoEl: HTMLVideoElement, event?: Event) {
  state.videoData = {
    ...state.videoData,
    isPlaying: false,
    lastTimestamp: videoEl.currentTime,
  }
}

function onStartVideo(videoEl: HTMLVideoElement) {
  state.videoData = {
    ...state.videoData,
    playbackStartTime: Date.now(),
    duration: videoEl.duration,
    startTimestamp: videoEl.currentTime,
    title: findVideoTitle()
  };
}

function findVideoTitle() {
  return getTitlesFromHeading();

  function getTitlesFromHeading(): string[] {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    return  Array.from(headings)
      .sort((a, b) => +a.tagName.slice(1) - +b.tagName.slice(1))
      .reduce((acc, node) => node.textContent ? [...acc, node.textContent] : acc, []);
  }
}
