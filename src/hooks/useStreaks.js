import { useEffect, useState } from 'react';
import api from '../services/api';

// filters: { streak_min, confidence_min, markets, leagues, date_range, sort, page, per_page }
export default function useStreaks(filters) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const key = JSON.stringify(filters);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        api
            .get('/streaks', { params: filters })
            .then((res) => {
                if (!cancelled) setData(res.data.data);
            })
            .catch((err) => {
                if (!cancelled) setError(err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return { streaks: data?.data || [], meta: data?.meta || null, loading, error };
}
