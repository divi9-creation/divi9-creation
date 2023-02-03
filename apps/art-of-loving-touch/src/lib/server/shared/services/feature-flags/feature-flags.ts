import { env } from '$server/config';
import { fetchJSON } from 'fetch';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

type FeatureFlag = {
  name: string;
  enabled: boolean;
  environment: 'development' | 'staging' | 'production';
};

type GetFlagsResponse = {
  count: number;
  results: {
    name: string;
    enabled: boolean;
    environment: {
      value: 'development' | 'staging' | 'production';
    };
  }[];
};

const requestOptions: RequestInit = {
  headers: {
    Authorization: `Token ${env.BASEROW_API_TOKEN}`,
  },
};

export const load = async () => {
  const flagsResult = await pipe(
    fetchJSON<GetFlagsResponse>(
      'https://api.baserow.io/api/database/rows/table/136814/?user_field_names=true&size=200',
      requestOptions
    )
  )();

  if (either.isLeft(flagsResult)) {
    throw new Error('Flags not available');
  }

  const flagsResponse = flagsResult.right;

  const flags: FeatureFlag[] = flagsResponse.results.map((flag) => {
    return {
      name: flag.name,
      enabled: flag.enabled,
      environment: flag.environment.value,
    };
  });

  return {
    isFeatureEnabled: isFeatureEnabled(flags),
  };
};

export const isFeatureEnabled = (flags: FeatureFlag[]) => (name: string) => {
  return flags
    .filter((flag) => flag.name === name)
    .filter((flag) => flag.environment === env.MODE)
    .some((flag) => flag.enabled);
};
