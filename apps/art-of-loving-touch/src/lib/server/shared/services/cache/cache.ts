import { env } from '$server/constants';
import { Redis } from '@upstash/redis';
import { option, taskEither as TE } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

const PROJECT_ID = env.PROJECT_ID;

const redis = new Redis({
  token: env.UPSTASH_API_KEY,
  url: env.UPSTASH_API_URL,
});

const getPartial =
  (namespace: string) =>
  <T = any>(key: string) => {
    return pipe(
      TE.tryCatch(
        () => redis.get(`${namespace}:${key}`),
        (error) => new Error(`${error}`)
      ),
      TE.map((result) => option.fromNullable(result as T))
    );
  };

export const get = getPartial(PROJECT_ID);

const setPartial =
  (namespace: string) =>
  (
    key: string,
    value: any,
    minutesTillExpire = env.ANALYTICS_CACHE_MINUTES
  ) => {
    const secondsTillExpire = minutesTillExpire * 60;

    type SetCommandOptions = {
      ex: number;
    };

    const options: SetCommandOptions = {
      ex: secondsTillExpire,
    };

    return pipe(
      TE.tryCatch(
        () => redis.set(`${namespace}:${key}`, value, options),
        (error) => new Error(`${error}`)
      )
    );
  };

export const set = setPartial(PROJECT_ID);
