import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useMatchup(streakId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!streakId) return;
        let cancelled = false;
        setLoading(true);
        setError(null);
        api
            .get(`/matchup/${streakId}`)
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
    }, [streakId]);

    return { data, loading, error };
}
