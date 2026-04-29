import React from 'react';

const Features = () => (
  <section className="features" style={{padding: '80px 0'}}>
    <div className="container">
      <h2 className="gold-text" style={{fontSize: '2rem', marginBottom: '3rem', textAlign: 'center'}}>Designed for Real-World Deals</h2>
      <div className="feature-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
        <div className="feature-card glass" style={{padding: '2rem', borderRadius: '12px', textAlign: 'left', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)'}}>
          <h3 className="gold-text" style={{marginBottom: '1rem', fontSize: '1.3rem'}}>Physical Goods</h3>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Funds stay locked until delivery is confirmed and inspected. No release until you’re satisfied.</p>
        </div>
        <div className="feature-card glass" style={{padding: '2rem', borderRadius: '12px', textAlign: 'left', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)'}}>
          <h3 className="gold-text" style={{marginBottom: '1rem', fontSize: '1.3rem'}}>Digital Assets</h3>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Secure crypto and token transfers with controlled release based on agreed terms.</p>
        </div>
        <div className="feature-card glass" style={{padding: '2rem', borderRadius: '12px', textAlign: 'left', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)'}}>
          <h3 className="gold-text" style={{marginBottom: '1rem', fontSize: '1.3rem'}}>Large Orders</h3>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Structured conditions ensure bulk trades are fulfilled before payment is released.</p>
        </div>
        <div className="feature-card glass" style={{padding: '2rem', borderRadius: '12px', textAlign: 'left', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)'}}>
          <h3 className="gold-text" style={{marginBottom: '1rem', fontSize: '1.3rem'}}>Dispute Protection</h3>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>If something goes wrong, a neutral resolution process protects both sides.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
