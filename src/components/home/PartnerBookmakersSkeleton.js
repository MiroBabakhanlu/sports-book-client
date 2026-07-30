// No "list all active bookmakers" endpoint (or DB query for it) exists yet -
// explicit placeholder, matching the other not-yet-backed home sections.
export default function PartnerBookmakersSkeleton() {
    return (
        <div className="bks" style={{ justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--g400)' }}>
                Here would be the partner bookmakers strip, once that endpoint exists.
            </span>
        </div>
    );
}
