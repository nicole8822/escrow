import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import TradeTerminal from '../components/TradeTerminal';
import '../styles/glass.css';

/**
 * TRUSTVAULT HOME — Forced Upgrade
 * This page now acts as a high-fidelity wrapper that ensures
 * full-bleed sections (Hero) and centered content (Terminal) 
 * coexist without layout shifts.
 */

const Home = () => {
    useEffect(() => {
        // Optional: Trigger any entrance animations here
        document.title = "TrustVault | Secure Global Settlement";
    }, []);

    return (
        <main className="page-home">
            {/* ── Entry Section (Full Bleed) ── */}
            <Hero />

            {/* ── Action Section (Terminal Float) ── 
                 Note: The negative margin is now handled by a dedicated wrapper
                 to prevent overlap on small viewports.
            */}
            <section className="home__action-layer">
                <div className="container">
                    <div className="home__terminal-wrapper">
                        <TradeTerminal />
                    </div>
                </div>
            </section>

            {/* ── Trust Indicators (Institutional Banner) ── */}
            <section className="home__trust-banner">
                <div className="container">
                    <div className="glass glass--dark trust-banner__inner">
                        <p className="mono trust-banner__text">
                            Secure Peer-to-Peer Settlement Layer 
                            <span className="trust-banner__divider">|</span> 
                            No Third-Party Custody
                        </p>
                    </div>
                </div>
            </section>

            {/* Injection of specific Home-page layout logic to replace inline styles */}
            <style>{`
                .page-home {
                    display: flex;
                    flex-direction: column;
                    background: var(--color-bg);
                }

                .home__action-layer {
                    position: relative;
                    z-index: 10;
                    margin-top: clamp(-150px, -12vh, -80px);
                    padding-bottom: var(--space-32);
                    perspective: 1200px;
                }

                .home__terminal-wrapper {
                    max-width: 640px;
                    margin: 0 auto;
                    width: 100%;
                    animation: terminalEntrance 1.2s var(--ease-out-expo) 0.8s both;
                }

                .trust-banner__inner {
                    padding: var(--space-10);
                    text-align: center;
                    border: 1px dashed var(--color-border);
                    background: rgba(255, 255, 255, 0.01);
                }

                .trust-banner__text {
                    font-size: clamp(0.6rem, 1.2vw, 0.75rem);
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    margin: 0;
                }

                .trust-banner__divider {
                    color: var(--color-gold);
                    margin: 0 var(--space-6);
                    opacity: 0.6;
                }

                @keyframes terminalEntrance {
                    from { 
                        opacity: 0; 
                        transform: translateY(40px) rotateX(5deg); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) rotateX(0); 
                    }
                }

                @media (max-width: 768px) {
                    .home__action-layer {
                        margin-top: -60px;
                        padding-bottom: var(--space-16);
                    }
                }
            `}</style>
        </main>
    );
};

export default Home;
