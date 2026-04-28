import React, { useState } from 'react';
import { createTrade } from '../services/api';

const TradeTerminal = () => {
  const [tracking, setTracking] = useState('');
  
  const initTrade = async () => {
    await createTrade({ tracking_number: tracking, carrier: 'DHL' });
    alert('Trade Initialized. Awaiting Logistics Signal...');
  };

  return (
    <div className="glass-panel terminal">
      <h3>Initialize Secure Settlement</h3>
      <input 
        type="text" 
        placeholder="Enter DHL/FedEx Tracking #" 
        onChange={(e) => setTracking(e.target.value)}
      />
      <button onClick={initTrade}>Lock Funds & Start</button>
    </div>
  );
};

export default TradeTerminal;
