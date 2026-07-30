import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useLeagues() {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        api
            .get('/leagues/all')
            .then((res) => {
                if (!cancelled) setLeagues(res.data.data || []);
            })
            .catch(() => {
                if (!cancelled) setLeagues([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { leagues, loading };
}
