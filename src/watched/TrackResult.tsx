import * as React from 'react';
import { UserContext, VideoContext } from '../content/Content';

import { useAddAutoTrackedMutation } from '../graphql';
import { renderWatchedActionTitle } from '../utils/watched';
import AutoPublished from './AutoPublished';
import AutoTracked from './AutoTracked';
import AutoTrackError from './AutoTrackError';
import TrackedUnidentified from './TrackedUnidentified';

export default function TrackResult() {
  const videoData = React.useContext(VideoContext);
  const user = React.useContext(UserContext);

  const [addAutoTrackedMutation, addAutoTrackedResult] = useAddAutoTrackedMutation();

  React.useEffect(() => {
    if (!user) return;
    // TOOD: this supposedly is not cached properly (not sure), caching it manually is problematic as it's aliased
    addAutoTrackedMutation({
      variables: {
        createdAt: Date.now(),
        meta: {
          title: videoData?.title?.name || '&nbsp;',
          tvData:
            videoData?.title?.season || videoData?.title?.episode
              ? {
                  season: videoData.title.season,
                  episode: videoData.title.episode,
                }
              : null,
          url: window.location.href,
          provider: 'extension',
        },
      },
    });
  }, [addAutoTrackedMutation, videoData, user]);

  if (addAutoTrackedResult.error) return <AutoTrackError />;
  if (!addAutoTrackedResult.data) return null;

  const trackedData = addAutoTrackedResult.data.autoTracked;

  if ('item' in trackedData) return <AutoPublished watched={trackedData} />;
  if (!trackedData.trackedItem) return <TrackedUnidentified trackedId={trackedData.id} />;

  return (
    <AutoTracked
      trackedId={trackedData.id}
      title={renderWatchedActionTitle('👏 tracked as draft', trackedData.trackedItem, trackedData.tvItem)}
    />
  );
}
