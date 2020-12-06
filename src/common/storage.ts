export function getStorageValue<T = object>(...keys: string[]) {
  return new Promise<T>((resolve) => chrome.storage.sync.get(keys, (value) => resolve(value as T)));
}

export function updateStorage<T = object>(value: T) {
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

  Object.entries(changes).forEach(([key, value]) => registeredCallbacks[key].forEach((cb) => cb(value)));
});
