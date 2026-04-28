import React, { useEffect, useRef } from 'react';
import '../styles/hero.css';
import '../styles/glass.css';

const Hero = () => {
    const heroRef = useRef(null);

    // Orb parallax on mouse move — creates depth and high-end feel
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculate offset from center
            const x = (clientX / innerWidth - 0.5) * 30;
            const y = (clientY / innerHeight - 0.5) * 20;

            // Apply staggered movement to orbs
            hero.querySelectorAll('.hero__orb').forEach((orb, i) => {
                const depth = (i + 1) * 0.4;
                orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });
        };

        hero.addEventListener('mousemove', handleMouseMove);
        return () => hero.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="hero" ref={heroRef}>
            {/* ── Background stack ── */}
            <div className="hero__bg">
                <div className="hero__bg-base" />
                <div className="hero__bg-radials" />
                <div className="hero__bg-grid" />
                
                {/* Floating ambient orbs (Atmospheric Lighting) */}
                <div className="hero__orb hero__orb--blue" />
                <div className="hero__orb hero__orb--gold" />
                <div className="hero__orb hero__orb--teal" />
                
                <div className="hero__scanline" />
                <div className="hero__vignette" />
            </div>

            {/* Nav spacer */}
            <div className="hero__spacer" />

            {/* ── Content ── */}
            <div className="hero__content">
                <div className="hero-container">
                    
                    {/* Main Hero Panel with Glassmorphism */}
                    <div className="glass-panel main-hero glass glass--lifted glass--gold">
                        
                        {/* Live ticker above headline */}
                        <div className="hero__ticker">
                            <span className="hero__ticker-dot" />
                            <span className="hero__ticker-text">Protocol Live — All Systems Secured</span>
                        </div>

                        <h1 className="gold-text hero__headline">
                            <span className="line"><span className="line-inner">Trust</span></span>
                            <span className="line"><span className="line-inner accent">Vault</span></span>
                        </h1>

                        <p className="subtitle hero__sub">
                            Global Settlement. Automated Verification.
                        </p>

                        <div className="cta-group hero__buttons">
                            <button className="btn-primary">
                                Start Secure Trade <span className="hero__btn-arrow">→</span>
                            </button>
                            <button className="btn-secondary btn-ghost">How it Works</button>
                        </div>
                    </div>

                    {/* Stats Bar Panel */}
                    <div className="stats-bar glass-panel glass glass--dark">
                        <div className="stat-item glass-stat">
                            <span className="hero__stat-value">.2<span className="unit">M</span></span>
                            <div className="hero__stat-label">Active Escrow</div>
                        </div>
                        <div className="stat-item glass-stat">
                            <span className="hero__stat-value">12<span className="unit">ms</span></span>
                            <div className="hero__stat-label">Settlement Speed</div>
                        </div>
                        <div className="stat-item glass-stat">
                            <span className="hero__stat-value">100<span className="unit">%</span></span>
                            <div className="hero__stat-label">Anti-Scam Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll cue indicator */}
            <div className="hero__scroll-cue">
                <div className="hero__scroll-track">
                    <div className="hero__scroll-fill" />
                </div>
                <span className="hero__scroll-label">Scroll</span>
            </div>
        </div>
    );
};

export default Hero;
