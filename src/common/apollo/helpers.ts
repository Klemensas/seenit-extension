import { DataProxy } from '@apollo/client';

import { updateStorage } from '../storage';
import { ManagedSettingsFragment, SettingsDocument, UserDataDocument, UserDataQuery } from '../../graphql';

export const updateUserSettings = (
  cache: DataProxy,
  settings: ManagedSettingsFragment,
  user = cache.readQuery<UserDataQuery>({ query: UserDataDocument })?.userData,
) => {
  if (!user) return;

  updateStorage({ user: { ...user, settings } });

  cache.writeQuery({
    query: SettingsDocument,
    data: {
      settings,
    },
  });
};
