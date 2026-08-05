import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

// Exported so StreakCard can prefetch the exact same cache entry on hover -
// using this instead of hand-rolling a matching key/fetcher elsewhere keeps
// the prefetch and the real query guaranteed to land in the same cache slot.
export const matchupQueryKey = (streakId) => ['matchup', streakId];
export const fetchMatchup = (streakId) => api.get(`/matchup/${streakId}`).then((res) => res.data.data);

export default function useMatchup(streakId) {
    const { data, isLoading, error } = useQuery({
        queryKey: matchupQueryKey(streakId),
        queryFn: () => fetchMatchup(streakId),
        enabled: !!streakId,
    });

    return { data: data ?? null, loading: isLoading, error };
}
