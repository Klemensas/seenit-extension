import * as React from 'react';
import Select from 'react-select';

import { TmdbMovie, TmdbTv, useSearchContentQuery } from '../graphql';

export interface SearchOption {
  label: string;
  value: string | number;
}

const Search: React.FC<{ setSelected: React.Dispatch<React.SetStateAction<TmdbMovie | TmdbTv>> }> = ({
  setSelected,
}) => {
  const [query, setQuery] = React.useState('');

  const searchQuery = useSearchContentQuery({
    variables: { title: query },
    skip: !query,
  });
  const options =
    searchQuery.data && searchQuery.data.searchContent
      ? searchQuery.data.searchContent.results.reduce(
          (acc: SearchOption[], item) =>
            item.media_type === 'person'
              ? acc
              : acc.concat({
                  label: `${(item as TmdbTv).name || (item as TmdbMovie).title} (${
                    ((item as TmdbMovie).release_date || (item as TmdbTv).first_air_date || '').split('-')[0]
                  })`,
                  value: item.id,
                  ...item,
                }),
          [],
        )
      : [];

  return (
    <Select
      cacheOptions
      inputValue={query}
      isLoading={searchQuery.loading}
      options={options}
      placeholder="Search..."
      noOptionsMessage={() => (query ? 'No options' : 'Enter a query to search')}
      onChange={(value: any) => setSelected(value)}
      onInputChange={(value, { action }) => {
        if (action === 'input-change' || action === 'set-value') {
          setQuery(value);
        }
      }}
    />
  );
};

export default Search;
