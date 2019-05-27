import * as React from 'react';
import ApolloClient from 'apollo-client';
import { useApolloClient } from 'react-apollo-hooks';
import AsyncSelect from 'react-select/lib/Async';

import { SearchContentDocument } from '../graphql';
import { WatchedForm } from './WatchedForm';

async function searchQuery(state, setState, client: ApolloClient<any>) {
  const loadState = {
    ...state,
    loading: true,
    error: null,
    data: [],
  };
  setState(loadState);
  const { data, errors } = await client.query({
    query: SearchContentDocument,
    variables: { title: state.query },
  });
  if (errors) {
    setState({ ...loadState, loading: false, error: errors });
    return [];
  }
  const options = data.searchContent.results.reduce((acc, item) => item.media_type === 'person' ? acc : acc.concat({
    value: item.id,
    label: `${item.name || item.title} (${(item.release_date || item.first_air_date || '').split('-')[0]})`,
    ...item,
  }), []);
  setState({ ...loadState, loading: false, data: options });
  return options;
}

export default function Search() {
  const [searchState, setSearchState] = React.useState({
    loading: false,
    query: '',
    data: [],
    error: null,
  });
  const [selectedItem, setSelectedItem] = React.useState(null);
  // const options = searchState.data.reduce((acc, item) => item.media_type === 'person' ? acc : [...acc, {
  //   ...item,
  //   displayName: item.name || item.title,
  //   displayYear: (item.release_date || item.first_air_date || '').split('-')[0]
  // }], []);
  const client = useApolloClient();

  return (
    <React.Fragment>
      <AsyncSelect
        cacheOptions={true}
        defaultOptions={searchState.data}
        inputValue={searchState.query}
        noOptionsMessage={() => searchState.query ? 'No options' : 'Enter a query to search'}
        loadOptions={query => searchQuery(searchState, setSearchState, client)}
        onChange={(query, { action }) => setSelectedItem(query)}
        onInputChange={(query, { action }) => {
          if (action === 'input-change') { setSearchState({ ...searchState, query }) }
        } }
      />
      {selectedItem ? (<WatchedForm item={selectedItem} />) : ''}
    </React.Fragment>
  );
}
