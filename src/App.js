import './App.css';
import React, { useState } from 'react';
import FillOptions from './FillOptions.js'

const URL = 'http://api.coinlayer.com/api/live?access_key='
const API_KEY = '3989b4326f8c70270c0cffb35bb39761'

function App() {
  const [cur, setCur] = useState('');
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(0);
  const [rate, setRate] = useState(0);





  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY + '&symbols=' + cur;
      const response = await fetch(address);
      console.log(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setRate(json.rates[cur])
        setTo(from * json.rates[cur]);
      } else {
        alert('Error retrieving excahnge rate.')
        console.log(response);
      }
    } catch (err) {
      alert(err);
    } 
  } 

 

  return (
   <div id="container">
     <form onSubmit={convert}>
     <h1>Cryptocurrency converter</h1>
      <div className="row">
      <label className="form-lable" id="from">From</label>
        <div>
        <select name="cur" value={cur} onChange={e => setCur(e.target.value)} className="form-select mb-2">
          <FillOptions />
          </select>
        <input type="number" step="0.01"
        value={from} onChange={e => setFrom(e.target.value)} className="form-control"/>
        <output id="exchange" className="mt-2">Exchange rate: {rate}</output>
        </div>
      </div>
      <div className="mb-3 row">
      <div>
        <div id="to">To</div>
          </div>
          <div className="mb-3 mt-2 row">
        <div>
        <label className="form-lable">Dollars</label>
        <output className="form-control" id="dollars">{to.toFixed(2)}</output>
        </div>
        </div>
      </div>
      <div>
        <button className="btn btn-success">Calculate</button>
      </div>
     </form>
   </div>
  );
}

export default App;

