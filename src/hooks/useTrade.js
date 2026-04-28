import { useState, useCallback } from 'react';
import { createTrade } from '../services/api';

// Trade state machine — mirrors escrow contract states
const TRADE_STATES = {
  IDLE:      'IDLE',
  CREATED:   'CREATED',
  FUNDED:    'FUNDED',
  ACTIVE:    'ACTIVE',
  DELIVERED: 'DELIVERED',
  CONFIRMED: 'CONFIRMED',
  DISPUTED:  'DISPUTED',
  RESOLVED:  'RESOLVED',
};

// ──  original hook — logic untouched, cleanly integrated ──
export const useTrade = () => {
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [tradeState, setTradeState] = useState(TRADE_STATES.IDLE);
  const [tradeData,  setTradeData]  = useState(null);

  // Your original function — untouched, wrapped with state transitions
  const startSecureTrade = useCallback(async (details) => {
    setLoading(true);
    setError(null);
    setTradeState(TRADE_STATES.CREATED);

    try {
      // Your original call — untouched source logic
      const result = await createTrade(details);
      setTradeData(result);
      setTradeState(TRADE_STATES.FUNDED);
      return result;
    } catch (err) {
      setError(err?.message ?? 'Trade initialization failed');
      setTradeState(TRADE_STATES.IDLE);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Additional actions that follow the escrow state machine
  const confirmDelivery = useCallback(() => {
    setTradeState(TRADE_STATES.CONFIRMED);
  }, []);

  const raiseDispute = useCallback(() => {
    setTradeState(TRADE_STATES.DISPUTED);
  }, []);

  const resetTrade = useCallback(() => {
    setTradeState(TRADE_STATES.IDLE);
    setTradeData(null);
    setError(null);
  }, []);

  // Derived UI helpers — consumed by components for badge/status display
  const isLocked   = [TRADE_STATES.FUNDED, TRADE_STATES.ACTIVE, TRADE_STATES.DELIVERED].includes(tradeState);
  const isDisputed = tradeState === TRADE_STATES.DISPUTED;
  const isResolved = tradeState === TRADE_STATES.CONFIRMED || tradeState === TRADE_STATES.RESOLVED;

  return {
    // Your original returns — preserved for backward compatibility
    startSecureTrade,
    loading,
    
    // Integrated State Machine Extensions
    error,
    tradeState,
    tradeData,
    isLocked,
    isDisputed,
    isResolved,
    confirmDelivery,
    raiseDispute,
    resetTrade,
    TRADE_STATES,
  };
};
