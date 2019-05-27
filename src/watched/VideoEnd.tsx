import * as React from 'react';

import { VideoContext } from '../content/Content';
import { Title } from '../content/renderService';
import { TmdbMediaType, useSearchContentQuery } from '../graphql';
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
  debugLog('got da title', title, videoData, data, loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    debugLog('uhoh', error);
    return <div>Unexpected error!</div>;
  }

  const {
    searchContent: { results },
  } = data;
  const items = results.filter(
    ({ media_type: mediaType }) => mediaType !== TmdbMediaType.Person,
  );
  debugLog('res', items);

  if (!items.length) {
    return (
      <React.Fragment>
        <div>Couldn&apos;t find your watched title</div>
        <Search />
      </React.Fragment>
    );
  }

  const item = items[0];

  return <WatchedForm item={item} title={title} />;
}
