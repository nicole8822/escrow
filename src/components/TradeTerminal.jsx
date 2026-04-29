import React, { useState } from 'react';
import '../styles/glass.css';

const TradeTerminal = () => {
  const [tracking, setTracking] = useState('');

  return (
    <div className="container" style={{marginTop: '60px'}}>
      <div className="glass glass--lifted glass--gold terminal-clean">
        <h2 className="gold-text">Protect Your Transaction</h2>
        <p className="text-muted">Enter your delivery tracking number. We'll handle the security from here.</p>
        
        <div className="input-group">
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Tracking Number (DHL, FedEx, etc.)"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
          />
          <button className="btn-ingot" style={{width: '100%'}}>Secure & Lock Funds</button>
        </div>
        
        <p className="mono" style={{marginTop: '1.5rem', opacity: 0.5, fontSize: '0.6rem'}}>
          Verified Protection Active // Funds held in independent vault
        </p>
      </div>
    </div>
  );
};

export default TradeTerminal;
