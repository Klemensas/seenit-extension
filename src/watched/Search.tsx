import * as React from 'react';
import { Button, MenuItem, PopoverPosition } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import { useSearchContentQuery, SearchItem } from '../graphql';

export interface SearchOption {
  label: string;
  value: string | number;
  item: SearchItem;
}


const renderOption = ({ label, item }, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) { return null; }

  return (
    <MenuItem
      active={modifiers.active}
      key={item.id}
      text={label}
      onClick={handleClick}
    />
  );
};

const Search: React.FC<{
  selected?: SearchItem,
  setSelected: React.Dispatch<React.SetStateAction<SearchItem>>,
}> = ({
  selected,
  setSelected,
}) => {
  const [query, setQuery] = React.useState('');

  const searchQuery = useSearchContentQuery({
    variables: { title: query },
    skip: !query,
  });
  const options = searchQuery.data && searchQuery.data.searchContent
    ? searchQuery.data.searchContent.reduce(
        (acc: SearchOption[], item) =>
          acc.concat({
            label: `${item.title} (${
              (item.release_date || '?').split('-')[0]
            })`,
            value: item.id,
            item,
          }),
        [],
      )
    : [];

  return (
    <Select<SearchOption>
      itemRenderer={renderOption}
      items={options}
      onQueryChange={(payload: string) => setQuery(payload)}
      onItemSelect={({ item }) => setSelected(item)}
      noResults={<div>Got nothing :(</div>}
      initialContent={null}
      popoverProps={{
        minimal: true,
        fill: true,
        usePortal: false,
        position: PopoverPosition.BOTTOM,
      }}
      className="select-popover-centered"
    >
      <Button
        loading={searchQuery.loading}
        large
        minimal
        text={selected ? selected.title : "Search..."}
        className="bp3-fill"
      />
    </Select>
  );
};

export default Search;
