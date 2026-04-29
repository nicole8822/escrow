import React from 'react';
import '../styles/footer.css';

const Footer = () => (
  <footer className="footer-simple">
    <div className="container">
      <div className="footer-system-bar mono">
        NETWORK: MAINNET // LATENCY: 12ms // AUDIT: VERIFIED
      </div>
      <p className="footer-copyright mono" style={{opacity: 0.3, marginTop: '20px', fontSize: '0.6rem', textAlign: 'center'}}>
        © 2026 TRUSTVAULT PROTOCOL // NO PERMISSION REQUIRED
      </p>
    </div>
  </footer>
);

export default Footer;
