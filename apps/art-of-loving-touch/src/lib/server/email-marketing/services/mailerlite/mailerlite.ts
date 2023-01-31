import { env } from '$server/constants';
import { fetchJSON } from 'fetch';
import { pipe } from 'fp-ts/lib/function';

const DEFAULT_OPTIONS: RequestInit = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

const API_URL = env.MAILERLITE_API_URL;

const requestPartial =
  (baseUrl: string, defaultOptions: RequestInit) =>
  <T = any>(endpoint: string, options?: Omit<RequestInit, 'headers'>) => {
    const newOptions = Object.assign({}, defaultOptions, options);
    const url = baseUrl + endpoint;

    return pipe(fetchJSON<T>(url, newOptions));
  };

export const request = requestPartial(API_URL, DEFAULT_OPTIONS);
