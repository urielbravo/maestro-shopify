import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StorefrontContext } from './components/StorefrontContext'

const urlParams = new URLSearchParams(window.location.search);
const storefrontAccessToken = { access_token: urlParams.get('storefrontaccesstoken') };

ReactDOM.render(
  <React.StrictMode>
    <StorefrontContext.Provider value={storefrontAccessToken}>
      <App />
    </StorefrontContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
