export default function Pagination({ page, totalPages, total, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = [];
    for (let p = 1; p <= totalPages; p++) {
        if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
        else if (pages[pages.length - 1] !== '...') pages.push('...');
    }

    return (
        <div className="pgr">
            <div className="pi">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                {total !== undefined ? <> &middot; <strong>{total}</strong> streaks</> : null}
            </div>
            <div className="pb-row">
                <button className="pb" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                    <i className="ti ti-arrow-left" style={{ fontSize: 12 }} />
                </button>
                {pages.map((p, i) =>
                    p === '...' ? (
                        <span key={`gap-${i}`} className="pb" style={{ border: 'none', color: 'var(--g300)' }}>&hellip;</span>
                    ) : (
                        <button key={p} className={`pb${p === page ? ' on' : ''}`} onClick={() => onPageChange(p)}>
                            {p}
                        </button>
                    )
                )}
                <button className="pb" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                    <i className="ti ti-arrow-right" style={{ fontSize: 12 }} />
                </button>
            </div>
        </div>
    );
}
