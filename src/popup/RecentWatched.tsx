import * as React from 'react';

import { SearchItem, TmdbMediaType } from '../graphql';
import Search from '../watched/Search';
import WatchedMovieForm from '../watched/WatchedMovieForm';
import WatchedTvForm from '../watched/WatchedTvForm';

const RecentWatched = () => {
  const [selected, setSelected] = React.useState<SearchItem>(null);

  if (!selected) {
    return (
      <React.Fragment>
        <h3 className="bp3-heading">Watched anything recently?</h3>
        <Search selected={selected} setSelected={setSelected} />
      </React.Fragment>
    );
  }

  const WatchedForm = selected.type === TmdbMediaType.Movie ? WatchedMovieForm : WatchedTvForm;

  return <WatchedForm id={selected.id} />;
};

export default RecentWatched;
