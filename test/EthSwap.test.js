/* eslint-disable */
const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai').use(require('chai-as-promised')).should();

function toWei(n) {
  return web3.utils.toWei(n, 'ether');
}

function fromWei(n) {
  return web3.utils.fromWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(ethSwap.address, toWei('1000000'));
  });

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name();
      assert.equal(name, 'Saleh Token');
    });
  });

  describe('EthSwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await ethSwap.name();
      assert.equal(name, 'EthSwap Instant Exchanges');
    });

    it('contract has all the tokens', async () => {
      let balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), toWei('1000000'));
    });
  });

  describe('buyTokens()', async () => {
    let result;

    before(async () => {
      // Purchase tokens before each example
      result = await ethSwap.buyTokens({ from: investor, value: toWei('1') });
    });

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      const investorSalehBalance = await token.balanceOf(investor);
      console.log(`Saleh balance in the investor wallet : ${fromWei(investorSalehBalance.toString())}`);
      assert.equal(investorSalehBalance.toString(), toWei('100'));

      // Check ethSwap balance after purchase
      const swapSalehBalance = await token.balanceOf(ethSwap.address);
      console.log(`Saleh balance in the swap wallet : ${fromWei(swapSalehBalance.toString())}`);
      assert.equal(swapSalehBalance.toString(), toWei('999900'));

      const swapEthBalance = await web3.eth.getBalance(ethSwap.address);
      console.log(`Ethereum balance in the swap wallet : ${fromWei(swapEthBalance.toString())}`);
      assert.equal(swapEthBalance.toString(), toWei('1'));

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), toWei('100'));
      assert.equal(event.rate.toString(), '100');
    });
  });

  describe('sellTokens()', async () => {
    let result;

    before(async () => {
      // Investor must approve tokens before the purchase
      await token.approve(ethSwap.address, toWei('100'), { from: investor });
      // Investor sells tokens
      result = await ethSwap.sellTokens(toWei('100'), { from: investor });
    });

    it('Allows user to instantly sell tokens to ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      const investorSalehBalance = await token.balanceOf(investor);
      console.log(`Saleh balance in the investor wallet : ${fromWei(investorSalehBalance.toString())}`);
      assert.equal(investorSalehBalance.toString(), toWei('0'));

      // Check ethSwap balance after purchase

      const swapSalehBalance = await token.balanceOf(ethSwap.address);
      console.log(`Saleh balance in the swap wallet : ${fromWei(swapSalehBalance.toString())}`);
      assert.equal(swapSalehBalance.toString(), toWei('1000000'));

      const swapEthBalance = await web3.eth.getBalance(ethSwap.address);
      console.log(`Ethereum balance in the swap wallet : ${fromWei(swapEthBalance.toString())}`);
      assert.equal(swapEthBalance.toString(), toWei('0'));

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), toWei('100'));
      assert.equal(event.rate.toString(), '100');

      // FAILURE: investor can't sell more tokens than they have
      await ethSwap.sellTokens(toWei('500'), { from: investor }).should.be.rejected;
    });
  });
});
