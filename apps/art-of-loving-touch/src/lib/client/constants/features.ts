type FeatureEnvironment = {
  key: 'development' | 'production';
  enabled: boolean;
};

// show_, access_, kill_,

type Feature = {
  key: string;
  type: 'experiment' | 'kill_switch' | 'operational' | 'permission' | 'release';
  environments: FeatureEnvironment[];
};

export const features: Feature[] = [
  {
    key: 'show_cookie_consent',
    type: 'release',
    environments: [{ key: 'production', enabled: false }],
  },
];
