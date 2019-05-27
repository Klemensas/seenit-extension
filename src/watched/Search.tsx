import * as React from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import AsyncSelect from 'react-select/async';
import ApolloClient from 'apollo-client';

import {
  SearchContentDocument,
  SearchContentQuery,
  TmdbMovie,
  TmdbTv,
} from '../graphql';
import WatchedForm from './WatchedForm';

export interface SearchOption {
  label: string;
  value: string | number;
}

async function searchQuery(state, setState, client: ApolloClient<unknown>) {
  const loadState = {
    ...state,
    data: [],
    error: null,
    loading: true,
  };
  setState(loadState);
  const { data, errors } = await client.query<SearchContentQuery>({
    query: SearchContentDocument,
    variables: { title: state.query },
  });
  if (errors) {
    setState({ ...loadState, loading: false, error: errors });
    return [];
  }
  const options = data.searchContent.results.reduce(
    (acc: SearchOption[], item) =>
      item.media_type === 'person'
        ? acc
        : acc.concat({
            label: `${(item as TmdbTv).name || (item as TmdbMovie).title} (${
              (
                (item as TmdbMovie).release_date ||
                (item as TmdbTv).first_air_date ||
                ''
              ).split('-')[0]
            })`,
            value: item.id,
            ...item,
          }),
    [],
  );
  setState({ ...loadState, loading: false, data: options });
  return options;
}

export default function Search(): React.ReactElement {
  const [searchState, setSearchState] = React.useState({
    data: [],
    error: null,
    loading: false,
    query: '',
  });
  const [selectedItem, setSelectedItem] = React.useState(null);
  const client = useApolloClient();

  return (
    <React.Fragment>
      <AsyncSelect
        cacheOptions
        defaultOptions={searchState.data}
        inputValue={searchState.query}
        noOptionsMessage={() =>
          searchState.query ? 'No options' : 'Enter a query to search'
        }
        loadOptions={() => searchQuery(searchState, setSearchState, client)}
        onChange={query => setSelectedItem(query)}
        onInputChange={(query, { action }) => {
          if (action === 'input-change') {
            setSearchState({ ...searchState, query });
          }
        }}
      />
      {selectedItem ? <WatchedForm item={selectedItem} /> : ''}
    </React.Fragment>
  );
}
