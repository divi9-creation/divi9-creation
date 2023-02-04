import { env } from '$server/config';
import { XataClient } from './xata.codegen';

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({
    apiKey: env.XATA_API_KEY,
    branch: env.XATA_API_BRANCH,
  });

  return instance;
};

export const xata = getXataClient();
