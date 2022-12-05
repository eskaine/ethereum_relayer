import { ethers } from 'ethers';
import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
import { AutotaskEvent, SentinelTriggerEvent } from "defender-autotask-utils";
import { RelayerParams } from 'defender-relay-client';
import { RequestBody } from './interface/request';

const { forwarderAbi } = require('./abis/forwarder.abi');
const { receiverAbi } = require('./abis/receiver.abi');
const forwarderAddress = require('./deploy.json').MinimalForwarder;
const receiverAddress = require('./deploy.json').Receiver;

async function delay(ms: number) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

export const handler = async (event: AutotaskEvent & RelayerParams) => {
  if (!event.request || !event.request.body) throw new Error(`Missing payload`);

  const requestBody = event.request.body as SentinelTriggerEvent & RequestBody;
  const txBundle: RequestBody[] = [];

  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fast" });
  const forwarder = new ethers.Contract(forwarderAddress, forwarderAbi, signer);
  const receiver = new ethers.Contract(receiverAddress, receiverAbi, signer);

  // Validate request on the forwarder contract
  const { request, signature } = requestBody;
  const valid = await forwarder.verify(request, signature);
  if (!valid) throw new Error(`Invalid request`);

  txBundle.push(requestBody);
  await delay(10000);
  const tx = await receiver.processTransaction(txBundle);
  return tx;
};
