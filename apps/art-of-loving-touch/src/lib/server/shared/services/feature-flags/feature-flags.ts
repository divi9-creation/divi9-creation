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

type Bin = {
  features: Features[];
};

let bin: Bin;

export const load = async () => {
  if (bin) {
    return bin;
  }

  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${env.JSONBIN_BIN_ID}`,
    {
      headers: {
        'X-ACCESS-KEY': env.JSONBIN_ACCESS_KEY,
      },
    }
  );

  const data = await response.json();

  return (bin = data.record as Bin);
};

export const isFeatureEnabled = (key: string) => {
  console.log(key);
  console.log('is feature enabled');
  const { features } = bin;
  const environment = env.DEV ? 'development' : 'production';

  return features
    .filter((feature) => feature.key === key)
    .some((feature) => feature.environments[environment].enabled);
};
