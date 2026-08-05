import { QueryClient } from '@tanstack/react-query';

// Public content site, no auth/personalization - a fairly long staleTime means
// repeat navigation (list -> detail -> back -> another card) resolves from
// cache instantly instead of re-hitting the API on every mount. refetchOnWindowFocus
// is off for the same reason: nothing here is personalized/live enough to justify
// a refetch just because the tab regained focus.
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
