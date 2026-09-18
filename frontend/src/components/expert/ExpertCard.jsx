import { Link } from 'react-router-dom';
import { FiAward, FiBriefcase, FiClock, FiMapPin, FiMessageCircle, FiStar, FiVideo } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useExpert } from '@/context/ExpertContext';
import { formatINR } from '@/utils/format';

export default function ExpertCard({ expert }) {
  const { setSelectedExpertId } = useExpert();

  return (
    <Card variant="soft" className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white shadow-soft ${expert.gradient}`}
          aria-hidden="true"
        >
          {expert.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-base font-bold text-gray-900">{expert.name}</h3>
            {expert.verified && <Badge variant="primary" size="sm">Verified</Badge>}
            {expert.govt && <Badge variant="outline" size="sm">Govt empanelled</Badge>}
          </div>
          <p className="mt-0.5 text-xs text-gray-500">{expert.short}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
            <span className="inline-flex items-center gap-1"><FiStar className="text-accent-500" aria-hidden="true" /> {expert.rating} ({expert.reviews})</span>
            <span className="inline-flex items-center gap-1"><FiBriefcase aria-hidden="true" /> {expert.experience} yrs</span>
            <span className="inline-flex items-center gap-1"><FiClock aria-hidden="true" /> {expert.responseTime}</span>
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <FiMapPin className="text-primary-600" aria-hidden="true" /> Speaks {expert.languages.join(', ')}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {expert.focus.map((f) => (
          <Badge key={f} variant="default" size="sm">{f}</Badge>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
        <div>
          <p className="font-display text-lg font-bold text-gray-900">
            {formatINR(expert.rate)} <span className="text-xs font-medium text-gray-400">/ consult</span>
          </p>
          <p className="text-[11px] text-gray-400">{expert.consultations} consults · {expert.satisfaction}% satisfied</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/dashboard/consultation/chat/${expert.id}`} onClick={() => setSelectedExpertId(expert.id)} className="focus-ring rounded-xl">
            <Button variant="outline" size="sm" leftIcon={FiMessageCircle}>Chat</Button>
          </Link>
          <Link to={`/dashboard/consultation/expert/${expert.id}`} onClick={() => setSelectedExpertId(expert.id)} className="focus-ring rounded-xl">
            <Button size="sm" leftIcon={FiVideo}>Book</Button>
          </Link>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1 text-[11px] text-gray-400">
        <FiAward aria-hidden="true" /> {expert.experience}+ years, {expert.satisfaction}% satisfaction
      </p>
    </Card>
  );
}