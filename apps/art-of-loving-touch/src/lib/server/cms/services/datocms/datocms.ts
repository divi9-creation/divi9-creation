import { env } from '$server/constants';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { GraphQLClient } from 'graphql-request';

const DEFAULT_HEADERS: { Authorization: string; 'X-Include-Drafts'?: string } =
  {
    Authorization: env.DATOCMS_API_TOKEN,
  };

if (env.DEV) {
  DEFAULT_HEADERS['X-Include-Drafts'] = 'true';
}

const client = new GraphQLClient(env.DATOCMS_API_URL, {
  headers: DEFAULT_HEADERS,
});

export const request = <T = any>(
  document: string,
  variables?: Record<string, any>
) => {
  return pipe(
    taskEither.tryCatch(
      () => client.request<T>(document, variables),
      (error) => new Error(`${error}`)
    )
  );
};
