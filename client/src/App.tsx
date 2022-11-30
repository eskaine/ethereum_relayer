import { useContext } from 'react';
import './App.css';
import { EthersContext } from './EthersProvider';
import { EthersContextInterface } from './interfaces/ethersContext';

function App() {
  const { connectWallet } = useContext(EthersContext) as EthersContextInterface;

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => connectWallet()}>Connect Metamask</button>
      </header>
    </div>
  );
}

export default App;
