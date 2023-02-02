import { env } from '$server/config';
import { Cache } from '$server/shared';
import { either, option as O, taskEither as TE } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

type GetAnalyticsRequest = {
  period: 'day' | '7d' | '30d';
  property: 'event:name';
};

const getAnalytics = (dto: GetAnalyticsRequest) => {
  const period = dto.period;
  const property = dto.property;

  return pipe(
    TE.tryCatch(
      () =>
        fetch(
          `${env.PLAUSIBLE_API_URL}/stats/breakdown?site_id=${env.PLAUSIBLE_SITE_ID}&period=${period}&property=${property}`,
          {
            headers: {
              Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`,
            },
          }
        ),
      (error) => new Error(`${error}`)
    ),
    TE.chain((response) =>
      TE.tryCatch(
        () => response.json(),
        (error) => new Error(`${error}`)
      )
    )
  );
};

const mapAnalytics = (dto: {
  results: {
    name: 'pageview' | 'Lead Captured' | 'Offer Shared';
    visitors: number;
  }[];
}) => {
  let analytics: Record<string, any> = {};

  dto.results.forEach((metric) => {
    const { name, visitors: count } = metric;

    switch (name) {
      case 'Lead Captured':
        analytics.leads = count;
        break;
      case 'Offer Shared':
        analytics.shares = count;
        break;
      case 'pageview':
        analytics.pageViews = count;
        break;
    }
  });

  return analytics;
};

type GetAnalyticsQuery = {
  timePeriod: 'day' | 'week' | 'month';
};

export const getAnalyticsUseCase = () => {
  return pipe(
    TE.Do,
    TE.bind('analyticsFromCache', () => Cache.get('analytics')),
    TE.bind('analytics', ({ analyticsFromCache }) => {
      return pipe(
        analyticsFromCache,
        O.fold(
          () => {
            console.log('get analytics from provider');

            return pipe(
              TE.Do,
              TE.bind('analytics', () =>
                getAnalytics({ period: '7d', property: 'event:name' })
              ),
              TE.map(({ analytics }) => {
                const newAnalytics = mapAnalytics(analytics);
                console.log('setting analytics in cache');
                Cache.set('analytics', newAnalytics)();

                return newAnalytics;
              })
            );
          },
          (analytics) => {
            console.log('analytics from cache');
            return TE.right(analytics);
          }
        )
      );
    }),
    TE.map(({ analytics }) => analytics)
  );
};
