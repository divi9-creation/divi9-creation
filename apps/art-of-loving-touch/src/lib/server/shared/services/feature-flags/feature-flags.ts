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

const getBin = async () => {
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

  return data.record as Bin;
};

const isFeatureEnabledPartial = (bin: Bin) => (key: string) => {
  const { features } = bin;
  const environment = env.DEV ? 'development' : 'production';

  return features
    .filter((feature) => feature.key === key)
    .some((feature) => feature.environments[environment].enabled);
};

bin = await getBin();

export const isFeatureEnabled = isFeatureEnabledPartial(bin);
