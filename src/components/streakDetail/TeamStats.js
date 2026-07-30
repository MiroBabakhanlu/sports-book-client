import { ordinal } from '../../utils/format';

// Ported from TEAM_STAT_ROWS / renderTeamStatsSection in render_stats.js.
const TEAM_STAT_ROWS = [
    { key: 'goals_scored', label: 'Goals scored / game', higherIsBetter: true },
    { key: 'goals_conceded', label: 'Goals conceded / game', higherIsBetter: false },
    { key: 'goals_1st_half', label: 'Goals 1st half / game', higherIsBetter: true },
    { key: 'goals_2nd_half', label: 'Goals 2nd half / game', higherIsBetter: true },
    { key: 'corners', label: 'Corners / game', higherIsBetter: true },
    { key: 'yellow_cards', label: 'Yellow cards / game', higherIsBetter: false },
    { key: 'possession', label: 'Avg possession', higherIsBetter: true, isPercent: true },
    { key: 'shots', label: 'Shots / game', higherIsBetter: true },
    { key: 'clean_sheets', label: 'Clean sheets', higherIsBetter: true },
];

function StatRow({ row, home, away, league_avg }) {
    const { key, label, higherIsBetter, isPercent } = row;
    const h = home[key], a = away[key], lg = league_avg[key];
    const suffix = isPercent ? '%' : '';

    if (h === null || a === null) {
        return (
            <div className="ts-row">
                <div className="ts-val" style={{ color: 'var(--g300)', textAlign: 'right' }}>—</div>
                <div className="ts-mid"><div className="ts-lbl">{label}</div></div>
                <div className="ts-val away" style={{ color: 'var(--g300)' }}>—</div>
            </div>
        );
    }

    const hWins = higherIsBetter ? h > a : h < a;
    const aWins = higherIsBetter ? a > h : a < h;
    const total = h + a || 1;
    const hPct = Math.round((h / total) * 100);

    return (
        <div className="ts-row">
            <div className={`ts-val${hWins ? ' win' : ''}`} style={{ textAlign: 'right' }}>{h}{suffix}</div>
            <div className="ts-mid">
                <div className="ts-lbl">{label}</div>
                <div className="ts-avg">League avg: {lg ?? '—'}{lg !== null ? suffix : ''}</div>
                <div className="ts-bar">
                    <div className="h" style={{ width: `${hPct}%` }} />
                    <div className="a" style={{ width: `${100 - hPct}%` }} />
                </div>
            </div>
            <div className={`ts-val away${aWins ? ' win' : ''}`}>{a}{suffix}</div>
        </div>
    );
}

export default function TeamStats({ statistics, match, leagueStandings }) {
    if (!statistics) return null;
    const { home, away, league_avg } = statistics;
    const homeStanding = leagueStandings?.rows.find((r) => r.team.id === match.home.id);
    const awayStanding = leagueStandings?.rows.find((r) => r.team.id === match.away.id);

    return (
        <div className="card">
            <div className="card-h">
                <div className="t">Team statistics</div>
                <div className="s">Season averages per market</div>
            </div>
            <div className="ts-head">
                <div className="side">
                    {match.home.logo_url ? <img src={match.home.logo_url} alt={match.home.name} /> : null}
                    <div>
                        <div className="name">{match.home.name}</div>
                        <div className="pos">{homeStanding ? `${ordinal(homeStanding.position)} · ${homeStanding.points} pts` : ''}</div>
                    </div>
                </div>
                <div className="vs">VS</div>
                <div className="side away">
                    <div>
                        <div className="name">{match.away.name}</div>
                        <div className="pos">{awayStanding ? `${ordinal(awayStanding.position)} · ${awayStanding.points} pts` : ''}</div>
                    </div>
                    {match.away.logo_url ? <img src={match.away.logo_url} alt={match.away.name} /> : null}
                </div>
            </div>
            {TEAM_STAT_ROWS.map((row) => (
                <StatRow key={row.key} row={row} home={home} away={away} league_avg={league_avg} />
            ))}
        </div>
    );
}
