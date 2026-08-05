import { useNavigate, useParams } from 'react-router-dom';
import useMatchup from '../hooks/useMatchup';
import Seo from '../components/common/Seo';
import Hero from '../components/streakDetail/Hero';
import Chart from '../components/streakDetail/Chart';
import MatchdayTable from '../components/streakDetail/MatchdayTable';
import TeamStats from '../components/streakDetail/TeamStats';
import BookmakersWidget from '../components/streakDetail/BookmakersWidget';
import StandingsWidget from '../components/streakDetail/StandingsWidget';
import SimilarStreaks from '../components/streakDetail/SimilarStreaks';

// Available bookmakers should cover match-winner odds too, not just whoever is
// pricing this one prediction - merge in home_win/away_win's bookmakers,
// deduping by bookmaker identity (same logic as the admin panel's detail view).
function mergeBookmakers(availableBookmakers, odds) {
    const all = [...(availableBookmakers || [])];
    const seen = new Set(all.map((b) => b.bookmaker));
    for (const odd of [odds.home_win, odds.away_win]) {
        if (odd && !seen.has(odd.bookmaker)) {
            const { value, ...rest } = odd;
            all.push(rest);
            seen.add(odd.bookmaker);
        }
    }
    return all;
}

export default function StreakDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useMatchup(id);

    if (loading) return <div className="page" style={{ display: 'block' }}><div className="load-state">Loading streak detail…</div></div>;
    if (error || !data) return <div className="page" style={{ display: 'block' }}><div className="error-state">Failed to load streak detail.</div></div>;

    const { match, market, streak_count, prediction, confidence, confidence_label, odds, availableBookmakers, leagueStandings, similarStreaks, statistics, chartData, home, away } = data;
    const allBookmakers = mergeBookmakers(availableBookmakers, odds);

    const pageTitle = `${match.home.name} vs ${match.away.name} — ${prediction.text}`;
    const pageDescription = `${match.home.name} vs ${match.away.name} (${match.league.name}): ${prediction.description} ${confidence}% confidence, ${streak_count}-match streak.`;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: `${match.home.name} vs ${match.away.name}`,
        startDate: match.date,
        homeTeam: { '@type': 'SportsTeam', name: match.home.name },
        awayTeam: { '@type': 'SportsTeam', name: match.away.name },
        location: { '@type': 'Place', name: match.league.name },
    };

    return (
        <div style={{ maxWidth: 1264, margin: '0 auto', padding: '18px 24px 48px' }}>
            <Seo title={pageTitle} description={pageDescription} path={`/streaks/${id}`} jsonLd={jsonLd} />
            <h1 className="sr-only">{pageTitle}</h1>
            <button className="back-link" onClick={() => navigate(-1)}>
                <i className="ti ti-arrow-left" /> Back
            </button>

            <Hero
                streakId={id}
                match={match}
                market={market}
                streak_count={streak_count}
                prediction={prediction}
                confidence={confidence}
                confidence_label={confidence_label}
                odds={odds}
            />

            <div className="dgrid">
                <div className="dcol">
                    <Chart chartData={chartData} market={market} streakCount={streak_count} />
                    <MatchdayTable home={home} away={away} marketLabel={market.label} />
                    <TeamStats statistics={statistics} match={match} leagueStandings={leagueStandings} />
                </div>
                <div className="dcol">
                    <BookmakersWidget bookmakers={allBookmakers} />
                    <StandingsWidget
                        leagueStandings={leagueStandings}
                        leagueName={match.league.name}
                        leagueId={match.league.id}
                        homeTeamId={match.home.id}
                        awayTeamId={match.away.id}
                    />
                    <SimilarStreaks similarStreaks={similarStreaks} marketKey={market.key} />
                </div>
            </div>
        </div>
    );
}
