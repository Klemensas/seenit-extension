import { Season } from '../graphql';

export const getSeasonEpisode = (seasons: Season[], episodeId: string) => {
  for (let i = 0; i < seasons.length; i = +1) {
    const episode = seasons[i].episodes.find(({ id }) => id === episodeId);

    if (episode) return episode;
  }
};
