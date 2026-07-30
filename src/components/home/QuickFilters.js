import { Link } from 'react-router-dom';

const CHIPS = [
    { label: 'Soon to Start', icon: 'ti-clock-bolt', params: { sort: 'kickoff_asc' }, hot: true },
    { label: 'Today', icon: 'ti-calendar', params: { date_range: 'today' } },
    { label: 'Next 7 days', icon: 'ti-calendar-week', params: { date_range: '7days' } },
    { label: '75%+ Confidence', icon: 'ti-target', params: { confidence_min: 70 } },
    { label: '9+ Streaks', icon: 'ti-bolt', params: { streak_min: 9 } },
];

export default function QuickFilters() {
    return (
        <div className="qf">
            <span className="qf-l">Quick filters</span>
            {CHIPS.map((c) => (
                <Link key={c.label} to={`/streaks?${new URLSearchParams(c.params).toString()}`} className={`qf-chip${c.hot ? ' hot' : ''}`}>
                    <i className={`ti ${c.icon}`} />{c.label}
                </Link>
            ))}
        </div>
    );
}
