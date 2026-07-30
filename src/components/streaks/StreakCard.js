import { useNavigate } from 'react-router-dom';
import OddPill from '../common/OddPill';
import ConfidenceRing from '../common/ConfidenceRing';
import { highlightThreshold } from '../../utils/format';

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
    const { match, market, prediction, streak_count, confidence, confidence_label, status, odds } = streak;

    return (
        <div className={`sc hot ${className}`} onClick={() => navigate(`/streaks/${streak.id}`)}>
            <div className="sc-grid">
                <div className="tc home">
                    {match.home.logo_url ? (
                        <img className="tc-logo" src={match.home.logo_url} alt={match.home.name} />
                    ) : (
                        <div className="tc-fb">{match.home.short}</div>
                    )}
                    <div className="tc-name">{match.home.name}</div>
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

                <div className="tc away">
                    {match.away.logo_url ? (
                        <img className="tc-logo" src={match.away.logo_url} alt={match.away.name} />
                    ) : (
                        <div className="tc-fb">{match.away.short}</div>
                    )}
                    <div className="tc-name">{match.away.name}</div>
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
