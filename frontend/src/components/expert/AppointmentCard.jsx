import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiMessageCircle, FiVideo } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import RatingStars from '@/components/ui/RatingStars';
import { useExpert } from '@/context/ExpertContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const TYPE_META = {
  video: { label: 'Video', icon: FiVideo, badge: 'primary' },
  chat: { label: 'Chat', icon: FiMessageCircle, badge: 'accent' },
  phone: { label: 'Phone', icon: FiClock, badge: 'default' },
};

export default function AppointmentCard({ appointment }) {
  const { getExpert } = useExpert();
  const expert = getExpert(appointment.expertId);
  const meta = TYPE_META[appointment.type] || TYPE_META.chat;
  const Icon = meta.icon;

  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', appointment.status === 'cancelled' && 'opacity-60')}>
      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl shadow-soft ${expert.gradient}`}
          aria-hidden="true"
        >
          {expert.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold text-gray-900">{expert.name}</p>
          <p className="truncate text-xs text-gray-500">{appointment.topic}</p>
        </div>
        <Badge variant={meta.badge} size="sm" className="gap-1">
          <Icon aria-hidden="true" /> {meta.label}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 shadow-soft">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{appointment.fullDate}</span>
          <span>· {appointment.time}</span>
          <span>· {appointment.duration} min</span>
        </div>
        <span className="font-bold text-gray-900">{formatINR(appointment.price)}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {appointment.status === 'upcoming' && appointment.type !== 'chat' && (
          <Link to={`/dashboard/consultation/video/${appointment.id}`} className="focus-ring rounded-xl">
            <Button size="sm" leftIcon={FiVideo}>Join call</Button>
          </Link>
        )}
        <Link to={`/dashboard/consultation/chat/${appointment.expertId}`} className="focus-ring rounded-xl">
          <Button variant={appointment.status === 'upcoming' ? 'outline' : 'primary'} size="sm" leftIcon={FiMessageCircle}>
            {appointment.status === 'upcoming' ? 'Open chat' : 'View chat'}
          </Button>
        </Link>
        {appointment.status === 'completed' && (
          <span className="ml-auto inline-flex items-center gap-1.5">
            {appointment.rating ? (
              <RatingStars value={appointment.rating} size="text-xs" />
            ) : (
              <Link to={`/dashboard/consultation/ratings/${appointment.expertId}`} className="focus-ring rounded-lg">
                <Button variant="accent" size="sm" leftIcon={FiCheckCircle}>Rate</Button>
              </Link>
            )}
          </span>
        )}
      </div>
    </Card>
  );
}