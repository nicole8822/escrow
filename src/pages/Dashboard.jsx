import React from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="container dashboard-layout">
      <div className="dashboard-main">
        <h2 className="gold-text">Active Settlements</h2>
        {[1, 2].map((item) => (
          <div key={item} className="trade-card glass glass--lifted">
            <div className="trade-row">
              <div>
                <span className="mono text-muted">ID: TV-8822-${item}</span>
                <h3>High-End Electronics</h3>
              </div>
              <div style={{textAlign: 'right'}}>
                <span className="stat-value gold-text">₦450,000</span>
                <span className="status-online mono">IN TRANSIT</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="dashboard-sidebar">
        <div className="glass security-card" style={{padding: '2rem'}}>
          <h4 className="gold-text">Security Tier</h4>
          <div className="stat-value">A+</div>
          <p className="mono text-muted" style={{fontSize: '0.7rem'}}>
            Identity Verified <br/>
            Clean Dispute Record
          </p>
          <button className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>
            Upgrade Trust Score
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
