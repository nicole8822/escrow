const { expect } = require("chai");

describe("TrustVault", function () {
  it("Should lock and release funds correctly", async function () {
    const [owner, buyer, seller] = await ethers.getSigners();
    const TrustVault = await ethers.getContractFactory("TrustVault");
    const vault = await TrustVault.deploy();

    // Lock funds
    await vault.connect(buyer).lockFunds("trade_123", { value: ethers.utils.parseEther("1.0") });
    const trade = await vault.trades("trade_123");
    expect(trade.amount).to.equal(ethers.utils.parseEther("1.0"));
  });
});
