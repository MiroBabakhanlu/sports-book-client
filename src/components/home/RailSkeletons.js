// Soon to Start / In-Play Now / Highest Streaks each need their own dedicated
// endpoint that doesn't exist yet - explicit placeholders, no fetch attempted.
function RailSkeleton({ icon, title, subtitle, message }) {
    return (
        <div className="rw">
            <div className="rw-h">
                <div className="rw-t"><i className={`ti ${icon}`} />{title}</div>
                <div className="rw-s">{subtitle}</div>
            </div>
            <div className="sr-skel">{message}</div>
        </div>
    );
}

export function SoonToStartSkeleton() {
    return (
        <RailSkeleton
            icon="ti-clock-bolt"
            title="Soon to start"
            subtitle="Next 24h"
            message="Here would be the next streaks kicking off, once that endpoint exists."
        />
    );
}

export function LiveNowSkeleton() {
    return (
        <RailSkeleton
            icon="ti-player-play"
            title="In-Play now"
            subtitle="Live"
            message="Here would be currently live streak matches, once that endpoint exists."
        />
    );
}

export function HighestStreaksSkeleton() {
    return (
        <RailSkeleton
            icon="ti-bolt"
            title="Highest Streaks"
            subtitle="This week"
            message="Here would be this week's longest streaks, once that endpoint exists."
        />
    );
}
