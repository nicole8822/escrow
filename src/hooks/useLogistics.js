import { useState, useEffect } from 'react';
import { getPackageStatus } from '../services/logistics';

export const useLogistics = (trackingNumber) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (trackingNumber) {
            getPackageStatus(trackingNumber).then(setData);
        }
    }, [trackingNumber]);

    return data;
};
