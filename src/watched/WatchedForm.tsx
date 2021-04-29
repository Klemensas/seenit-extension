import { Spinner } from '@blueprintjs/core';
import * as React from 'react';

import { useAddWatchedMutation, useTvQuery, useMovieQuery, ItemType, EditableWatchedFragment } from '../graphql';
import WatchedMovieForm from './WatchedMovieForm';
import WatchedTvForm from './WatchedTvForm';

interface WatchedFormProps {
  id: string;
  type: ItemType;
  season?: number;
  episode?: number;
  onSave?: (watched: EditableWatchedFragment) => void;
}

const WatchedForm = ({ id, type, season, episode, onSave }: WatchedFormProps) => {
  const [addWatched, { loading: loadingWatched }] = useAddWatchedMutation({
    onCompleted: (data) => onSave?.(data.addWatched),
  });

  const query = type === ItemType.Movie ? useMovieQuery : useTvQuery;
  const { data, loading } = query({
    variables: { id },
  });

  // TODO: need to handle errors here, both mutation and fetching.
  if (loading || !data) return <Spinner />;

  const partialProps = {
    season,
    episode,
    onSubmit: addWatched,
    isLoading: loadingWatched,
  };

  if ('movie' in data) return <WatchedMovieForm {...partialProps} item={data.movie} />;

  return <WatchedTvForm {...partialProps} item={data.tv} />;
};

export default WatchedForm;
