import React from 'react';

const HowItWorks = () => (
  <section className="how-it-works" style={{padding: '80px 0'}}>
    <div className="container">
      <h2 className="gold-text" style={{textAlign: 'center', marginBottom: '4rem'}}>How It Works</h2>
      <div className="step-list">
        <div className="step-item glass">
          <div className="step-header">
            <span className="step-num gold-text">01</span>
            <h3>Create the Trade</h3>
          </div>
          <p>Define the terms, amount, and both parties involved.</p>
        </div>
        <div className="step-item glass">
          <div className="step-header">
            <span className="step-num gold-text">02</span>
            <h3>Lock the Funds</h3>
          </div>
          <p>Payment is locked in a secure vault.. Seller will be notified once buyer locks .</p>
        </div>
        <div className="step-item glass">
          <div className="step-header">
            <span className="step-num gold-text">03</span>
            <h3>Confirm & Release</h3>
          </div>
          <p>Funds are released only after delivery is confirmed or conditions are met.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
