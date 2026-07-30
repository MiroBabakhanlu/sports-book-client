// No ad-serving endpoint exists yet - explicit placeholder, not wired to anything.
export default function AdSlot({ size = 'h90', dimensions }) {
    return (
        <div className={size ? `ad-slot ${size}` : 'ad-slot'}>
            <div className="as-t">Advertisement</div>
            {dimensions ? <div className="as-d">{dimensions}</div> : null}
        </div>
    );
}
