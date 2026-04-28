import React from 'react';
import '../styles/nav.css';

const Navbar = () => (
  <nav className="nav-glass">
    <div className="logo gold-text">TRUSTVAULT</div>
    <div className="nav-links">
      <a href="#trades">Active Trades</a>
      <a href="#vault">My Vault</a>
      <button className="wallet-btn">Connect Wallet</button>
    </div>
  </nav>
);

export default Navbar;
