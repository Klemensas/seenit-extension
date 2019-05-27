import * as React from 'react';
import Search from '../watched/Search';

export default function RecentWatched() {
  return (
    <React.Fragment>
      <p>Watched anything recently?</p>
      <Search />
      <div
        style={{
          border: '3px solid red',
          backgroundColor: 'white',
          padding: '.5em',
          margin: '1em 0',
          fontSize: '0.75em',
        }}
      >
        Missing popup after finishing a video?
        {/* TODO: check iframe and guide user for further steps */}
      </div>
    </React.Fragment>
    // <Query query={watchedQuery}>
    //   {({ loading, error, data }) => {
    //     if (loading) { return <div>Loading...</div> }
    //     if (error) { return <div>Error</div> }

    //     const items = data.allWatched;

    //     return (
    //       <div>
    //         {items.map(item => <div key={item.id}>{item.id} - {item.tmdbId}</div>)}
    //       </div>
    //     );
    //   }}

    // </Query>
  );
}
