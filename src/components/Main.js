import React, { useState } from 'react';
import Spinner from './Spinner';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

function Main({ isLoading, accountEthBalance, accountTokenBalance, buyTokens, sellTokens }) {
  const [currentForm, setCurrentForm] = useState('buy');

  const content =
    currentForm === 'buy' ? (
      <BuyForm accountEthBalance={accountEthBalance} accountTokenBalance={accountTokenBalance} buyTokens={buyTokens} />
    ) : (
      <SellForm accountEthBalance={accountEthBalance} accountTokenBalance={accountTokenBalance} sellTokens={sellTokens} />
    );

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div id='content' className='border border-2 p-5 rounded-3 shadow-lg bg-body mt-5 '>
          <div className='d-flex justify-content-between mb-3'>
            <button
              className='btn btn-success btn-lg w-25'
              onClick={() => {
                setCurrentForm('buy');
              }}
            >
              Buy
            </button>
            <button
              className='btn btn-danger btn-lg w-25'
              onClick={() => {
                setCurrentForm('sell');
              }}
            >
              Sell
            </button>
          </div>

          <div className='card'>
            <div className='card-body'>{content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
