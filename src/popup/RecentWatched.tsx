import * as React from 'react';
import Search from '../watched/Search';

export default function RecentWatched() {
  return (
    <React.Fragment>
      <p>Watched anything recently?</p>
      <Search />
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
}
