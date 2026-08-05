import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export default function useLeagues() {
    const { data, isLoading } = useQuery({
        queryKey: ['leagues'],
        queryFn: () => api.get('/leagues/all').then((res) => res.data.data || []),
        // Leagues/streak counts per league barely change minute to minute -
        // worth a longer staleTime than the default so switching pages doesn't
        // keep re-fetching the same list.
        staleTime: 5 * 60 * 1000,
    });

    return { leagues: data || [], loading: isLoading };
}
