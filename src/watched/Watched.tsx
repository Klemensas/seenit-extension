import * as React from 'react';
import { format} from 'date-fns';

import { useUserWatchedQuery, useUserDataQuery } from '../graphql';

export default function Watched() {
  const { data: { userData } } = useUserDataQuery();
  const { data, loading } = useUserWatchedQuery({ variables: { id: userData.id }});

  if (loading) { return <div>Loading...</div> }

  const { watched, ...user } = data.user;
  return (
    <div className="watched-wrapper" style={{ display: 'flex' }}>
      {watched.map(({ item, createdAt }: any) => (
        <div key={item.id} style={{position: 'relative', minWidth: 154 }}>
          <div style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0.5em',
            fontSize: '0.75em',
          }}>
            <span>{item.name || item.title}</span>
          </div>
          <img src={`https://image.tmdb.org/t/p/w154${item.poster_path}`} style={{ position: 'relative' }} />
        </div>
      ))}
    </div>
  );
}
