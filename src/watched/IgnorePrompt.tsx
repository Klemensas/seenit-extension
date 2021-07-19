import * as React from 'react';
import { Button, ButtonProps, FormGroup, Icon, InputGroup } from '@blueprintjs/core';

import { normalizeUrl } from '../utils/helpers';
import { useAddToExtensionBlacklistMutation } from '../graphql';
import { updateUserSettings } from '../common/apollo/helpers';

interface IgnorePromptProps {
  onBlacklisted: () => void;
  renderInactivePrompt?: (onClick: ButtonProps['onClick']) => JSX.Element;
}

export default function IgnorePrompt({
  onBlacklisted,
  renderInactivePrompt = (onClick) => (
    <Button small minimal outlined fill onClick={onClick}>
      Wrong site?
    </Button>
  ),
}: IgnorePromptProps) {
  const [promptActive, setPromptActive] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [blacklistItem, setBlacklistItem] = React.useState(`${normalizeUrl(window.location.hostname)}/*`);
  const [addToExtensionBlacklist] = useAddToExtensionBlacklistMutation({
    update: (cache, { data }) => {
      if (!data) return;

      updateUserSettings(cache, data.addToExtensionBlacklist);
    },
  });

  if (!promptActive) return renderInactivePrompt(() => setPromptActive((value) => !value));

  return (
    <FormGroup label="Add site to blacklist" inline contentClassName="flex-grow">
      <InputGroup
        value={blacklistItem}
        onChange={({ currentTarget }) => setBlacklistItem(currentTarget.value)}
        rightElement={
          <Button
            minimal
            loading={isSaving}
            icon="add"
            onClick={async () => {
              setIsSaving(true);
              await addToExtensionBlacklist({ variables: { blacklistItem } });
              onBlacklisted();
            }}
          />
        }
      />
    </FormGroup>
  );
}
