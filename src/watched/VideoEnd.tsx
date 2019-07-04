import * as React from 'react';

import { TmdbMediaType, useSearchContentQuery, TmdbMovie, TmdbTv } from '../graphql';
import { VideoContext } from '../content/Content';
import { Title } from '../content/renderService';
import Search from './Search';
import WatchedForm from './WatchedForm';

function renderSearch(setSelected) {
  return (
    <React.Fragment>
      <div>Couldn&apos;t find your watched title</div>
      <Search setSelected={setSelected} />
    </React.Fragment>
  );
}

const VideoEnd = () => {
  const videoData = React.useContext(VideoContext);
  const [selected, setSelected] = React.useState<TmdbMovie | TmdbTv>(null);
  const [searching, setSearching] = React.useState<boolean>(false);

  const title: Title = videoData.title || null;

  // 4 possible results
  // 1: no title - thus query empty
  // 2: no items
  // 3: 1 result
  // 4: multiple results
  const { data, loading, error } = useSearchContentQuery({
    variables: { title: title ? title.name : null },
    skip: !title,
  });

  if (!title && !selected) {
    return renderSearch(setSelected);
  }

  let items = [];
  if (data && data.searchContent) {
    const {
      searchContent: { results },
    } = data;
    items = results.filter(({ media_type: mediaType }) => mediaType !== TmdbMediaType.Person);
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

  return (
    <React.Fragment>
      {searching ? (
        <Search setSelected={setSelected} />
      ) : (
        <p style={{ fontSize: '0.8em' }}>
          Not what you watched?{' '}
          <button type="button" onClick={() => setSearching(true)}>
            Search
          </button>
        </p>
      )}
      <WatchedForm item={selected || item} title={title} />;
    </React.Fragment>
  );
};

export default VideoEnd;
