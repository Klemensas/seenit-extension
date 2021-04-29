import { UserDataQuery } from '../graphql';

export function getStorageValue<T extends string>(...keys: T[]) {
  return new Promise<Record<T, unknown>>((resolve) =>
    chrome.storage.sync.get(keys, (value) => resolve(value as Record<T, unknown>)),
  );
}

export function updateStorage<T = Record<string, unknown>>(value: T) {
  return new Promise<void>((resolve) => chrome.storage.sync.set(value, resolve));
}

// TODO: extend this to support targetKey subscription?
// TODO: add listener removal
type StoreChangeCallback = (changes: chrome.storage.StorageChange) => void;

const registeredCallbacks: Record<string, StoreChangeCallback[]> = {};

export function addStoreChangeListener(callback: StoreChangeCallback, target: string) {
  const targetCallbacks = registeredCallbacks[target] || [];

  registeredCallbacks[target] = [...targetCallbacks, callback];
}

chrome.storage.onChanged.addListener((changes) => {
  if (!Object.keys(registeredCallbacks).length) return;

  Object.entries(changes).forEach(([key, value]) => registeredCallbacks[key]?.forEach((cb) => cb(value)));
});

export function hasUserData(user: unknown): user is UserDataQuery['userData'] {
  if (typeof user !== 'object') return false;
  if (!user) return false;

  return 'settings' in user;
}
