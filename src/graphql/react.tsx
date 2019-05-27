export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export interface LocalAuth {
  user: User;
  token: Scalars['String'];
}

export interface Mutation {
  _?: Maybe<Scalars['Boolean']>;
  register: LocalAuth;
  login: LocalAuth;
  setIsLoggedIn: Scalars['Boolean'];
}

export interface MutationRegisterArgs {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface MutationLoginArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface MutationSetIsLoggedInArgs {
  isLoggedIn: Scalars['Boolean'];
}

export interface Query {
  _?: Maybe<Scalars['Boolean']>;
  allWatched?: Maybe<Watched[]>;
  watched?: Maybe<Watched>;
  users?: Maybe<User[]>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  searchContent?: Maybe<TmdbSearch>;
  isLoggedIn: Scalars['Boolean'];
}

export interface QueryWatchedArgs {
  id: Scalars['ID'];
}

export interface QueryUserArgs {
  id: Scalars['ID'];
}

export interface QuerySearchContentArgs {
  title: Scalars['String'];
}

export interface Subscription {
  _?: Maybe<Scalars['Boolean']>;
}

export type TmdbMedia = TmdbMovie | TmdbTv | TmdbPerson;

export enum TmdbMediaType {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
}

export interface TmdbMovie {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Maybe<Scalars['Int']>[]>;
  adult?: Maybe<Scalars['Boolean']>;
  release_date?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_count?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['Int']>;
  media_type?: Maybe<TmdbMediaType>;
}

export interface TmdbPerson {
  popularity?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profile_path?: Maybe<Scalars['String']>;
  adult?: Maybe<Scalars['String']>;
  known_for?: Maybe<TmdbMedia>;
  media_type?: Maybe<TmdbMediaType>;
}

export interface TmdbSearch {
  results?: Maybe<TmdbMedia[]>;
  page: Scalars['Int'];
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
}

export interface TmdbTv {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Maybe<Scalars['Int']>[]>;
  backdrop_path?: Maybe<Scalars['String']>;
  first_air_date?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Maybe<Scalars['String']>[]>;
  vote_count?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['Int']>;
  media_type?: Maybe<TmdbMediaType>;
}

export interface User {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  watched?: Maybe<Watched[]>;
}

export interface Watched {
  id: Scalars['ID'];
  tmdbId: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  user: User;
  userId: Scalars['ID'];
}
