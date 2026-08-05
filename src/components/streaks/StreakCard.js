import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import OddPill from '../common/OddPill';
import ConfidenceRing from '../common/ConfidenceRing';
import { highlightThreshold } from '../../utils/format';
import { matchupQueryKey, fetchMatchup } from '../../hooks/useMatchup';

function PredictionTitle({ text, direction, threshold }) {
    const parts = highlightThreshold(text, direction, threshold);
    if (typeof parts === 'string' || !parts) return <>{text}</>;
    return (
        <>
            {parts.before}
            <em>{parts.match}</em>
            {parts.after}
        </>
    );
}

export default function StreakCard({ streak, className = '' }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { match, market, prediction, streak_count, confidence, confidence_label, status, odds, streak_side } = streak;
    const isHomeStreakTeam = streak_side === 'home';
    const isAwayStreakTeam = streak_side === 'away';

    // Prefetch the streak-detail data before the click actually happens - by
    // the time the user clicks (hover, or a moment before a touch tap lands),
    // useMatchup's query for this same id/key resolves from cache instantly
    // instead of showing a loading state on the detail page.
    const prefetchDetail = () => {
        queryClient.prefetchQuery({
            queryKey: matchupQueryKey(streak.id),
            queryFn: () => fetchMatchup(streak.id),
        });
    };

    return (
        <div
            className={`sc hot ${className}`}
            onClick={() => navigate(`/streaks/${streak.id}`)}
            onMouseEnter={prefetchDetail}
            onFocus={prefetchDetail}
            onTouchStart={prefetchDetail}
        >
            <div className="sc-grid">
                <div className={`tc home${isHomeStreakTeam ? ' streak-team' : ''}`}>
                    {match.home.logo_url ? (
                        <img className="tc-logo" src={match.home.logo_url} alt={match.home.name} />
                    ) : (
                        <div className="tc-fb">{match.home.short}</div>
                    )}
                    <div className="tc-name">{match.home.name}</div>
                    <div className="tc-side">Home</div>
                    <OddPill odd={odds.home_win} streakId={streak.id} clickType="home_win" />
                </div>

                <div className="sc-mid">
                    <div className="sc-num">{streak_count}</div>
                    <div className="sc-row">Streaks</div>
                    <div className="sc-mkt">{market.label}</div>
                    {status === 'live' ? (
                        <div className="live-badge"><span className="ld" />In-Play</div>
                    ) : (
                        <div className="sc-date">{match.date_display}</div>
                    )}
                    <div className="sc-league">{match.league.name}</div>
                </div>

                <div className={`tc away${isAwayStreakTeam ? ' streak-team' : ''}`}>
                    {match.away.logo_url ? (
                        <img className="tc-logo" src={match.away.logo_url} alt={match.away.name} />
                    ) : (
                        <div className="tc-fb">{match.away.short}</div>
                    )}
                    <div className="tc-name">{match.away.name}</div>
                    <div className="tc-side">Away</div>
                    <OddPill odd={odds.away_win} streakId={streak.id} clickType="away_win" />
                </div>

                <div className="sc-pred">
                    <div className="pred-mkt">Prediction Market &middot; {market.label}</div>
                    <div className="pred-title">
                        <PredictionTitle text={prediction.text} direction={prediction.direction} threshold={prediction.threshold} />
                    </div>
                    <div className="pred-desc">{prediction.description}</div>
                    <div className="conf-block">
                        <ConfidenceRing confidence={confidence} />
                        <div className="conf-info">
                            <div className="conf-main">{confidence}% Confidence</div>
                            <div className="conf-sub">{confidence_label}</div>
                        </div>
                    </div>
                    <div className="bet-row">
                        <OddPill odd={odds.recommended} streakId={streak.id} clickType="recommended_odd" />
                        <div className="pred-link">
                            <i className="ti ti-external-link" style={{ fontSize: 11 }} />
                            {match.league.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
