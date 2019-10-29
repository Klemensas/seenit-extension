import gql from 'graphql-tag';
import * as ReactApollo from 'react-apollo';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
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

export type Country = {
  __typename?: 'Country';
  iso_3166_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  episode_number?: Maybe<Scalars['Int']>;
  air_date?: Maybe<Scalars['String']>;
  production_code?: Maybe<Scalars['String']>;
  still_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  tmdbId?: Maybe<Scalars['Int']>;
  seasonId?: Maybe<Scalars['ID']>;
  season?: Maybe<Array<Maybe<Season>>>;
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
  adult?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  belongs_to_collection?: Maybe<Collection>;
  budget?: Maybe<Scalars['Int']>;
  genre?: Maybe<Array<Maybe<Genre>>>;
  homepage?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
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
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  tmdbId?: Maybe<Scalars['Int']>;
  watched?: Maybe<Array<Maybe<Watched>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addWatched: Watched;
  register: LocalAuth;
  login: LocalAuth;
  setIsLoggedIn: Scalars['Boolean'];
  setUserData: User;
};

export type MutationAddWatchedArgs = {
  itemId: Scalars['ID'];
  mediaType: TmdbMediaType;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvData?: Maybe<TvDataInput>;
  createdAt?: Maybe<Scalars['Float']>;
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
  movie?: Maybe<Movie>;
  tv?: Maybe<Tv>;
  season?: Maybe<Season>;
  episode?: Maybe<Episode>;
  allWatched?: Maybe<Array<Watched>>;
  watched?: Maybe<Watched>;
  users?: Maybe<Array<User>>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  searchContent?: Maybe<Array<Maybe<SearchItem>>>;
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

export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryWatchedArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QuerySearchContentArgs = {
  title: Scalars['String'];
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
  tvData?: Maybe<TvData>;
};

export type RatingInput = {
  value: Scalars['Float'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  body: Scalars['String'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  user?: Maybe<User>;
  watched?: Maybe<Watched>;
  tvData?: Maybe<TvData>;
};

export type ReviewInput = {
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
  type?: Maybe<TmdbMediaType>;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  air_date?: Maybe<Scalars['String']>;
  episode_count?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
  tmdbId?: Maybe<Scalars['Int']>;
  tvId?: Maybe<Scalars['ID']>;
  tv?: Maybe<Tv>;
  episodes?: Maybe<Array<Maybe<Episode>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type TmdbMedia = TmdbMovie | TmdbTv | TmdbPerson;

export enum TmdbMediaType {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
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
  first_air_date?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage?: Maybe<Scalars['String']>;
  in_production?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  last_air_date?: Maybe<Scalars['String']>;
  last_episode_to_air?: Maybe<Episode>;
  name?: Maybe<Scalars['String']>;
  next_episode_to_air?: Maybe<Episode>;
  networks?: Maybe<Array<Maybe<Network>>>;
  number_of_episodes?: Maybe<Scalars['Int']>;
  number_of_seasons?: Maybe<Scalars['Int']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Array<Maybe<Company>>>;
  seasons?: Maybe<Array<Maybe<Season>>>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  tmdbId?: Maybe<Scalars['Int']>;
  season?: Maybe<Array<Maybe<Season>>>;
  watched?: Maybe<Array<Maybe<Watched>>>;
};

export type TvData = {
  __typename?: 'TvData';
  season?: Maybe<Scalars['Int']>;
  episode?: Maybe<Scalars['Int']>;
};

export type TvDataInput = {
  episode?: Maybe<Scalars['Int']>;
  season?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  watched?: Maybe<Array<Watched>>;
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
  user?: Maybe<User>;
  itemType: ItemType;
  item?: Maybe<Item>;
  rating?: Maybe<Rating>;
  review?: Maybe<Review>;
  tvData?: Maybe<TvData>;
};
export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>;
    };
};

export type RegisterMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>;
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
  mediaType: TmdbMediaType;
  createdAt: Scalars['Float'];
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
};

export type AddWatchedMutation = { __typename?: 'Mutation' } & {
  addWatched: { __typename?: 'Watched' } & Pick<Watched, 'id' | 'itemType' | 'createdAt'> & {
      rating: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
      review: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
    };
};

export type WatchedQueryVariables = {};

export type WatchedQuery = { __typename?: 'Query' } & {
  allWatched: Maybe<Array<{ __typename?: 'Watched' } & Pick<Watched, 'id' | 'tmdbId'>>>;
};

export type UserWatchedQueryVariables = {
  id: Scalars['ID'];
};

export type UserWatchedQuery = { __typename?: 'Query' } & {
  user: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'name'> & {
        watched: Maybe<
          Array<
            { __typename?: 'Watched' } & Pick<Watched, 'id' | 'tmdbId' | 'createdAt' | 'itemType'> & {
                rating: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
                review: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
                item: Maybe<

                    | ({ __typename?: 'Movie' } & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path'>)
                    | ({ __typename?: 'Tv' } & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path'>)
                >;
              }
          >
        >;
      }
  >;
};

export type IsUserLoggedInQueryVariables = {};

export type IsUserLoggedInQuery = { __typename?: 'Query' } & Pick<Query, 'isLoggedIn'>;

export type UserDataQueryVariables = {};

export type UserDataQuery = { __typename?: 'Query' } & {
  userData: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;
};

export type SearchContentQueryVariables = {
  title: Scalars['String'];
};

export type SearchContentQuery = { __typename?: 'Query' } & {
  searchContent: Maybe<
    Array<Maybe<{ __typename?: 'SearchItem' } & Pick<SearchItem, 'id' | 'tmdbId' | 'title' | 'release_date' | 'type'>>>
  >;
};

export type TvQueryVariables = {
  id: Scalars['ID'];
};

export type TvQuery = { __typename?: 'Query' } & {
  tv: Maybe<
    { __typename?: 'Tv' } & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path'> & {
        seasons: Maybe<
          Array<
            Maybe<
              { __typename?: 'Season' } & Pick<Season, 'id' | 'name' | 'season_number' | 'episode_count'> & {
                  episodes: Maybe<
                    Array<Maybe<{ __typename?: 'Episode' } & Pick<Episode, 'id' | 'name' | 'episode_number'>>>
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type MovieQueryVariables = {
  id: Scalars['ID'];
};

export type MovieQuery = { __typename?: 'Query' } & {
  movie: Maybe<{ __typename?: 'Movie' } & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path'>>;
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
      }
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<
  Omit<ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>, 'mutation'>,
  'variables'
> & { variables?: LoginMutationVariables };

export const LoginComponent = (props: LoginComponentProps) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
);

export type LoginProps<TChildProps = {}> = Partial<ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(
    LoginDocument,
    {
      alias: 'withLogin',
      ...operationOptions,
    },
  );
}

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
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
      }
    }
  }
`;
export type RegisterMutationFn = ReactApollo.MutationFn<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<
  Omit<ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>, 'mutation'>,
  'variables'
> & { variables?: RegisterMutationVariables };

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
);

export type RegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(
    RegisterDocument,
    {
      alias: 'withRegister',
      ...operationOptions,
    },
  );
}

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return ReactApolloHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export const SetIsLoggedInDocument = gql`
  mutation SetIsLoggedIn($isLoggedIn: Boolean!) {
    setIsLoggedIn(isLoggedIn: $isLoggedIn) @client
  }
`;
export type SetIsLoggedInMutationFn = ReactApollo.MutationFn<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>;
export type SetIsLoggedInComponentProps = Omit<
  Omit<ReactApollo.MutationProps<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>, 'mutation'>,
  'variables'
> & { variables?: SetIsLoggedInMutationVariables };

export const SetIsLoggedInComponent = (props: SetIsLoggedInComponentProps) => (
  <ReactApollo.Mutation<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>
    mutation={SetIsLoggedInDocument}
    {...props}
  />
);

export type SetIsLoggedInProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>
> &
  TChildProps;
export function withSetIsLoggedIn<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SetIsLoggedInMutation,
    SetIsLoggedInMutationVariables,
    SetIsLoggedInProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<
    TProps,
    SetIsLoggedInMutation,
    SetIsLoggedInMutationVariables,
    SetIsLoggedInProps<TChildProps>
  >(SetIsLoggedInDocument, {
    alias: 'withSetIsLoggedIn',
    ...operationOptions,
  });
}

export function useSetIsLoggedInMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>,
) {
  return ReactApolloHooks.useMutation<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>(
    SetIsLoggedInDocument,
    baseOptions,
  );
}
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
export type SetUserDataMutationFn = ReactApollo.MutationFn<SetUserDataMutation, SetUserDataMutationVariables>;
export type SetUserDataComponentProps = Omit<
  Omit<ReactApollo.MutationProps<SetUserDataMutation, SetUserDataMutationVariables>, 'mutation'>,
  'variables'
> & { variables?: SetUserDataMutationVariables };

export const SetUserDataComponent = (props: SetUserDataComponentProps) => (
  <ReactApollo.Mutation<SetUserDataMutation, SetUserDataMutationVariables> mutation={SetUserDataDocument} {...props} />
);

export type SetUserDataProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SetUserDataMutation, SetUserDataMutationVariables>
> &
  TChildProps;
export function withSetUserData<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SetUserDataMutation,
    SetUserDataMutationVariables,
    SetUserDataProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<
    TProps,
    SetUserDataMutation,
    SetUserDataMutationVariables,
    SetUserDataProps<TChildProps>
  >(SetUserDataDocument, {
    alias: 'withSetUserData',
    ...operationOptions,
  });
}

export function useSetUserDataMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<SetUserDataMutation, SetUserDataMutationVariables>,
) {
  return ReactApolloHooks.useMutation<SetUserDataMutation, SetUserDataMutationVariables>(
    SetUserDataDocument,
    baseOptions,
  );
}
export const AddWatchedDocument = gql`
  mutation AddWatched(
    $itemId: ID!
    $mediaType: TmdbMediaType!
    $createdAt: Float!
    $rating: RatingInput
    $review: ReviewInput
  ) {
    addWatched(itemId: $itemId, mediaType: $mediaType, rating: $rating, review: $review, createdAt: $createdAt) {
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
export type AddWatchedMutationFn = ReactApollo.MutationFn<AddWatchedMutation, AddWatchedMutationVariables>;
export type AddWatchedComponentProps = Omit<
  Omit<ReactApollo.MutationProps<AddWatchedMutation, AddWatchedMutationVariables>, 'mutation'>,
  'variables'
> & { variables?: AddWatchedMutationVariables };

export const AddWatchedComponent = (props: AddWatchedComponentProps) => (
  <ReactApollo.Mutation<AddWatchedMutation, AddWatchedMutationVariables> mutation={AddWatchedDocument} {...props} />
);

export type AddWatchedProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddWatchedMutation, AddWatchedMutationVariables>
> &
  TChildProps;
export function withAddWatched<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddWatchedMutation,
    AddWatchedMutationVariables,
    AddWatchedProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<
    TProps,
    AddWatchedMutation,
    AddWatchedMutationVariables,
    AddWatchedProps<TChildProps>
  >(AddWatchedDocument, {
    alias: 'withAddWatched',
    ...operationOptions,
  });
}

export function useAddWatchedMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<AddWatchedMutation, AddWatchedMutationVariables>,
) {
  return ReactApolloHooks.useMutation<AddWatchedMutation, AddWatchedMutationVariables>(AddWatchedDocument, baseOptions);
}
export const WatchedDocument = gql`
  query Watched {
    allWatched {
      id
      tmdbId
    }
  }
`;
export type WatchedComponentProps = Omit<
  Omit<ReactApollo.QueryProps<WatchedQuery, WatchedQueryVariables>, 'query'>,
  'variables'
> & { variables?: WatchedQueryVariables };

export const WatchedComponent = (props: WatchedComponentProps) => (
  <ReactApollo.Query<WatchedQuery, WatchedQueryVariables> query={WatchedDocument} {...props} />
);

export type WatchedProps<TChildProps = {}> = Partial<ReactApollo.DataProps<WatchedQuery, WatchedQueryVariables>> &
  TChildProps;
export function withWatched<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    WatchedQuery,
    WatchedQueryVariables,
    WatchedProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<TProps, WatchedQuery, WatchedQueryVariables, WatchedProps<TChildProps>>(
    WatchedDocument,
    {
      alias: 'withWatched',
      ...operationOptions,
    },
  );
}

export function useWatchedQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<WatchedQueryVariables>) {
  return ReactApolloHooks.useQuery<WatchedQuery, WatchedQueryVariables>(WatchedDocument, baseOptions);
}
export const UserWatchedDocument = gql`
  query UserWatched($id: ID!) {
    user(id: $id) {
      id
      name
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
`;
export type UserWatchedComponentProps = Omit<
  Omit<ReactApollo.QueryProps<UserWatchedQuery, UserWatchedQueryVariables>, 'query'>,
  'variables'
> & { variables: UserWatchedQueryVariables };

export const UserWatchedComponent = (props: UserWatchedComponentProps) => (
  <ReactApollo.Query<UserWatchedQuery, UserWatchedQueryVariables> query={UserWatchedDocument} {...props} />
);

export type UserWatchedProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<UserWatchedQuery, UserWatchedQueryVariables>
> &
  TChildProps;
export function withUserWatched<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UserWatchedQuery,
    UserWatchedQueryVariables,
    UserWatchedProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<TProps, UserWatchedQuery, UserWatchedQueryVariables, UserWatchedProps<TChildProps>>(
    UserWatchedDocument,
    {
      alias: 'withUserWatched',
      ...operationOptions,
    },
  );
}

export function useUserWatchedQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<UserWatchedQueryVariables>) {
  return ReactApolloHooks.useQuery<UserWatchedQuery, UserWatchedQueryVariables>(UserWatchedDocument, baseOptions);
}
export const IsUserLoggedInDocument = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export type IsUserLoggedInComponentProps = Omit<
  Omit<ReactApollo.QueryProps<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>, 'query'>,
  'variables'
> & { variables?: IsUserLoggedInQueryVariables };

export const IsUserLoggedInComponent = (props: IsUserLoggedInComponentProps) => (
  <ReactApollo.Query<IsUserLoggedInQuery, IsUserLoggedInQueryVariables> query={IsUserLoggedInDocument} {...props} />
);

export type IsUserLoggedInProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>
> &
  TChildProps;
export function withIsUserLoggedIn<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables,
    IsUserLoggedInProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables,
    IsUserLoggedInProps<TChildProps>
  >(IsUserLoggedInDocument, {
    alias: 'withIsUserLoggedIn',
    ...operationOptions,
  });
}

export function useIsUserLoggedInQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<IsUserLoggedInQueryVariables>) {
  return ReactApolloHooks.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(
    IsUserLoggedInDocument,
    baseOptions,
  );
}
export const UserDataDocument = gql`
  query UserData {
    userData @client {
      id
      name
      email
      createdAt
    }
  }
`;
export type UserDataComponentProps = Omit<
  Omit<ReactApollo.QueryProps<UserDataQuery, UserDataQueryVariables>, 'query'>,
  'variables'
> & { variables?: UserDataQueryVariables };

export const UserDataComponent = (props: UserDataComponentProps) => (
  <ReactApollo.Query<UserDataQuery, UserDataQueryVariables> query={UserDataDocument} {...props} />
);

export type UserDataProps<TChildProps = {}> = Partial<ReactApollo.DataProps<UserDataQuery, UserDataQueryVariables>> &
  TChildProps;
export function withUserData<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UserDataQuery,
    UserDataQueryVariables,
    UserDataProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<TProps, UserDataQuery, UserDataQueryVariables, UserDataProps<TChildProps>>(
    UserDataDocument,
    {
      alias: 'withUserData',
      ...operationOptions,
    },
  );
}

export function useUserDataQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<UserDataQueryVariables>) {
  return ReactApolloHooks.useQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
}
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
  Omit<ReactApollo.QueryProps<SearchContentQuery, SearchContentQueryVariables>, 'query'>,
  'variables'
> & { variables: SearchContentQueryVariables };

export const SearchContentComponent = (props: SearchContentComponentProps) => (
  <ReactApollo.Query<SearchContentQuery, SearchContentQueryVariables> query={SearchContentDocument} {...props} />
);

export type SearchContentProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<SearchContentQuery, SearchContentQueryVariables>
> &
  TChildProps;
export function withSearchContent<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SearchContentQuery,
    SearchContentQueryVariables,
    SearchContentProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    SearchContentQuery,
    SearchContentQueryVariables,
    SearchContentProps<TChildProps>
  >(SearchContentDocument, {
    alias: 'withSearchContent',
    ...operationOptions,
  });
}

export function useSearchContentQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<SearchContentQueryVariables>) {
  return ReactApolloHooks.useQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, baseOptions);
}
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
export type TvComponentProps = Omit<Omit<ReactApollo.QueryProps<TvQuery, TvQueryVariables>, 'query'>, 'variables'> & {
  variables: TvQueryVariables;
};

export const TvComponent = (props: TvComponentProps) => (
  <ReactApollo.Query<TvQuery, TvQueryVariables> query={TvDocument} {...props} />
);

export type TvProps<TChildProps = {}> = Partial<ReactApollo.DataProps<TvQuery, TvQueryVariables>> & TChildProps;
export function withTv<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<TProps, TvQuery, TvQueryVariables, TvProps<TChildProps>>,
) {
  return ReactApollo.withQuery<TProps, TvQuery, TvQueryVariables, TvProps<TChildProps>>(TvDocument, {
    alias: 'withTv',
    ...operationOptions,
  });
}

export function useTvQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<TvQueryVariables>) {
  return ReactApolloHooks.useQuery<TvQuery, TvQueryVariables>(TvDocument, baseOptions);
}
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
  Omit<ReactApollo.QueryProps<MovieQuery, MovieQueryVariables>, 'query'>,
  'variables'
> & { variables: MovieQueryVariables };

export const MovieComponent = (props: MovieComponentProps) => (
  <ReactApollo.Query<MovieQuery, MovieQueryVariables> query={MovieDocument} {...props} />
);

export type MovieProps<TChildProps = {}> = Partial<ReactApollo.DataProps<MovieQuery, MovieQueryVariables>> &
  TChildProps;
export function withMovie<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<TProps, MovieQuery, MovieQueryVariables, MovieProps<TChildProps>>,
) {
  return ReactApollo.withQuery<TProps, MovieQuery, MovieQueryVariables, MovieProps<TChildProps>>(MovieDocument, {
    alias: 'withMovie',
    ...operationOptions,
  });
}

export function useMovieQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<MovieQueryVariables>) {
  return ReactApolloHooks.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
}
