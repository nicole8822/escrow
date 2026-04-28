import { useState, useEffect, useRef } from 'react';
import { getPackageStatus } from '../services/logistics';

// ── Your original hook — logic untouched, extended with loading/error/polling ──
export const useLogistics = (trackingNumber, { pollInterval = 0 } = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    const fetchStatus = async () => {
        if (!trackingNumber) return;
        setLoading(true);
        setError(null);
        try {
            // Your original call — untouched
            const result = await getPackageStatus(trackingNumber);
            setData(result);
        } catch (err) {
            setError(err?.message ?? 'Failed to fetch logistics status');
        } finally {
            setLoading(false);
        }
    };

    // Your original useEffect — extended with error handling + optional polling
    useEffect(() => {
        fetchStatus();

        if (pollInterval > 0) {
            intervalRef.current = setInterval(fetchStatus, pollInterval);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackingNumber, pollInterval]);

    // Maps raw carrier status to TrustVault trade states
    // This connects the physical world (carrier) to the financial world (escrow)
    const tradeState = (() => {
        if (!data?.status) return null;
        const s = data.status.toLowerCase();
        
        if (s.includes('delivered')) return 'DELIVERED';
        if (s.includes('transit')) return 'ACTIVE';
        if (s.includes('picked')) return 'FUNDED';
        if (s.includes('exception')) return 'DISPUTED';
        
        return 'CREATED';
    })();

    return {
        data,       // your original return value — still here
        loading,
        error,
        tradeState, // bonus: mapped to escrow state machine
        refetch: fetchStatus,
    };
};
