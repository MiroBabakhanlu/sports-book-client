import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useStandings(leagueId) {
    const [standings, setStandings] = useState(null);
    const [loading, setLoading] = useState(!!leagueId);

    useEffect(() => {
        if (!leagueId) return;
        let cancelled = false;
        setLoading(true);
        api
            .get(`/standings/${leagueId}`)
            .then((res) => {
                if (!cancelled) setStandings(res.data.data);
            })
            .catch(() => {
                if (!cancelled) setStandings(null);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [leagueId]);

    return { standings, loading };
}
