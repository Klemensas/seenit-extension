export function getStorageValue<T = any>(...keys: string[]) {
  return new Promise<T>(resolve => chrome.storage.sync.get(keys, resolve));
}

export function storageChange() {
  const cbs: { [key: string]: Function[] } = {};

  // TODO: extend this to support targetKey subscription?
  // TODO: add listener removal
  function addListener(cb: Function, target: string = 'settings') {
    if (!target) { throw new Error('Missing listener target key'); }

    cbs[target] = [...(cbs[target] || []), cb];
  }

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (!Object.keys(cbs).length) { return; }

    for (const key in changes) {
      if (cbs[key]) {
        cbs[key].forEach((cb) => cb(changes[key]));
      }
    }
  })

  return {
    addListener,
    cbs
  }
}

export default storageChange();
