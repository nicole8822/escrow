import React from 'react';
import '../styles/dashboard.css';
import '../styles/glass.css';

const Dashboard = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="dashboard">
            <div className="container">
                
                {/* ── Header ── */}
                <header className="dashboard__header">
                    <div>
                        <div className="hero__ticker" style={{ marginBottom: '1rem' }}>
                            <span className="hero__ticker-dot" />
                            <span className="hero__ticker-text">Account Verified</span>
                        </div>
                        <h2 className="dashboard__title">Trade <span className="gold-text">Overview</span></h2>
                    </div>
                    <div className="dashboard__header-right">
                        <div className="dashboard__timestamp">Last Sync: {timestamp}</div>
                    </div>
                </header>

                {/* ── Stat Bar ── */}
                <div className="dashboard__stats">
                    <div className="dashboard__stat">
                        <div className="dashboard__stat-label">Active Shipments</div>
                        <div className="dashboard__stat-value">3<span className="suffix">.0</span></div>
                        <div className="dashboard__stat-delta dashboard__stat-delta--up">↑ 1 New</div>
                    </div>
                    <div className="dashboard__stat">
                        <div className="dashboard__stat-label">Funds in Escrow</div>
                        <div className="dashboard__stat-value">2,400<span className="suffix"> USDC</span></div>
                        <div className="dashboard__stat-delta">Secured On-Chain</div>
                    </div>
                    <div className="dashboard__stat">
                        <div className="dashboard__stat-label">Avg. Settlement</div>
                        <div className="dashboard__stat-value">12.4<span className="suffix">hr</span></div>
                    </div>
                    <div className="dashboard__stat">
                        <div className="dashboard__stat-label">Trust Rating</div>
                        <div className="dashboard__stat-value">99<span className="suffix">%</span></div>
                    </div>
                </div>

                {/* ── Main Layout ── */}
                <div className="dashboard__body">
                    
                    {/* Trade List Container */}
                    <div className="dashboard__trades glass glass--dark">
                        <div className="dashboard__trades-header">
                            <div className="dashboard__col-label">Trade / ID</div>
                            <div className="dashboard__col-label">Amount</div>
                            <div className="dashboard__col-label">Status</div>
                            <div className="dashboard__col-label">Logistics</div>
                            <div className="dashboard__col-label"></div>
                        </div>

                        {/* Mock Rows representing your 3 active shipments */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="dashboard__trade-row">
                                <div className="dashboard__trade-info">
                                    <div className="dashboard__trade-avatar">⬡</div>
                                    <div>
                                        <div className="dashboard__trade-pair">Shipment #TRD-092{i}</div>
                                        <div className="dashboard__trade-id">OX...F82{i}</div>
                                    </div>
                                </div>
                                <div className="dashboard__trade-amount">
                                    800.00 <span className="dashboard__trade-currency">USDC</span>
                                </div>
                                <div>
                                    <span className="dashboard__trade-cat">In Transit</span>
                                </div>
                                <div className="dashboard__trade-time">DHL: 1Z99...{i}</div>
                                <div className="dashboard__trade-action">
                                    <button className="dashboard__btn-view">View Detail</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Side Panel */}
                    <aside className="dashboard__side">
                        <div className="dashboard__wallet">
                            <div className="dashboard__wallet-label">Connected Wallet</div>
                            <div className="dashboard__wallet-balance">
                                4,120<span className="currency">.50</span>
                            </div>
                            <div className="dashboard__wallet-sub">USDC AVAILABLE</div>
                            <div className="dashboard__wallet-actions">
                                <button className="dashboard__wallet-btn">Deposit</button>
                                <button className="dashboard__wallet-btn">Withdraw</button>
                            </div>
                        </div>

                        <div className="dashboard__security glass">
                            <div className="dashboard__security-label">Security Protocol</div>
                            <div className="dashboard__security-row">
                                <span className="dashboard__security-key">Escrow Multi-sig</span>
                                <span className="dashboard__security-val dashboard__security-val--ok">ACTIVE</span>
                            </div>
                            <div className="dashboard__security-row">
                                <span className="dashboard__security-key">Vault Lockdown</span>
                                <span className="dashboard__security-val dashboard__security-val--locked">LOCKED</span>
                            </div>
                            <div className="dashboard__security-row">
                                <span className="dashboard__security-key">Auto-Dispute</span>
                                <span className="dashboard__security-val">READY</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
