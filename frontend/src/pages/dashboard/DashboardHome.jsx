import PageTransition from '@/components/ui/PageTransition';
import HeroSection from '@/components/dashboard/HeroSection';
import StatCards from '@/components/dashboard/StatCards';
import WeatherCard from '@/components/dashboard/WeatherCard';
import FarmingTips from '@/components/dashboard/FarmingTips';
import QuickActions from '@/components/dashboard/QuickActions';
import ChartsSection from '@/components/dashboard/ChartsSection';
import MandiPriceSummary from '@/components/dashboard/MandiPriceSummary';
import OrdersSummary from '@/components/dashboard/OrdersSummary';
import CropOverview from '@/components/dashboard/CropOverview';
import SoilHealthCard from '@/components/dashboard/SoilHealthCard';
import RecommendedCrops from '@/components/dashboard/RecommendedCrops';
import NotificationsPreview from '@/components/dashboard/NotificationsPreview';

export default function DashboardHome() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <HeroSection />
        <StatCards />

        <div className="grid gap-5 lg:grid-cols-2">
          <WeatherCard />
          <FarmingTips />
        </div>

        <QuickActions />
        <ChartsSection />

        <div className="grid gap-5 lg:grid-cols-2">
          <MandiPriceSummary />
          <OrdersSummary />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CropOverview />
          </div>
          <SoilHealthCard />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecommendedCrops />
          </div>
          <NotificationsPreview />
        </div>
      </div>
    </PageTransition>
  );
}