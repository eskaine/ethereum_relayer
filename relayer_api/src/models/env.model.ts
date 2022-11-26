export interface ENV {
  RELAY_ADDRESS: string;
  RELAY_API_KEY: string;
  RELAY_API_SECRET: string;
}

export interface RAWENV {
  RELAY_ADDRESS: string | undefined;
  RELAY_API_KEY: string | undefined;
  RELAY_API_SECRET: string | undefined;
}
