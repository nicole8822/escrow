import axios from 'axios';

const API_BASE = "http://localhost:8080";

export const createTrade = async (tradeData) => {
    // tradeData follows the DNA defined in proto/trade.proto
    try {
        const response = await axios.post(`${API_BASE}/trade/create`, tradeData);
        return response.data;
    } catch (error) {
        console.error("Trade Error:", error);
        // Throw the error so the useTrade hook can catch it and show an alert/UI message
        throw error; 
    }
};

export const trackLogistics = async (trackingId) => {
    try {
        const response = await axios.get(`${API_BASE}/logistics/track/${trackingId}`);
        return response.data; // Returns DHL weight data
    } catch (error) {
        console.error("Logistics Error:", error);
        throw error;
    }
};
