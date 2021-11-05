import React from 'react';
import './App.css';

const App = () => {
  return (
    <div>
      <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-3 shadow'>
        <p className='navbar-brand col-sm-3 col-md-2 text-center my-auto'>
          Ethereum Market Place
        </p>
      </nav>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-lg-12 d-flex text-center'>
            <div className='content mr-auto ml-auto'>
              <h1>Ethereum Market Place</h1>
              <p>
                Edit <code>src/components/App.js</code> and save to reload.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
