import { taskEither as TE } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

type FetchErrorBase = {
  message: string;
  status: number;
};

type FetchNetworkError = FetchErrorBase & {
  type: 'network_error';
};

type FetchParseError = FetchErrorBase & {
  type: 'parse_error';
};

type FetchRequestError<T> = FetchErrorBase & {
  type: 'request_error';
  data: T;
};

type FetchError<T = any> =
  | FetchNetworkError
  | FetchParseError
  | FetchRequestError<T>;

const parseJSON = <T = any>(response: Response) => {
  return pipe(
    TE.tryCatch(
      () => response.json(),
      (): FetchError => {
        return {
          type: 'parse_error',
          message: response.statusText,
          status: response.status,
        } satisfies FetchParseError;
      }
    ),
    TE.map((data: T) => data)
  );
};

const toJSONResponse = <T = any, E = any>(data: T, response: Response) => {
  if (!response.ok) {
    const error = {
      type: 'request_error',
      data: data as unknown as E,
      message: response.statusText,
      status: response.status,
    } satisfies FetchRequestError<E>;

    return TE.left<FetchError<E>>(error);
  }

  return TE.right(data);
};

const fetchJSONPartial =
  (defaultOptions: RequestInit) =>
  <T = any, E = any>(url: string, options?: RequestInit) => {
    const newOptions = Object.assign({}, defaultOptions, options);

    return pipe(
      TE.Do,
      TE.bind('response', () =>
        TE.tryCatch(
          () => fetch(url, newOptions),
          (error): FetchError => {
            return {
              type: 'network_error',
              message: (error as Error).message,
              status: 500,
            } satisfies FetchNetworkError;
          }
        )
      ),
      TE.bind('data', ({ response }) => parseJSON<T>(response)),
      TE.chain(({ data, response }) => toJSONResponse<T, E>(data, response))
    );
  };

export const fetchJSON = fetchJSONPartial({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
