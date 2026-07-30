import { Link } from 'react-router-dom';

export default function SimilarStreaks({ similarStreaks, marketKey }) {
    const items = similarStreaks?.items || [];

    return (
        <div className="card">
            <div className="card-h">
                <div className="t">Similar streaks</div>
                <div className="s">Same market</div>
            </div>
            {items.length === 0 ? (
                <div className="sim-empty">No similar markets currently available</div>
            ) : (
                <div className="sim-list">
                    {items.map((s) => (
                        <Link className="sim-card" to={`/streaks/${s.id}`} key={s.id}>
                            <div className="sim-teams">
                                <div className="sim-team">
                                    {s.home.logo_url ? <img src={s.home.logo_url} alt={s.home.name} /> : null}
                                    <span>{s.home.name}</span>
                                </div>
                                <div className="sim-num">{s.streak_count}</div>
                                <div className="sim-team">
                                    {s.away.logo_url ? <img src={s.away.logo_url} alt={s.away.name} /> : null}
                                    <span>{s.away.name}</span>
                                </div>
                            </div>
                            <div className="sim-meta">
                                <span className="mkt">{s.market.label} - {s.prediction.direction} {s.prediction.threshold}</span>
                                <span className="conf">{s.confidence}%</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {similarStreaks?.otherSimilarStreakCounts > 0 && (
                <Link
                    to={marketKey ? `/streaks?markets=${marketKey}` : '/streaks'}
                    style={{ display: 'block', padding: '12px 20px', borderTop: '1px solid var(--bdr)', fontSize: 13, fontWeight: 700, color: 'var(--teal)' }}
                >
                    View all {similarStreaks.otherSimilarStreakCounts} similar streaks →
                </Link>
            )}
        </div>
    );
}
