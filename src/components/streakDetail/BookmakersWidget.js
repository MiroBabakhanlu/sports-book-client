export default function BookmakersWidget({ bookmakers }) {
    return (
        <div className="card">
            <div className="card-h"><div className="t">Available bookmakers</div></div>
            {(!bookmakers || bookmakers.length === 0) && <div className="bm-empty">No bookmakers currently pricing this prediction.</div>}
            {bookmakers && bookmakers.map((b) => (
                <div className="bm-row" key={b.bookmaker}>
                    {b.bookmaker_logo ? (
                        <img src={b.bookmaker_logo} alt={b.bookmaker_label} style={{ height: 22, maxWidth: 64, objectFit: 'contain' }} />
                    ) : (
                        <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--navy)', color: '#fff', padding: '3px 8px', borderRadius: 5 }}>{b.bookmaker_label}</span>
                    )}
                    <span className="name">{b.bookmaker_label}</span>
                    <a className="visit" href={b.affiliate_url || undefined} target="_blank" rel="noopener noreferrer">Visit →</a>
                </div>
            ))}
        </div>
    );
}
