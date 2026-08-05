import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

// filters: { streak_min, confidence_min, markets, leagues, date_range, sort, page, per_page }
export default function useStreaks(filters) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['streaks', filters],
        queryFn: () => api.get('/streaks', { params: filters }).then((res) => res.data.data),
        placeholderData: (previousData) => previousData,
    });

    return { streaks: data?.data || [], meta: data?.meta || null, loading: isLoading, error };
}
