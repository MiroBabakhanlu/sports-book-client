import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export default function useStreakSummary(filters) {
    const { data, isLoading } = useQuery({
        queryKey: ['streaksSummary', filters],
        queryFn: () => api.get('/streaks/summary', { params: filters }).then((res) => res.data.data),
        placeholderData: (previousData) => previousData,
    });

    return { summary: data ?? null, loading: isLoading };
}
