import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { matchupQueryKey, fetchMatchup } from '../../hooks/useMatchup';
import { BINARY_MARKET_CONFIG } from '../../utils/markets';

// Binary markets don't have a "direction threshold" line to show (the API only
// sends {direction, threshold} here, not the full prediction.text) - but
// direction/threshold are computed with the exact same streak_direction==='below'
// branch as the real outcome server-side, so 'over' <-> positive and
// 'under' <-> negative always agree; deriving the outcome word from direction
// is safe rather than showing a meaningless "over 0.5".
function predictionLabel(s) {
    const binary = BINARY_MARKET_CONFIG[s.market.key];
    if (binary) return s.prediction.direction === 'over' ? binary.positive : binary.negative;
    return `${s.prediction.direction} ${s.prediction.threshold}`;
}

export default function SimilarStreaks({ similarStreaks, marketKey }) {
    const items = similarStreaks?.items || [];
    const queryClient = useQueryClient();
    const prefetchDetail = (id) => () => {
        queryClient.prefetchQuery({ queryKey: matchupQueryKey(id), queryFn: () => fetchMatchup(id) });
    };

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
                        <Link
                            className="sim-card"
                            to={`/streaks/${s.id}`}
                            key={s.id}
                            onMouseEnter={prefetchDetail(s.id)}
                            onFocus={prefetchDetail(s.id)}
                            onTouchStart={prefetchDetail(s.id)}
                        >
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
                                <span className="mkt">{s.market.label} - {predictionLabel(s)}</span>
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
