import { FiAward, FiMapPin, FiCalendar } from 'react-icons/fi';

import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useFarmer } from '@/context/FarmerContext';
import { SEASON_INFO } from '@/data/mock/dashboard';

export default function HeroSection() {
  const { user } = useAuth();
  const { profile } = useFarmer();

  const resolvedName = user?.fullName || user?.name || profile?.fullName || 'Farmer';
  const firstName = user?.firstName || resolvedName.split(' ')[0] || profile?.firstName || 'Farmer';
  const fullName = resolvedName;
  const locationText = profile?.village
    ? `${profile.village}, ${profile.district || profile.state || 'Punjab'}`
    : user?.preferences?.location || 'Punjab, India';

  return (
    <section
      aria-labelledby="dashboard-hero-title"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-6 text-white shadow-card sm:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-white/25 bg-white/10 text-white">
              <FiAward aria-hidden="true" /> Sathi Pro Farmer
            </Badge>
            <Badge className="bg-accent-400 text-primary-950">{SEASON_INFO.status}</Badge>
          </div>

          <p className="text-sm text-primary-100">Good morning,</p>
          <h1 id="dashboard-hero-title" className="mt-0.5 font-display text-2xl font-bold sm:text-3xl">
            {firstName} 🌾
          </h1>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-100">
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin aria-hidden="true" />
              Farm #1 · {locationText}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar aria-hidden="true" />
              {SEASON_INFO.name} {SEASON_INFO.year}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
          <Avatar name={fullName} size="lg" />
          <div>
            <p className="text-xs text-primary-100">Season earnings</p>
            <p className="font-display text-2xl font-bold">{SEASON_INFO.seasonEarned}</p>
            <p className="text-xs text-primary-100">of {SEASON_INFO.seasonGoal} goal</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6" aria-label="Season progress">
        <div className="mb-2 flex items-center justify-between text-xs text-primary-100">
          <span>{SEASON_INFO.name} progress</span>
          <span>{SEASON_INFO.progress}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-accent-400 transition-all duration-700"
            style={{ width: `${SEASON_INFO.progress}%` }}
          />
        </div>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-primary-50">
          <FiCalendar className="text-accent-300" aria-hidden="true" />
          {SEASON_INFO.nextMilestone}
        </p>
      </div>
    </section>
  );
}