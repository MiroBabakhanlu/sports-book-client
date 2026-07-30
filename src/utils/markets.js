// The 10 real market keys the API supports (src/routes/main/streaks.routes.js).
export const MARKETS = [
    { key: 'team_goals', label: 'Team Goals' },
    { key: 'total_goals', label: 'Total Goals' },
    { key: 'total_goals_1st_half', label: 'Goals 1st Half' },
    { key: 'total_goals_2nd_half', label: 'Goals 2nd Half' },
    { key: 'team_corners', label: 'Team Corners' },
    { key: 'total_corners', label: 'Total Corners' },
    { key: 'team_yellow_cards', label: 'Team Yellow Cards' },
    { key: 'total_yellow_cards', label: 'Total Yellow Cards' },
    { key: 'team_red_cards', label: 'Team Red Cards' },
    { key: 'total_red_cards', label: 'Total Red Cards' },
];

export const STREAK_LENGTH_TIERS = [3, 5, 7, 9, 12, 15];

export const CONFIDENCE_TIERS = [
    { label: 'Any', value: null },
    { label: '60%+', value: 60 },
    { label: '70%+', value: 70 },
    { label: '80%+', value: 80 },
    { label: '90%+', value: 90 },
];

export const DATE_RANGES = [
    { label: 'Today', value: 'today' },
    { label: 'Next 2 days', value: '2days' },
    { label: 'Next 7 days', value: '7days' },
    { label: 'Next 30 days', value: '30days' },
];

export const SORT_TABS = [
    { label: 'Top Streaks', value: 'top' },
    { label: 'Soon to Start', value: 'kickoff_asc' },
    { label: 'Highest Confidence', value: 'confidence_desc' },
    { label: 'Best Odds', value: 'odds_desc' },
];
