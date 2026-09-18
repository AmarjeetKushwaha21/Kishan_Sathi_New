import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';

export default function ProfileHero({ profile, action }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-emerald-700 p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar name={profile.fullName} size="lg" color={profile.avatarColor} className="!h-20 !w-20 !text-2xl ring-4 ring-white/30" />

        <div className="min-w-0 flex-1 text-white">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl font-bold">{profile.fullName}</h2>
            <Badge variant="outline" size="sm" className="!border-white/40 !bg-white/15 !text-white">{profile.membershipTier} member</Badge>
          </div>
          <p className="mt-1 text-sm text-white/90">Farmer ID {profile.id} · {profile.memberSince}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75">
            <span>📍 {profile.village}, {profile.district}</span>
            <span>{profile.languages.join(' · ')}</span>
          </p>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}