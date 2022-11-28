import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MinimalForwarder } from '../typechain-types/@openzeppelin/contracts/metatx';
import { UserTransactionStruct } from '../typechain-types/interfaces/ReceiverInterface'
import { Receiver } from '../typechain-types/contracts/Receiver';
import { TypedEvent } from '../typechain-types/common';

describe('Receiver contract', async () => {
  const tokenName = 'UMN Token';
  const tokenSymbol = 'UMN';
  let forwarder: MinimalForwarder;
  let receiver: Receiver;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    const UmnToken = await ethers.getContractFactory('UmnToken');
    const umnToken = await UmnToken.deploy(tokenName, tokenSymbol);
    await umnToken.deployed();

    const Forwarder = await ethers.getContractFactory('MinimalForwarder');
    forwarder = await Forwarder.deploy();

    const Receiver = await ethers.getContractFactory('Receiver');
    receiver = await Receiver.deploy(forwarder.address, umnToken.address);
    accounts = await ethers.getSigners();
  });

  it('Expect all transactions to went through', async () => {
    const sampleData: UserTransactionStruct[] = [
      { user: accounts[1].address, amount: 1000 },
      { user: accounts[2].address, amount: 10000 },
      { user: accounts[3].address, amount: 100000 },
    ];

    const connectedReceiver = receiver.connect(accounts[5]);
    const tx = await connectedReceiver.processTransaction(sampleData).then(tx => tx.wait());
    const [event] = tx.events as TypedEvent[];
    const result: boolean[] = event.args.results;

    expect(result).to.not.include(false);
  });
});
