import * as React from 'react';
import { Text, Overlay } from '@blueprintjs/core';

import { TmdbMovie, TmdbTv } from '../graphql';
import Search from '../watched/Search';
import WatchedForm from '../watched/WatchedForm';

const RecentWatched = () => {
  const [selected, setSelected] = React.useState<TmdbMovie | TmdbTv>(null);

  return (
    <React.Fragment>
      <Text tagName="p">Watched anything recently?</Text>
      <Search setSelected={setSelected} />
      <div className="sp-y">{selected ? <WatchedForm item={selected} /> : null}</div>
      {/* <div
        style={{
          border: '3px solid red',
          backgroundColor: 'white',
          padding: '.5em',
          margin: '1em 0',
          fontSize: '0.75em',
        }}
      >
        Missing popup after finishing a video?
      </div> */}
    </React.Fragment>
  );
};

export default RecentWatched;
