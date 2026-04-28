import React from 'react';
import '../styles/hero.css';
import '../styles/glass.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="glass-panel main-hero">
        <h1 className="gold-text">TrustVault</h1>
        <p className="subtitle">Global Settlement. Automated Verification.</p>
        <div className="cta-group">
          <button className="btn-primary">Start Secure Trade</button>
          <button className="btn-secondary">How it Works</button>
        </div>
      </div>
      <div className="stats-bar glass-panel">
        <div className="stat-item"><span>.2M</span> Active Escrow</div>
        <div className="stat-item"><span>12ms</span> Settlement Speed</div>
        <div className="stat-item"><span>100%</span> Anti-Scam Rate</div>
      </div>
    </div>
  );
};

export default Hero;
