import axios from 'axios';

const API_BASE = "http://localhost:8080";

export const createTrade = async (tradeData) => {
    //  tradeData follows the DNA defined in proto/trade.proto
    try {
        const response = await axios.post(`${API_BASE}/trade/create`, tradeData);
        return response.data;
    } catch (error) {
        console.error("Trade Error:", error);
    }
};

export const trackLogistics = async (trackingId) => {
    const response = await axios.get(`${API_BASE}/logistics/track/${trackingId}`);
    return response.data; // Returns DHL weight data
};
