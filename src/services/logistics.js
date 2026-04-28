import axios from 'axios';

export const getPackageStatus = async (trackingNum) => {
    const response = await axios.get(`http://localhost:8080/logistics/track?number=${trackingNum}`);
    // Maps DHL/FedEx weight and location data to the UI
    return {
        weight: response.data.actualWeight,
        location: response.data.currentLocation,
        isDelivered: response.data.status === 'DELIVERED'
    };
};
