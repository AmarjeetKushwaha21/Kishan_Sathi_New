import { Link } from 'react-router-dom';
import { FiAward, FiCreditCard, FiEdit2, FiFileText, FiGrid, FiHome, FiLogOut, FiMap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import ProfileHero from '@/components/farmer/ProfileHero';
import ProfileMenuLink from '@/components/farmer/ProfileMenuLink';
import AchievementCard from '@/components/farmer/AchievementCard';
import { useFarmer } from '@/context/FarmerContext';
import { useAuth } from '@/context/AuthContext';

export default function ProfileHome() {
  const { profile, landStats, achievements } = useFarmer();
  const { logout } = useAuth();
  const safeAchievements = Array.isArray(achievements) ? achievements : [];
  const safeLandStats = landStats || { count: 4, total: 12.5, owned: 8.5, leased: 4.0 };
  const unlocked = safeAchievements.filter((a) => !a.locked).slice(0, 3);

  const quickLinks = [
    { to: '/dashboard/profile/farm', icon: FiHome, label: 'Farm Details', description: 'Soil, irrigation and machinery', tone: 'primary' },
    { to: '/dashboard/profile/land', icon: FiMap, label: 'Land Details', description: `${safeLandStats.count} parcels · ${safeLandStats.total} acres`, tone: 'sky' },
    { to: '/dashboard/profile/documents', icon: FiFileText, label: 'Documents', description: 'Land records, Aadhaar and licences', tone: 'indigo' },
    { to: '/dashboard/profile/bank', icon: FiCreditCard, label: 'Bank Details', description: 'Account, KYC and payouts', tone: 'emerald' },
    { to: '/dashboard/profile/crops', icon: FiGrid, label: 'Crop History', description: 'Season-wise yields and profits', tone: 'accent' },
    { to: '/dashboard/profile/achievements', icon: FiAward, label: 'Achievements', description: `${unlocked.length} badges unlocked`, tone: 'violet' },
  ];

  return (
    <PageTransition>
      <FarmerHeader title="My Profile" subtitle={`Farmer ID ${profile.id} · ${profile.membershipTier} member`} />

      <ProfileHero
        profile={profile}
        action={
          <Link to="/dashboard/profile/edit" className="focus-ring rounded-xl">
            <Button size="sm" variant="outline" className="!border-white/40 !bg-white/15 !text-white hover:!bg-white/25" leftIcon={FiEdit2}>
              Edit Profile
            </Button>
          </Link>
        }
      />

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiMap} label="Total land" value={`${landStats.total} acres`} color="primary" />
        <StatCard icon={FiHome} label="Owned" value={`${landStats.owned} acres`} color="sky" />
        <StatCard icon={FiCreditCard} label="Leased" value={`${landStats.leased} acres`} color="accent" />
        <StatCard icon={FiGrid} label="Fields" value={`${landStats.count} parcels`} color="violet" />
      </div>

      <h3 className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">Quick links</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {quickLinks.map((link) => (
          <ProfileMenuLink key={link.to} {...link} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Recent achievements</h3>
        <Link to="/dashboard/profile/achievements" className="focus-ring rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
          View all →
        </Link>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {unlocked.map((a) => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>

      <div className="mt-8">
        <Button variant="danger" leftIcon={FiLogOut} onClick={logout}>
          Log out
        </Button>
        <p className="mt-2 text-xs text-gray-400">Sign out of your Kishan Sathi account on this device.</p>
      </div>
    </PageTransition>
  );
}