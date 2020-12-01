import { getStorageValue, updateStorage } from './common/storage';
import { UserDataQuery, MeDocument, MeQuery } from './graphql';
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

export const getSettings = async () => {
  const { user, lastUserSync } = await getStorageValue<{
    user: UserDataQuery['userData'] | null;
    lastUserSync: number;
  }>('user', 'lastUserSync');

  const nextSync = lastUserSync + syncInterval - Date.now();
  if (nextSync > 0) return user?.settings;

  const newUser = await getUserData();
  const syncTime = Date.now();

  await updateStorage({ user: newUser, lastUserSync: syncTime });

  return newUser.settings;
};

export async function debugLog(...data) {
  // TODO: ADd debugging setting and check setttings. Is it really effective to fetch from storage every time?
  if (isProduction) return;

  // eslint-disable-next-line no-console
  console.log(data);
}
