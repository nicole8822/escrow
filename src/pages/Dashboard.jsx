import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import '../styles/glass.css';

// 🧬 DNA Status Mapping (Mirrors proto/trade.proto)
const STATUS_MAP = {
  0: { label: 'PENDING_FUNDING', color: 'var(--text-muted)' },
  1: { label: 'FUNDS_LOCKED', color: 'var(--color-success)' },
  2: { label: 'IN_TRANSIT', color: 'var(--gold-primary)' },
  3: { label: 'DELIVERED', color: 'var(--tech-cyan)' },
  4: { label: 'UNBOXING_IN_PROGRESS', color: '#ff00ff' },
  5: { label: 'COMPLETED', color: 'var(--color-success)' },
  6: { label: 'DISPUTED', color: 'var(--color-error)' },
};

const Dashboard = () => {
  // 🛰️ Simulation of live data coming from Go Orchestrator
  const [trades, setTrades] = useState([
    {
      trade_id: 'TV-8822-1',
      title: 'High-End Electronics',
      amount_fiat: 450000,
      status: 2, // IN_TRANSIT
      tracking_number: 'DHL992831',
      carrier: 'DHL'
    },
    {
      trade_id: 'TV-8822-2',
      title: 'Rare Digital Asset',
      amount_fiat: 125000,
      status: 4, // UNBOXING_IN_PROGRESS
      tracking_number: 'N/A',
      carrier: 'PROTOCOL'
    }
  ]);

  // Load newly created trades from local persistence if they exist
  useEffect(() => {
    const savedTrade = localStorage.getItem('last_created_trade');
    if (savedTrade) {
      const parsedTrade = JSON.parse(savedTrade);
      // Check if trade already exists to avoid duplicates
      setTrades(prev => {
        if (prev.find(t => t.trade_id === parsedTrade.trade_id)) return prev;
        return [parsedTrade, ...prev];
      });
    }
  }, []);

  return (
    <div className="container dashboard-layout animate-fade-in" style={{ padding: '120px 0' }}>
      <div className="dashboard-main">
        <header style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
          <span className="mono gold-text">SYSTEM.LEDGER_VIEW()</span>
          <h2 className="gold-text" style={{ fontSize: '2.5rem' }}>Active Settlements</h2>
        </header>

        <div className="trade-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {trades.map((trade) => (
            <div key={trade.trade_id} className="trade-card glass glass--lifted" style={{ padding: '2rem' }}>
              <div className="trade-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="trade-info" style={{ textAlign: 'left' }}>
                  <span className="mono" style={{ fontSize: '0.65rem', opacity: 0.5 }}>ID: {trade.trade_id}</span>
                  <h3 style={{ margin: '0.5rem 0' }}>{trade.title}</h3>
                  <div className="trade-meta mono" style={{ fontSize: '0.6rem', display: 'flex', gap: '1rem' }}>
                    <span>📦 {trade.carrier}: {trade.tracking_number}</span>
                  </div>
                </div>

                <div className="trade-finances" style={{ textAlign: 'right' }}>
                  <div className="stat-value gold-text">₦{Number(trade.amount_fiat).toLocaleString()}</div>
                  <div className="status-pill mono" style={{ 
                    fontSize: '0.6rem', 
                    color: STATUS_MAP[trade.status]?.color || 'white', 
                    border: `1px solid ${STATUS_MAP[trade.status]?.color || 'white'}`,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    display: 'inline-block'
                  }}>
                    ● {STATUS_MAP[trade.status]?.label || 'UNKNOWN'}
                  </div>
                </div>
              </div>

              {/* 🛡️ RUST VALIDATION OVERLAY: Shows up only during unboxing */}
              {trade.status === 4 && (
                <div className="glass" style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ff00ff22', background: '#ff00ff05' }}>
                  <p className="mono" style={{ fontSize: '0.6rem', color: '#ff00ff', textAlign: 'left' }}>
                    [RUST_CORE]: AWAITING_UNBOXING_VIDEO_HASH... 
                    <br/>Verification protocol is active.
                  </p>
                </div>
              )}

              {/* 🎯 ACTION BUTTONS BASED ON DNA STATE */}
              <div className="trade-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                {trade.status === 3 && <button className="btn-ingot" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>Confirm Receipt</button>}
                <button className="nav-link" style={{ fontSize: '0.7rem', border: 'none', background: 'none', cursor: 'pointer', color: 'inherit' }}>View Audit Trail</button>
              </div>
            </div>
          ))}
          
          {trades.length === 0 && (
            <div className="glass" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
              <p className="mono">NO_ACTIVE_SETTLEMENTS_FOUND</p>
            </div>
          )}
        </div>
      </div>

      <aside className="dashboard-sidebar">
        <div className="glass security-card" style={{ padding: '2rem', position: 'sticky', top: '140px' }}>
          <header style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <h4 className="gold-text mono">Identity Score</h4>
            <div className="stat-value" style={{ fontSize: '3rem' }}>A+</div>
          </header>
          
          <div className="wallet-stats mono" style={{ fontSize: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Available:</span>
              <span>2.405 ETH</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">In Escrow:</span>
              <span className="gold-text">1.100 ETH</span>
            </div>
          </div>

          <div className="glass-card__divider" style={{ margin: '1.5rem 0', height: '1px', background: 'var(--color-border)', opacity: 0.2 }} />
          
          <p className="mono" style={{ fontSize: '0.55rem', opacity: 0.6, textAlign: 'left' }}>
            ✓ MULTI-SIG ACTIVE<br/>
            ✓ KYC VERIFIED<br/>
            ✓ NO DISPUTE HISTORY
          </p>

          <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.8rem', cursor: 'pointer' }}>
            Withdraw Funds
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
