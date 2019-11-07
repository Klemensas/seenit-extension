import * as React from 'react';
import { Button } from '@blueprintjs/core';

import { useSearchContentQuery, SearchItem, TmdbMediaType } from '../graphql';
import { VideoContext } from '../content/Content';
import Search from './Search';
import WatchedTvForm from './WatchedTvForm';
import WatchedMovieForm from './WatchedMovieForm';

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

  const target = selected || item;
  const WatchedForm = target.type === TmdbMediaType.Movie ? WatchedMovieForm : WatchedTvForm;

  const season = Number.isNaN(parseInt(title.season, 10)) ? undefined : parseInt(title.season, 10);
  const episode = Number.isNaN(parseInt(title.episode, 10)) ? undefined : parseInt(title.episode, 10);
  const props = {
    id: target.id,
    season,
    episode,
  };

  return (
    <React.Fragment>
      {searching ? (
        renderSearch(setSelected, null)
      ) : (
        <p style={{ fontSize: '0.8em' }}>
          Not what you watched?{' '}
          <Button type="button" onClick={() => setSearching(true)}>
            Search
          </Button>
        </p>
      )}
      <WatchedForm {...props} />;
    </React.Fragment>
  );
};

export default VideoEnd;
