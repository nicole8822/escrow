import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="container" style={{textAlign: 'center', padding: '140px 0 60px'}}>
        <span className="mono gold-text" style={{letterSpacing: '0.3em'}}>WELCOME TO ESCROW PROTOCOL</span>
        <h1 className="hero-title"> Where we secure any transaction between two parties.</h1>
        <p className="hero-sub" style={{fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem'}}>
          Lock funds. Define conditions. Release only when both sides are satisfied.
        </p>
        
        <div className="hero-cta-wrapper">
          <button className="btn-ingot" onClick={() => navigate('/create')}>Start a Secure Trade</button>
          <p className="hero-support mono" style={{marginTop: '1.5rem', opacity: 0.6, fontSize: '0.7rem'}}>
            For buyers and sellers who don’t fully trust each other yet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
