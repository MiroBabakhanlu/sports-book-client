export function ordinal(n) {
    if (n === null || n === undefined) return '';
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

// Renders "over 1.5" / "under 2" inside a prediction sentence as an <em>
// the way the mockups' prediction titles highlight the threshold. Binary
// markets (odd/even, both-teams-score) don't have a "direction threshold" -
// their prediction.text ends in "...: YES"/"...: NO"/"...: ODD"/"...: EVEN"
// instead, so that trailing outcome word gets highlighted the same way.
export function highlightThreshold(text, direction, threshold) {
    if (!text) return text;
    if (direction && threshold !== null && threshold !== undefined) {
        const needle = `${direction} ${threshold}`;
        const idx = text.toLowerCase().indexOf(needle.toLowerCase());
        if (idx !== -1) {
            return {
                before: text.slice(0, idx),
                match: text.slice(idx, idx + needle.length),
                after: text.slice(idx + needle.length),
            };
        }
    }
    const binaryMatch = text.match(/:\s*(YES|NO|ODD|EVEN)\s*$/i);
    if (binaryMatch) {
        const idx = text.lastIndexOf(binaryMatch[1]);
        return {
            before: text.slice(0, idx),
            match: binaryMatch[1],
            after: text.slice(idx + binaryMatch[1].length),
        };
    }
    return text;
}
