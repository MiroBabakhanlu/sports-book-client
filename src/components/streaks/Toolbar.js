import { CONFIDENCE_TIERS, DATE_RANGES, MARKETS, SORT_TABS } from '../../utils/markets';

function buildChips(filters, leagues) {
    const chips = [];
    if (filters.streak_min) chips.push({ key: 'streak_min', label: `${filters.streak_min}+ streaks` });
    if (filters.confidence_min) {
        const tier = CONFIDENCE_TIERS.find((c) => String(c.value) === String(filters.confidence_min));
        chips.push({ key: 'confidence_min', label: `${tier ? tier.label : filters.confidence_min + '%+'} conf` });
    }
    if (filters.date_range) {
        const dr = DATE_RANGES.find((d) => d.value === filters.date_range);
        chips.push({ key: 'date_range', label: dr ? dr.label : filters.date_range });
    }
    if (filters.markets) {
        filters.markets.split(',').forEach((key) => {
            const m = MARKETS.find((mk) => mk.key === key);
            chips.push({ key: `markets:${key}`, label: m ? m.label : key, group: 'markets', value: key });
        });
    }
    if (filters.leagues) {
        filters.leagues.split(',').forEach((id) => {
            const l = leagues.find((lg) => String(lg.id) === id);
            chips.push({ key: `leagues:${id}`, label: l ? l.name : id, group: 'leagues', value: id });
        });
    }
    return chips;
}

export default function Toolbar({ filters, onChange, total, leagues, onOpenMobileFilters }) {
    const chips = buildChips(filters, leagues);

    const removeChip = (chip) => {
        if (chip.group === 'markets') {
            const next = filters.markets.split(',').filter((k) => k !== chip.value);
            onChange({ markets: next.length ? next.join(',') : undefined });
        } else if (chip.group === 'leagues') {
            const next = filters.leagues.split(',').filter((k) => k !== chip.value);
            onChange({ leagues: next.length ? next.join(',') : undefined });
        } else {
            onChange({ [chip.key]: undefined });
        }
    };

    return (
        <div className="tb">
            <button className="filters-toggle" onClick={onOpenMobileFilters}>
                <i className="ti ti-adjustments-horizontal" style={{ fontSize: 14 }} />Filters
            </button>
            <div className="tb-n">Showing <strong>{total}</strong> streaks</div>
            <div className="tb-sep" />
            {SORT_TABS.map((s) => (
                <div key={s.value} className={`st${(filters.sort || 'top') === s.value ? ' on' : ''}`} onClick={() => onChange({ sort: s.value })}>
                    {s.label}
                </div>
            ))}
            {chips.map((chip) => (
                <div className="af" key={chip.key}>
                    {chip.label}
                    <button onClick={() => removeChip(chip)}><i className="ti ti-x" /></button>
                </div>
            ))}
        </div>
    );
}
