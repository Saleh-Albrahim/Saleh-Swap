const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

module.exports = async (deployer) => {
  // deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // deploy EthSwap
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  const totalSupply = await token.totalSupply();

  // Transfer all the tokens to the EthSwap address
  await token.transfer(ethSwap.address, totalSupply.toString());
};
