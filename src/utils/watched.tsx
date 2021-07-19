import * as React from 'react';

import { EditableWatchedFragment, Season } from '../graphql';

export const getSeasonEpisode = (seasons: Season[], episodeId: string) => {
  for (let i = 0; i < seasons.length; i = +1) {
    const episode = seasons[i].episodes.find(({ id }) => id === episodeId);

    if (episode) return episode;
  }

  return undefined;
};

export const renderWatchedActionTitle = (
  prefix: React.ReactNode,
  item: EditableWatchedFragment['item'],
  tvItem: EditableWatchedFragment['tvItem'],
) => {
  const name = 'name' in item ? item.name : item.title;

  let tvMeta = '';
  if (tvItem) {
    tvMeta =
      'episode_number' in tvItem
        ? `S${tvItem.season.season_number}E${tvItem.episode_number}`
        : `S${tvItem.season_number}`;
  }

  return (
    <>
      {prefix}
      <strong>
        {' '}
        {tvMeta && <span>{tvMeta} </span>}
        <span>{name}</span>
      </strong>
    </>
  );
};
