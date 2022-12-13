import { expect } from "chai";
import { ethers } from "hardhat";
import { getSignedMetaRequest } from "./utils/signedRequest"

describe("UMN Token contract", async () => {
  const tokenName = "UMN Token";
  const tokenSymbol = "UMN";
  const totalToken = BigInt(10000 * Math.pow(10, 18));

  beforeEach(async function () {
    const UmnToken = await ethers.getContractFactory("UmnToken");
    const Forwarder = await ethers.getContractFactory("MinimalForwarder");

    this.forwarder = await Forwarder.deploy().then(f => f.deployed());
    this.umnToken = await UmnToken.deploy(this.forwarder.address, tokenName, tokenSymbol).then(f => f.deployed());
    this.accounts = await ethers.getSigners();
  })

  it("UMN Token initialize and total token supply fetched", async function() {
    const totalSupply = await this.umnToken.totalSupply();

    expect(totalSupply).to.equal(totalToken);
  });

  it("Buying token", async function() {
    const amount = 1000;
    const user = this.accounts[1];
    const relayer = this.accounts[2];
    const data = this.umnToken.interface.encodeFunctionData('buy', [amount]);

    const requestParam = {
      from: user.address,
      to: this.umnToken.address,
      data
    };

    const forwarder = this.forwarder.connect(relayer);

    const { request, signature } = await getSignedMetaRequest(user.provider, forwarder, requestParam);
    await forwarder.execute(request, signature);

    const balance = await this.umnToken.getBalance(user.address);

    expect(balance).to.equal(amount);
  });

  it("Not enough token", async function() {
    const amount = BigInt(10000 * Math.pow(10, 20));

    expect(this.umnToken.buy(amount)).to.be.reverted;
  });
});
