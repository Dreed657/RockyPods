import React from 'react';
import ReactDOM from 'react-dom';

import { register } from './serviceWorker';

import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Registers service worker for PWA support
register();