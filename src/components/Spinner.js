import React from 'react';
import SpinnerImg from '../img/spinner.gif';

const Spinner = () => {
  return <img style={{ width: '200px', margin: 'auto', display: 'block' }} src={SpinnerImg} alt='Loading' />;
};

export default Spinner;
