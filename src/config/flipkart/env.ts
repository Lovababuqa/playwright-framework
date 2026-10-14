import { devConfig } from './environments/dev';

const configMap = {
  dev: devConfig,
};

type Env = keyof typeof configMap;
const env = (process.env.ENV || 'dev').toLowerCase() as Env;

// Falls back to dev when ENV is qa/stage/prod (Flipkart has only one site)
export const currentEnv = configMap[env] ?? devConfig;
