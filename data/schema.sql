CREATE TABLE trades (
    trade_id UUID PRIMARY KEY,
    buyer_address TEXT NOT NULL,
    seller_address TEXT NOT NULL,
    amount_fiat DECIMAL(18, 2),
    insurance_crypto DECIMAL(18, 8),
    tracking_number TEXT,
    status INTEGER DEFAULT 0,
    video_hash TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    trade_id UUID REFERENCES trades(trade_id),
    action TEXT,
    old_status INTEGER,
    new_status INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
