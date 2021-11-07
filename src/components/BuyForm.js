import React, { useState } from 'react';
import ethLogo from '../img/eth.png';
import salehLogo from '../img/saleh.png';

function BuyForm({ accountEthBalance, accountTokenBalance, buyTokens }) {
  const [input, setInput] = useState(0);

  return (
    <form
      className='mb-3'
      onSubmit={(event) => {
        event.preventDefault();
        let etherAmount;
        etherAmount = input.toString();
        etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
        buyTokens(etherAmount);
      }}
    >
      <div>
        <label className='d-flex'>
          <b className='me-auto font-weight-bold'>Input</b>
          <div className='text-muted'>{window.web3.utils.fromWei(accountEthBalance, 'Ether')}</div>
        </label>
      </div>
      <div className='input-group mb-4'>
        <input
          type='number'
          onChange={(event) => {
            const etherAmount = event.target.value;
            if (etherAmount < 0) {
              event.target.value = 0;
            } else setInput(etherAmount);
          }}
          className='form-control form-control-lg'
          placeholder='0'
          required
        />
        <div className='input-group-append'>
          <div className='input-group-text  p-2'>
            <img src={ethLogo} height='32' alt='' />
            &nbsp;&nbsp;&nbsp; ETH
          </div>
        </div>
      </div>

      <label className='d-flex'>
        <b className='me-auto font-weight-bold'>Output</b>
        <div className='text-muted'>{window.web3.utils.fromWei(accountTokenBalance, 'Ether')}</div>
      </label>
      <div className='input-group mb-2'>
        <input type='text' className='form-control form-control-lg' placeholder='0' value={input * 100} disabled />
        <div className='input-group-append'>
          <div className='input-group-text p-2'>
            <img className='rounded-circle' src={salehLogo} height='32' alt='' />
            &nbsp; SALEH
          </div>
        </div>
      </div>

      <label className='d-flex mb-5 mt-3'>
        <b className='me-auto font-weight-bold'>Exchange Rate</b>
        <div className='text-muted'>1 ETH = 100 SALEH</div>
      </label>
      <button type='submit' className='btn btn-success btn-lg btn-block w-100'>
        BUY SALEH !
      </button>
    </form>
  );
}

export default BuyForm;
