import api from '../../services/api';

export default function OddPill({ odd, streakId, clickType, emptyLabel = 'No odds yet' }) {
    if (!odd) return <span className="no-odds">{emptyLabel}</span>;

    const handleClick = (e) => {
        e.stopPropagation();
        api.post('/clicks', { streak_id: streakId, bookmaker: odd.bookmaker, click_type: clickType }).catch(() => {});
        if (odd.affiliate_url) window.open(odd.affiliate_url, '_blank', 'noopener');
    };

    return (
        <div className="bk" onClick={handleClick} role="button" tabIndex={0}>
            <span className="o">{odd.value}</span>
            {odd.bookmaker_logo ? (
                <span className="n" style={{ background: '#0f1629', display: 'flex', alignItems: 'center', padding: '2px 6px' }}>
                    <img src={odd.bookmaker_logo} alt={odd.bookmaker_label} style={{ height: 14, objectFit: 'contain' }} />
                </span>
            ) : (
                <span className="n">{odd.bookmaker_label}</span>
            )}
        </div>
    );
}
