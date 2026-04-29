import React, { useEffect, useRef } from 'react';
import '../styles/hero.css';
import '../styles/glass.css';

/**
 * TRUSTVAULT HERO — Force Upgrade
 * Optimized for React 18 with high-performance mouse tracking 
 * and hardware-accelerated parallax layers.
 */

const Hero = () => {
    const heroRef = useRef(null);
    const requestRef = useRef();
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Normalize mouse position to range [-1, 1]
            mousePos.current = {
                x: (clientX / innerWidth - 0.5) * 2,
                y: (clientY / innerHeight - 0.5) * 2
            };
        };

        const updateParallax = () => {
            const orbs = hero.querySelectorAll('.hero__orb');
            const { x, y } = mousePos.current;

            orbs.forEach((orb, i) => {
                const depth = (i + 1) * 15; // Movement intensity
                const moveX = x * depth;
                const moveY = y * depth;
                
                // Using translate3d to force GPU rendering
                orb.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });

            requestRef.current = requestAnimationFrame(updateParallax);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(updateParallax);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="hero" ref={heroRef}>
            {/* ── Background Stack (Full Bleed) ── */}
            <div className="hero__bg">
                <div className="hero__bg-base" />
                <div className="hero__bg-radials" />
                <div className="hero__bg-grid" />
                
                {/* Floating ambient orbs (Atmospheric Lighting) */}
                <div className="hero__orb hero__orb--blue" style={{ willChange: 'transform' }} />
                <div className="hero__orb hero__orb--gold" style={{ willChange: 'transform' }} />
                <div className="hero__orb hero__orb--teal" style={{ willChange: 'transform' }} />
                
                <div className="hero__scanline" />
                <div className="hero__vignette" />
            </div>

            {/* Content Buffer for Nav */}
            <div className="hero__spacer" />

            {/* ── Main Content Canvas ── */}
            <div className="hero__content">
                <div className="container hero-container">
                    
                    {/* Main Hero Panel with Glassmorphism */}
                    <div className="glass-panel main-hero glass glass--lifted glass--gold">
                        
                        {/* Live ticker above headline */}
                        <div className="hero__ticker">
                            <span className="hero__ticker-dot" />
                            <span className="hero__ticker-text mono">PROTOCOL LIVE — ALL SYSTEMS SECURED</span>
                        </div>

                        <h1 className="gold-text hero__headline">
                            <span className="line"><span className="line-inner">TRUST</span></span>
                            <span className="line"><span className="line-inner accent">VAULT</span></span>
                        </h1>

                        <p className="subtitle hero__sub">
                            Global Settlement. Automated Verification.
                            <br /><span className="mono" style={{ fontSize: '0.65rem', opacity: 0.5, letterSpacing: '0.1em' }}>POWERED BY DHL/FEDEX LOGISTICS DNA</span>
                        </p>

                        <div className="cta-group hero__buttons">
                            <button className="btn-primary">
                                START SECURE TRADE <span className="hero__btn-arrow">→</span>
                            </button>
                            <button className="btn-secondary btn-ghost">HOW IT WORKS</button>
                        </div>
                    </div>

                    {/* Stats Bar Panel */}
                    <div className="stats-bar glass-panel glass glass--dark">
                        <div className="stat-item glass-stat">
                            <span className="hero__stat-value">.2<span className="unit">M</span></span>
                            <div className="hero__stat-label mono">Active Escrow</div>
                        </div>
                        <div className="stat-item glass-stat">
                            <span className="hero__stat-value">12<span className="unit">ms</span></span>
                            <div className="hero__stat-label mono">Settlement Speed</div>
                        </div>
                        <div className="stat-item glass-stat">
                            <span className="hero__stat-value">100<span className="unit">%</span></span>
                            <div className="hero__stat-label mono">Anti-Scam Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Cue Indicator */}
            <div className="hero__scroll-cue">
                <div className="hero__scroll-track">
                    <div className="hero__scroll-fill" />
                </div>
                <span className="hero__scroll-label mono">SCROLL</span>
            </div>
        </div>
    );
};

export default Hero;
