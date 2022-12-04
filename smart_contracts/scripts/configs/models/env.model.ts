export interface ENV {
  RELAY_ADDRESS: string;
  RELAY_API_KEY: string;
  RELAY_API_SECRET: string;
  GOERLI_URL: string;
  ACCOUNT: string;
}

export interface RAWENV {
  RELAY_ADDRESS: string | undefined;
  RELAY_API_KEY: string | undefined;
  RELAY_API_SECRET: string | undefined;
  GOERLI_URL: string | undefined;
  ACCOUNT: string | undefined;
}
