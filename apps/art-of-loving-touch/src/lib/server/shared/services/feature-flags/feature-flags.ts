import { env } from '$server/constants';
import Flagsmith, { Flags } from 'flagsmith-nodejs';

let client: Flagsmith;

const getClient = () => {
  if (client) {
    return client;
  }

  return (client = new Flagsmith({
    environmentKey: env.FLAGSMITH_ENVIRONMENT_KEY,
  }));
};

const getFlags = async (client: Flagsmith) => {
  return await client.getEnvironmentFlags();
};

const isFeatureEnabledPartial = (flags: Flags) => (key: string) => {
  return flags.isFeatureEnabled(key);
};

client = getClient();
const flags = await getFlags(client);

export const isFeatureEnabled = isFeatureEnabledPartial(flags);
