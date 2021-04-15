import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext, VideoContext } from '../content/Content';

import { useAddAutoTrackedMutation, AutoTrackedDocument } from '../graphql';
import AutoPublished from './AutoPublished';
import AutoTracked from './AutoTracked';
import AutoTrackError from './AutoTrackError';
import TrackedUnidentified from './TrackedUnidentified';

export default function TrackResult() {
  const videoData = React.useContext(VideoContext);
  const user = React.useContext(UserContext);
  const history = useHistory();

  const [addAutoTrackedMutation, addAutoTrackedResult] = useAddAutoTrackedMutation();

  React.useEffect(() => {
    if (!user) return;
    // TOOD: this supposedly is not cached properly (not sure), caching it manually is problemati as it's aliased
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
      update: (cache, { data }) => {
        // if ('itemType' in data.addAutoTracked) {
        //   history.push(`/auto-tracked/${data.addAutoTracked.id}/published`);
        //   return;
        // }
        // if (!data.addAutoTracked.item) {
        //   history.push(`/auto-tracked/${data.addAutoTracked.id}unidentified`);
        //   return;
        // }
        // history.push(`/auto-tracked/${data.addAutoTracked.id}/tracked`);
      },
    });
  }, [addAutoTrackedMutation, videoData, user]);

  console.log('render me baby', addAutoTrackedResult);
  if (addAutoTrackedResult.error) return <AutoTrackError />;
  if (!addAutoTrackedResult.data) return null;

  const trackedData = addAutoTrackedResult.data.autoTracked;

  if ('item' in trackedData) return <AutoPublished watched={trackedData} />;
  if (!trackedData.trackedItem) return <TrackedUnidentified trackedId={trackedData.id} />;
  // TODO: `trackedItem` is tv specific

  const { trackedItem, tvItem } = trackedData;

  const name = 'name' in trackedItem ? trackedItem.name : trackedItem.title;

  let tvMeta = '';
  if (tvItem) {
    tvMeta =
      'episode_number' in tvItem
        ? `S${tvItem.season.season_number}E${tvItem.episode_number}`
        : `S${tvItem.season_number}`;
  }
  return <AutoTracked trackedId={trackedData.id} itemName={name} tvMeta={tvMeta} />;
}
