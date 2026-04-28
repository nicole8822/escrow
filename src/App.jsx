import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TradeTerminal from './components/TradeTerminal';
import './styles/global.css';

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <section id="terminal" style={{ padding: '40px' }}>
          <TradeTerminal />
        </section>
      </main>
    </div>
  );
}

export default App;
