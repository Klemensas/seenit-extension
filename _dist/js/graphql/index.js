"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeLazyQuery = exports.useMeQuery = exports.withMe = exports.MeComponent = exports.MeDocument = exports.useSettingsLazyQuery = exports.useSettingsQuery = exports.withSettings = exports.SettingsComponent = exports.SettingsDocument = exports.useMovieLazyQuery = exports.useMovieQuery = exports.withMovie = exports.MovieComponent = exports.MovieDocument = exports.useTvLazyQuery = exports.useTvQuery = exports.withTv = exports.TvComponent = exports.TvDocument = exports.useSearchContentLazyQuery = exports.useSearchContentQuery = exports.withSearchContent = exports.SearchContentComponent = exports.SearchContentDocument = exports.useUserDataLazyQuery = exports.useUserDataQuery = exports.withUserData = exports.UserDataComponent = exports.UserDataDocument = exports.useIsUserLoggedInLazyQuery = exports.useIsUserLoggedInQuery = exports.withIsUserLoggedIn = exports.IsUserLoggedInComponent = exports.IsUserLoggedInDocument = exports.useUserWatchedLazyQuery = exports.useUserWatchedQuery = exports.withUserWatched = exports.UserWatchedComponent = exports.UserWatchedDocument = exports.useUpdateSettingsMutation = exports.withUpdateSettings = exports.UpdateSettingsComponent = exports.UpdateSettingsDocument = exports.useAddAutoTrackedMutation = exports.withAddAutoTracked = exports.AddAutoTrackedComponent = exports.AddAutoTrackedDocument = exports.useAddWatchedMutation = exports.withAddWatched = exports.AddWatchedComponent = exports.AddWatchedDocument = exports.useSetUserDataMutation = exports.withSetUserData = exports.SetUserDataComponent = exports.SetUserDataDocument = exports.useLogoutMutation = exports.withLogout = exports.LogoutComponent = exports.LogoutDocument = exports.useRegisterMutation = exports.withRegister = exports.RegisterComponent = exports.RegisterDocument = exports.useLoginMutation = exports.withLogin = exports.LoginComponent = exports.LoginDocument = exports.CacheControlScope = exports.TmdbMediaType = exports.TvItemType = exports.ItemType = void 0;
const graphql_tag_1 = require("graphql-tag");
const React = require("react");
const ApolloReactComponents = require("@apollo/react-components");
const ApolloReactHoc = require("@apollo/react-hoc");
const ApolloReactHooks = require("@apollo/react-hooks");
var ItemType;
(function (ItemType) {
    ItemType["Movie"] = "Movie";
    ItemType["Tv"] = "Tv";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var TvItemType;
(function (TvItemType) {
    TvItemType["Season"] = "Season";
    TvItemType["Episode"] = "Episode";
})(TvItemType = exports.TvItemType || (exports.TvItemType = {}));
var TmdbMediaType;
(function (TmdbMediaType) {
    TmdbMediaType["Movie"] = "Movie";
    TmdbMediaType["Tv"] = "Tv";
})(TmdbMediaType = exports.TmdbMediaType || (exports.TmdbMediaType = {}));
var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Public"] = "PUBLIC";
    CacheControlScope["Private"] = "PRIVATE";
})(CacheControlScope = exports.CacheControlScope || (exports.CacheControlScope = {}));
exports.LoginDocument = graphql_tag_1.default `
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
exports.LoginComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.LoginDocument }, props)));
function withLogin(operationOptions) {
    return ApolloReactHoc.withMutation(exports.LoginDocument, Object.assign({ alias: 'login' }, operationOptions));
}
exports.withLogin = withLogin;
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
function useLoginMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.LoginDocument, baseOptions);
}
exports.useLoginMutation = useLoginMutation;
exports.RegisterDocument = graphql_tag_1.default `
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
exports.RegisterComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.RegisterDocument }, props)));
function withRegister(operationOptions) {
    return ApolloReactHoc.withMutation(exports.RegisterDocument, Object.assign({ alias: 'register' }, operationOptions));
}
exports.withRegister = withRegister;
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
function useRegisterMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.RegisterDocument, baseOptions);
}
exports.useRegisterMutation = useRegisterMutation;
exports.LogoutDocument = graphql_tag_1.default `
  mutation Logout {
    logout @client
  }
`;
exports.LogoutComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.LogoutDocument }, props)));
function withLogout(operationOptions) {
    return ApolloReactHoc.withMutation(exports.LogoutDocument, Object.assign({ alias: 'logout' }, operationOptions));
}
exports.withLogout = withLogout;
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
function useLogoutMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.LogoutDocument, baseOptions);
}
exports.useLogoutMutation = useLogoutMutation;
exports.SetUserDataDocument = graphql_tag_1.default `
  mutation SetUserData($userData: UserInput!) {
    setUserData(userData: $userData) @client {
      id
      name
      email
      createdAt
    }
  }
`;
exports.SetUserDataComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.SetUserDataDocument }, props)));
function withSetUserData(operationOptions) {
    return ApolloReactHoc.withMutation(exports.SetUserDataDocument, Object.assign({ alias: 'setUserData' }, operationOptions));
}
exports.withSetUserData = withSetUserData;
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
function useSetUserDataMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.SetUserDataDocument, baseOptions);
}
exports.useSetUserDataMutation = useSetUserDataMutation;
exports.AddWatchedDocument = graphql_tag_1.default `
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
exports.AddWatchedComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.AddWatchedDocument }, props)));
function withAddWatched(operationOptions) {
    return ApolloReactHoc.withMutation(exports.AddWatchedDocument, Object.assign({ alias: 'addWatched' }, operationOptions));
}
exports.withAddWatched = withAddWatched;
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
function useAddWatchedMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AddWatchedDocument, baseOptions);
}
exports.useAddWatchedMutation = useAddWatchedMutation;
exports.AddAutoTrackedDocument = graphql_tag_1.default `
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
exports.AddAutoTrackedComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.AddAutoTrackedDocument }, props)));
function withAddAutoTracked(operationOptions) {
    return ApolloReactHoc.withMutation(exports.AddAutoTrackedDocument, Object.assign({ alias: 'addAutoTracked' }, operationOptions));
}
exports.withAddAutoTracked = withAddAutoTracked;
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
function useAddAutoTrackedMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AddAutoTrackedDocument, baseOptions);
}
exports.useAddAutoTrackedMutation = useAddAutoTrackedMutation;
exports.UpdateSettingsDocument = graphql_tag_1.default `
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
exports.UpdateSettingsComponent = (props) => (React.createElement(ApolloReactComponents.Mutation, Object.assign({ mutation: exports.UpdateSettingsDocument }, props)));
function withUpdateSettings(operationOptions) {
    return ApolloReactHoc.withMutation(exports.UpdateSettingsDocument, Object.assign({ alias: 'updateSettings' }, operationOptions));
}
exports.withUpdateSettings = withUpdateSettings;
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
function useUpdateSettingsMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.UpdateSettingsDocument, baseOptions);
}
exports.useUpdateSettingsMutation = useUpdateSettingsMutation;
exports.UserWatchedDocument = graphql_tag_1.default `
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
exports.UserWatchedComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.UserWatchedDocument }, props)));
function withUserWatched(operationOptions) {
    return ApolloReactHoc.withQuery(exports.UserWatchedDocument, Object.assign({ alias: 'userWatched' }, operationOptions));
}
exports.withUserWatched = withUserWatched;
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
function useUserWatchedQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.UserWatchedDocument, baseOptions);
}
exports.useUserWatchedQuery = useUserWatchedQuery;
function useUserWatchedLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.UserWatchedDocument, baseOptions);
}
exports.useUserWatchedLazyQuery = useUserWatchedLazyQuery;
exports.IsUserLoggedInDocument = graphql_tag_1.default `
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
exports.IsUserLoggedInComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.IsUserLoggedInDocument }, props)));
function withIsUserLoggedIn(operationOptions) {
    return ApolloReactHoc.withQuery(exports.IsUserLoggedInDocument, Object.assign({ alias: 'isUserLoggedIn' }, operationOptions));
}
exports.withIsUserLoggedIn = withIsUserLoggedIn;
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
function useIsUserLoggedInQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.IsUserLoggedInDocument, baseOptions);
}
exports.useIsUserLoggedInQuery = useIsUserLoggedInQuery;
function useIsUserLoggedInLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.IsUserLoggedInDocument, baseOptions);
}
exports.useIsUserLoggedInLazyQuery = useIsUserLoggedInLazyQuery;
exports.UserDataDocument = graphql_tag_1.default `
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
exports.UserDataComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.UserDataDocument }, props)));
function withUserData(operationOptions) {
    return ApolloReactHoc.withQuery(exports.UserDataDocument, Object.assign({ alias: 'userData' }, operationOptions));
}
exports.withUserData = withUserData;
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
function useUserDataQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.UserDataDocument, baseOptions);
}
exports.useUserDataQuery = useUserDataQuery;
function useUserDataLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.UserDataDocument, baseOptions);
}
exports.useUserDataLazyQuery = useUserDataLazyQuery;
exports.SearchContentDocument = graphql_tag_1.default `
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
exports.SearchContentComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.SearchContentDocument }, props)));
function withSearchContent(operationOptions) {
    return ApolloReactHoc.withQuery(exports.SearchContentDocument, Object.assign({ alias: 'searchContent' }, operationOptions));
}
exports.withSearchContent = withSearchContent;
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
function useSearchContentQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SearchContentDocument, baseOptions);
}
exports.useSearchContentQuery = useSearchContentQuery;
function useSearchContentLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SearchContentDocument, baseOptions);
}
exports.useSearchContentLazyQuery = useSearchContentLazyQuery;
exports.TvDocument = graphql_tag_1.default `
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
exports.TvComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.TvDocument }, props)));
function withTv(operationOptions) {
    return ApolloReactHoc.withQuery(exports.TvDocument, Object.assign({ alias: 'tv' }, operationOptions));
}
exports.withTv = withTv;
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
function useTvQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.TvDocument, baseOptions);
}
exports.useTvQuery = useTvQuery;
function useTvLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.TvDocument, baseOptions);
}
exports.useTvLazyQuery = useTvLazyQuery;
exports.MovieDocument = graphql_tag_1.default `
  query Movie($id: ID!) {
    movie(id: $id) {
      id
      title
      release_date
      poster_path
    }
  }
`;
exports.MovieComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.MovieDocument }, props)));
function withMovie(operationOptions) {
    return ApolloReactHoc.withQuery(exports.MovieDocument, Object.assign({ alias: 'movie' }, operationOptions));
}
exports.withMovie = withMovie;
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
function useMovieQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.MovieDocument, baseOptions);
}
exports.useMovieQuery = useMovieQuery;
function useMovieLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.MovieDocument, baseOptions);
}
exports.useMovieLazyQuery = useMovieLazyQuery;
exports.SettingsDocument = graphql_tag_1.default `
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
exports.SettingsComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.SettingsDocument }, props)));
function withSettings(operationOptions) {
    return ApolloReactHoc.withQuery(exports.SettingsDocument, Object.assign({ alias: 'settings' }, operationOptions));
}
exports.withSettings = withSettings;
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
function useSettingsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SettingsDocument, baseOptions);
}
exports.useSettingsQuery = useSettingsQuery;
function useSettingsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SettingsDocument, baseOptions);
}
exports.useSettingsLazyQuery = useSettingsLazyQuery;
exports.MeDocument = graphql_tag_1.default `
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
exports.MeComponent = (props) => (React.createElement(ApolloReactComponents.Query, Object.assign({ query: exports.MeDocument }, props)));
function withMe(operationOptions) {
    return ApolloReactHoc.withQuery(exports.MeDocument, Object.assign({ alias: 'me' }, operationOptions));
}
exports.withMe = withMe;
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
function useMeQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.MeDocument, baseOptions);
}
exports.useMeQuery = useMeQuery;
function useMeLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.MeDocument, baseOptions);
}
exports.useMeLazyQuery = useMeLazyQuery;
//# sourceMappingURL=index.js.map