import { expect } from "chai";
import { ethers } from "hardhat";

describe("UMN Token contract", async () => {
  const tokenName = "UMN Token";
  const tokenSymbol = "UMN";
  const totalToken = BigInt(10000 * Math.pow(10, 18));

  it("UMN Token initialize and total token supply fetched", async () => {
    const UmnToken = await ethers.getContractFactory("UmnToken");
    const umnToken = await UmnToken.deploy(tokenName, tokenSymbol);
    const totalSupply = await umnToken.totalSupply();

    expect(totalSupply).to.equal(totalToken);
  });

  it("Buying token", async () => {
    const accounts = await ethers.getSigners();
    const UmnToken = await ethers.getContractFactory("UmnToken");
    const umnToken = await UmnToken.deploy(tokenName, tokenSymbol);

    const amount = 1000;
    const address = accounts[1].address;
    await umnToken.buy(address, amount);
    const balance = await umnToken.getBalance(address);

    expect(balance).to.equal(amount);
  });

  it("Not enough token", async () => {
    const accounts = await ethers.getSigners();
    const UmnToken = await ethers.getContractFactory("UmnToken");
    const umnToken = await UmnToken.deploy(tokenName, tokenSymbol);

    const amount = BigInt(10000 * Math.pow(10, 20));
    const address = accounts[1].address;

    expect(umnToken.buy(address, amount)).to.be.reverted;
  });
});
