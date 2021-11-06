import React from 'react';
import Identicon from 'identicon.js';

function Navbar({ account }) {
  let identicon;
  if (account) identicon = new Identicon(account, 30).toString();

  return (
    <nav className='navbar navbar-dark  fixed-top bg-dark p-3 shadow'>
      <p className='navbar-brand  my-auto'>Ethereum Market Place</p>
      <ul className='navbar-nav d-inline my-auto'>
        <li>
          <span className='nav-address'>{account}</span>
          {identicon && (
            <img className='rounded mr-5' width='50' height='50' src={`data:image/png;base64,${identicon}`} alt='identicon'></img>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
