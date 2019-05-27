import browserService, { getStorageValue } from './browserService';

export let settings = {
  debug: true,
  popup: true,
};
export const settingPromise = getStorageValue('settings').then((storedSettings) => {
  settings = {
    ...settings,
    ...storedSettings.settings,
  };
  return settings;
});

export function debugLog(...data) {
  if (!settings.debug) { return; }

// tslint:disable-next-line: no-console
  console.log(data);
}

browserService.addListener(({ newValue, oldValue }) => {
  settings = newValue;
});
