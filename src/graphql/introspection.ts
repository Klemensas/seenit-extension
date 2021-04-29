export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Item: ['Movie', 'Tv'],
    TvItem: ['Season', 'Episode'],
    AutoTrackedResult: ['AutoTracked', 'Watched'],
    TmdbMedia: ['TmdbMovie', 'TmdbTv'],
  },
};
export default result;
