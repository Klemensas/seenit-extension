import * as React from 'react';

import { useAddWatchedMutation, useTvQuery, useMovieQuery, ItemType } from '../graphql';
import WatchedMovieForm from './WatchedMovieForm';
import WatchedTvForm from './WatchedTvForm';

interface TypeParams {
  [ItemType.Movie]: [typeof useMovieQuery, typeof WatchedMovieForm];
  [ItemType.Tv]: [typeof useTvQuery, typeof WatchedTvForm];
  // [ItemType.Movie]: [typeof useMovieQuery, 'movie', typeof WatchedMovieForm];
  // [ItemType.Tv]: [typeof useTvQuery, 'tv', typeof WatchedTvForm];
}

const typeParams: TypeParams = {
  [ItemType.Movie]: [useMovieQuery, WatchedMovieForm],
  [ItemType.Tv]: [useTvQuery, WatchedTvForm],
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

  const query = type === ItemType.Movie ? useMovieQuery : useTvQuery;
  const { data, loading } = query({
    variables: { id },
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

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
