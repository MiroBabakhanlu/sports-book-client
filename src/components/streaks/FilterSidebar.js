import { CONFIDENCE_TIERS, DATE_RANGES, MARKETS, STREAK_LENGTH_TIERS } from '../../utils/markets';

export default function FilterSidebar({ filters, onChange, onClear, leagues, summary, onCloseMobile }) {
    const marketList = filters.markets ? filters.markets.split(',') : [];
    const leagueList = filters.leagues ? filters.leagues.split(',') : [];

    const toggleMarket = (key) => {
        const next = marketList.includes(key) ? marketList.filter((m) => m !== key) : [...marketList, key];
        onChange({ markets: next.length ? next.join(',') : undefined });
    };

    const toggleLeague = (id) => {
        const idStr = String(id);
        const next = leagueList.includes(idStr) ? leagueList.filter((l) => l !== idStr) : [...leagueList, idStr];
        onChange({ leagues: next.length ? next.join(',') : undefined });
    };

    const marketCount = (key) => summary?.by_market?.[key] ?? 0;

    return (
        <aside className="sb">
            <div className="sb-head">
                <div className="sb-title">
                    <i className="ti ti-adjustments-horizontal" style={{ fontSize: 14, verticalAlign: -2, marginRight: 5 }} />
                    Filters
                </div>
                <button className="sb-clear" onClick={onClear}>Clear all</button>
                <span className="sb-x" onClick={onCloseMobile}><i className="ti ti-x" /></span>
            </div>

            <div className="fs">
                <div className="fs-t">Date range</div>
                <div className="rg">
                    {DATE_RANGES.map((d) => (
                        <button key={d.value} className={`ri${filters.date_range === d.value ? ' on' : ''}`} onClick={() => onChange({ date_range: filters.date_range === d.value ? undefined : d.value })}>
                            <div className="rd" />{d.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="fs">
                <div className="fs-t">Streak length</div>
                <div className="sp-g">
                    {STREAK_LENGTH_TIERS.map((n) => (
                        <div key={n} className={`sp${Number(filters.streak_min) === n ? ' on' : ''}`} onClick={() => onChange({ streak_min: Number(filters.streak_min) === n ? undefined : n })}>
                            <div className="sp-n">{n}+</div>
                            <div className="sp-l">streaks</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fs">
                <div className="fs-t">Confidence</div>
                <div className="pr">
                    {CONFIDENCE_TIERS.map((c) => (
                        <div
                            key={c.label}
                            className={`pl${(filters.confidence_min ? Number(filters.confidence_min) : null) === c.value ? ' on' : ''}`}
                            onClick={() => onChange({ confidence_min: c.value ?? undefined })}
                        >
                            {c.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="fs">
                <div className="fs-t">Markets</div>
                {MARKETS.map((m) => (
                    <div key={m.key} className={`ci${marketList.includes(m.key) ? ' on' : ''}`} onClick={() => toggleMarket(m.key)}>
                        <div className="cb" />{m.label}
                        <span className="ci-ct">{marketCount(m.key)}</span>
                    </div>
                ))}
            </div>

            <div className="fs">
                <div className="fs-t">Competitions</div>
                {leagues.map((l) => (
                    <div key={l.id} className={`ci${leagueList.includes(String(l.id)) ? ' on' : ''}`} onClick={() => toggleLeague(l.id)}>
                        <div className="cb" />{l.country}: {l.name}
                        <span className="ci-ct">{l.streak_count}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
}
