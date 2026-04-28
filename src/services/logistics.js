import axios from 'axios';

const API_BASE = "http://localhost:8080";

export const getPackageStatus = async (trackingNum) => {
    try {
        const response = await axios.get(`${API_BASE}/logistics/track?number=${trackingNum}`);
        
        // Maps DHL/FedEx weight and location data to the UI
        // Added default values to prevent UI "flicker" or crashes if data is missing
        return {
            weight: response.data.actualWeight || 0,
            location: response.data.currentLocation || 'Awaiting Update',
            status: response.data.status || 'PENDING',
            isDelivered: response.data.status === 'DELIVERED',
            raw: response.data // Keep raw data just in case
        };
    } catch (error) {
        console.error("Logistics Fetch Error:", error);
        throw error;
    }
};
