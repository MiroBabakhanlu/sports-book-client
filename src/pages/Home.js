import useStreaks from '../hooks/useStreaks';
import useLeagues from '../hooks/useLeagues';
import Seo from '../components/common/Seo';
import StreakOfTheDaySkeleton from '../components/home/StreakOfTheDaySkeleton';
import AdSlot from '../components/common/AdSlot';
import QuickFilters from '../components/home/QuickFilters';
import TopStreaksSection from '../components/home/TopStreaksSection';
import CompetitionsGrid from '../components/home/CompetitionsGrid';
import PartnerBookmakersSkeleton from '../components/home/PartnerBookmakersSkeleton';
import TelegramWidget from '../components/home/TelegramWidget';
import { SoonToStartSkeleton, LiveNowSkeleton, HighestStreaksSkeleton } from '../components/home/RailSkeletons';

export default function Home() {
    const { streaks, meta, loading, error } = useStreaks({ sort: 'top', page: 1, per_page: 6 });
    const { leagues } = useLeagues();

    return (
        <div className="hp">
            <Seo
                title={undefined}
                description="Live betting streaks with real confidence scores, odds, and matchday history across football leagues worldwide."
                path="/"
            />
            <h1 className="sr-only">AssuredBets — Top Streak Generator</h1>
            <div className="banners">
                <StreakOfTheDaySkeleton />
                <div className="side-banners">
                    <AdSlot size="" dimensions="Bookmaker promo" />
                    <AdSlot size="" dimensions="Bookmaker promo" />
                </div>
            </div>

            <AdSlot size="h90" dimensions="970 × 90 · leaderboard" />

            <div className="main-grid">
                <div className="main-col">
                    <div>
                        <QuickFilters />
                        <TopStreaksSection streaks={streaks} total={meta?.total} loading={loading} error={error} />
                    </div>

                    <AdSlot size="h90" dimensions="728 × 90 · banner" />

                    <CompetitionsGrid leagues={leagues} />
                </div>

                <div className="rail">
                    <SoonToStartSkeleton />
                    <LiveNowSkeleton />
                    <HighestStreaksSkeleton />
                    <TelegramWidget />
                    <AdSlot size="sq" dimensions="300 × 250" />
                </div>
            </div>

            <PartnerBookmakersSkeleton />
        </div>
    );
}
