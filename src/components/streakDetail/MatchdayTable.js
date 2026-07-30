// Ported from renderMatchdayTable in render_stats.js - shared columns, most
// recent on the left, '-' padded into a team's leftmost columns when it has
// played fewer games than the other side.
function Row({ side, maxLength }) {
    const startIndex = maxLength - side.matches.length;
    const cells = Array.from({ length: maxLength }, (_, i) => {
        const m = i >= startIndex ? side.matches[i - startIndex] : null;
        if (!m) return <td key={i}><span className="md-dash">-</span></td>;
        const isOver = side.season_avg !== null && m.value > side.season_avg;
        return (
            <td key={i}>
                <span className={`md-chip ${isOver ? 'over' : 'under'}`}>{m.value}</span>
            </td>
        );
    });

    return (
        <tr>
            <td className="team-cell">
                {side.team.logo_url ? <img src={side.team.logo_url} alt={side.team.name} /> : null}
                <span>{side.team.name}</span>
            </td>
            <td>{side.season_avg ?? '—'}</td>
            <td style={{ fontWeight: 700, color: 'var(--teal)' }}>{side.streak?.count ?? '—'}</td>
            {cells}
        </tr>
    );
}

export default function MatchdayTable({ home, away, marketLabel }) {
    const maxLength = Math.min(20, Math.max(home.matches.length, away.matches.length));
    if (maxLength === 0) return null;

    return (
        <div className="card">
            <div className="card-h">
                <div className="t">{marketLabel} — matchday by matchday</div>
                <div className="s">Scroll for more →</div>
            </div>
            <div className="md-table-wrap">
                <table className="md-table">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Avg</th>
                            <th>Streak</th>
                            {Array.from({ length: maxLength }, (_, i) => (
                                <th key={i}>MD{maxLength - i}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <Row side={home} maxLength={maxLength} />
                        <Row side={away} maxLength={maxLength} />
                    </tbody>
                </table>
            </div>
            <div className="legend">
                <span><span className="sw" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }} />Over that team's own average</span>
                <span><span className="sw" style={{ background: '#fef2f2', border: '1px solid #fecaca' }} />At or under that team's own average</span>
            </div>
        </div>
    );
}
