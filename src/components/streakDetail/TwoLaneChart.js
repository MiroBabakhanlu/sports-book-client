// Mirrors the admin panel's two-lane track chart (public/js/stats/render_stats.js
// buildTwoLaneTrackSVG). A bar chart doesn't carry information for a 1/0 series
// (every bar is either full-height or empty), so binary markets (odd/even,
// both-teams-score) get a lane chart instead: each match is a dot on whichever
// outcome it landed on, connected point to point, with the current streak's
// run thickened/filled. Same blue/red pair the rest of the app already uses
// for over/under average.
const CHART_BLUE = '#2563eb';
const CHART_ROSE = '#ef4444';

function TwoLaneSVG({ data, config, streakCount }) {
    const n = data.length;
    if (n === 0) return null;

    const slot = 68;
    const padLeft = 96, padRight = 24, padTop = 30, padBottom = 34;
    const laneGap = 92;
    const topLaneY = padTop + 22;
    const bottomLaneY = topLaneY + laneGap;
    const width = padLeft + padRight + slot * Math.max(n - 1, 1) + 20;
    const height = padTop + laneGap + 46 + padBottom;

    // data is most-recent-first (see matchup.service.js), same as every other
    // chart/table on this page - latest match is index 0, drawn leftmost. The
    // streak is always anchored to that point (the one fixed anchor
    // streak-tracker.js counts backward from), so the highlighted run is
    // always the first `streakCount` points.
    const streakEnd = Math.min(n, streakCount);
    const streakIsPositive = Number(data[0].value) === 1;
    const streakColor = streakIsPositive ? CHART_BLUE : CHART_ROSE;

    const points = data.map((d, i) => {
        const x = padLeft + slot * i;
        const isPositive = Number(d.value) === 1;
        const y = isPositive ? topLaneY : bottomLaneY;
        return { x, y, isPositive, date: d.date, inStreak: i < streakEnd };
    });

    const badgeMidX = (points[0].x + points[streakEnd - 1].x) / 2;
    const badgeText = `CURRENT STREAK: ${streakCount}`;
    const badgeWidth = 34 + badgeText.length * 5.6;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible', display: 'block' }}>
            <rect x={padLeft - 16} y={topLaneY - 20} width={width - padLeft - padRight + 16} height={40} fill={`${CHART_BLUE}0d`} rx="8" />
            <rect x={padLeft - 16} y={bottomLaneY - 20} width={width - padLeft - padRight + 16} height={40} fill={`${CHART_ROSE}0d`} rx="8" />
            <text x={padLeft - 24} y={topLaneY + 3} fontSize="11" fontWeight="800" fill={CHART_BLUE} textAnchor="end">{config.positive}</text>
            <text x={padLeft - 24} y={bottomLaneY + 3} fontSize="11" fontWeight="800" fill={CHART_ROSE} textAnchor="end">{config.negative}</text>

            {points.slice(1).map((b, idx) => {
                const a = points[idx];
                const bothInStreak = a.inStreak && b.inStreak;
                return (
                    <line
                        key={idx}
                        x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke={bothInStreak ? streakColor : '#cbd5e1'}
                        strokeWidth={bothInStreak ? 4 : 1.5}
                        strokeLinecap="round"
                    />
                );
            })}

            {points.map((p, i) => {
                const isLatest = i === 0;
                const laneColor = p.isPositive ? CHART_BLUE : CHART_ROSE;
                const r = isLatest ? 9 : (p.inStreak ? 7 : 5.5);
                const fill = p.inStreak ? laneColor : '#ffffff';
                return (
                    <g key={i}>
                        {isLatest && p.inStreak && (
                            <circle cx={p.x} cy={p.y} r={r + 4} fill="none" stroke={laneColor} strokeWidth="2" opacity="0.35" />
                        )}
                        <circle cx={p.x} cy={p.y} r={r} fill={fill} stroke={laneColor} strokeWidth="2.5" />
                        <text x={p.x} y={bottomLaneY + 46} fontSize="9" fill="#94a3b8" textAnchor="middle">{p.date}</text>
                        {isLatest && (
                            <text x={p.x} y={bottomLaneY + 58} fontSize="9" fontWeight="700" fill={CHART_BLUE} textAnchor="middle">latest</text>
                        )}
                    </g>
                );
            })}

            {streakCount > 0 && (
                <>
                    <rect x={badgeMidX - badgeWidth / 2} y={6} width={badgeWidth} height={20} rx="10" fill={streakColor} />
                    <text x={badgeMidX} y={20} fontSize="10" fontWeight="800" fill="#ffffff" textAnchor="middle">{badgeText}</text>
                </>
            )}
        </svg>
    );
}

export default function TwoLaneChart({ chartData, config, streakCount }) {
    if (!chartData || !chartData.data.length) return null;
    return (
        <div className="card">
            <div className="card-h">
                <div className="t">{chartData.title}</div>
                <div className="s">{chartData.subtitle}</div>
            </div>
            <div className="card-body" style={{ overflowX: 'auto', paddingTop: 16, paddingBottom: 8 }}>
                <TwoLaneSVG data={chartData.data} config={config} streakCount={streakCount} />
            </div>
        </div>
    );
}
