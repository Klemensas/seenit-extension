// Required for normalize-url, see https://github.com/sindresorhus/normalize-url/releases/tag/v5.0.0
import NormalizeUrl = require('normalize-url');

/* eslint-disable import/prefer-default-export */

export const isProduction = process.env.NODE_ENV === 'production';

let container: null | HTMLElement = null;

export const getContainer = () => {
  if (!container) throw new Error('Container not set');

  return container;
};

export const setContainer = (newContainer: HTMLElement) => {
  container = newContainer;
};

export const closeContent = () => {
  container?.parentNode?.removeChild(container);
};

export const throttle = <T extends (...args: any) => any>(callback: T, time: number) => {
  let isWaiting = false;

  return (...args: Parameters<T>) => {
    if (isWaiting) return;

    isWaiting = true;
    callback.apply(this, args);
    setTimeout(() => {
      isWaiting = false;
    }, time);
  };
};

export const getTokenPayload = (token?: string | null) => {
  if (typeof token !== 'string') return null;

  try {
    const tokenPayload = token.split('.')[1];
    const decodedToken = atob(tokenPayload);
    const parsedToken = JSON.parse(decodedToken);

    return parsedToken;
  } catch {
    return null;
  }
};

export const normalizeUrl = (
  url: string = window.location.href,
  options: NormalizeUrl.Options = { stripProtocol: true },
) => NormalizeUrl(url, options);
