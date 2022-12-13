import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { getSignedMetaRequest } from "./utils/signedRequest"
import { JsonRpcSigner } from '@ethersproject/providers';

describe('Receiver contract', async () => {
  beforeEach(async function () {
    const UmnToken = await ethers.getContractFactory("UmnToken");
    const Forwarder = await ethers.getContractFactory("MinimalForwarder");
    const Receiver = await ethers.getContractFactory('Receiver');
    
    const forwarder = await Forwarder.deploy().then(f => f.deployed());
    this.accounts = await ethers.getSigners();
    this.umnToken = await UmnToken.deploy(forwarder.address, 'UMN Token', 'UMN').then(f => f.deployed());
    this.receiver = await Receiver.deploy(forwarder.address, this.umnToken.address).then(f => f.deployed());

    const relayer =  this.accounts[1];
    this.forwarder = forwarder.connect(relayer);

    this.createUserTx = (user: JsonRpcSigner & SignerWithAddress, amount: number) => {
      const requestParam = {
        from: user.address,
        to: this.umnToken.address,
        data: this.umnToken.interface.encodeFunctionData('buy', [amount])
      };

      return getSignedMetaRequest(user.provider, this.forwarder, requestParam);
    }
  })

  it('Process meta transaction', async function() {
    const user1 = this.accounts[2];
    const user2 = this.accounts[3];
    const user3 = this.accounts[4];

    const tx1 = await this.createUserTx(user1, 123);
    const tx2 = await this.createUserTx(user2, 1234);
    const tx3 = await this.createUserTx(user3, 12345);
    const metaTx = [tx1, tx2, tx3];

    const res = await this.receiver.processTransaction(metaTx).then((tx: any) => tx.wait());
    const [event] = res.events.filter((e: any) => e.event == "TxBundleEvent");
    const result = event.args.results.map((r: any) => r.result);

    expect(result).to.not.include(false);
  })
});
