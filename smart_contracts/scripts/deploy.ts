const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require('defender-relay-client/lib/ethers')
import { ethers } from 'hardhat';
import env from './configs/env.config';
import { writeFileSync }from 'fs';

async function main(): Promise<void> {
  const tokenName = 'UMN Token';
  const tokenSymbol = 'UMN';
  
  const UmnToken = await ethers.getContractFactory('UmnToken');
  const umnToken = await UmnToken.deploy(tokenName, tokenSymbol);
  await umnToken.deployed();

  const credentials = {
    apiKey: env.RELAY_API_KEY,
    apiSecret: env.RELAY_API_SECRET,
};

  const provider = new DefenderRelayProvider(credentials)
  const relaySigner = new DefenderRelaySigner(credentials, provider, {
    speed: 'fast',
  })

  const Forwarder = await ethers.getContractFactory('MinimalForwarder')
  const forwarder = await Forwarder.connect(relaySigner).deploy();
  await forwarder.deployed();

  const Receiver = await ethers.getContractFactory('Receiver');
  const receiver = await Receiver.connect(relaySigner)
    .deploy(forwarder.address, umnToken.address);
  await receiver.deployed();

  writeFileSync(
    'deploy.json',
    JSON.stringify(
      {
        UMNToken: umnToken.address,
        MinimalForwarder: forwarder.address,
        Receiver: receiver.address
      },
      null,
      2
    )
  );
}

const run = async(): Promise<void>  => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
