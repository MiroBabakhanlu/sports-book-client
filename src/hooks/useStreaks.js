import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { matchupQueryKey, fetchMatchup } from './useMatchup';

// filters: { streak_min, confidence_min, markets, leagues, date_range, sort, page, per_page }
export default function useStreaks(filters) {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['streaks', filters],
        queryFn: () => api.get('/streaks', { params: filters }).then((res) => res.data.data),
        placeholderData: (previousData) => previousData,
    });

    const streaks = data?.data || [];

    // Prefetch every streak's detail data as soon as the list itself loads -
    // hover/focus/touch alone only starts the request once the user actually
    // reaches a card, which for anything below the fold or clicked quickly
    // doesn't leave enough lead time. A page is capped at per_page (6-10)
    // items, so firing all of them up front is cheap and doesn't depend on
    // the user scrolling, hovering, or touching anything first - react-query
    // dedupes against whatever's already fresh/in-flight, so this never
    // duplicates the eventual real fetch.
    useEffect(() => {
        streaks.forEach((s) => {
            queryClient.prefetchQuery({
                queryKey: matchupQueryKey(s.id),
                queryFn: () => fetchMatchup(s.id),
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streaks.map((s) => s.id).join(',')]);

    return { streaks, meta: data?.meta || null, loading: isLoading, error };
}
