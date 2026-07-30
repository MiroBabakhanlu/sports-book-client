import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useStreakSummary(filters) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const key = JSON.stringify(filters);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        api
            .get('/streaks/summary', { params: filters })
            .then((res) => {
                if (!cancelled) setSummary(res.data.data);
            })
            .catch(() => {
                if (!cancelled) setSummary(null);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return { summary, loading };
}
