import * as React from 'react';
import Select from 'react-select';

import { TmdbMovie, TmdbTv, TmdbMediaType, useTvQuery, useSearchContentQuery } from '../graphql';
import WatchedForm from './WatchedForm';

export interface SearchOption {
  label: string;
  value: string | number;
}

export default function Search(): React.ReactElement {
  const [query, setQuery] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<TmdbMovie | TmdbTv>(null);

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

  const tvQuery = useTvQuery({
    variables: { tmdbId: selectedItem ? selectedItem.id : null },
    skip: !selectedItem || selectedItem.media_type !== TmdbMediaType.Tv,
  });
  const seasons = tvQuery.data && tvQuery.data.tv ? tvQuery.data.tv.seasons : null;

  return (
    <React.Fragment>
      <Select
        cacheOptions
        inputValue={query}
        isLoading={searchQuery.loading}
        options={options}
        noOptionsMessage={() => (query ? 'No options' : 'Enter a query to search')}
        onChange={value => setSelectedItem(value)}
        onInputChange={(value, { action }) => {
          if (action === 'input-change' || action === 'set-value') {
            setQuery(value);
          }
        }}
      />
      {selectedItem && !tvQuery.loading ? (
        <WatchedForm item={selectedItem} seasons={selectedItem.media_type === TmdbMediaType.Tv ? seasons : null} />
      ) : (
        ''
      )}
    </React.Fragment>
  );
}
