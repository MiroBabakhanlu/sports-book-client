// No "streak of the day" pick endpoint exists yet - explicit placeholder.
export default function StreakOfTheDaySkeleton() {
    return (
        <div className="sod">
            <div className="sod-head">
                <div className="sod-tag"><i className="ti ti-flame" />Streak of the Day</div>
            </div>
            <div className="sod-body">Here would be the single highest-priority streak of the day, once that ranking endpoint exists.</div>
        </div>
    );
}
