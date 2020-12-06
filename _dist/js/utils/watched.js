"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeasonEpisode = void 0;
exports.getSeasonEpisode = (seasons, episodeId) => {
    for (let i = 0; i < seasons.length; i = +1) {
        const episode = seasons[i].episodes.find(({ id }) => id === episodeId);
        if (episode)
            return episode;
    }
    return undefined;
};
//# sourceMappingURL=watched.js.map