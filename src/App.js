import React, { Fragment, useEffect } from 'react';
import useState from 'react-usestateref';
import './App.css';
import Web3 from 'web3';
import EthSwap from './abis/EthSwap.json';
import Token from './abis/Token.json';
import Navbar from './components/Navbar';
import Main from './components/Main';


const App = () => {

  // Account states
  const [account, setAccount,accountRef] = useState('');
  const [accountEthBalance, setAccountEthBalance, accountEthBalanceRef] = useState('');
  const [accountTokenBalance, setAccountTokenBalance, accountTokenBalanceRef] = useState('0');
  
  // Website states
  const [tokenContract, setTokenContract, tokenContractRef] = useState({});
  const [ethSwapContract, setEthSwapContract, ethSwapContractRef] = useState({});

   const [isLoading, setIsLoading] = useState(true);

  
    // Connect to the metaMask and handle all the actions
    const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        return true;
      }
      catch (error) {
        if (error.code === 4001) {
          alert('Please accept the request');
        }
        if (error.code === -32002) {
            alert('You have already pending request');
        }
      }
    } else {
        alert('No web3 instance injected, using Local web3.');
      }
  }
    // Load the blockchain data
    const loadBlockchainData = async () => {
      const web3 = window.web3;

      // Store the account in the account state
      const accounts = await web3.eth.getAccounts();
      await setAccount(accounts[0]);

      // Store the balance in the balance state
      const ethBalance = await web3.eth.getBalance(accountRef.current);
      setAccountEthBalance(ethBalance);

      // Load the token
      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];
      // Check if the contract deployed to the detected network
      if (tokenData) {
        setTokenContract(new web3.eth.Contract(Token.abi, tokenData.address));
        setAccountTokenBalance(await tokenContractRef.current.methods.balanceOf(accountRef.current).call());
      } else {
        alert('Token contract not deployed to the detected network');
      }

      const ethSwapData = EthSwap.networks[networkId];
      // Check if the contract deployed to the detected network
      if (ethSwapData) {
        setEthSwapContract(new web3.eth.Contract(EthSwap.abi, ethSwapData.address));
      } else {
        alert('EthSwap contract not deployed to the detected network');
      }

      // Stop the loading and show the connect
      if(tokenData && ethSwapData) setIsLoading(false);
      
  }
  
    // Call the above functions when the Page fully load
  useEffect(() => {
    const connectToBlockchain = async () => {
      const isMetaMaskConnected = await connectToMetaMask();
      if (isMetaMaskConnected) await loadBlockchainData();  
      
    }
    connectToBlockchain();
  }, []);




  return (
    <Fragment>
      <Navbar account={account}/>
      <Main accountEthBalance={accountEthBalance} accountTokenBalance={accountTokenBalance} isLoading={isLoading}/>
    </Fragment>
  );
};

export default App;
