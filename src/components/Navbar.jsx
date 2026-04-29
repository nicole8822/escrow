import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Navbar = () => (
  <nav className="nav-glass" style={{position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)'}}>
    <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Link to="/" className="logo gold-text" style={{textDecoration: 'none', fontWeight: '800', fontSize: '1.5rem'}}>TRUSTVAULT</Link>
      <button className="nav-wallet-btn mono" style={{background: 'var(--gold-liquid)', color: '#000', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}>CONNECT WALLET</button>
    </div>
  </nav>
);

export default Navbar;
