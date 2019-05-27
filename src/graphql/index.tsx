import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
import * as ReactApolloHooks from 'react-apollo-hooks';

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

export interface Author {
  id?: Maybe<Scalars['Int']>;
  credit_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  profile_path?: Maybe<Scalars['String']>;
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export interface Collection {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
}

export interface Company {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
}

export interface Country {
  iso_3166_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}

export interface Episode {
  id?: Maybe<Scalars['Int']>;
  air_date?: Maybe<Scalars['String']>;
  episode_number?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  production_code?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
  show_id?: Maybe<Scalars['Int']>;
  still_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
}

export interface Genre {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
}

export type Item = Movie | Tv;

export enum ItemType {
  Movie = 'Movie',
  Tv = 'Tv',
}

export interface Language {
  iso_639_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}

export interface LocalAuth {
  user: User;
  token: Scalars['String'];
}

export interface Movie {
  id: Scalars['ID'];
  adult?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  belongs_to_collection?: Maybe<Collection>;
  budget?: Maybe<Scalars['Int']>;
  genre?: Maybe<Maybe<Genre>[]>;
  homepage?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Maybe<Company>[]>;
  production_countries?: Maybe<Maybe<Country>[]>;
  release_date?: Maybe<Scalars['String']>;
  revenue?: Maybe<Scalars['Int']>;
  runtime?: Maybe<Scalars['Int']>;
  spoken_languages?: Maybe<Maybe<Language>[]>;
  status?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  tmdbId?: Maybe<Scalars['Int']>;
}

export interface Mutation {
  _?: Maybe<Scalars['Boolean']>;
  addWatched: Watched;
  register: LocalAuth;
  login: LocalAuth;
  setIsLoggedIn: Scalars['Boolean'];
  setUserData: User;
}

export interface MutationAddWatchedArgs {
  tmdbId: Scalars['Int'];
  mediaType: TmdbMediaType;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  createdAt?: Maybe<Scalars['Float']>;
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

export interface MutationSetUserDataArgs {
  userData: UserInput;
}

export interface Network {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
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
  userData: User;
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

export interface Rating {
  id: Scalars['ID'];
  value: Scalars['Float'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  user?: Maybe<User>;
  watched?: Maybe<Watched>;
}

export interface RatingInput {
  value: Scalars['Float'];
}

export interface Review {
  id: Scalars['ID'];
  body: Scalars['String'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  user?: Maybe<User>;
  watched?: Maybe<Watched>;
}

export interface ReviewInput {
  body: Scalars['String'];
}

export interface Season {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  air_date?: Maybe<Scalars['String']>;
  episode_count?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
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

export interface Tv {
  id: Scalars['ID'];
  backdrop_path?: Maybe<Scalars['String']>;
  created_by?: Maybe<Maybe<Author>[]>;
  episode_run_time?: Maybe<Maybe<Scalars['Int']>[]>;
  first_air_date?: Maybe<Scalars['String']>;
  genres?: Maybe<Maybe<Genre>[]>;
  homepage?: Maybe<Scalars['String']>;
  in_production?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Maybe<Scalars['String']>[]>;
  last_air_date?: Maybe<Scalars['String']>;
  last_episode_to_air?: Maybe<Episode>;
  name?: Maybe<Scalars['String']>;
  next_episode_to_air?: Maybe<Episode>;
  networks?: Maybe<Maybe<Network>[]>;
  number_of_episodes?: Maybe<Scalars['Int']>;
  number_of_seasons?: Maybe<Scalars['Int']>;
  origin_country?: Maybe<Maybe<Scalars['String']>[]>;
  original_language?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Maybe<Company>[]>;
  seasons?: Maybe<Maybe<Season>[]>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  tmdbId?: Maybe<Scalars['Int']>;
}

export interface User {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  watched?: Maybe<Watched[]>;
}

export interface UserInput {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
}

export interface Watched {
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
}
export interface LoginMutationVariables {
  email: Scalars['String'];
  password: Scalars['String'];
}

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<
        User,
        'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
      >;
    };
};

export interface RegisterMutationVariables {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<
        User,
        'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
      >;
    };
};

export interface SetIsLoggedInMutationVariables {
  isLoggedIn: Scalars['Boolean'];
}

export type SetIsLoggedInMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'setIsLoggedIn'
>;

export interface SetUserDataMutationVariables {
  userData: UserInput;
}

export type SetUserDataMutation = { __typename?: 'Mutation' } & {
  setUserData: { __typename?: 'User' } & Pick<
    User,
    'id' | 'name' | 'email' | 'createdAt'
  >;
};

export interface AddWatchedMutationVariables {
  tmdbId: Scalars['Int'];
  mediaType: TmdbMediaType;
  createdAt: Scalars['Float'];
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
}

export type AddWatchedMutation = { __typename?: 'Mutation' } & {
  addWatched: { __typename?: 'Watched' } & Pick<
    Watched,
    'id' | 'tmdbId' | 'createdAt'
  > & {
      rating: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'value'>>;
      review: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
    };
};

export interface WatchedQueryVariables {}

export type WatchedQuery = { __typename?: 'Query' } & {
  allWatched: Maybe<
    ({ __typename?: 'Watched' } & Pick<Watched, 'id' | 'tmdbId'>)[]
  >;
};

export interface UserWatchedQueryVariables {
  id: Scalars['ID'];
}

export type UserWatchedQuery = { __typename?: 'Query' } & {
  user: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'name'> & {
        watched: Maybe<
          Array<
            { __typename?: 'Watched' } & Pick<
              Watched,
              'id' | 'tmdbId' | 'createdAt' | 'itemType'
            > & {
                rating: Maybe<
                  { __typename?: 'Rating' } & Pick<Rating, 'value'>
                >;
                review: Maybe<{ __typename?: 'Review' } & Pick<Review, 'body'>>;
                item: Maybe<
                  | ({ __typename?: 'Movie' } & Pick<
                      Movie,
                      'id' | 'title' | 'release_date' | 'poster_path'
                    >)
                  | ({ __typename?: 'Tv' } & Pick<
                      Tv,
                      'id' | 'name' | 'first_air_date' | 'poster_path'
                    >)
                >;
              }
          >
        >;
      }
  >;
};

export interface IsUserLoggedInQueryVariables {}

export type IsUserLoggedInQuery = { __typename?: 'Query' } & Pick<
  Query,
  'isLoggedIn'
>;

export interface UserDataQueryVariables {}

export type UserDataQuery = { __typename?: 'Query' } & {
  userData: { __typename?: 'User' } & Pick<
    User,
    'id' | 'name' | 'email' | 'createdAt'
  >;
};

export interface SearchContentQueryVariables {
  title: Scalars['String'];
}

export type SearchContentQuery = { __typename?: 'Query' } & {
  searchContent: Maybe<
    { __typename?: 'TmdbSearch' } & Pick<
      TmdbSearch,
      'total_pages' | 'total_results' | 'page'
    > & {
        results: Maybe<
          (
            | ({ __typename?: 'TmdbMovie' } & Pick<
                TmdbMovie,
                'id' | 'title' | 'media_type' | 'poster_path' | 'release_date'
              >)
            | ({ __typename?: 'TmdbTv' } & Pick<
                TmdbTv,
                'id' | 'name' | 'media_type' | 'poster_path' | 'first_air_date'
              >)
            | ({ __typename?: 'TmdbPerson' } & Pick<
                TmdbPerson,
                'id' | 'media_type'
              >))[]
        >;
      }
  >;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export const LoginComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
      'mutation'
    >,
    'variables'
  > & { variables?: LoginMutationVariables },
) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: 'withLogin',
    ...operationOptions,
  });
}

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  );
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
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;

export const RegisterComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>,
      'mutation'
    >,
    'variables'
  > & { variables?: RegisterMutationVariables },
) => (
  <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
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
  return ReactApollo.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: 'withRegister',
    ...operationOptions,
  });
}

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export const SetIsLoggedInDocument = gql`
  mutation SetIsLoggedIn($isLoggedIn: Boolean!) {
    setIsLoggedIn(isLoggedIn: $isLoggedIn) @client
  }
`;
export type SetIsLoggedInMutationFn = ReactApollo.MutationFn<
  SetIsLoggedInMutation,
  SetIsLoggedInMutationVariables
>;

export const SetIsLoggedInComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        SetIsLoggedInMutation,
        SetIsLoggedInMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: SetIsLoggedInMutationVariables },
) => (
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
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SetIsLoggedInMutation,
    SetIsLoggedInMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    SetIsLoggedInMutation,
    SetIsLoggedInMutationVariables
  >(SetIsLoggedInDocument, baseOptions);
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
export type SetUserDataMutationFn = ReactApollo.MutationFn<
  SetUserDataMutation,
  SetUserDataMutationVariables
>;

export const SetUserDataComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        SetUserDataMutation,
        SetUserDataMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: SetUserDataMutationVariables },
) => (
  <ReactApollo.Mutation<SetUserDataMutation, SetUserDataMutationVariables>
    mutation={SetUserDataDocument}
    {...props}
  />
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
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SetUserDataMutation,
    SetUserDataMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    SetUserDataMutation,
    SetUserDataMutationVariables
  >(SetUserDataDocument, baseOptions);
}
export const AddWatchedDocument = gql`
  mutation AddWatched(
    $tmdbId: Int!
    $mediaType: TmdbMediaType!
    $createdAt: Float!
    $rating: RatingInput
    $review: ReviewInput
  ) {
    addWatched(
      tmdbId: $tmdbId
      mediaType: $mediaType
      rating: $rating
      review: $review
      createdAt: $createdAt
    ) {
      id
      tmdbId
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
export type AddWatchedMutationFn = ReactApollo.MutationFn<
  AddWatchedMutation,
  AddWatchedMutationVariables
>;

export const AddWatchedComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        AddWatchedMutation,
        AddWatchedMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: AddWatchedMutationVariables },
) => (
  <ReactApollo.Mutation<AddWatchedMutation, AddWatchedMutationVariables>
    mutation={AddWatchedDocument}
    {...props}
  />
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
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddWatchedMutation,
    AddWatchedMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    AddWatchedMutation,
    AddWatchedMutationVariables
  >(AddWatchedDocument, baseOptions);
}
export const WatchedDocument = gql`
  query Watched {
    allWatched {
      id
      tmdbId
    }
  }
`;

export const WatchedComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<WatchedQuery, WatchedQueryVariables>, 'query'>,
    'variables'
  > & { variables?: WatchedQueryVariables },
) => (
  <ReactApollo.Query<WatchedQuery, WatchedQueryVariables>
    query={WatchedDocument}
    {...props}
  />
);

export type WatchedProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<WatchedQuery, WatchedQueryVariables>
> &
  TChildProps;
export function withWatched<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    WatchedQuery,
    WatchedQueryVariables,
    WatchedProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    WatchedQuery,
    WatchedQueryVariables,
    WatchedProps<TChildProps>
  >(WatchedDocument, {
    alias: 'withWatched',
    ...operationOptions,
  });
}

export function useWatchedQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<WatchedQueryVariables>,
) {
  return ReactApolloHooks.useQuery<WatchedQuery, WatchedQueryVariables>(
    WatchedDocument,
    baseOptions,
  );
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

export const UserWatchedComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<UserWatchedQuery, UserWatchedQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables: UserWatchedQueryVariables },
) => (
  <ReactApollo.Query<UserWatchedQuery, UserWatchedQueryVariables>
    query={UserWatchedDocument}
    {...props}
  />
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
  return ReactApollo.withQuery<
    TProps,
    UserWatchedQuery,
    UserWatchedQueryVariables,
    UserWatchedProps<TChildProps>
  >(UserWatchedDocument, {
    alias: 'withUserWatched',
    ...operationOptions,
  });
}

export function useUserWatchedQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UserWatchedQueryVariables>,
) {
  return ReactApolloHooks.useQuery<UserWatchedQuery, UserWatchedQueryVariables>(
    UserWatchedDocument,
    baseOptions,
  );
}
export const IsUserLoggedInDocument = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const IsUserLoggedInComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: IsUserLoggedInQueryVariables },
) => (
  <ReactApollo.Query<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>
    query={IsUserLoggedInDocument}
    {...props}
  />
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

export function useIsUserLoggedInQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IsUserLoggedInQueryVariables>,
) {
  return ReactApolloHooks.useQuery<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >(IsUserLoggedInDocument, baseOptions);
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

export const UserDataComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<UserDataQuery, UserDataQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: UserDataQueryVariables },
) => (
  <ReactApollo.Query<UserDataQuery, UserDataQueryVariables>
    query={UserDataDocument}
    {...props}
  />
);

export type UserDataProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<UserDataQuery, UserDataQueryVariables>
> &
  TChildProps;
export function withUserData<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UserDataQuery,
    UserDataQueryVariables,
    UserDataProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    UserDataQuery,
    UserDataQueryVariables,
    UserDataProps<TChildProps>
  >(UserDataDocument, {
    alias: 'withUserData',
    ...operationOptions,
  });
}

export function useUserDataQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UserDataQueryVariables>,
) {
  return ReactApolloHooks.useQuery<UserDataQuery, UserDataQueryVariables>(
    UserDataDocument,
    baseOptions,
  );
}
export const SearchContentDocument = gql`
  query SearchContent($title: String!) {
    searchContent(title: $title) {
      total_pages
      total_results
      page
      results {
        ... on TmdbMovie {
          id
          title
          media_type
          poster_path
          release_date
        }
        ... on TmdbTv {
          id
          name
          media_type
          poster_path
          first_air_date
        }
        ... on TmdbPerson {
          id
          media_type
        }
      }
    }
  }
`;

export const SearchContentComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<SearchContentQuery, SearchContentQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables: SearchContentQueryVariables },
) => (
  <ReactApollo.Query<SearchContentQuery, SearchContentQueryVariables>
    query={SearchContentDocument}
    {...props}
  />
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

export function useSearchContentQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<SearchContentQueryVariables>,
) {
  return ReactApolloHooks.useQuery<
    SearchContentQuery,
    SearchContentQueryVariables
  >(SearchContentDocument, baseOptions);
}
