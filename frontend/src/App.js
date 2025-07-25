import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [base, setBase] = useState('USD');
  const [target, setTarget] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios.get(`https://react-currency-converter-backend.onrender.com/api/rates/${base}`)
      .then(res => {
        setRates(res.data.conversion_rates);
        setCurrencies(Object.keys(res.data.conversion_rates));
      }).catch(err => {
        console.error(err);
      });
  }, [base]);

  const convert = () => {
    const rate = rates[target];
    setResult((amount * rate).toFixed(2));
  };

  return (
    <div className="app">
      <h1>Currency Converter 💱</h1>
      <div className="converter-box">
        <div className="form-group">
          <label>From:</label>
          <select value={base} onChange={e => setBase(e.target.value)}>
            {currencies.map((cur, idx) => (
              <option key={idx} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To:</label>
          <select value={target} onChange={e => setTarget(e.target.value)}>
            {currencies.map((cur, idx) => (
              <option key={idx} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>

        <button onClick={convert}>Convert</button>

        {result && (
          <div className="result">
            <p>{amount} {base} = <strong>{result} {target}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
