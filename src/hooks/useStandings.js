import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export default function useStandings(leagueId) {
    const { data, isLoading } = useQuery({
        queryKey: ['standings', leagueId],
        queryFn: () => api.get(`/standings/${leagueId}`).then((res) => res.data.data),
        enabled: !!leagueId,
    });

    return { standings: data ?? null, loading: isLoading };
}
