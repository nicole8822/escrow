import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Only one CSS import needed - the master manifest
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-root">
        {/* Navigation remains persistent across routes */}
        <Navbar />

        {/* Main Application Canvas */}
        <main className="app-content">
          <Routes>
            {/* Landing & Trade Initialization */}
            <Route path="/" element={<Home />} />
            
            {/* User Portfolio & Trade Tracking */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* UX Alias for navigation consistency */}
            <Route path="/trades" element={<Dashboard />} />
          </Routes>
        </main>

        {/* TrustVault Global Footer */}
        <footer className="footer-simple" style={{ 
          padding: '60px 0 40px', 
          textAlign: 'center', 
          borderTop: '1px solid var(--color-border)',
          marginTop: 'auto',
          background: 'var(--color-bg)'
        }}>
          <div className="container">
            <p className="mono" style={{ 
                fontSize: '0.6rem', 
                color: 'var(--text-muted)', 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase' 
            }}>
              Protocol Status: <span style={{ color: 'var(--color-success)' }}>Operational</span>
            </p>
            <p className="mono" style={{ 
                fontSize: '0.55rem', 
                color: 'var(--color-border-hover)', 
                marginTop: '1rem',
                letterSpacing: '0.1em' 
            }}>
              TRUSTVAULT ESCROW ENGINE © 2026 // NO PERMISSION REQUIRED
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
