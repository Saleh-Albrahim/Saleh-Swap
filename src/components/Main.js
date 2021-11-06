import React from 'react';
import Spinner from './Spinner';

function Main({ isLoading }) {
  return isLoading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <h1>Ethereum Market Place</h1>
    </div>
  );
}

export default Main;
