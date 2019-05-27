export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type LocalAuth = {
  user: User;
  token: Scalars["String"];
};

export type Mutation = {
  _?: Maybe<Scalars["Boolean"]>;
  register: LocalAuth;
  login: LocalAuth;
  setIsLoggedIn: Scalars["Boolean"];
};

export type MutationRegisterArgs = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSetIsLoggedInArgs = {
  isLoggedIn: Scalars["Boolean"];
};

export type Query = {
  _?: Maybe<Scalars["Boolean"]>;
  allWatched?: Maybe<Array<Watched>>;
  watched?: Maybe<Watched>;
  users?: Maybe<Array<User>>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  searchContent?: Maybe<TmdbSearch>;
  isLoggedIn: Scalars["Boolean"];
};

export type QueryWatchedArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QuerySearchContentArgs = {
  title: Scalars["String"];
};

export type Subscription = {
  _?: Maybe<Scalars["Boolean"]>;
};

export type TmdbMedia = TmdbMovie | TmdbTv | TmdbPerson;

export enum TmdbMediaType {
  Movie = "movie",
  Tv = "tv",
  Person = "person"
}

export type TmdbMovie = {
  id?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
  overview?: Maybe<Scalars["String"]>;
  original_title?: Maybe<Scalars["String"]>;
  original_language?: Maybe<Scalars["String"]>;
  poster_path?: Maybe<Scalars["String"]>;
  genre_ids?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  adult?: Maybe<Scalars["Boolean"]>;
  release_date?: Maybe<Scalars["String"]>;
  backdrop_path?: Maybe<Scalars["String"]>;
  video?: Maybe<Scalars["Boolean"]>;
  vote_count?: Maybe<Scalars["Int"]>;
  vote_average?: Maybe<Scalars["Float"]>;
  popularity?: Maybe<Scalars["Int"]>;
  media_type?: Maybe<TmdbMediaType>;
};

export type TmdbPerson = {
  popularity?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["Int"]>;
  vote_average?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  profile_path?: Maybe<Scalars["String"]>;
  adult?: Maybe<Scalars["String"]>;
  known_for?: Maybe<TmdbMedia>;
  media_type?: Maybe<TmdbMediaType>;
};

export type TmdbSearch = {
  results?: Maybe<Array<TmdbMedia>>;
  page: Scalars["Int"];
  total_pages: Scalars["Int"];
  total_results: Scalars["Int"];
};

export type TmdbTv = {
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  overview?: Maybe<Scalars["String"]>;
  original_name?: Maybe<Scalars["String"]>;
  original_language?: Maybe<Scalars["String"]>;
  poster_path?: Maybe<Scalars["String"]>;
  genre_ids?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  backdrop_path?: Maybe<Scalars["String"]>;
  first_air_date?: Maybe<Scalars["String"]>;
  origin_country?: Maybe<Array<Maybe<Scalars["String"]>>>;
  vote_count?: Maybe<Scalars["Int"]>;
  vote_average?: Maybe<Scalars["Float"]>;
  popularity?: Maybe<Scalars["Int"]>;
  media_type?: Maybe<TmdbMediaType>;
};

export type User = {
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["Float"];
  updatedAt: Scalars["Float"];
  watched?: Maybe<Array<Watched>>;
};

export type Watched = {
  id: Scalars["ID"];
  tmdbId: Scalars["ID"];
  createdAt: Scalars["Float"];
  updatedAt: Scalars["Float"];
  user: User;
  userId: Scalars["ID"];
};
