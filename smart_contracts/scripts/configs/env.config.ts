import path from 'path';
import dotenv from 'dotenv';
import { RAWENV, ENV } from './models/env.model';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const getRAWENV = (): RAWENV => {
  return {
    RELAY_ADDRESS: process.env.RELAY_ADDRESS,
    RELAY_API_KEY: process.env.RELAY_API_KEY,
    RELAY_API_SECRET: process.env.RELAY_API_SECRET,
    GOERLI_URL: process.env.GOERLI_URL,
    ACCOUNT: process.env.ACCOUNT
  };
};

const getENV = (config: RAWENV): ENV => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as ENV;
};

const rawEnv = getRAWENV();
const env = getENV(rawEnv);

export default env;
