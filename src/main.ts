import browserService, { getStorageValue, updateStorage } from './browserService';
import { Settings as UserSettings, UserDataQuery, MeDocument, MeQuery } from './graphql';
import { apolloClient } from './apollo';

export interface Settings extends Pick<UserSettings, 'general' | 'extension'> {
  debug: boolean;
}

export const settings: Settings = {
  debug: true,
  general: {
    autoConvert: false,
  },
  extension: {
    autoTrack: false,
    minLengthSeconds: 360,
    blacklist: [],
  },
};

// let lastUserSync = 0;
const syncInterval = 300000; // 5mins

async function getUserData() {
  const { data } = await apolloClient.query<MeQuery>({
    query: MeDocument,
    fetchPolicy: 'network-only',
  });

  return data.me;
}
export const settingPromise = getStorageValue<{ user: NonNullable<UserDataQuery['userData']>; lastUserSync: number }>(
  'user',
  'lastUserSync',
).then(({ user, lastUserSync: lastSync }) => {
  // lastUserSync = lastSync;
  return Object.assign(settings, user.settings);
});

export const getSettings = async () => {
  const { user, lastUserSync } = await getStorageValue<{
    user: NonNullable<UserDataQuery['userData']>;
    lastUserSync: number;
  }>('user', 'lastUserSync');

  const nextSync = lastUserSync + syncInterval - Date.now();
  if (nextSync < 0) return user.settings;

  const newUser = await getUserData();
  const syncTime = Date.now();

  updateStorage({ user: newUser, lastUserSync: syncTime });

  return newUser.settings;
};

export function debugLog(...data) {
  if (settings.debug) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(data);
}

browserService.addListener(({ newValue }) => {
  Object.assign(settings, newValue);
  debugLog('update settings', newValue, settings);
});
