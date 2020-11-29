import RenderService, { VideoData, RenderAction } from './renderService';

(function iframeContent() {
  if (window.self === window.top) return;

  const renderService = new RenderService((videoData: VideoData) => {
    renderService.port.postMessage({
      type: RenderAction.iframeVideoCb,
      payload: videoData,
    });
  }, true);
})();
