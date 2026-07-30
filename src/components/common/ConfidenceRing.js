export default function ConfidenceRing({ confidence, size = 44, radius = 18 }) {
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - (confidence || 0) / 100);
    const c = size / 2;
    return (
        <div className="conf-ring" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle className="cr-track" cx={c} cy={c} r={radius} />
                <circle className="cr-fill" cx={c} cy={c} r={radius} strokeDasharray={circumference} strokeDashoffset={dashOffset} />
            </svg>
            <div className="conf-pct">{confidence}%</div>
        </div>
    );
}
