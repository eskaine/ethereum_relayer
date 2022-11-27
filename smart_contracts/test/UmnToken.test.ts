import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { UmnToken } from "../typechain-types/contracts/token/UmnToken";

describe("UMN Token contract", async () => {
  const tokenName = "UMN Token";
  const tokenSymbol = "UMN";
  const totalToken = BigInt(10000 * Math.pow(10, 18));
  let umnToken: UmnToken;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    const UmnToken = await ethers.getContractFactory("UmnToken");
    umnToken = await UmnToken.deploy(tokenName, tokenSymbol);
    accounts = await ethers.getSigners();
  })

  it("UMN Token initialize and total token supply fetched", async () => {
    const totalSupply = await umnToken.totalSupply();

    expect(totalSupply).to.equal(totalToken);
  });

  it("Buying token", async () => {
    const amount = 1000;
    const address = accounts[1].address;
    await umnToken.buy(address, amount);
    const balance = await umnToken.getBalance(address);

    expect(balance).to.equal(amount);
  });

  it("Not enough token", async () => {
    const amount = BigInt(10000 * Math.pow(10, 20));
    const address = accounts[1].address;

    expect(umnToken.buy(address, amount)).to.be.reverted;
  });
});
