import React, { useState } from 'react';
import { useTrade } from '../hooks/useTrade';
import '../styles/glass.css';

const TradeTerminal = () => {
    const [tracking, setTracking] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const { startSecureTrade, loading, tradeState, isLocked, TRADE_STATES } = useTrade();

    // Your original carrier auto-detect logic
    const detectCarrier = (val) => {
        if (/^1Z/i.test(val)) return 'UPS';
        if (/^\d{12,}$/.test(val)) return 'FedEx';
        return 'DHL';
    };

    const carrier = tracking ? detectCarrier(tracking) : null;

    const handleStart = async () => {
        if (!tracking) return;
        // Logic remains untouched, using the enhanced hook
        await startSecureTrade({ tracking_number: tracking, carrier: carrier || 'DHL' });
    };

    return (
        <div className={`glass-panel terminal glass glass--lifted ${isLocked ? 'terminal--locked' : ''}`}>
            
            {/* ── Dynamic Header ── */}
            <div className="glass-card__header">
                <div className="glass-card__icon glass-card__icon--gold">
                    {isLocked ? '🔒' : '⬡'}
                </div>
                <div>
                    <div className="glass-card__label">
                        {isLocked ? `Status: ${tradeState.replace('_', ' ')}` : 'Escrow Protocol'}
                    </div>
                    <h3 className="glass-card__title">
                        {isLocked ? 'Vault Secured' : 'Initialize Secure Settlement'}
                    </h3>
                </div>
                <span className={`badge ${isLocked ? 'badge-locked' : 'badge-ready'}`}>
                    {isLocked ? 'LOCKED' : 'READY'}
                </span>
            </div>

            <div className="glass-card__divider" />

            {/* ── Conditional Content Body ── */}
            {!isLocked ? (
                /* VERSION 1: Input & Setup State */
                <div className="terminal__setup-view animate-fade-in">
                    {/* Carrier detection hint */}
                    {carrier && (
                        <div className="glass-chip" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                            <span className="glass-chip__dot" />
                            Carrier detected: {carrier}
                        </div>
                    )}

                    <input 
                        type="text" 
                        className={`glass-input ${inputFocus ? 'focused' : ''}`}
                        placeholder="Enter DHL / FedEx Tracking #" 
                        onChange={(e) => setTracking(e.target.value)}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                        value={tracking}
                        disabled={loading}
                    />

                    <div className="glass glass--success" style={{ padding: '0.75rem 1rem', marginTop: '0.75rem', borderRadius: '8px' }}>
                        <p className="mono" style={{ color: 'var(--color-success)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                            ✓ Funds locked on-chain before carrier confirmation
                        </p>
                    </div>

                    <div className="glass-card__divider" />

                    <button 
                        className="btn-primary" 
                        onClick={handleStart} 
                        disabled={!tracking || loading}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {loading ? (
                            <>
                                <span className="terminal__spinner" />
                                Locking Funds…
                            </>
                        ) : (
                            <>
                                Lock Funds & Start <span className="hero__btn-arrow">→</span>
                            </>
                        )}
                    </button>
                </div>
            ) : (
                /* VERSION 2: Locked & Tracking State */
                <div className="terminal__locked-view animate-fade-in" style={{ padding: '10px 0' }}>
                    <p className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Carrier: <span className="gold-text">{carrier}</span> <br/>
                        Tracking: <strong>{tracking}</strong>
                    </p>
                    
                    {/* Progress Pipeline */}
                    <div className="progress-pipeline" style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        position: 'relative',
                        padding: '0 10px'
                    }}>
                        <div style={{ 
                            position: 'absolute', top: '50%', left: '30px', right: '30px', 
                            height: '1px', background: 'var(--color-border)', zIndex: 0 
                        }} />
                        
                        <div className={`pipeline-step ${tradeState === TRADE_STATES.FUNDED ? 'active' : 'done'}`} 
                             style={{ zIndex: 1, background: 'var(--color-surface)', padding: '4px 10px', border: '1px solid var(--color-success)', borderRadius: '4px', fontSize: '0.6rem', color: 'var(--color-success)' }}>
                             FUNDS LOCKED
                        </div>
                        
                        <div className={`pipeline-step ${[TRADE_STATES.ACTIVE, TRADE_STATES.DELIVERED].includes(tradeState) ? 'active' : ''}`}
                             style={{ zIndex: 1, background: 'var(--color-surface)', padding: '4px 10px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                             IN TRANSIT
                        </div>
                    </div>

                    <div className="glass-card__divider" style={{ marginTop: '1.5rem' }} />
                    
                    <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem', textAlign: 'center', textTransform: 'uppercase' }}>
                        Awaiting Logistics Signal for Release
                    </p>
                </div>
            )}

            {/* ── Footer Fine Print (Always Visible) ── */}
            {!isLocked && (
                <p className="mono" style={{ 
                    marginTop: '0.75rem', color: 'var(--text-muted)', 
                    fontSize: '0.62rem', letterSpacing: '0.1em', textAlign: 'center', textTransform: 'uppercase',
                }}>
                    No withdrawal until both parties confirm
                </p>
            )}
        </div>
    );
};

export default TradeTerminal;
