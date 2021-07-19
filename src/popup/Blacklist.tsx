/* eslint-disable react/jsx-no-comment-textnodes */
import * as React from 'react';
import { InputGroup, Button, FormGroup, Intent, Callout, Colors } from '@blueprintjs/core';

const inputRegex = new RegExp(
  '^(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:\\*\\.?)?(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+((?:\\*)|(?:[a-z\\u00a1-\\uffff]{2,}\\.?)))(?::\\d{2,5})?(?:[/?#]\\S*)?$',
  'i',
);

function submitItem(
  value: string,
  list: string[],
  setValue: React.Dispatch<React.SetStateAction<string>>,
  updateList: (value: string[]) => void,
  setError: React.Dispatch<React.SetStateAction<string>>,
  hasClashing: boolean,
) {
  if (!value || !inputRegex.test(value)) {
    setError('Invalid address');
    return;
  }
  if (hasClashing) {
    setError('This address is already covered.');
    return;
  }

  const regexVal = `^${value
    .replace(/[.+?^${}()/|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .toLowerCase()}`;
  // TODO: consider one upping this by also seeing if it's already negated by some rule.
  if (list.includes(regexVal)) {
    setError('This address is already in the list.');
    return;
  }
  updateList([...list, regexVal]);
  setValue('');
}

interface BlacklistProps {
  id?: string;
  list: string[];
  updateList: (value: string[]) => void;
  helperTextPrefix?: React.ReactNode;
}

interface ListItem {
  matches: boolean;
  display: string;
}

const Blacklist = ({ id, list, updateList, helperTextPrefix }: BlacklistProps) => {
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState('');
  const { list: cleanList, hasClashing } = list.reduce(
    (acc: { list: ListItem[]; hasClashing: boolean }, item) => {
      const matches = !!input && new RegExp(item, 'i').test(input);
      acc.hasClashing = acc.hasClashing || !!matches;
      acc.list.push({
        matches,
        display: item.replace(/\^|\.(\*)|\\/g, '$1'),
      });

      return acc;
    },
    { list: [], hasClashing: false },
  );

  return (
    <React.Fragment>
      <FormGroup
        label="Blacklisted sites"
        labelFor="blacklist-input"
        helperText={
          <>
            {helperTextPrefix}
            <span>
              Supports basic wildcards, some supported examples:
              <br />
              youtube.*
              <br />
              *.google.com/video/*
              <br />
              netflix.com/watch/80186674
            </span>
          </>
        }
      >
        <InputGroup
          id={id}
          value={input}
          intent={error ? Intent.DANGER : Intent.NONE}
          placeholder="facebook.com/video/*"
          onChange={({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
            setInput(currentTarget.value);
            setError('');
          }}
          onKeyPress={(event) =>
            event.key === 'Enter'
              ? submitItem((event.target as HTMLInputElement).value, list, setInput, updateList, setError, hasClashing)
              : null
          }
          rightElement={
            <Button
              onClick={() => submitItem(input, list, setInput, updateList, setError, hasClashing)}
              icon="add"
              minimal
            />
          }
        />
        {error ? <Callout intent={Intent.DANGER}>{error}</Callout> : null}
      </FormGroup>
      <ul>
        {cleanList.map((item, i) => (
          <li key={item.display} style={{ color: item.matches ? Colors.RED1 : 'inherit' }}>
            {item.display}
            <Button
              icon="delete"
              intent={item.matches ? Intent.DANGER : Intent.NONE}
              minimal
              onClick={() => updateList(list.filter((val) => val !== list[i]))}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Blacklist;
