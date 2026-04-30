import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/glass.css';

const CreateTrade = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [vaultLink, setVaultLink] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [notification, setNotification] = useState({ show: false, message: '' });

  const [form, setForm] = useState({
    role: 'Buyer',
    tradeType: 'Physical',
    title: '',
    amount: '',
    counterparty: '',
    carrier: '',
    inspectionTime: '48',
    manualConfirm: false,
    milestone: ''
  });

  // Custom Notification Trigger
  const triggerNotify = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const updateForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateStep1 = () => {
    if (!form.title) {
      setError("Trade title is required");
      return false;
    }
    if (!form.amount) {
      setError("Enter the trade amount");
      return false;
    }
    if (!form.counterparty) {
      setError("Add the other party wallet or email");
      return false;
    }

    setError('');
    return true;
  };

  const getConditionsText = () => {
    if (form.tradeType === 'Physical') {
      return `✔ Delivery confirmed via carrier
✔ Buyer approves within ${form.inspectionTime} hours`;
    }
    if (form.tradeType === 'Digital') {
      return `✔ Asset transfer confirmed
✔ Manual approval required`;
    }
    if (form.tradeType === 'Service') {
      return `✔ Milestone completed
✔ Buyer approval required`;
    }
  };

  // 🔐 NEW: Deterministic SHA-style Hash Simulation
  const generateProtocolHash = (data) => {
    const s = JSON.stringify(data) + Date.now();
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = ((hash << 5) - hash) + s.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).toUpperCase();
  };

  // ⏳ NEW: Vault Link Generation with Expiry & Signature
  const generateVaultLink = () => {
    const vaultId = Array.from({ length: 12 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    
    const hash = generateProtocolHash(form);
    
    // Logic: Keep the protocol internal but don't expose raw exp in the string if not desired
    return `ESCROW://vault/${vaultId}?sig=${hash}`;
  };

  // ⏱️ Countdown Timer Logic
  useEffect(() => {
    if (step === 4 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="container" style={{ padding: '120px 0', position: 'relative' }}>
      
      {/* 🔔 CUSTOM PROTOCOL NOTIFICATION */}
      {notification.show && (
        <div className="glass animate-fade-in" style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          padding: '1rem 2rem',
          border: '1px solid var(--color-gold)',
          background: 'rgba(200, 169, 110, 0.1)',
          color: 'var(--color-gold)',
          zIndex: 9999,
          fontSize: '0.75rem',
          fontFamily: 'var(--f-mono)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          [PROTOCOL_MSG]: {notification.message}
        </div>
      )}

      <div className="glass glass--lifted builder-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>

        {error && (
          <div
            className="glass"
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              border: '1px solid rgba(232,54,74,0.3)',
              background: 'rgba(232,54,74,0.05)',
              color: 'var(--color-danger)',
              fontSize: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="builder-steps mono" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', opacity: 0.5, fontSize: '0.7rem' }}>
          <span style={{ color: step >= 1 ? 'var(--color-gold)' : 'inherit' }}>01 DEFINE</span>
          <span style={{ color: step >= 2 ? 'var(--color-gold)' : 'inherit' }}>02 CONDITIONS</span>
          <span style={{ color: step >= 3 ? 'var(--color-gold)' : 'inherit' }}>03 REVIEW</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="step-content animate-fade-in">
            <h2 className="gold-text">Create a Secure Trade</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
              Set up the agreement between you and the other party.
            </p>

            <div className="input-group">

              <label className="mono">I am the:</label>
              <select
                className="glass-input"
                value={form.role}
                onChange={(e) => updateForm('role', e.target.value)}
              >
                <option>Buyer</option>
                <option>Seller</option>
              </select>

              <label className="mono">Trade Type:</label>
              <select
                className="glass-input"
                value={form.tradeType}
                onChange={(e) => updateForm('tradeType', e.target.value)}
              >
                <option value="Physical">Physical Goods</option>
                <option value="Digital">Digital Assets</option>
                <option value="Service">Services</option>
              </select>

              <input
                type="text"
                className="glass-input"
                placeholder="Trade Title (e.g. iPhone 13 Purchase)"
                value={form.title}
                onChange={(e) => updateForm('title', e.target.value)}
              />

              <input
                type="number"
                className="glass-input"
                placeholder="Amount (USDT or Fiat)"
                value={form.amount}
                onChange={(e) => updateForm('amount', e.target.value)}
              />

              <input
                type="text"
                className="glass-input"
                placeholder="Other Party Wallet or Email"
                value={form.counterparty}
                onChange={(e) => updateForm('counterparty', e.target.value)}
              />
            </div>

            <button
              className="btn-ingot"
              style={{ width: '100%', marginTop: '2rem' }}
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
            >
              Continue → Define Conditions
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step-content animate-fade-in">
            <h2 className="gold-text">Define Release Conditions</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
              Funds will only be released when these conditions are met.
            </p>

            <div className="conditions-logic glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', marginBottom: '2rem' }}>
              <p className="mono" style={{ fontSize: '0.8rem', color: 'var(--color-success)', whiteSpace: 'pre-line' }}>
                {getConditionsText()}
              </p>
            </div>

            {form.tradeType === 'Physical' && (
              <>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="Carrier (DHL, FedEx, etc.)"
                  value={form.carrier}
                  onChange={(e) => updateForm('carrier', e.target.value)}
                />

                <select
                  className="glass-input"
                  value={form.inspectionTime}
                  onChange={(e) => updateForm('inspectionTime', e.target.value)}
                >
                  <option value="24">Inspection Window: 24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </>
            )}

            {form.tradeType === 'Digital' && (
              <label className="mono">
                <input
                  type="checkbox"
                  checked={form.manualConfirm}
                  onChange={(e) => updateForm('manualConfirm', e.target.checked)}
                /> Require manual confirmation
              </label>
            )}

            {form.tradeType === 'Service' && (
              <input
                type="text"
                className="glass-input"
                placeholder="Add milestone (e.g. First delivery)"
                value={form.milestone}
                onChange={(e) => updateForm('milestone', e.target.value)}
              />
            )}

            <button
              className="btn-ingot"
              style={{ width: '100%', marginTop: '2rem' }}
              onClick={() => setStep(3)}
            >
              Continue → Review & Lock
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="step-content animate-fade-in">
            <h2 className="gold-text">Review Your Trade</h2>

            <div className="review-summary" style={{ textAlign: 'left', margin: '2rem 0' }}>
              <div className="review-item"><span className="text-muted">Title:</span> {form.title || '—'}</div>
              <div className="review-item"><span className="text-muted">Type:</span> {form.tradeType}</div>
              <div className="review-item"><span className="text-muted">Amount:</span> {form.amount || '—'}</div>
              <div className="review-item"><span className="text-muted">Counterparty:</span> {form.counterparty || '—'}</div>
            </div>

            <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
              This trade cannot be altered after funds are locked.
            </p>

            <p className="mono" style={{ fontSize: '0.7rem', padding: '1rem', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
              Funds will be locked in a secure vault and cannot be accessed by either party until conditions are met.
            </p>

            <button
              className="btn-ingot"
              style={{ width: '100%' }}
              onClick={() => {
                const link = generateVaultLink();
                setVaultLink(link);
                setStep(4);
                triggerNotify("VAULT_SYNCHRONIZED_SUCCESSFULLY");
              }}
            >
              Lock Funds & Create Trade
            </button>
          </div>
        )}

        {/* SUCCESS */}
        {step === 4 && (
          <div className="step-content animate-fade-in">
            <h2 className="gold-text">Vault Secured</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
              Share this protocol link with the counterparty to join.
            </p>

            <div
              className="glass"
              style={{
                padding: '1.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.7rem',
                color: 'var(--color-gold)',
                wordBreak: 'break-all',
                background: 'rgba(200, 169, 110, 0.05)',
                border: '1px solid rgba(200, 169, 110, 0.2)',
                fontFamily: 'var(--f-mono)'
              }}
            >
              {vaultLink}
            </div>

            {/* 📱 QR Simulation UI — White Box around Black Box */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                width: '140px', 
                height: '140px', 
                margin: '0 auto', 
                border: '1px solid var(--color-border)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#FFFFFF', // White outer box
                padding: '12px',
                borderRadius: '4px'
              }}>
                {/* Visual Placeholder for QR — Static Black Inner Box */}
                <div style={{ width: '100%', height: '100%', background: '#050505' }}></div>
              </div>
              <p className="mono" style={{ fontSize: '0.6rem', marginTop: '0.5rem', opacity: 0.5 }}>INVITE_QR_STAMP</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                className="btn-ingot"
                style={{ width: '100%' }}
                onClick={() => {
                  navigator.clipboard.writeText(vaultLink);
                  triggerNotify("LINK_COPIED_TO_CLIPBOARD");
                }}
              >
                Copy Protocol Invite
              </button>
              
              <button
                className="btn-ingot"
                style={{ 
                  width: '100%', 
                  background: 'transparent', 
                  border: '1px solid var(--color-gold)', 
                  color: 'var(--color-gold)' 
                }}
                onClick={() => navigate('/dashboard')}
              >
                Proceed to Dashboard
              </button>
            </div>
            
            <p className="mono" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.6rem', opacity: 0.4 }}>
              Vault Expires in: <span style={{ color: timeLeft < 300 ? 'var(--color-danger)' : 'var(--color-gold)' }}>{formatTime(timeLeft)}</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateTrade;
