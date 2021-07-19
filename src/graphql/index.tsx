import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  autoTracked: AutoTracked;
  autoTrackedList: AutoTrackedCursor;
  episode: Episode;
  me: User;
  movie: Movie;
  reviews: ReviewCursor;
  searchContent: Array<SearchItem>;
  season: Season;
  seasons: Array<Season>;
  settings: Settings;
  tv: Tv;
  user: User;
  userData: User;
  users?: Maybe<Array<User>>;
  watched: Watched;
  watches: WatchedCursor;
};

export type QueryAutoTrackedArgs = {
  id: Scalars['ID'];
};

export type QueryAutoTrackedListArgs = {
  userId: Scalars['ID'];
  cursor?: Maybe<Scalars['String']>;
};

export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryMovieArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryReviewsArgs = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type QuerySearchContentArgs = {
  title: Scalars['String'];
};

export type QuerySeasonArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QuerySeasonsArgs = {
  itemId: Scalars['ID'];
};

export type QueryTvArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type QueryWatchedArgs = {
  id: Scalars['ID'];
};

export type QueryWatchesArgs = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  adult: Scalars['Boolean'];
  backdrop_path?: Maybe<Scalars['String']>;
  belongs_to_collection?: Maybe<Collection>;
  budget: Scalars['Int'];
  genre?: Maybe<Array<Maybe<Genre>>>;
  homepage?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview: Scalars['String'];
  popularity?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Array<Maybe<Company>>>;
  production_countries?: Maybe<Array<Maybe<Country>>>;
  release_date?: Maybe<Scalars['String']>;
  revenue?: Maybe<Scalars['Int']>;
  runtime?: Maybe<Scalars['Int']>;
  spoken_languages?: Maybe<Array<Maybe<Language>>>;
  status?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  video?: Maybe<Scalars['Boolean']>;
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
  tmdbId?: Maybe<Scalars['Int']>;
  watched: WatchedCursor;
};

export type MovieWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};

export type Collection = {
  __typename?: 'Collection';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
};

export type Genre = {
  __typename?: 'Genre';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  iso_3166_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Language = {
  __typename?: 'Language';
  iso_639_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type WatchedCursor = {
  __typename?: 'WatchedCursor';
  watched: Array<Watched>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type Watched = {
  __typename?: 'Watched';
  id: Scalars['ID'];
  tmdbId: Scalars['Int'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  userId: Scalars['ID'];
  user: User;
  itemType: ItemType;
  item: Item;
  rating?: Maybe<Rating>;
  review?: Maybe<Review>;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  watched: WatchedCursor;
  settings: Settings;
};

export type UserWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  general: GeneralSettings;
  extension: ExtensionSettings;
  user: User;
};

export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  autoConvert: Scalars['Boolean'];
};

export type ExtensionSettings = {
  __typename?: 'ExtensionSettings';
  autoTrack: Scalars['Boolean'];
  minLengthSeconds: Scalars['Int'];
  blacklist: Array<Scalars['String']>;
};

export enum ItemType {
  Movie = 'Movie',
  Tv = 'Tv',
}

export type Item = Movie | Tv;

export type Tv = {
  __typename?: 'Tv';
  id: Scalars['ID'];
  backdrop_path?: Maybe<Scalars['String']>;
  created_by?: Maybe<Array<Maybe<Author>>>;
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']>>>;
  first_air_date?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage: Scalars['String'];
  in_production?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  last_air_date: Scalars['String'];
  last_episode_to_air?: Maybe<Episode>;
  name: Scalars['String'];
  next_episode_to_air?: Maybe<Episode>;
  networks?: Maybe<Array<Maybe<Network>>>;
  number_of_episodes: Scalars['Int'];
  number_of_seasons: Scalars['Int'];
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language: Scalars['String'];
  original_name: Scalars['String'];
  overview: Scalars['String'];
  popularity: Scalars['Int'];
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Array<Maybe<Company>>>;
  seasons: Array<Season>;
  status: Scalars['String'];
  type: Scalars['String'];
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
  tmdbId?: Maybe<Scalars['Int']>;
  watched: WatchedCursor;
};

export type TvWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'Author';
  id?: Maybe<Scalars['Int']>;
  credit_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  profile_path?: Maybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  id: Scalars['ID'];
  name: Scalars['String'];
  overview: Scalars['String'];
  episode_number: Scalars['Int'];
  air_date?: Maybe<Scalars['String']>;
  production_code?: Maybe<Scalars['String']>;
  still_path?: Maybe<Scalars['String']>;
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
  tmdbId: Scalars['Int'];
  seasonId: Scalars['ID'];
  season: Season;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  name: Scalars['String'];
  overview: Scalars['String'];
  air_date?: Maybe<Scalars['String']>;
  episode_count: Scalars['Int'];
  poster_path?: Maybe<Scalars['String']>;
  season_number: Scalars['Int'];
  tmdbId: Scalars['Int'];
  tvId: Scalars['ID'];
  tv: Tv;
  episodes: Array<Episode>;
};

export type Network = {
  __typename?: 'Network';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  value: Scalars['Float'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  user?: Maybe<User>;
  watched?: Maybe<Watched>;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
};

export enum TvItemType {
  Season = 'Season',
  Episode = 'Episode',
}

export type TvItem = Season | Episode;

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  body: Scalars['String'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  user: User;
  watched: Watched;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
};

export type SearchItem = {
  __typename?: 'SearchItem';
  id: Scalars['String'];
  tmdbId: Scalars['Int'];
  title: Scalars['String'];
  release_date?: Maybe<Scalars['String']>;
  type: ItemType;
};

export type ReviewCursor = {
  __typename?: 'ReviewCursor';
  reviews: Array<Review>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type AutoTrackedCursor = {
  __typename?: 'AutoTrackedCursor';
  autoTracked: Array<AutoTracked>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type AutoTracked = {
  __typename?: 'AutoTracked';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  user: User;
  itemType?: Maybe<ItemType>;
  item?: Maybe<Item>;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
  meta: AutoTrackedMeta;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type AutoTrackedMeta = {
  __typename?: 'AutoTrackedMeta';
  title?: Maybe<Scalars['String']>;
  tvData?: Maybe<AutoTrackedMetaTvData>;
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type AutoTrackedMetaTvData = {
  __typename?: 'AutoTrackedMetaTvData';
  season?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addAutoTracked: AutoTrackedResult;
  addToExtensionBlacklist: Settings;
  addWatched: Watched;
  convertAutoTracked: ConvertedAutoTracked;
  editWatched: Watched;
  login: LocalAuth;
  logout: Scalars['Boolean'];
  register: LocalAuth;
  removeAutoTracked: Array<Scalars['ID']>;
  removeWatched: Scalars['ID'];
  setUserData: User;
  updateSettings: Settings;
};

export type MutationAddAutoTrackedArgs = {
  meta: AutoTrackedMetaInput;
  createdAt: Scalars['Float'];
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type MutationAddToExtensionBlacklistArgs = {
  blacklistItem: Scalars['String'];
};

export type MutationAddWatchedArgs = {
  itemId: Scalars['ID'];
  itemType: ItemType;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  createdAt?: Maybe<Scalars['Float']>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  autoTrackedId?: Maybe<Scalars['ID']>;
};

export type MutationConvertAutoTrackedArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationEditWatchedArgs = {
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRemoveAutoTrackedArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationRemoveWatchedArgs = {
  itemId: Scalars['ID'];
};

export type MutationSetUserDataArgs = {
  userData: UserInput;
};

export type MutationUpdateSettingsArgs = {
  general: GeneralSettingsInput;
  extension: ExtensionSettingsInput;
};

export type RatingInput = {
  id?: Maybe<Scalars['ID']>;
  value: Scalars['Float'];
};

export type ReviewInput = {
  id?: Maybe<Scalars['ID']>;
  body: Scalars['String'];
};

export type LocalAuth = {
  __typename?: 'LocalAuth';
  user: User;
  token: Scalars['String'];
};

export type AutoTrackedMetaInput = {
  title?: Maybe<Scalars['String']>;
  tvData?: Maybe<TvDataInput>;
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type TvDataInput = {
  season?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export type AutoTrackedResult = AutoTracked | Watched;

export type ConvertedAutoTracked = {
  __typename?: 'ConvertedAutoTracked';
  removedIds: Array<Scalars['ID']>;
  watched: Array<Watched>;
};

export type GeneralSettingsInput = {
  autoConvert: Scalars['Boolean'];
};

export type ExtensionSettingsInput = {
  autoTrack: Scalars['Boolean'];
  minLengthSeconds: Scalars['Int'];
  blacklist: Array<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type TmdbMovie = {
  __typename?: 'TmdbMovie';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  adult?: Maybe<Scalars['Boolean']>;
  release_date?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_count?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['Int']>;
  media_type?: Maybe<TmdbMediaType>;
};

export enum TmdbMediaType {
  Movie = 'Movie',
  Tv = 'Tv',
}

export type TmdbTv = {
  __typename?: 'TmdbTv';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  backdrop_path?: Maybe<Scalars['String']>;
  first_air_date?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  vote_count?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['Int']>;
  media_type?: Maybe<TmdbMediaType>;
};

export type TmdbPerson = {
  __typename?: 'TmdbPerson';
  popularity?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profile_path?: Maybe<Scalars['String']>;
  adult?: Maybe<Scalars['String']>;
  known_for?: Maybe<TmdbMedia>;
  media_type?: Maybe<TmdbMediaType>;
};

export type TmdbMedia = TmdbMovie | TmdbTv;

export type Search = {
  __typename?: 'Search';
  results?: Maybe<Array<TmdbMedia>>;
  page: Scalars['Int'];
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type UserInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'> & {
          settings: { __typename?: 'Settings' } & {
            general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
            extension: { __typename?: 'ExtensionSettings' } & Pick<
              ExtensionSettings,
              'autoTrack' | 'minLengthSeconds' | 'blacklist'
            >;
          };
        };
    };
};

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'> & {
          settings: { __typename?: 'Settings' } & {
            general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
            extension: { __typename?: 'ExtensionSettings' } & Pick<
              ExtensionSettings,
              'autoTrack' | 'minLengthSeconds' | 'blacklist'
            >;
          };
        };
    };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export type SetUserDataMutationVariables = Exact<{
  userData: UserInput;
}>;

export type SetUserDataMutation = { __typename?: 'Mutation' } & {
  setUserData: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;
};

export type AddWatchedMutationVariables = Exact<{
  itemId: Scalars['ID'];
  itemType: ItemType;
  createdAt: Scalars['Float'];
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
}>;

export type AddWatchedMutation = { __typename?: 'Mutation' } & {
  addWatched: { __typename?: 'Watched' } & EditableWatchedFragment;
};

type ItemData_Movie_Fragment = { __typename?: 'Movie' } & Pick<Movie, 'id' | 'title'>;

type ItemData_Tv_Fragment = { __typename?: 'Tv' } & Pick<Tv, 'id' | 'name'>;

export type ItemDataFragment = ItemData_Movie_Fragment | ItemData_Tv_Fragment;

type TvItemData_Season_Fragment = { __typename?: 'Season' } & Pick<Season, 'season_number'>;

type TvItemData_Episode_Fragment = { __typename?: 'Episode' } & Pick<Episode, 'episode_number'> & {
    season: { __typename?: 'Season' } & Pick<Season, 'season_number'>;
  };

export type TvItemDataFragment = TvItemData_Season_Fragment | TvItemData_Episode_Fragment;

export type EditableWatchedFragment = { __typename?: 'Watched' } & Pick<Watched, 'id' | 'itemType' | 'createdAt'> & {
    tvItem?: Maybe<
      | ({ __typename?: 'Season' } & TvItemData_Season_Fragment)
      | ({ __typename?: 'Episode' } & TvItemData_Episode_Fragment)
    >;
    item: ({ __typename?: 'Movie' } & ItemData_Movie_Fragment) | ({ __typename?: 'Tv' } & ItemData_Tv_Fragment);
    rating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
    review?: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
  };

export type AddAutoTrackedMutationVariables = Exact<{
  meta: AutoTrackedMetaInput;
  createdAt: Scalars['Float'];
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
}>;

export type AddAutoTrackedMutation = { __typename?: 'Mutation' } & {
  autoTracked:
    | ({ __typename?: 'AutoTracked' } & Pick<AutoTracked, 'id'> & {
          tvItem?: Maybe<
            | ({ __typename?: 'Season' } & TvItemData_Season_Fragment)
            | ({ __typename?: 'Episode' } & TvItemData_Episode_Fragment)
          >;
          trackedItem?: Maybe<
            ({ __typename?: 'Movie' } & ItemData_Movie_Fragment) | ({ __typename?: 'Tv' } & ItemData_Tv_Fragment)
          >;
        })
    | ({ __typename?: 'Watched' } & EditableWatchedFragment);
};

export type ManagedSettingsFragment = { __typename?: 'Settings' } & {
  general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
  extension: { __typename?: 'ExtensionSettings' } & Pick<
    ExtensionSettings,
    'autoTrack' | 'minLengthSeconds' | 'blacklist'
  >;
};

export type UpdateSettingsMutationVariables = Exact<{
  general: GeneralSettingsInput;
  extension: ExtensionSettingsInput;
}>;

export type UpdateSettingsMutation = { __typename?: 'Mutation' } & {
  updateSettings: { __typename?: 'Settings' } & ManagedSettingsFragment;
};

export type AddToExtensionBlacklistMutationVariables = Exact<{
  blacklistItem: Scalars['String'];
}>;

export type AddToExtensionBlacklistMutation = { __typename?: 'Mutation' } & {
  addToExtensionBlacklist: { __typename?: 'Settings' } & ManagedSettingsFragment;
};

export type ConvertAutoTrackedMutationVariables = Exact<{
  ids: Array<Scalars['ID']>;
}>;

export type ConvertAutoTrackedMutation = { __typename?: 'Mutation' } & {
  convertAutoTracked: { __typename?: 'ConvertedAutoTracked' } & Pick<ConvertedAutoTracked, 'removedIds'> & {
      watched: Array<{ __typename?: 'Watched' } & EditableWatchedFragment>;
    };
};

export type RemoveAutoTrackedMutationVariables = Exact<{
  ids: Array<Scalars['ID']>;
}>;

export type RemoveAutoTrackedMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeAutoTracked'>;

export type RemoveWatchedMutationVariables = Exact<{
  itemId: Scalars['ID'];
}>;

export type RemoveWatchedMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeWatched'>;

export type UserWatchedQueryVariables = Exact<{
  id: Scalars['ID'];
  cursor?: Maybe<Scalars['String']>;
}>;

export type UserWatchedQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & Pick<User, 'id' | 'name'> & {
      watched: { __typename?: 'WatchedCursor' } & Pick<WatchedCursor, 'cursor' | 'hasMore'> & {
          watched: Array<
            { __typename?: 'Watched' } & Pick<Watched, 'id' | 'tmdbId' | 'createdAt' | 'itemType'> & {
                rating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
                review?: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
                item:
                  | ({ __typename?: 'Movie' } & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path'>)
                  | ({ __typename?: 'Tv' } & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path'>);
              }
          >;
        };
    };
};

export type UserDataQueryVariables = Exact<{ [key: string]: never }>;

export type UserDataQuery = { __typename?: 'Query' } & {
  userData: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt'> & {
      settings: { __typename?: 'Settings' } & {
        general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
        extension: { __typename?: 'ExtensionSettings' } & Pick<
          ExtensionSettings,
          'autoTrack' | 'minLengthSeconds' | 'blacklist'
        >;
      };
    };
};

export type SearchContentQueryVariables = Exact<{
  title: Scalars['String'];
}>;

export type SearchContentQuery = { __typename?: 'Query' } & {
  searchContent: Array<
    { __typename?: 'SearchItem' } & Pick<SearchItem, 'id' | 'tmdbId' | 'title' | 'release_date' | 'type'>
  >;
};

export type TvQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TvQuery = { __typename?: 'Query' } & {
  tv: { __typename?: 'Tv' } & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path'> & {
      seasons: Array<
        { __typename?: 'Season' } & Pick<Season, 'id' | 'name' | 'season_number' | 'episode_count'> & {
            episodes: Array<{ __typename?: 'Episode' } & Pick<Episode, 'id' | 'name' | 'episode_number'>>;
          }
      >;
    };
};

export type MovieQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type MovieQuery = { __typename?: 'Query' } & {
  movie: { __typename?: 'Movie' } & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path'>;
};

export type SettingsQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsQuery = { __typename?: 'Query' } & {
  settings: { __typename?: 'Settings' } & ManagedSettingsFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt'> & {
      settings: { __typename?: 'Settings' } & {
        general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
        extension: { __typename?: 'ExtensionSettings' } & Pick<
          ExtensionSettings,
          'autoTrack' | 'minLengthSeconds' | 'blacklist'
        >;
      };
    };
};

export type AutoTrackedQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AutoTrackedQuery = { __typename?: 'Query' } & {
  autoTracked: { __typename?: 'AutoTracked' } & Pick<AutoTracked, 'id'> & {
      tvItem?: Maybe<
        | ({ __typename?: 'Season' } & Pick<Season, 'season_number'>)
        | ({ __typename?: 'Episode' } & Pick<Episode, 'episode_number'> & {
              season: { __typename?: 'Season' } & Pick<Season, 'season_number'>;
            })
      >;
      item?: Maybe<
        ({ __typename?: 'Movie' } & Pick<Movie, 'id' | 'title'>) | ({ __typename?: 'Tv' } & Pick<Tv, 'id' | 'name'>)
      >;
    };
};

export const TvItemDataFragmentDoc = gql`
  fragment TvItemData on TvItem {
    ... on Season {
      season_number
    }
    ... on Episode {
      episode_number
      season {
        season_number
      }
    }
  }
`;
export const ItemDataFragmentDoc = gql`
  fragment ItemData on Item {
    ... on Movie {
      id
      title
    }
    ... on Tv {
      id
      name
    }
  }
`;
export const EditableWatchedFragmentDoc = gql`
  fragment EditableWatched on Watched {
    id
    itemType
    createdAt
    tvItem {
      ...TvItemData
    }
    item {
      ...ItemData
    }
    rating {
      value
    }
    review {
      body
    }
  }
  ${TvItemDataFragmentDoc}
  ${ItemDataFragmentDoc}
`;
export const ManagedSettingsFragmentDoc = gql`
  fragment ManagedSettings on Settings {
    general {
      autoConvert
    }
    extension {
      autoTrack
      minLengthSeconds
      blacklist
    }
  }
`;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        createdAt
        updatedAt
        settings {
          general {
            autoConvert
          }
          extension {
            autoTrack
            minLengthSeconds
            blacklist
          }
        }
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
);

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
        createdAt
        updatedAt
        settings {
          general {
            autoConvert
          }
          extension {
            autoTrack
            minLengthSeconds
            blacklist
          }
        }
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>,
  'mutation'
>;

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
);

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LogoutDocument = gql`
  mutation Logout {
    logout @client
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>,
  'mutation'
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
);

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SetUserDataDocument = gql`
  mutation SetUserData($userData: UserInput!) {
    setUserData(userData: $userData) @client {
      id
      name
      email
      createdAt
    }
  }
`;
export type SetUserDataMutationFn = Apollo.MutationFunction<SetUserDataMutation, SetUserDataMutationVariables>;
export type SetUserDataComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<SetUserDataMutation, SetUserDataMutationVariables>,
  'mutation'
>;

export const SetUserDataComponent = (props: SetUserDataComponentProps) => (
  <ApolloReactComponents.Mutation<SetUserDataMutation, SetUserDataMutationVariables>
    mutation={SetUserDataDocument}
    {...props}
  />
);

/**
 * __useSetUserDataMutation__
 *
 * To run a mutation, you first call `useSetUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserDataMutation, { data, loading, error }] = useSetUserDataMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useSetUserDataMutation(
  baseOptions?: Apollo.MutationHookOptions<SetUserDataMutation, SetUserDataMutationVariables>,
) {
  return Apollo.useMutation<SetUserDataMutation, SetUserDataMutationVariables>(SetUserDataDocument, baseOptions);
}
export type SetUserDataMutationHookResult = ReturnType<typeof useSetUserDataMutation>;
export type SetUserDataMutationResult = Apollo.MutationResult<SetUserDataMutation>;
export type SetUserDataMutationOptions = Apollo.BaseMutationOptions<SetUserDataMutation, SetUserDataMutationVariables>;
export const AddWatchedDocument = gql`
  mutation AddWatched(
    $itemId: ID!
    $itemType: ItemType!
    $createdAt: Float!
    $rating: RatingInput
    $review: ReviewInput
    $tvItemId: ID
    $tvItemType: TvItemType
  ) {
    addWatched(
      itemId: $itemId
      itemType: $itemType
      createdAt: $createdAt
      rating: $rating
      review: $review
      tvItemId: $tvItemId
      tvItemType: $tvItemType
    ) {
      ...EditableWatched
    }
  }
  ${EditableWatchedFragmentDoc}
`;
export type AddWatchedMutationFn = Apollo.MutationFunction<AddWatchedMutation, AddWatchedMutationVariables>;
export type AddWatchedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<AddWatchedMutation, AddWatchedMutationVariables>,
  'mutation'
>;

export const AddWatchedComponent = (props: AddWatchedComponentProps) => (
  <ApolloReactComponents.Mutation<AddWatchedMutation, AddWatchedMutationVariables>
    mutation={AddWatchedDocument}
    {...props}
  />
);

/**
 * __useAddWatchedMutation__
 *
 * To run a mutation, you first call `useAddWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWatchedMutation, { data, loading, error }] = useAddWatchedMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *      createdAt: // value for 'createdAt'
 *      rating: // value for 'rating'
 *      review: // value for 'review'
 *      tvItemId: // value for 'tvItemId'
 *      tvItemType: // value for 'tvItemType'
 *   },
 * });
 */
export function useAddWatchedMutation(
  baseOptions?: Apollo.MutationHookOptions<AddWatchedMutation, AddWatchedMutationVariables>,
) {
  return Apollo.useMutation<AddWatchedMutation, AddWatchedMutationVariables>(AddWatchedDocument, baseOptions);
}
export type AddWatchedMutationHookResult = ReturnType<typeof useAddWatchedMutation>;
export type AddWatchedMutationResult = Apollo.MutationResult<AddWatchedMutation>;
export type AddWatchedMutationOptions = Apollo.BaseMutationOptions<AddWatchedMutation, AddWatchedMutationVariables>;
export const AddAutoTrackedDocument = gql`
  mutation AddAutoTracked(
    $meta: AutoTrackedMetaInput!
    $createdAt: Float!
    $itemId: ID
    $itemType: ItemType
    $tvItemId: ID
    $tvItemType: TvItemType
  ) {
    autoTracked: addAutoTracked(
      meta: $meta
      createdAt: $createdAt
      itemId: $itemId
      itemType: $itemType
      tvItemId: $tvItemId
      tvItemType: $tvItemType
    ) {
      ... on AutoTracked {
        id
        tvItem {
          ...TvItemData
        }
        trackedItem: item {
          ...ItemData
        }
      }
      ... on Watched {
        ...EditableWatched
      }
    }
  }
  ${TvItemDataFragmentDoc}
  ${ItemDataFragmentDoc}
  ${EditableWatchedFragmentDoc}
`;
export type AddAutoTrackedMutationFn = Apollo.MutationFunction<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>;
export type AddAutoTrackedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>,
  'mutation'
>;

export const AddAutoTrackedComponent = (props: AddAutoTrackedComponentProps) => (
  <ApolloReactComponents.Mutation<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>
    mutation={AddAutoTrackedDocument}
    {...props}
  />
);

/**
 * __useAddAutoTrackedMutation__
 *
 * To run a mutation, you first call `useAddAutoTrackedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAutoTrackedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAutoTrackedMutation, { data, loading, error }] = useAddAutoTrackedMutation({
 *   variables: {
 *      meta: // value for 'meta'
 *      createdAt: // value for 'createdAt'
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *      tvItemId: // value for 'tvItemId'
 *      tvItemType: // value for 'tvItemType'
 *   },
 * });
 */
export function useAddAutoTrackedMutation(
  baseOptions?: Apollo.MutationHookOptions<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>,
) {
  return Apollo.useMutation<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>(
    AddAutoTrackedDocument,
    baseOptions,
  );
}
export type AddAutoTrackedMutationHookResult = ReturnType<typeof useAddAutoTrackedMutation>;
export type AddAutoTrackedMutationResult = Apollo.MutationResult<AddAutoTrackedMutation>;
export type AddAutoTrackedMutationOptions = Apollo.BaseMutationOptions<
  AddAutoTrackedMutation,
  AddAutoTrackedMutationVariables
>;
export const UpdateSettingsDocument = gql`
  mutation UpdateSettings($general: GeneralSettingsInput!, $extension: ExtensionSettingsInput!) {
    updateSettings(general: $general, extension: $extension) {
      ...ManagedSettings
    }
  }
  ${ManagedSettingsFragmentDoc}
`;
export type UpdateSettingsMutationFn = Apollo.MutationFunction<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export type UpdateSettingsComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>,
  'mutation'
>;

export const UpdateSettingsComponent = (props: UpdateSettingsComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>
    mutation={UpdateSettingsDocument}
    {...props}
  />
);

/**
 * __useUpdateSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingsMutation, { data, loading, error }] = useUpdateSettingsMutation({
 *   variables: {
 *      general: // value for 'general'
 *      extension: // value for 'extension'
 *   },
 * });
 */
export function useUpdateSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>,
) {
  return Apollo.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
    UpdateSettingsDocument,
    baseOptions,
  );
}
export type UpdateSettingsMutationHookResult = ReturnType<typeof useUpdateSettingsMutation>;
export type UpdateSettingsMutationResult = Apollo.MutationResult<UpdateSettingsMutation>;
export type UpdateSettingsMutationOptions = Apollo.BaseMutationOptions<
  UpdateSettingsMutation,
  UpdateSettingsMutationVariables
>;
export const AddToExtensionBlacklistDocument = gql`
  mutation AddToExtensionBlacklist($blacklistItem: String!) {
    addToExtensionBlacklist(blacklistItem: $blacklistItem) {
      ...ManagedSettings
    }
  }
  ${ManagedSettingsFragmentDoc}
`;
export type AddToExtensionBlacklistMutationFn = Apollo.MutationFunction<
  AddToExtensionBlacklistMutation,
  AddToExtensionBlacklistMutationVariables
>;
export type AddToExtensionBlacklistComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddToExtensionBlacklistMutation,
    AddToExtensionBlacklistMutationVariables
  >,
  'mutation'
>;

export const AddToExtensionBlacklistComponent = (props: AddToExtensionBlacklistComponentProps) => (
  <ApolloReactComponents.Mutation<AddToExtensionBlacklistMutation, AddToExtensionBlacklistMutationVariables>
    mutation={AddToExtensionBlacklistDocument}
    {...props}
  />
);

/**
 * __useAddToExtensionBlacklistMutation__
 *
 * To run a mutation, you first call `useAddToExtensionBlacklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToExtensionBlacklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToExtensionBlacklistMutation, { data, loading, error }] = useAddToExtensionBlacklistMutation({
 *   variables: {
 *      blacklistItem: // value for 'blacklistItem'
 *   },
 * });
 */
export function useAddToExtensionBlacklistMutation(
  baseOptions?: Apollo.MutationHookOptions<AddToExtensionBlacklistMutation, AddToExtensionBlacklistMutationVariables>,
) {
  return Apollo.useMutation<AddToExtensionBlacklistMutation, AddToExtensionBlacklistMutationVariables>(
    AddToExtensionBlacklistDocument,
    baseOptions,
  );
}
export type AddToExtensionBlacklistMutationHookResult = ReturnType<typeof useAddToExtensionBlacklistMutation>;
export type AddToExtensionBlacklistMutationResult = Apollo.MutationResult<AddToExtensionBlacklistMutation>;
export type AddToExtensionBlacklistMutationOptions = Apollo.BaseMutationOptions<
  AddToExtensionBlacklistMutation,
  AddToExtensionBlacklistMutationVariables
>;
export const ConvertAutoTrackedDocument = gql`
  mutation ConvertAutoTracked($ids: [ID!]!) {
    convertAutoTracked(ids: $ids) {
      removedIds
      watched {
        ...EditableWatched
      }
    }
  }
  ${EditableWatchedFragmentDoc}
`;
export type ConvertAutoTrackedMutationFn = Apollo.MutationFunction<
  ConvertAutoTrackedMutation,
  ConvertAutoTrackedMutationVariables
>;
export type ConvertAutoTrackedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<ConvertAutoTrackedMutation, ConvertAutoTrackedMutationVariables>,
  'mutation'
>;

export const ConvertAutoTrackedComponent = (props: ConvertAutoTrackedComponentProps) => (
  <ApolloReactComponents.Mutation<ConvertAutoTrackedMutation, ConvertAutoTrackedMutationVariables>
    mutation={ConvertAutoTrackedDocument}
    {...props}
  />
);

/**
 * __useConvertAutoTrackedMutation__
 *
 * To run a mutation, you first call `useConvertAutoTrackedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertAutoTrackedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertAutoTrackedMutation, { data, loading, error }] = useConvertAutoTrackedMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useConvertAutoTrackedMutation(
  baseOptions?: Apollo.MutationHookOptions<ConvertAutoTrackedMutation, ConvertAutoTrackedMutationVariables>,
) {
  return Apollo.useMutation<ConvertAutoTrackedMutation, ConvertAutoTrackedMutationVariables>(
    ConvertAutoTrackedDocument,
    baseOptions,
  );
}
export type ConvertAutoTrackedMutationHookResult = ReturnType<typeof useConvertAutoTrackedMutation>;
export type ConvertAutoTrackedMutationResult = Apollo.MutationResult<ConvertAutoTrackedMutation>;
export type ConvertAutoTrackedMutationOptions = Apollo.BaseMutationOptions<
  ConvertAutoTrackedMutation,
  ConvertAutoTrackedMutationVariables
>;
export const RemoveAutoTrackedDocument = gql`
  mutation RemoveAutoTracked($ids: [ID!]!) {
    removeAutoTracked(ids: $ids)
  }
`;
export type RemoveAutoTrackedMutationFn = Apollo.MutationFunction<
  RemoveAutoTrackedMutation,
  RemoveAutoTrackedMutationVariables
>;
export type RemoveAutoTrackedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveAutoTrackedMutation, RemoveAutoTrackedMutationVariables>,
  'mutation'
>;

export const RemoveAutoTrackedComponent = (props: RemoveAutoTrackedComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveAutoTrackedMutation, RemoveAutoTrackedMutationVariables>
    mutation={RemoveAutoTrackedDocument}
    {...props}
  />
);

/**
 * __useRemoveAutoTrackedMutation__
 *
 * To run a mutation, you first call `useRemoveAutoTrackedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAutoTrackedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAutoTrackedMutation, { data, loading, error }] = useRemoveAutoTrackedMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveAutoTrackedMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAutoTrackedMutation, RemoveAutoTrackedMutationVariables>,
) {
  return Apollo.useMutation<RemoveAutoTrackedMutation, RemoveAutoTrackedMutationVariables>(
    RemoveAutoTrackedDocument,
    baseOptions,
  );
}
export type RemoveAutoTrackedMutationHookResult = ReturnType<typeof useRemoveAutoTrackedMutation>;
export type RemoveAutoTrackedMutationResult = Apollo.MutationResult<RemoveAutoTrackedMutation>;
export type RemoveAutoTrackedMutationOptions = Apollo.BaseMutationOptions<
  RemoveAutoTrackedMutation,
  RemoveAutoTrackedMutationVariables
>;
export const RemoveWatchedDocument = gql`
  mutation RemoveWatched($itemId: ID!) {
    removeWatched(itemId: $itemId)
  }
`;
export type RemoveWatchedMutationFn = Apollo.MutationFunction<RemoveWatchedMutation, RemoveWatchedMutationVariables>;
export type RemoveWatchedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveWatchedMutation, RemoveWatchedMutationVariables>,
  'mutation'
>;

export const RemoveWatchedComponent = (props: RemoveWatchedComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveWatchedMutation, RemoveWatchedMutationVariables>
    mutation={RemoveWatchedDocument}
    {...props}
  />
);

/**
 * __useRemoveWatchedMutation__
 *
 * To run a mutation, you first call `useRemoveWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWatchedMutation, { data, loading, error }] = useRemoveWatchedMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useRemoveWatchedMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveWatchedMutation, RemoveWatchedMutationVariables>,
) {
  return Apollo.useMutation<RemoveWatchedMutation, RemoveWatchedMutationVariables>(RemoveWatchedDocument, baseOptions);
}
export type RemoveWatchedMutationHookResult = ReturnType<typeof useRemoveWatchedMutation>;
export type RemoveWatchedMutationResult = Apollo.MutationResult<RemoveWatchedMutation>;
export type RemoveWatchedMutationOptions = Apollo.BaseMutationOptions<
  RemoveWatchedMutation,
  RemoveWatchedMutationVariables
>;
export const UserWatchedDocument = gql`
  query UserWatched($id: ID!, $cursor: String) {
    user(id: $id) {
      id
      name
      watched(cursor: $cursor) {
        cursor
        hasMore
        watched {
          id
          tmdbId
          createdAt
          rating {
            value
          }
          review {
            body
          }
          itemType
          item {
            ... on Movie {
              id
              title
              release_date
              poster_path
            }
            ... on Tv {
              id
              name
              first_air_date
              poster_path
            }
          }
        }
      }
    }
  }
`;
export type UserWatchedComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserWatchedQuery, UserWatchedQueryVariables>,
  'query'
> &
  ({ variables: UserWatchedQueryVariables; skip?: boolean } | { skip: boolean });

export const UserWatchedComponent = (props: UserWatchedComponentProps) => (
  <ApolloReactComponents.Query<UserWatchedQuery, UserWatchedQueryVariables> query={UserWatchedDocument} {...props} />
);

/**
 * __useUserWatchedQuery__
 *
 * To run a query within a React component, call `useUserWatchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWatchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWatchedQuery({
 *   variables: {
 *      id: // value for 'id'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserWatchedQuery(baseOptions: Apollo.QueryHookOptions<UserWatchedQuery, UserWatchedQueryVariables>) {
  return Apollo.useQuery<UserWatchedQuery, UserWatchedQueryVariables>(UserWatchedDocument, baseOptions);
}
export function useUserWatchedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserWatchedQuery, UserWatchedQueryVariables>,
) {
  return Apollo.useLazyQuery<UserWatchedQuery, UserWatchedQueryVariables>(UserWatchedDocument, baseOptions);
}
export type UserWatchedQueryHookResult = ReturnType<typeof useUserWatchedQuery>;
export type UserWatchedLazyQueryHookResult = ReturnType<typeof useUserWatchedLazyQuery>;
export type UserWatchedQueryResult = Apollo.QueryResult<UserWatchedQuery, UserWatchedQueryVariables>;
export const UserDataDocument = gql`
  query UserData {
    userData @client {
      id
      name
      email
      createdAt
      settings {
        general {
          autoConvert
        }
        extension {
          autoTrack
          minLengthSeconds
          blacklist
        }
      }
    }
  }
`;
export type UserDataComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserDataQuery, UserDataQueryVariables>,
  'query'
>;

export const UserDataComponent = (props: UserDataComponentProps) => (
  <ApolloReactComponents.Query<UserDataQuery, UserDataQueryVariables> query={UserDataDocument} {...props} />
);

/**
 * __useUserDataQuery__
 *
 * To run a query within a React component, call `useUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDataQuery(baseOptions?: Apollo.QueryHookOptions<UserDataQuery, UserDataQueryVariables>) {
  return Apollo.useQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
}
export function useUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDataQuery, UserDataQueryVariables>) {
  return Apollo.useLazyQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
}
export type UserDataQueryHookResult = ReturnType<typeof useUserDataQuery>;
export type UserDataLazyQueryHookResult = ReturnType<typeof useUserDataLazyQuery>;
export type UserDataQueryResult = Apollo.QueryResult<UserDataQuery, UserDataQueryVariables>;
export const SearchContentDocument = gql`
  query SearchContent($title: String!) {
    searchContent(title: $title) {
      id
      tmdbId
      title
      release_date
      type
    }
  }
`;
export type SearchContentComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<SearchContentQuery, SearchContentQueryVariables>,
  'query'
> &
  ({ variables: SearchContentQueryVariables; skip?: boolean } | { skip: boolean });

export const SearchContentComponent = (props: SearchContentComponentProps) => (
  <ApolloReactComponents.Query<SearchContentQuery, SearchContentQueryVariables>
    query={SearchContentDocument}
    {...props}
  />
);

/**
 * __useSearchContentQuery__
 *
 * To run a query within a React component, call `useSearchContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchContentQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useSearchContentQuery(
  baseOptions: Apollo.QueryHookOptions<SearchContentQuery, SearchContentQueryVariables>,
) {
  return Apollo.useQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, baseOptions);
}
export function useSearchContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>,
) {
  return Apollo.useLazyQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, baseOptions);
}
export type SearchContentQueryHookResult = ReturnType<typeof useSearchContentQuery>;
export type SearchContentLazyQueryHookResult = ReturnType<typeof useSearchContentLazyQuery>;
export type SearchContentQueryResult = Apollo.QueryResult<SearchContentQuery, SearchContentQueryVariables>;
export const TvDocument = gql`
  query Tv($id: ID!) {
    tv(id: $id) {
      id
      name
      first_air_date
      poster_path
      seasons {
        id
        name
        season_number
        episode_count
        episodes {
          id
          name
          episode_number
        }
      }
    }
  }
`;
export type TvComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TvQuery, TvQueryVariables>, 'query'> &
  ({ variables: TvQueryVariables; skip?: boolean } | { skip: boolean });

export const TvComponent = (props: TvComponentProps) => (
  <ApolloReactComponents.Query<TvQuery, TvQueryVariables> query={TvDocument} {...props} />
);

/**
 * __useTvQuery__
 *
 * To run a query within a React component, call `useTvQuery` and pass it any options that fit your needs.
 * When your component renders, `useTvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTvQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTvQuery(baseOptions: Apollo.QueryHookOptions<TvQuery, TvQueryVariables>) {
  return Apollo.useQuery<TvQuery, TvQueryVariables>(TvDocument, baseOptions);
}
export function useTvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TvQuery, TvQueryVariables>) {
  return Apollo.useLazyQuery<TvQuery, TvQueryVariables>(TvDocument, baseOptions);
}
export type TvQueryHookResult = ReturnType<typeof useTvQuery>;
export type TvLazyQueryHookResult = ReturnType<typeof useTvLazyQuery>;
export type TvQueryResult = Apollo.QueryResult<TvQuery, TvQueryVariables>;
export const MovieDocument = gql`
  query Movie($id: ID!) {
    movie(id: $id) {
      id
      title
      release_date
      poster_path
    }
  }
`;
export type MovieComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MovieQuery, MovieQueryVariables>,
  'query'
> &
  ({ variables: MovieQueryVariables; skip?: boolean } | { skip: boolean });

export const MovieComponent = (props: MovieComponentProps) => (
  <ApolloReactComponents.Query<MovieQuery, MovieQueryVariables> query={MovieDocument} {...props} />
);

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovieQuery(baseOptions: Apollo.QueryHookOptions<MovieQuery, MovieQueryVariables>) {
  return Apollo.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
}
export function useMovieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>) {
  return Apollo.useLazyQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
}
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = Apollo.QueryResult<MovieQuery, MovieQueryVariables>;
export const SettingsDocument = gql`
  query Settings {
    settings {
      ...ManagedSettings
    }
  }
  ${ManagedSettingsFragmentDoc}
`;
export type SettingsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<SettingsQuery, SettingsQueryVariables>,
  'query'
>;

export const SettingsComponent = (props: SettingsComponentProps) => (
  <ApolloReactComponents.Query<SettingsQuery, SettingsQueryVariables> query={SettingsDocument} {...props} />
);

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
  return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, baseOptions);
}
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
  return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, baseOptions);
}
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
      createdAt
      settings {
        general {
          autoConvert
        }
        extension {
          autoTrack
          minLengthSeconds
          blacklist
        }
      }
    }
  }
`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AutoTrackedDocument = gql`
  query AutoTracked($id: ID!) {
    autoTracked(id: $id) {
      id
      tvItem {
        ... on Season {
          season_number
        }
        ... on Episode {
          episode_number
          season {
            season_number
          }
        }
      }
      item {
        ... on Movie {
          id
          title
        }
        ... on Tv {
          id
          name
        }
      }
    }
  }
`;
export type AutoTrackedComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<AutoTrackedQuery, AutoTrackedQueryVariables>,
  'query'
> &
  ({ variables: AutoTrackedQueryVariables; skip?: boolean } | { skip: boolean });

export const AutoTrackedComponent = (props: AutoTrackedComponentProps) => (
  <ApolloReactComponents.Query<AutoTrackedQuery, AutoTrackedQueryVariables> query={AutoTrackedDocument} {...props} />
);

/**
 * __useAutoTrackedQuery__
 *
 * To run a query within a React component, call `useAutoTrackedQuery` and pass it any options that fit your needs.
 * When your component renders, `useAutoTrackedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoTrackedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAutoTrackedQuery(baseOptions: Apollo.QueryHookOptions<AutoTrackedQuery, AutoTrackedQueryVariables>) {
  return Apollo.useQuery<AutoTrackedQuery, AutoTrackedQueryVariables>(AutoTrackedDocument, baseOptions);
}
export function useAutoTrackedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AutoTrackedQuery, AutoTrackedQueryVariables>,
) {
  return Apollo.useLazyQuery<AutoTrackedQuery, AutoTrackedQueryVariables>(AutoTrackedDocument, baseOptions);
}
export type AutoTrackedQueryHookResult = ReturnType<typeof useAutoTrackedQuery>;
export type AutoTrackedLazyQueryHookResult = ReturnType<typeof useAutoTrackedLazyQuery>;
export type AutoTrackedQueryResult = Apollo.QueryResult<AutoTrackedQuery, AutoTrackedQueryVariables>;
