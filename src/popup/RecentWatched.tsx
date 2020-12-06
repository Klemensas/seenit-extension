import * as React from 'react';

import { SearchItem } from '../graphql';
import Search from '../watched/Search';
import WatchedForm from '../watched/WatchedForm';

const RecentWatched = () => {
  const [selected, setSelected] = React.useState<SearchItem | null>(null);

  if (!selected) {
    return (
      <React.Fragment>
        <h3 className="bp3-heading">Watched anything recently?</h3>
        <Search selected={selected || undefined} setSelected={setSelected} />
      </React.Fragment>
    );
  }

  return <WatchedForm id={selected.id} type={selected.type} />;
};

export default RecentWatched;
