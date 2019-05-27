import * as React from 'react';

import { useSearchContentQuery, TmdbMediaType } from '../graphql';
import Search from './Search';
import { VideoContext } from '../content/Content';
import { WatchedForm } from './WatchedForm';
import { Title } from '../content/renderService';
import { debugLog } from '../main';

export default function VideoEnd() {
  const videoData = React.useContext(VideoContext);

  const title: Title = videoData.title || null;

  // 4 possible results
  // 1: no title - thus query empty
  // 2: no items
  // 3: 1 result
  // 4: multiple results


  if (!title) {
    return <div>No title?</div>
  }

  const { data, loading, error } = useSearchContentQuery({ variables: { title: title.name }});
  debugLog('got da title', title, videoData, data, loading);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    debugLog('uhoh', error);
    return <div>Unexpected error!</div>
  }

  const { searchContent: { results } } = data;
  const items = results.filter(({ media_type }) => media_type !== TmdbMediaType.Person);
  debugLog('res', items);

  if (!items.length) {
    return (
      <React.Fragment>
        <div>Couldn't find your watched title</div>
        <Search />
      </React.Fragment>
    )
  }

  const item = items[0];

  return (
    <WatchedForm item={item} title={title} />
  )
}
