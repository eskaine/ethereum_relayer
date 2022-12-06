import { useContext, useEffect, useState, ChangeEvent } from 'react';
import './App.css';
import { EthersContext } from './EthersProvider';
import { EthersContextInterface } from './interfaces/ethersContext';

function App() {
  const { connectWallet, getAccount, sendTransaction } = useContext(EthersContext) as EthersContextInterface;
  const [isLogin, setIsLogin] = useState(false);
  const [amount, setAmount] = useState(0);
  const [txState, setTxState] = useState(0);

  async function login() {
    let account = getAccount();

    if(account === '') {
      account = await connectWallet();
    }

    if(account !== '') {
      setIsLogin(true);
    }
  }

  function handleInputChange(newAmount: ChangeEvent<HTMLInputElement>) {
    setAmount(+newAmount.target.value);
  }

  async function handleSubmit() {
    try {
      setTxState(1);
      const tx = await sendTransaction(amount);
      setAmount(0);
      setTxState(2);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="App">
      <div>Ethereum Relayer</div>
      <div>
        {isLogin && 
          <div>
            <input className="input-buy" onChange={handleInputChange} value={amount}></input>
            <button onClick={handleSubmit}>Buy</button>
          </div>
        }
        {!isLogin && <button onClick={login}>Connect Metamask</button>}
      </div>
      <div>
        {txState === 1 && <div className="text-red">{'Transaction initiated!'}</div>}
        {txState === 2 && <div className="text-green">{'Transaction received!'}</div>}
      </div>
    </div>
  );
}

export default App;
