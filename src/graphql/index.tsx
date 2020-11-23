import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
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

export type Author = {
  __typename?: 'Author';
  id?: Maybe<Scalars['Int']>;
  credit_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  profile_path?: Maybe<Scalars['String']>;
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

export type AutoTrackedCursor = {
  __typename?: 'AutoTrackedCursor';
  autoTracked: Array<AutoTracked>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type AutoTrackedMeta = {
  __typename?: 'AutoTrackedMeta';
  title?: Maybe<Scalars['String']>;
  tvData?: Maybe<AutoTrackedMetaTvData>;
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type AutoTrackedMetaInput = {
  title?: Maybe<Scalars['String']>;
  tvData?: Maybe<TvDataInput>;
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type AutoTrackedMetaTvData = {
  __typename?: 'AutoTrackedMetaTvData';
  season?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Collection = {
  __typename?: 'Collection';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
};

export type ConvertedAutoTracked = {
  __typename?: 'ConvertedAutoTracked';
  removedIds: Array<Scalars['ID']>;
  watched: Array<Watched>;
};

export type Country = {
  __typename?: 'Country';
  iso_3166_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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

export type ExtensionSettings = {
  __typename?: 'ExtensionSettings';
  autoTrack: Scalars['Boolean'];
  minLengthSeconds: Scalars['Int'];
  blacklist: Array<Scalars['String']>;
};

export type ExtensionSettingsInput = {
  autoTrack: Scalars['Boolean'];
  minLengthSeconds: Scalars['Int'];
  blacklist: Array<Scalars['String']>;
};

export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  autoConvert: Scalars['Boolean'];
};

export type GeneralSettingsInput = {
  autoConvert: Scalars['Boolean'];
};

export type Genre = {
  __typename?: 'Genre';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Item = Movie | Tv;

export enum ItemType {
  Movie = 'Movie',
  Tv = 'Tv',
}

export type Language = {
  __typename?: 'Language';
  iso_639_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type LocalAuth = {
  __typename?: 'LocalAuth';
  user: User;
  token: Scalars['String'];
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
  release_date: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addWatched: Watched;
  editWatched: Watched;
  removeWatched: Scalars['ID'];
  register: LocalAuth;
  login: LocalAuth;
  addAutoTracked: AutoTracked;
  removeAutoTracked: Array<Scalars['ID']>;
  convertAutoTracked: ConvertedAutoTracked;
  updateSettings: Settings;
  setIsLoggedIn: Scalars['Boolean'];
  setUserData: User;
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

export type MutationEditWatchedArgs = {
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type MutationRemoveWatchedArgs = {
  itemId: Scalars['ID'];
};

export type MutationRegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationAddAutoTrackedArgs = {
  meta: AutoTrackedMetaInput;
  createdAt: Scalars['Float'];
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type MutationRemoveAutoTrackedArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationConvertAutoTrackedArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationUpdateSettingsArgs = {
  general: GeneralSettingsInput;
  extension: ExtensionSettingsInput;
};

export type MutationSetIsLoggedInArgs = {
  isLoggedIn: Scalars['Boolean'];
};

export type MutationSetUserDataArgs = {
  userData: UserInput;
};

export type Network = {
  __typename?: 'Network';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  movie: Movie;
  tv: Tv;
  season: Season;
  seasons: Array<Season>;
  episode: Episode;
  watches: WatchedCursor;
  watched: Watched;
  users?: Maybe<Array<User>>;
  user: User;
  me: User;
  searchContent: Array<SearchItem>;
  reviews: ReviewCursor;
  autoTrackedList: AutoTrackedCursor;
  autoTracked: AutoTracked;
  settings?: Maybe<Settings>;
  isLoggedIn: Scalars['Boolean'];
  userData: User;
};

export type QueryMovieArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryTvArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QuerySeasonArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QuerySeasonsArgs = {
  itemId: Scalars['ID'];
};

export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryWatchesArgs = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type QueryWatchedArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type QuerySearchContentArgs = {
  title: Scalars['String'];
};

export type QueryReviewsArgs = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type QueryAutoTrackedListArgs = {
  userId: Scalars['ID'];
  cursor?: Maybe<Scalars['String']>;
};

export type QueryAutoTrackedArgs = {
  id: Scalars['ID'];
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

export type RatingInput = {
  id?: Maybe<Scalars['ID']>;
  value: Scalars['Float'];
};

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

export type ReviewCursor = {
  __typename?: 'ReviewCursor';
  reviews: Array<Review>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type ReviewInput = {
  id?: Maybe<Scalars['ID']>;
  body: Scalars['String'];
};

export type Search = {
  __typename?: 'Search';
  results?: Maybe<Array<TmdbMedia>>;
  page: Scalars['Int'];
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
};

export type SearchItem = {
  __typename?: 'SearchItem';
  id: Scalars['String'];
  tmdbId: Scalars['Int'];
  title: Scalars['String'];
  release_date?: Maybe<Scalars['String']>;
  type?: Maybe<ItemType>;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  name: Scalars['String'];
  overview: Scalars['String'];
  air_date: Scalars['String'];
  episode_count: Scalars['Int'];
  poster_path?: Maybe<Scalars['String']>;
  season_number: Scalars['Int'];
  tmdbId: Scalars['Int'];
  tvId: Scalars['ID'];
  tv: Tv;
  episodes: Array<Episode>;
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  general: GeneralSettings;
  extension: ExtensionSettings;
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type TmdbMedia = TmdbMovie | TmdbTv;

export enum TmdbMediaType {
  Movie = 'Movie',
  Tv = 'Tv',
}

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

export type Tv = {
  __typename?: 'Tv';
  id: Scalars['ID'];
  backdrop_path?: Maybe<Scalars['String']>;
  created_by?: Maybe<Array<Maybe<Author>>>;
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']>>>;
  first_air_date: Scalars['String'];
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage: Scalars['String'];
  in_production: Scalars['Boolean'];
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

export type TvDataInput = {
  season?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export type TvItem = Season | Episode;

export enum TvItemType {
  Season = 'Season',
  Episode = 'Episode',
}

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

export type UserInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
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

export type WatchedCursor = {
  __typename?: 'WatchedCursor';
  watched: Array<Watched>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

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

export type RegisterMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

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

export type SetIsLoggedInMutationVariables = {
  isLoggedIn: Scalars['Boolean'];
};

export type SetIsLoggedInMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'setIsLoggedIn'>;

export type SetUserDataMutationVariables = {
  userData: UserInput;
};

export type SetUserDataMutation = { __typename?: 'Mutation' } & {
  setUserData: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;
};

export type AddWatchedMutationVariables = {
  itemId: Scalars['ID'];
  itemType: ItemType;
  createdAt: Scalars['Float'];
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type AddWatchedMutation = { __typename?: 'Mutation' } & {
  addWatched: { __typename?: 'Watched' } & Pick<Watched, 'id' | 'itemType' | 'createdAt'> & {
      rating: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
      review: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
    };
};

export type AddAutoTrackedMutationVariables = {
  meta: AutoTrackedMetaInput;
  createdAt: Scalars['Float'];
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type AddAutoTrackedMutation = { __typename?: 'Mutation' } & {
  addAutoTracked: { __typename?: 'AutoTracked' } & Pick<AutoTracked, 'id'>;
};

export type UpdateSettingsMutationVariables = {
  general: GeneralSettingsInput;
  extension: ExtensionSettingsInput;
};

export type UpdateSettingsMutation = { __typename?: 'Mutation' } & {
  updateSettings: { __typename?: 'Settings' } & {
    general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
    extension: { __typename?: 'ExtensionSettings' } & Pick<
      ExtensionSettings,
      'autoTrack' | 'minLengthSeconds' | 'blacklist'
    >;
  };
};

export type UserWatchedQueryVariables = {
  id: Scalars['ID'];
  cursor?: Maybe<Scalars['String']>;
};

export type UserWatchedQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & Pick<User, 'id' | 'name'> & {
      watched: { __typename?: 'WatchedCursor' } & Pick<WatchedCursor, 'cursor' | 'hasMore'> & {
          watched: Array<
            { __typename?: 'Watched' } & Pick<Watched, 'id' | 'tmdbId' | 'createdAt' | 'itemType'> & {
                rating: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
                review: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
                item:
                  | ({ __typename?: 'Movie' } & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path'>)
                  | ({ __typename?: 'Tv' } & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path'>);
              }
          >;
        };
    };
};

export type IsUserLoggedInQueryVariables = {};

export type IsUserLoggedInQuery = { __typename?: 'Query' } & Pick<Query, 'isLoggedIn'>;

export type UserDataQueryVariables = {};

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

export type SearchContentQueryVariables = {
  title: Scalars['String'];
};

export type SearchContentQuery = { __typename?: 'Query' } & {
  searchContent: Array<
    { __typename?: 'SearchItem' } & Pick<SearchItem, 'id' | 'tmdbId' | 'title' | 'release_date' | 'type'>
  >;
};

export type TvQueryVariables = {
  id: Scalars['ID'];
};

export type TvQuery = { __typename?: 'Query' } & {
  tv: { __typename?: 'Tv' } & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path'> & {
      seasons: Array<
        { __typename?: 'Season' } & Pick<Season, 'id' | 'name' | 'season_number' | 'episode_count'> & {
            episodes: Array<{ __typename?: 'Episode' } & Pick<Episode, 'id' | 'name' | 'episode_number'>>;
          }
      >;
    };
};

export type MovieQueryVariables = {
  id: Scalars['ID'];
};

export type MovieQuery = { __typename?: 'Query' } & {
  movie: { __typename?: 'Movie' } & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path'>;
};

export type SettingsQueryVariables = {};

export type SettingsQuery = { __typename?: 'Query' } & {
  settings: Maybe<
    { __typename?: 'Settings' } & {
      general: { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'autoConvert'>;
      extension: { __typename?: 'ExtensionSettings' } & Pick<
        ExtensionSettings,
        'autoTrack' | 'minLengthSeconds' | 'blacklist'
      >;
    }
  >;
};

export type MeQueryVariables = {};

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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
);

export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(
    LoginDocument,
    {
      alias: 'login',
      ...operationOptions,
    },
  );
}

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
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>,
  'mutation'
>;

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
);

export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(
    RegisterDocument,
    {
      alias: 'register',
      ...operationOptions,
    },
  );
}

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const SetIsLoggedInDocument = gql`
  mutation SetIsLoggedIn($isLoggedIn: Boolean!) {
    setIsLoggedIn(isLoggedIn: $isLoggedIn) @client
  }
`;
export type SetIsLoggedInMutationFn = ApolloReactCommon.MutationFunction<
  SetIsLoggedInMutation,
  SetIsLoggedInMutationVariables
>;
export type SetIsLoggedInComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>,
  'mutation'
>;

export const SetIsLoggedInComponent = (props: SetIsLoggedInComponentProps) => (
  <ApolloReactComponents.Mutation<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>
    mutation={SetIsLoggedInDocument}
    {...props}
  />
);

export type SetIsLoggedInProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  SetIsLoggedInMutation,
  SetIsLoggedInMutationVariables
> &
  TChildProps;
export function withSetIsLoggedIn<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SetIsLoggedInMutation,
    SetIsLoggedInMutationVariables,
    SetIsLoggedInProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SetIsLoggedInMutation,
    SetIsLoggedInMutationVariables,
    SetIsLoggedInProps<TChildProps>
  >(SetIsLoggedInDocument, {
    alias: 'setIsLoggedIn',
    ...operationOptions,
  });
}

/**
 * __useSetIsLoggedInMutation__
 *
 * To run a mutation, you first call `useSetIsLoggedInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIsLoggedInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIsLoggedInMutation, { data, loading, error }] = useSetIsLoggedInMutation({
 *   variables: {
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useSetIsLoggedInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>(
    SetIsLoggedInDocument,
    baseOptions,
  );
}
export type SetIsLoggedInMutationHookResult = ReturnType<typeof useSetIsLoggedInMutation>;
export type SetIsLoggedInMutationResult = ApolloReactCommon.MutationResult<SetIsLoggedInMutation>;
export type SetIsLoggedInMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetIsLoggedInMutation,
  SetIsLoggedInMutationVariables
>;
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
export type SetUserDataMutationFn = ApolloReactCommon.MutationFunction<
  SetUserDataMutation,
  SetUserDataMutationVariables
>;
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

export type SetUserDataProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  SetUserDataMutation,
  SetUserDataMutationVariables
> &
  TChildProps;
export function withSetUserData<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SetUserDataMutation,
    SetUserDataMutationVariables,
    SetUserDataProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SetUserDataMutation,
    SetUserDataMutationVariables,
    SetUserDataProps<TChildProps>
  >(SetUserDataDocument, {
    alias: 'setUserData',
    ...operationOptions,
  });
}

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<SetUserDataMutation, SetUserDataMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SetUserDataMutation, SetUserDataMutationVariables>(
    SetUserDataDocument,
    baseOptions,
  );
}
export type SetUserDataMutationHookResult = ReturnType<typeof useSetUserDataMutation>;
export type SetUserDataMutationResult = ApolloReactCommon.MutationResult<SetUserDataMutation>;
export type SetUserDataMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetUserDataMutation,
  SetUserDataMutationVariables
>;
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
      id
      itemType
      createdAt
      rating {
        value
      }
      review {
        body
      }
    }
  }
`;
export type AddWatchedMutationFn = ApolloReactCommon.MutationFunction<AddWatchedMutation, AddWatchedMutationVariables>;
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

export type AddWatchedProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  AddWatchedMutation,
  AddWatchedMutationVariables
> &
  TChildProps;
export function withAddWatched<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddWatchedMutation,
    AddWatchedMutationVariables,
    AddWatchedProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddWatchedMutation,
    AddWatchedMutationVariables,
    AddWatchedProps<TChildProps>
  >(AddWatchedDocument, {
    alias: 'addWatched',
    ...operationOptions,
  });
}

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<AddWatchedMutation, AddWatchedMutationVariables>,
) {
  return ApolloReactHooks.useMutation<AddWatchedMutation, AddWatchedMutationVariables>(AddWatchedDocument, baseOptions);
}
export type AddWatchedMutationHookResult = ReturnType<typeof useAddWatchedMutation>;
export type AddWatchedMutationResult = ApolloReactCommon.MutationResult<AddWatchedMutation>;
export type AddWatchedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddWatchedMutation,
  AddWatchedMutationVariables
>;
export const AddAutoTrackedDocument = gql`
  mutation AddAutoTracked(
    $meta: AutoTrackedMetaInput!
    $createdAt: Float!
    $itemId: ID
    $itemType: ItemType
    $tvItemId: ID
    $tvItemType: TvItemType
  ) {
    addAutoTracked(
      meta: $meta
      createdAt: $createdAt
      itemId: $itemId
      itemType: $itemType
      tvItemId: $tvItemId
      tvItemType: $tvItemType
    ) {
      id
    }
  }
`;
export type AddAutoTrackedMutationFn = ApolloReactCommon.MutationFunction<
  AddAutoTrackedMutation,
  AddAutoTrackedMutationVariables
>;
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

export type AddAutoTrackedProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  AddAutoTrackedMutation,
  AddAutoTrackedMutationVariables
> &
  TChildProps;
export function withAddAutoTracked<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddAutoTrackedMutation,
    AddAutoTrackedMutationVariables,
    AddAutoTrackedProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddAutoTrackedMutation,
    AddAutoTrackedMutationVariables,
    AddAutoTrackedProps<TChildProps>
  >(AddAutoTrackedDocument, {
    alias: 'addAutoTracked',
    ...operationOptions,
  });
}

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>,
) {
  return ApolloReactHooks.useMutation<AddAutoTrackedMutation, AddAutoTrackedMutationVariables>(
    AddAutoTrackedDocument,
    baseOptions,
  );
}
export type AddAutoTrackedMutationHookResult = ReturnType<typeof useAddAutoTrackedMutation>;
export type AddAutoTrackedMutationResult = ApolloReactCommon.MutationResult<AddAutoTrackedMutation>;
export type AddAutoTrackedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddAutoTrackedMutation,
  AddAutoTrackedMutationVariables
>;
export const UpdateSettingsDocument = gql`
  mutation UpdateSettings($general: GeneralSettingsInput!, $extension: ExtensionSettingsInput!) {
    updateSettings(general: $general, extension: $extension) {
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
`;
export type UpdateSettingsMutationFn = ApolloReactCommon.MutationFunction<
  UpdateSettingsMutation,
  UpdateSettingsMutationVariables
>;
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

export type UpdateSettingsProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateSettingsMutation,
  UpdateSettingsMutationVariables
> &
  TChildProps;
export function withUpdateSettings<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateSettingsMutation,
    UpdateSettingsMutationVariables,
    UpdateSettingsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateSettingsMutation,
    UpdateSettingsMutationVariables,
    UpdateSettingsProps<TChildProps>
  >(UpdateSettingsDocument, {
    alias: 'updateSettings',
    ...operationOptions,
  });
}

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
    UpdateSettingsDocument,
    baseOptions,
  );
}
export type UpdateSettingsMutationHookResult = ReturnType<typeof useUpdateSettingsMutation>;
export type UpdateSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateSettingsMutation>;
export type UpdateSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSettingsMutation,
  UpdateSettingsMutationVariables
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

export type UserWatchedProps<TChildProps = {}> = ApolloReactHoc.DataProps<UserWatchedQuery, UserWatchedQueryVariables> &
  TChildProps;
export function withUserWatched<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserWatchedQuery,
    UserWatchedQueryVariables,
    UserWatchedProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<TProps, UserWatchedQuery, UserWatchedQueryVariables, UserWatchedProps<TChildProps>>(
    UserWatchedDocument,
    {
      alias: 'userWatched',
      ...operationOptions,
    },
  );
}

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
export function useUserWatchedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserWatchedQuery, UserWatchedQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UserWatchedQuery, UserWatchedQueryVariables>(UserWatchedDocument, baseOptions);
}
export function useUserWatchedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserWatchedQuery, UserWatchedQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UserWatchedQuery, UserWatchedQueryVariables>(UserWatchedDocument, baseOptions);
}
export type UserWatchedQueryHookResult = ReturnType<typeof useUserWatchedQuery>;
export type UserWatchedLazyQueryHookResult = ReturnType<typeof useUserWatchedLazyQuery>;
export type UserWatchedQueryResult = ApolloReactCommon.QueryResult<UserWatchedQuery, UserWatchedQueryVariables>;
export const IsUserLoggedInDocument = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export type IsUserLoggedInComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>,
  'query'
>;

export const IsUserLoggedInComponent = (props: IsUserLoggedInComponentProps) => (
  <ApolloReactComponents.Query<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>
    query={IsUserLoggedInDocument}
    {...props}
  />
);

export type IsUserLoggedInProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  IsUserLoggedInQuery,
  IsUserLoggedInQueryVariables
> &
  TChildProps;
export function withIsUserLoggedIn<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables,
    IsUserLoggedInProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables,
    IsUserLoggedInProps<TChildProps>
  >(IsUserLoggedInDocument, {
    alias: 'isUserLoggedIn',
    ...operationOptions,
  });
}

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>,
) {
  return ApolloReactHooks.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(
    IsUserLoggedInDocument,
    baseOptions,
  );
}
export function useIsUserLoggedInLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(
    IsUserLoggedInDocument,
    baseOptions,
  );
}
export type IsUserLoggedInQueryHookResult = ReturnType<typeof useIsUserLoggedInQuery>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<typeof useIsUserLoggedInLazyQuery>;
export type IsUserLoggedInQueryResult = ApolloReactCommon.QueryResult<
  IsUserLoggedInQuery,
  IsUserLoggedInQueryVariables
>;
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

export type UserDataProps<TChildProps = {}> = ApolloReactHoc.DataProps<UserDataQuery, UserDataQueryVariables> &
  TChildProps;
export function withUserData<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserDataQuery,
    UserDataQueryVariables,
    UserDataProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<TProps, UserDataQuery, UserDataQueryVariables, UserDataProps<TChildProps>>(
    UserDataDocument,
    {
      alias: 'userData',
      ...operationOptions,
    },
  );
}

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
export function useUserDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserDataQuery, UserDataQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
}
export function useUserDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserDataQuery, UserDataQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
}
export type UserDataQueryHookResult = ReturnType<typeof useUserDataQuery>;
export type UserDataLazyQueryHookResult = ReturnType<typeof useUserDataLazyQuery>;
export type UserDataQueryResult = ApolloReactCommon.QueryResult<UserDataQuery, UserDataQueryVariables>;
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

export type SearchContentProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  SearchContentQuery,
  SearchContentQueryVariables
> &
  TChildProps;
export function withSearchContent<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SearchContentQuery,
    SearchContentQueryVariables,
    SearchContentProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    SearchContentQuery,
    SearchContentQueryVariables,
    SearchContentProps<TChildProps>
  >(SearchContentDocument, {
    alias: 'searchContent',
    ...operationOptions,
  });
}

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
  baseOptions?: ApolloReactHooks.QueryHookOptions<SearchContentQuery, SearchContentQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, baseOptions);
}
export function useSearchContentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<SearchContentQuery, SearchContentQueryVariables>(
    SearchContentDocument,
    baseOptions,
  );
}
export type SearchContentQueryHookResult = ReturnType<typeof useSearchContentQuery>;
export type SearchContentLazyQueryHookResult = ReturnType<typeof useSearchContentLazyQuery>;
export type SearchContentQueryResult = ApolloReactCommon.QueryResult<SearchContentQuery, SearchContentQueryVariables>;
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

export type TvProps<TChildProps = {}> = ApolloReactHoc.DataProps<TvQuery, TvQueryVariables> & TChildProps;
export function withTv<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<TProps, TvQuery, TvQueryVariables, TvProps<TChildProps>>,
) {
  return ApolloReactHoc.withQuery<TProps, TvQuery, TvQueryVariables, TvProps<TChildProps>>(TvDocument, {
    alias: 'tv',
    ...operationOptions,
  });
}

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
export function useTvQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TvQuery, TvQueryVariables>) {
  return ApolloReactHooks.useQuery<TvQuery, TvQueryVariables>(TvDocument, baseOptions);
}
export function useTvLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TvQuery, TvQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<TvQuery, TvQueryVariables>(TvDocument, baseOptions);
}
export type TvQueryHookResult = ReturnType<typeof useTvQuery>;
export type TvLazyQueryHookResult = ReturnType<typeof useTvLazyQuery>;
export type TvQueryResult = ApolloReactCommon.QueryResult<TvQuery, TvQueryVariables>;
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

export type MovieProps<TChildProps = {}> = ApolloReactHoc.DataProps<MovieQuery, MovieQueryVariables> & TChildProps;
export function withMovie<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<TProps, MovieQuery, MovieQueryVariables, MovieProps<TChildProps>>,
) {
  return ApolloReactHoc.withQuery<TProps, MovieQuery, MovieQueryVariables, MovieProps<TChildProps>>(MovieDocument, {
    alias: 'movie',
    ...operationOptions,
  });
}

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
export function useMovieQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MovieQuery, MovieQueryVariables>) {
  return ApolloReactHooks.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
}
export function useMovieLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
}
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = ApolloReactCommon.QueryResult<MovieQuery, MovieQueryVariables>;
export const SettingsDocument = gql`
  query Settings {
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
`;
export type SettingsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<SettingsQuery, SettingsQueryVariables>,
  'query'
>;

export const SettingsComponent = (props: SettingsComponentProps) => (
  <ApolloReactComponents.Query<SettingsQuery, SettingsQueryVariables> query={SettingsDocument} {...props} />
);

export type SettingsProps<TChildProps = {}> = ApolloReactHoc.DataProps<SettingsQuery, SettingsQueryVariables> &
  TChildProps;
export function withSettings<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SettingsQuery,
    SettingsQueryVariables,
    SettingsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<TProps, SettingsQuery, SettingsQueryVariables, SettingsProps<TChildProps>>(
    SettingsDocument,
    {
      alias: 'settings',
      ...operationOptions,
    },
  );
}

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
export function useSettingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SettingsQuery, SettingsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, baseOptions);
}
export function useSettingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, baseOptions);
}
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = ApolloReactCommon.QueryResult<SettingsQuery, SettingsQueryVariables>;
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

export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>,
) {
  return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
    alias: 'me',
    ...operationOptions,
  });
}

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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
