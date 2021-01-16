import * as React from 'react';
import { Button, Icon, Text } from '@blueprintjs/core';

import { useSearchContentQuery, SearchItem, SearchContentQuery } from '../graphql';
import { VideoContext } from '../content/Content';
import Search from './Search';
import WatchedForm from './WatchedForm';
import ProgressBar from '../components/ProgressBar';
import { closeContent } from '../utils/close';

function renderSearch(
  setSelected: React.Dispatch<React.SetStateAction<SearchItem | null>>,
  prefix: React.ReactNode = <div>Couldn&apos;t find your watched title</div>,
) {
  return (
    <React.Fragment>
      {prefix}
      <Search setSelected={setSelected} />
    </React.Fragment>
  );
}

const VideoEnd = () => {
  const videoData = React.useContext(VideoContext);
  const [selected, setSelected] = React.useState<SearchItem | null>(null);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [isSaved, setIsSaved] = React.useState<boolean>(false);
  const title = videoData?.title || null;
  const { data, loading, error } = useSearchContentQuery({
    // TODO: this is needed because title type says it can be undefined, but skip prevents that. See if this can be changed
    variables: { title: title?.name || '' },
    skip: !title,
  });

  if (!title && !selected) return renderSearch(setSelected);

  let items: SearchContentQuery['searchContent'] = [];
  if (data && data.searchContent) {
    const { searchContent } = data;
    items = searchContent;
  }

  const item = items[0];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Unexpected error!</div>;
  if (!items.length && !selected) return renderSearch(setSelected);

  if (isSaved) {
    return (
      <div className="flex flex-direction-column flex-align-items-center">
        <Icon icon="tick" iconSize={64} intent="success" />
        <h4 className="bp3-heading">Success</h4>
        <Text tagName="p" className="mb-4">
          The show was added to your watched item list
        </Text>
        <ProgressBar duration={2500} onRest={closeContent} />
      </div>
    );
  }

  const target = selected || item;

  const season = (title?.season && parseInt(title.season, 10)) || undefined;
  const episode = (title?.episode && parseInt(title.episode, 10)) || undefined;
  const props = {
    id: target.id,
    type: target.type,
    season,
    episode,
    onSave: () => setIsSaved(true),
  };

  return (
    <React.Fragment>
      {searching ? (
        renderSearch(setSelected, null)
      ) : (
        <p style={{ fontSize: '0.8em' }}>
          Not what you watched?&nbsp;
          <Button type="button" onClick={() => setSearching(true)}>
            Search
          </Button>
        </p>
      )}
      <WatchedForm {...props} />
    </React.Fragment>
  );
};

export default VideoEnd;
