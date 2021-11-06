import React,{Fragment, useEffect,useState} from 'react';
import './App.css';
import Web3 from 'web3';
import Navbar from './components/ui/Navbar';

const App = () => {

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

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

      const accounts = await web3.eth.getAccounts();
      await setAccount(accounts[0]);

      const ethBalance = await web3.eth.getBalance(accounts[0]);
      setBalance(ethBalance);
      console.log(ethBalance);
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
