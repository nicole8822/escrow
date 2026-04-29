import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Master CSS import
import './styles/global.css';

// Helper to handle Scroll Reveals on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-root" id="root">
        <Navbar />

        {/* ── Main Application Canvas ── */}
        <main className="app-content">
          {/* Container removed from here to allow full-bleed backgrounds in Hero/Sections */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trades" element={<Dashboard />} />
          </Routes>
        </main>

        {/* ── TrustVault Global Footer ── */}
        <footer className="footer-simple glass glass--dark">
          <div className="container">
            <div className="footer-content" style={{ padding: 'var(--space-8) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className="mono footer-status">
                Protocol Status: <span className="status-online" style={{ color: 'var(--color-success)' }}>● Operational</span>
              </p>
              <p className="mono footer-copyright" style={{ opacity: 0.5, fontSize: 'var(--text-xs)' }}>
                TRUSTVAULT ESCROW ENGINE © 2026 // NO PERMISSION REQUIRED
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
