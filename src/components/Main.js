import React, { useState } from 'react';
import Spinner from './Spinner';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

function Main({ isLoading, accountEthBalance, accountTokenBalance }) {
  const [currentForm, setCurrentForm] = useState('buy');

  const content =
    currentForm === 'buy' ? (
      <BuyForm accountEthBalance={accountEthBalance} accountTokenBalance={accountTokenBalance} />
    ) : (
      <SellForm accountEthBalance={accountEthBalance} accountTokenBalance={accountTokenBalance} />
    );

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <div id='content' className='mt-3'>
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

        <div className='card mb-4'>
          <div className='card-body'>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Main;
