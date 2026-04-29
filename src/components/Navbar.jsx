import React, { useState, useEffect, useRef } from 'react';
import '../styles/nav.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const navRef = useRef(null);

    // Scroll effect: triggers the glass blur + border transition in nav.css
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close drawer on outside click
    useEffect(() => {
        if (!drawerOpen) return;
        const onClickOut = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setDrawerOpen(false);
            }
        };
        document.addEventListener('mousedown', onClickOut);
        return () => document.removeEventListener('mousedown', onClickOut);
    }, [drawerOpen]);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    const links = [
        { href: '#trades', label: 'Active Trades' },
        { href: '#vault', label: 'My Vault' },
        { href: '#how', label: 'How It Works' },
        { href: '#escrow', label: 'Escrow Engine' },
    ];

    return (
        <header ref={navRef}>
            {/* ── Main Nav ── */}
            <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav__inner">
                    
                    {/* Brand Logo Section */}
                    <div className="nav__logo">
                        <div className="nav__logo-mark">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#C8A96E" strokeWidth="1" fill="none" opacity="0.6" />
                                <polygon points="16,7 25,12 25,20 16,25 7,20 7,12" stroke="#C8A96E" strokeWidth="1" fill="rgba(200,169,110,0.08)" />
                                <circle cx="16" cy="16" r="3" fill="#C8A96E" opacity="0.9" />
                            </svg>
                        </div>
                        <span className="nav__logo-name">
                            TRUST<span>VAULT</span>
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="nav__links">
                        {links.map(({ href, label }) => (
                            <a 
                                key={href} 
                                href={href} 
                                className={`nav__link ${activeLink === href ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveLink(href);
                                    setDrawerOpen(false);
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Global Actions */}
                    <div className="nav__actions">
                        <span className="nav__lang">EN</span>
                        <button className="nav__wallet-btn">
                            Connect Wallet
                        </button>

                        {/* Mobile Hamburger Menu */}
                        <button 
                            className={`nav__hamburger ${drawerOpen ? 'open' : ''}`} 
                            onClick={() => setDrawerOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile Drawer ── */}
            <div className={`nav__drawer ${drawerOpen ? 'open' : ''}`}>
                {links.map(({ href, label }) => (
                    <a 
                        key={href} 
                        href={href} 
                        className="nav__drawer-link"
                        onClick={() => {
                            setActiveLink(href);
                            setDrawerOpen(false);
                        }}
                    >
                        {label}
                    </a>
                ))}
                <div className="nav__drawer-footer">
                    <button className="nav__drawer-btn">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
