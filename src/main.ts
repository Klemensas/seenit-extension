import browserService, { getStorageValue } from './browserService';

export interface Settings {
  debug: boolean;
  popup: boolean;
  blacklist: string[];
}

export const settings: Settings = {
  debug: true,
  popup: true,
  blacklist: [
    /* eslint-disable no-useless-escape */
    '^.*://.*facebook..*',
    '^.*://.*messenger..*',
    '^.*://.*youtube..*',
    /* eslint-enable no-useless-escape */
  ],
};
export const settingPromise = getStorageValue<{ settings: Settings }>('settings').then(storedSettings => {
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
  debugLog('update settings', newValue, settings);
});
