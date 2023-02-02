import { env } from '$server/constants';

type FeatureEnvironment = Record<
  'development' | 'production',
  {
    enabled: boolean;
  }
>;

type Features = {
  key: string;
  environments: FeatureEnvironment;
};

type Config = {
  features: Features[];
};

export const load = async () => {
  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${env.JSONBIN_BIN_ID}`,
    {
      headers: {
        'X-ACCESS-KEY': env.JSONBIN_ACCESS_KEY,
      },
    }
  );

  const data = await response.json();

  return data.record;
};

export const isFeatureEnabled = (config: Config, key: string) => {
  console.log(key);
  console.log('is feature enabled');
  console.log(config);
  const { features } = config;
  const environment = env.DEV ? 'development' : 'production';

  return features
    .filter((feature) => feature.key === key)
    .some((feature) => feature.environments[environment].enabled);
};
