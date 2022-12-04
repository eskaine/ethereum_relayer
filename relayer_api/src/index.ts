import ethers from 'ethers';
import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
import { AutotaskEvent, SentinelTriggerEvent } from "defender-autotask-utils";
import { RelayerParams } from 'defender-relay-client';
import { RequestBody } from './interface/request';

const { forwarderAbi } = require('./abis/forwarder.abi');
const { receiverAbi } = require('./abis/receiver.abi');
const ForwarderAddress = require('../../deploy.json').MinimalForwarder;
const ReceiverAddress = require('../../deploy.json').Receiver;

export const handler = async (event: AutotaskEvent & RelayerParams) => {
  if (!event.request || !event.request.body) throw new Error(`Missing payload`);

  const requestBody = event.request.body as SentinelTriggerEvent & RequestBody;
  const txBundle: RequestBody[] = [];
  let toSendTransaction = false;

  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fast" });
  const forwarder = new ethers.Contract(ForwarderAddress, forwarderAbi, signer);
  const receiver = new ethers.Contract(ReceiverAddress, receiverAbi, signer);

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(event);
  if (!valid) throw new Error(`Invalid request`);

  txBundle.push(requestBody);
  const timeout = setTimeout(() => {
    toSendTransaction = true;

    if(toSendTransaction) {
      toSendTransaction = false;
      receiver.processTransaction(txBundle);
      clearTimeout(timeout);
    }
  }, 10000);
};
