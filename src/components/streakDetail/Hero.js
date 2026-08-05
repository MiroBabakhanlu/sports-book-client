import OddPill from '../common/OddPill';
import ConfidenceRing from '../common/ConfidenceRing';
import { ordinal, highlightThreshold } from '../../utils/format';

function PredictionTitle({ text, direction, threshold }) {
    const parts = highlightThreshold(text, direction, threshold);
    if (typeof parts === 'string' || !parts) return <>{text}</>;
    return (
        <>
            {parts.before}<em>{parts.match}</em>{parts.after}
        </>
    );
}

export default function Hero({ streakId, match, market, streak_count, prediction, confidence, confidence_label, odds, streak_side }) {
    const isHomeStreakTeam = streak_side === 'home';
    const isAwayStreakTeam = streak_side === 'away';

    return (
        <div className="hero">
            <div className="hero-grid">
                <div className={`hero-side home${isHomeStreakTeam ? ' streak-team' : ''}`}>
                    {match.home.logo_url ? <img src={match.home.logo_url} alt={match.home.name} /> : null}
                    <div className="name">{match.home.name}</div>
                    <div className="sub">Home · <strong>{ordinal(match.home.position)} place</strong></div>
                    <OddPill odd={odds.home_win} streakId={streakId} clickType="home_win" />
                </div>

                <div className="hero-mid">
                    <div className="num">{streak_count}</div>
                    <div className="lbl">Streaks</div>
                    <div className="mkt">{market.label}</div>
                    <div className="date">{match.date_display}</div>
                    <div className="league">{match.league.name}</div>
                </div>

                <div className={`hero-side away${isAwayStreakTeam ? ' streak-team' : ''}`}>
                    {match.away.logo_url ? <img src={match.away.logo_url} alt={match.away.name} /> : null}
                    <div className="name">{match.away.name}</div>
                    <div className="sub">Away · <strong>{ordinal(match.away.position)} place</strong></div>
                    <OddPill odd={odds.away_win} streakId={streakId} clickType="away_win" />
                </div>

                <div className="hero-pred">
                    <div className="eyebrow">Prediction Market · {market.label}</div>
                    <div className="title">
                        <PredictionTitle text={prediction.text} direction={prediction.direction} threshold={prediction.threshold} />
                    </div>
                    <div className="desc">{prediction.description}</div>

                    <div className="conf-block" style={{ marginTop: 12 }}>
                        <ConfidenceRing confidence={confidence} size={52} radius={21} />
                        <div>
                            <div className="conf-main" style={{ fontSize: 18 }}>{confidence}% Confidence</div>
                            <div className="conf-sub">{confidence_label}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                        <OddPill odd={odds.recommended} streakId={streakId} clickType="recommended_odd" />
                    </div>

                    {odds.recommended && (
                        <button
                            className="hero-cta"
                            onClick={() => odds.recommended.affiliate_url && window.open(odds.recommended.affiliate_url, '_blank', 'noopener')}
                        >
                            Bet on {odds.recommended.bookmaker_label}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
