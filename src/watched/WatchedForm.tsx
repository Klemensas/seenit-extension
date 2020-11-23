import * as React from 'react';

import { useAddWatchedMutation, useTvQuery, useMovieQuery, ItemType } from '../graphql';
import WatchedMovieForm from './WatchedMovieForm';
import WatchedTvForm from './WatchedTvForm';

interface TypeParams {
  [ItemType.Movie]: [typeof useMovieQuery, string, typeof WatchedMovieForm];
  [ItemType.Tv]: [typeof useTvQuery, string, typeof WatchedTvForm];
}

const typeParams: TypeParams = {
  [ItemType.Movie]: [useMovieQuery, 'movie', WatchedMovieForm],
  [ItemType.Tv]: [useTvQuery, 'tv', WatchedTvForm],
};

const WatchedForm: React.FC<{
  id: string;
  type: ItemType;
  season?: number;
  episode?: number;
  onSave?: () => void;
}> = ({ id, type, season, episode, onSave }) => {
  const [addWatched, { loading: loadingWatched, data: mutationResult }] = useAddWatchedMutation();

  if (mutationResult && onSave) {
    onSave();
  }

  const [query, param, Form] = typeParams[type];
  const { data, loading } = query({
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const item = data[param];

  const props = {
    season,
    episode,
    item,
    onSubmit: addWatched,
    isLoading: loadingWatched,
  };

  return <Form {...props} />;
};

export default WatchedForm;
