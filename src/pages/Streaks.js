import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import FilterSidebar from '../components/streaks/FilterSidebar';
import Toolbar from '../components/streaks/Toolbar';
import StreakCard from '../components/streaks/StreakCard';
import Pagination from '../components/common/Pagination';
import useStreaks from '../hooks/useStreaks';
import useStreakSummary from '../hooks/useStreakSummary';
import useLeagues from '../hooks/useLeagues';

const PER_PAGE = 10;

function paramsToFilters(searchParams) {
    const filters = {};
    for (const key of ['streak_min', 'confidence_min', 'markets', 'leagues', 'date_range', 'sort']) {
        const v = searchParams.get(key);
        if (v) filters[key] = v;
    }
    filters.page = Number(searchParams.get('page')) || 1;
    filters.per_page = PER_PAGE;
    return filters;
}

export default function Streaks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const filters = paramsToFilters(searchParams);
    const { leagues } = useLeagues();
    const { summary } = useStreakSummary({ ...filters, page: undefined, per_page: undefined });
    const { streaks, meta, loading, error } = useStreaks(filters);

    const patch = (changes, resetPage = true) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(changes).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') next.delete(key);
            else next.set(key, value);
        });
        if (resetPage && !('page' in changes)) next.set('page', '1');
        setSearchParams(next);
    };

    const clearAll = () => setSearchParams({});

    useEffect(() => {
        document.body.classList.toggle('show-filters', mobileFiltersOpen);
        return () => document.body.classList.remove('show-filters');
    }, [mobileFiltersOpen]);

    return (
        <div className="page">
            <Seo
                title="All Streaks"
                description="Browse every active betting streak, filterable by market, competition, streak length, confidence, and kickoff date."
                path="/streaks"
            />
            <h1 className="sr-only">All Streaks</h1>
            <FilterSidebar
                filters={filters}
                onChange={patch}
                onClear={clearAll}
                leagues={leagues}
                summary={summary}
                onCloseMobile={() => setMobileFiltersOpen(false)}
            />

            <div className="content">
                <Toolbar
                    filters={filters}
                    onChange={patch}
                    total={meta?.total ?? 0}
                    leagues={leagues}
                    onOpenMobileFilters={() => setMobileFiltersOpen(true)}
                />

                {loading && <div className="load-state">Loading streaks…</div>}
                {error && <div className="error-state">Failed to load streaks.</div>}
                {!loading && !error && streaks.length === 0 && (
                    <div className="empty-state">No streaks match the selected filters.</div>
                )}

                {!loading && !error && streaks.length > 0 && (
                    <div className="cards-col">
                        {streaks.map((s) => (
                            <StreakCard key={s.id} streak={s} />
                        ))}
                    </div>
                )}

                <Pagination
                    page={meta?.page || 1}
                    totalPages={meta?.total_pages || 1}
                    total={meta?.total}
                    onPageChange={(p) => patch({ page: p }, false)}
                />
            </div>
        </div>
    );
}
