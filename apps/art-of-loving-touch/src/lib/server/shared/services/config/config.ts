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

export const create = async () => {
  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${env.JSONBIN_BIN_ID}`,
    {
      headers: {
        'X-ACCESS-KEY': env.JSONBIN_ACCESS_KEY,
      },
    }
  );

  const data = await response.json();

  const config = data.record as Config;

  return {
    isFeatureEnabled: isFeatureEnabledPartial(config),
  };
};

export const isFeatureEnabledPartial = (config: Config) => (key: string) => {
  const { features } = config;
  const environment = env.DEV ? 'development' : 'production';

  return features
    .filter((feature) => feature.key === key)
    .some((feature) => feature.environments[environment].enabled);
};
