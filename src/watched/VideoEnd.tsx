import * as React from 'react';

import { VideoContext } from '../content/Content';
import { Title } from '../content/renderService';
import { TmdbMediaType, useSearchContentQuery, useTvQuery } from '../graphql';
import { debugLog } from '../main';
import Search from './Search';
import WatchedForm from './WatchedForm';

export default function VideoEnd(): React.ReactElement {
  const videoData = React.useContext(VideoContext);

  const title: Title = videoData.title || null;

  // 4 possible results
  // 1: no title - thus query empty
  // 2: no items
  // 3: 1 result
  // 4: multiple results

  if (!title) {
    return <div>No title?</div>;
  }

  const { data, loading, error } = useSearchContentQuery({
    variables: { title: title.name },
  });

  let items = [];
  if (data && data.searchContent) {
    const {
      searchContent: { results },
    } = data;
    items = results.filter(({ media_type: mediaType }) => mediaType !== TmdbMediaType.Person);
  }

  const item = items[0];

  const tvQuery = useTvQuery({
    variables: { tmdbId: item ? item.id : null },
    skip: !item || item.media_type !== TmdbMediaType.Tv,
  });
  const seasons = tvQuery.data && tvQuery.data.tv ? tvQuery.data.tv.seasons : null;

  if (loading || tvQuery.loading) {
    return <div>Loading...</div>;
  }

  if (error || tvQuery.error) {
    return <div>Unexpected error!</div>;
  }

  if (!items.length) {
    return (
      <React.Fragment>
        <div>Couldn&apos;t find your watched title</div>
        <Search />
      </React.Fragment>
    );
  }

  return <WatchedForm item={item} title={title} seasons={seasons} />;
}
