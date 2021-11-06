import React,{Fragment, useEffect,useState} from 'react';
import './App.css';
import Web3 from 'web3';
import EthSwap from './abis/EthSwap.json';
import Token from './abis/Token.json';
import Navbar from './components/ui/Navbar';

const App = () => {

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [tokenContract, setTokenContract] = useState({});

  // Connect to metaMask
  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        window.web3=new Web3(window.ethereum);
        await window.ethereum.enable();
      } else {
        alert('No web3 instance injected, using Local web3.');
      }
    }
    connectToMetaMask();
  }, []);

   // Load the blockChain data
  useEffect(() => {
    const loadBlockChainData = async () => {
      const web3 = window.web3;

      // Store the account in the account state
      const accounts = await web3.eth.getAccounts();
      await setAccount(accounts[0]);

      // Store the balance in the balance state
      const ethBalance = await web3.eth.getBalance(accounts[0]);
      setBalance(ethBalance);

      // Get network ID
      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];

      // Check if the contract deployed to the detected network
      if (tokenData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        setTokenContract(token);
        console.log(token);
      } else {
        alert('Contract not deployed to the detected network');
      }
    
      
    }
    loadBlockChainData();
  }, []);


  return (
    <Fragment>
      <Navbar account={ account}/>
          <main role='main' className='container'>
              <h1>Ethereum Market Place</h1>
          </main>
    </Fragment>
  );
};

export default App;
