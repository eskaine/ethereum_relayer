import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EthersProvider } from './EthersProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <EthersProvider>
      <App />
    </EthersProvider>
  </React.StrictMode>
);
