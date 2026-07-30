import { Link } from 'react-router-dom';

export default function StandingsWidget({ leagueStandings, leagueName, leagueId, homeTeamId, awayTeamId }) {
    if (!leagueStandings || !leagueStandings.rows.length) return null;

    return (
        <div className="card">
            <div className="card-h">
                <div className="t">League standings</div>
                <div className="s">{leagueName}</div>
            </div>
            {leagueStandings.rows.map((r) => {
                const isMatchTeam = r.team.id === homeTeamId || r.team.id === awayTeamId;
                return (
                    <div className={`stand-row${isMatchTeam ? ' hl' : ''}`} key={r.position}>
                        <span className="pos">{r.position}</span>
                        {r.team.logo_url ? <img src={r.team.logo_url} alt={r.team.name} /> : null}
                        <span className="name">{r.team.name}</span>
                        <span className="pts">{r.points}</span>
                    </div>
                );
            })}
            <div style={{ padding: '12px 20px' }}>
                <Link to={leagueId ? `/streaks?leagues=${leagueId}` : '/streaks'} style={{ fontSize: 13, fontWeight: 700, color: 'var(--teal)' }}>
                    Full table →
                </Link>
            </div>
        </div>
    );
}
