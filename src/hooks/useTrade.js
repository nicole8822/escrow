import { useState } from 'react';
import { createTrade } from '../services/api';

export const useTrade = () => {
    const [loading, setLoading] = useState(false);

    const startSecureTrade = async (details) => {
        setLoading(true);
        try {
            const result = await createTrade(details);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { startSecureTrade, loading };
};
