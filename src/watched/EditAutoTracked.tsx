import * as React from 'react';
import { useParams } from 'react-router';

import { useAutoTrackedQuery } from '../graphql';

export default function EditAutoTracked() {
  const { id } = useParams<{ id: string }>();
  const autoTrackedResults = useAutoTrackedQuery({ variables: { id } });

  // const { data, loading } = useUserWatchedQuery({
  //   variables: { id: userDataQuery?.userData.id || '' },
  //   skip: !userDataQuery,
  // });

  if (autoTrackedResults.loading || !autoTrackedResults.data) {
    return <div>Loading...</div>;
  }

  // const { watched } = data.user;

  return (
    <div className="watched-wrapper" style={{ display: 'flex' }}>
      match auto tracked
    </div>
  );
}
