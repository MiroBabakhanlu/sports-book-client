import { Link } from 'react-router-dom';
import StreakCard from '../streaks/StreakCard';

export default function TopStreaksSection({ streaks, total, loading, error }) {
    return (
        <div>
            <div className="hsec" style={{ marginBottom: 12, marginTop: 2 }}>
                <h2 className="hsec-t"><i className="ti ti-flame" style={{ fontSize: 19 }} />Top Streaks</h2>
                <Link className="hsec-a" to="/streaks?sort=top">
                    View all {total ?? ''} <i className="ti ti-arrow-right" style={{ fontSize: 13 }} />
                </Link>
            </div>
            {loading && <div className="load-state">Loading streaks…</div>}
            {error && <div className="error-state">Failed to load streaks.</div>}
            {!loading && !error && streaks.length === 0 && <div className="empty-state">No streaks available right now.</div>}
            {!loading && !error && streaks.length > 0 && (
                <div className="cards-col">
                    {streaks.map((s) => (
                        <StreakCard key={s.id} streak={s} />
                    ))}
                </div>
            )}
        </div>
    );
}
