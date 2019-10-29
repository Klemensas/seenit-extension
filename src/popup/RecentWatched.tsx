import * as React from 'react';
import { Text } from '@blueprintjs/core';

import { SearchItem } from '../graphql';
import { TmdbMediaType } from '../graphql/react';
import Search from '../watched/Search';
import WatchedMovieForm from '../watched/WatchedMovieForm';
import WatchedTvForm from '../watched/WatchedTvForm';

const RecentWatched = () => {
  const [selected, setSelected] = React.useState<SearchItem>(null);

  if (!selected) {
    return (
      <React.Fragment>
        <Text tagName="p">Watched anything recently?</Text>
        <Search selected={selected} setSelected={setSelected} />
      </React.Fragment>
    )
  }

  const WatchedForm = selected.type === TmdbMediaType.Movie ? WatchedMovieForm : WatchedTvForm

  return (
    <WatchedForm id={selected.id} />
  );
};

export default RecentWatched;
