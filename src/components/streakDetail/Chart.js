// Ported from public/js/stats/render_stats.js buildChartSVG - same fixed
// bar-slot sizing, nice-max scaling, and average-relative over/under coloring.
function ChartSVG({ chartData }) {
    const { avg } = chartData;
    // API returns oldest-first; the chart reads newest-first left-to-right
    // (most recent match on the left), so reverse for rendering only.
    const data = [...chartData.data].reverse();
    const values = data.map((d) => Number(d.value));
    const rawMax = Math.max(...values, Number(avg) || 0, 1);
    const niceMax = Math.ceil(rawMax * 1.15) || 1;

    const barSlot = 42;
    const barWidth = 22;
    const height = 190;
    const padLeft = 34, padRight = 34, padTop = 22, padBottom = 34;
    const n = data.length || 1;
    const width = padLeft + padRight + barSlot * n;
    const chartH = height - padTop - padBottom;
    const yFor = (v) => padTop + chartH - (v / niceMax) * chartH;

    const ticks = [0, niceMax / 3, (niceMax * 2) / 3, niceMax];
    const avgY = yFor(Number(avg) || 0);

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible', display: 'block' }}>
            {ticks.map((t) => {
                const y = yFor(t);
                return (
                    <g key={t}>
                        <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                        <text x={padLeft - 6} y={y + 3} fontSize="10" fill="#94a3b8" textAnchor="end">{Math.round(t * 10) / 10}</text>
                    </g>
                );
            })}
            <line x1={padLeft} y1={avgY} x2={width - padRight} y2={avgY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x={width - padRight + 4} y={avgY + 3} fontSize="9" fill="#94a3b8">{avg}</text>

            {data.map((d, i) => {
                const cx = padLeft + barSlot * i + barSlot / 2;
                const val = Number(d.value);
                const barH = Math.max(2, (val / niceMax) * chartH);
                const y = padTop + chartH - barH;
                const color = val > Number(avg) ? '#2563eb' : '#ef4444';
                const labelAbove = y - padTop > 12;
                const labelY = labelAbove ? y - 5 : y + 12;
                const labelColor = labelAbove ? '#334155' : '#ffffff';
                return (
                    <g key={i}>
                        <rect x={cx - barWidth / 2} y={y} width={barWidth} height={barH} fill={color} rx="3" />
                        <text x={cx} y={labelY} fontSize="9" fontWeight="700" fill={labelColor} textAnchor="middle">{d.value}</text>
                        <text x={cx} y={height - padBottom + 16} fontSize="9" fill="#94a3b8" textAnchor="middle">{d.date}</text>
                    </g>
                );
            })}
        </svg>
    );
}

export default function Chart({ chartData }) {
    if (!chartData || !chartData.data.length) return null;
    return (
        <div className="card">
            <div className="card-h">
                <div className="t">{chartData.title}</div>
                <div className="s">{chartData.subtitle}</div>
            </div>
            <div className="card-body" style={{ overflowX: 'auto', paddingTop: 16, paddingBottom: 8 }}>
                <ChartSVG chartData={chartData} />
            </div>
            <div className="legend">
                <span><span className="sw" style={{ background: 'var(--blue)' }} />Over average</span>
                <span><span className="sw" style={{ background: 'var(--red)' }} />Under average</span>
                <span>Average ({chartData.avg})</span>
            </div>
        </div>
    );
}
