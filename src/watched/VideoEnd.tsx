import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';

import { useSearchContentQuery, SearchItem, SearchContentQuery, EditableWatchedFragment } from '../graphql';
import { VideoContext } from '../content/Content';
import Search from './Search';
import WatchedForm from './WatchedForm';
import { CardNotification } from './CardNotification';
import { renderWatchedActionTitle } from '../utils/watched';
import IgnorePrompt from './IgnorePrompt';

const VideoEnd = () => {
  const videoData = React.useContext(VideoContext);
  const [selected, setSelected] = React.useState<SearchItem | null>(null);
  const [saved, setSaved] = React.useState<EditableWatchedFragment>();
  const [isBlacklisted, setIsBlacklisted] = React.useState(false);
  const title = videoData?.title || null;
  const { data, loading, error } = useSearchContentQuery({
    // TODO: this is needed because title type says it can be undefined, but skip prevents that. See if this can be changed
    variables: { title: title?.name || '' },
    skip: !title,
  });

  let item: SearchContentQuery['searchContent'][0] | undefined;
  if (data && data.searchContent) {
    const { searchContent } = data;
    [item] = searchContent;
  }

  const target = selected || item;

  const season = (title?.season && parseInt(title.season, 10)) || undefined;
  const episode = (title?.episode && parseInt(title.episode, 10)) || undefined;

  let cardTitle: string | boolean | undefined = loading && 'Searching...';
  cardTitle = cardTitle || (error && 'Unexpected error');
  cardTitle = cardTitle || (target ? `Seen ${target.title}` : "Couldn't find your watched item");

  if (saved)
    return (
      <CardNotification
        intent={Intent.SUCCESS}
        title={renderWatchedActionTitle('🙌 Saved', saved.item, saved.tvItem)}
      />
    );

  if (isBlacklisted)
    return <CardNotification intent={Intent.SUCCESS} title="✅ added to your blacklist" hideAfter={4000} />;

  return (
    <CardNotification title={<strong>{cardTitle}</strong>} hideAfter={false} className="track-card-notification">
      <>
        <div className="pb-2">
          <Search setSelected={setSelected} placeholderText={target && 'Not what you watched?'} />
        </div>
        {target && (
          <WatchedForm
            id={target.id}
            type={target.type}
            season={season}
            episode={episode}
            onSave={(watched) => setSaved(watched)}
          />
        )}
        <div className="pt-4">
          <IgnorePrompt onBlacklisted={() => setIsBlacklisted(true)} />
        </div>
      </>
    </CardNotification>
  );
};

export default VideoEnd;
