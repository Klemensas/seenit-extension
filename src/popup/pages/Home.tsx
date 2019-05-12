import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const watchedQuery = gql`
{
  allWatched {
    id
    tmdbId
  }
}
`;

export default function Home() {
  return (
    <Query query={watchedQuery}>
      {({ loading, error, data }) => {
        if (loading) { return <div>Loading...</div> }
        if (error) { return <div>Error</div> }

        const items = data.allWatched;

        return (
          <div>
            {items.map(item => <div key={item.id}>{item.id} - {item.tmdbId}</div>)}
          </div>
        );
      }}

    </Query>
  );
}
