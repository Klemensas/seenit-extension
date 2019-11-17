import * as React from 'react';
import { Button, Icon, Text } from '@blueprintjs/core';

import { useSearchContentQuery, SearchItem } from '../graphql';
import { VideoContext } from '../content/Content';
import Search from './Search';
import WatchedForm from './WatchedForm';
import ProgressBar from '../components/ProgressBar';
import { closeContent } from '../utils/close';

function renderSearch(
  setSelected: React.Dispatch<React.SetStateAction<SearchItem>>,
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
  const [selected, setSelected] = React.useState<SearchItem>(null);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [isSaved, setIsSaved] = React.useState<boolean>(false);
  const title = videoData.title || null;
  const { data, loading, error } = useSearchContentQuery({
    variables: { title: title ? title.name : null },
    skip: !title,
  });

  if (!title && !selected) {
    return renderSearch(setSelected);
  }

  let items = [];
  if (data && data.searchContent) {
    const { searchContent } = data;
    items = searchContent;
  }

  const item = items[0];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Unexpected error!</div>;
  }

  if (!items.length && !selected) {
    return renderSearch(setSelected);
  }

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

  const season = Number.isNaN(parseInt(title.season, 10)) ? undefined : parseInt(title.season, 10);
  const episode = Number.isNaN(parseInt(title.episode, 10)) ? undefined : parseInt(title.episode, 10);
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
