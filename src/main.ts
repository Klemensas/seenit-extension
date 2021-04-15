import { getStorageValue, hasUserData, updateStorage } from './common/storage';
import { MeDocument, MeQuery } from './graphql';
import { apolloClient } from './apollo';
import { isProduction } from './utils/helpers';

const syncInterval = 300000; // 5mins

async function getUserData() {
  const { data } = await apolloClient.query<MeQuery>({
    query: MeDocument,
    fetchPolicy: 'network-only',
  });

  return data.me;
}

export const getStorageUser = async () => {
  const { user, lastUserSync } = await getStorageValue('user', 'lastUserSync');

  const lastSyncTime = typeof lastUserSync === 'number' ? lastUserSync : 0;
  const nextSync = lastSyncTime + syncInterval - Date.now();
  if (nextSync > 0 && hasUserData(user)) return user;

  const newUser = await getUserData();
  const syncTime = Date.now();

  await updateStorage({ user: newUser, lastUserSync: syncTime });

  return newUser;
};

export const getStorageSettings = async () => {
  const user = await getStorageUser();

  return user.settings;
  // const { user, lastUserSync } = await getStorageValue('user', 'lastUserSync');

  // const lastSyncTime = typeof lastUserSync === 'number' ? lastUserSync : 0;
  // const nextSync = lastSyncTime + syncInterval - Date.now();
  // if (nextSync > 0 && hasUserData(user)) return user.settings;

  // const newUser = await getUserData();
  // const syncTime = Date.now();

  // await updateStorage({ user: newUser, lastUserSync: syncTime });

  // return newUser.settings;
};

export async function debugLog(...data: unknown[]) {
  // TODO: ADd debugging setting and check setttings. Is it really effective to fetch from storage every time?
  if (isProduction) return;

  // eslint-disable-next-line no-console
  console.log(data);
}
