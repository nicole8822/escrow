import React from 'react';
import Hero from '../components/Hero';
import TradeTerminal from '../components/TradeTerminal';
import '../styles/glass.css';

const Home = () => {
    return (
        <main className="page-home">
            {/* ── Entry Section ── */}
            <Hero />

            {/* ── Action Section ── */}
            <section className="terminal-section" style={{ 
                position: 'relative', 
                marginTop: '-120px', 
                zIndex: 10,
                paddingBottom: 'var(--space-32)'
            }}>
                <div className="container" style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    perspective: '1000px' 
                }}>
                    <div style={{ maxWidth: '600px', width: '100%' }}>
                        <TradeTerminal />
                    </div>
                </div>
            </section>

            {/* ── Trust Indicators ── */}
            <section className="home-info" style={{ padding: 'var(--space-20) 0' }}>
                <div className="container">
                    <div className="glass glass--dark" style={{ 
                        padding: 'var(--space-8)', 
                        textAlign: 'center',
                        borderStyle: 'dashed',
                        opacity: 0.8
                    }}>
                        <p className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            Secure Peer-to-Peer Settlement Layer 
                            <span className="gold-text" style={{ margin: '0 1rem' }}>|</span> 
                            No Third-Party Custody
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
