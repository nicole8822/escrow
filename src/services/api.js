import axios from 'axios';

const API_BASE = "http://localhost:8080";

export const createTrade = async (tradeData) => {
    //  tradeData follows the DNA defined in proto/trade.proto + Paystack fields
    try {
        const response = await axios.post(`${API_BASE}/trade/create`, tradeData);
        
        //  Redirect to Paystack if the backend provides an authorization URL
        if (response.data && response.data.authorization_url) {
            window.location.href = response.data.authorization_url;
        }
        
        return response.data;
    } catch (error) {
        console.error("Trade Error:", error);
        // Throwing allows the useTrade hook to update the UI error state
        throw error; 
    }
};

export const trackLogistics = async (trackingId) => {
    try {
        const response = await axios.get(`${API_BASE}/logistics/track/${trackingId}`);
        return response.data; // Returns DHL/FedEx weight and status signals
    } catch (error) {
        console.error("Logistics Error:", error);
        throw error;
    }
};
