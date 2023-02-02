import { env } from '$server/config';

type FeatureEnvironment = Record<
  'development' | 'production' | 'staging',
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
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-ACCESS-KEY': env.JSONBIN_ACCESS_KEY,
      },
    }
  );

  const data = await response.json();

  const config = data.record as Config;

  return {
    config,
    isFeatureEnabled: isFeatureEnabledPartial(config),
  };
};

export const isFeatureEnabledPartial = (config: Config) => (key: string) => {
  const { features } = config;

  return features
    .filter((feature) => feature.key === key)
    .some((feature) => feature.environments[env.MODE].enabled);
};