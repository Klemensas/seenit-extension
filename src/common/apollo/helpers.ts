import { DataProxy } from '@apollo/client';

import { updateStorage } from '../storage';
import { UserDataQuery, SettingsDocument } from '../../graphql';

export const updateUserSettings = (cache: DataProxy, user: NonNullable<UserDataQuery['userData']>) => {
  updateStorage({ user });

  return cache.writeQuery({
    query: SettingsDocument,
    data: {
      settings: user.settings,
    },
  });
};
