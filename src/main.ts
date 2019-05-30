import browserService, { getStorageValue } from './browserService';

export const settings = {
  debug: true,
  popup: true,
};
export const settingPromise = getStorageValue<{ settings: object }>('settings').then(storedSettings => {
  Object.assign(settings, {
    ...storedSettings.settings,
  });
  return settings;
});

export function debugLog(...data) {
  if (!settings.debug) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(data);
}

browserService.addListener(({ newValue }) => {
  Object.assign(settings, newValue);
});
