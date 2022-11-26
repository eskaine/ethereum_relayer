import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
import env from '../configs/env.config';

class RelayerService {
  provider: DefenderRelayProvider;
  signer: DefenderRelaySigner;

  constructor() {
    const credentials = {
        apiKey: env.RELAY_API_KEY,
        apiSecret: env.RELAY_API_SECRET,
    };
    this.provider = new DefenderRelayProvider(credentials);
    this.signer = new DefenderRelaySigner(credentials, this.provider, {
        speed: "fast",
    });
  }
}

export default RelayerService;
