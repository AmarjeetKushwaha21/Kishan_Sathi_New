import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiAward, FiBriefcase, FiCheckCircle, FiClock, FiGlobe, FiMessageCircle, FiStar, FiThumbsUp, FiVideo } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ExpertHeader from '@/components/expert/ExpertHeader';
import RatingStars from '@/components/ui/RatingStars';
import { useExpert } from '@/context/ExpertContext';
import { formatINR } from '@/utils/format';

export default function ExpertProfile() {
  const { expertId } = useParams();
  const { experts, getExpert, reviews, setSelectedExpertId } = useExpert();
  const [expert, setExpert] = useState(() => getExpert(expertId || experts[0].id));

  useEffect(() => {
    setExpert(getExpert(expertId || experts[0].id));
    setSelectedExpertId(expertId || experts[0].id);
  }, [expertId, getExpert, experts, setSelectedExpertId]);

  if (!expert) return null;

  const expertReviews = reviews[expert.id] || [];

  return (
    <PageTransition>
      <ExpertHeader title={expert.name} subtitle={expert.short} showBack status="Verified" />

      <Card variant="soft" className="overflow-hidden p-0">
        <div className={`flex flex-col gap-4 bg-gradient-to-br p-5 sm:flex-row sm:items-center ${expert.gradient}`}>
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-4xl backdrop-blur" aria-hidden="true">
            {expert.emoji}
          </span>
          <div className="min-w-0 flex-1 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold">{expert.name}</h3>
              {expert.verified && <Badge variant="outline" size="sm" className="!border-white/40 !bg-white/15 !text-white">Verified</Badge>}
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/90">
              <span className="inline-flex items-center gap-1"><FiStar aria-hidden="true" /> {expert.rating} rating</span>
              <span className="inline-flex items-center gap-1"><FiBriefcase aria-hidden="true" /> {expert.experience} years</span>
              <span className="inline-flex items-center gap-1"><FiGlobe aria-hidden="true" /> {expert.languages.join(', ')}</span>
            </p>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/80">{expert.bio}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:w-44">
            <Link to={`/dashboard/consultation/book/${expert.id}`} className="focus-ring rounded-xl">
              <Button size="sm" fullWidth className="!bg-white !text-primary-700" leftIcon={FiVideo}>Book appointment</Button>
            </Link>
            <Link to={`/dashboard/consultation/chat/${expert.id}`} className="focus-ring rounded-xl">
              <Button variant="outline" size="sm" fullWidth className="!border-white/50 !bg-white/10 !text-white" leftIcon={FiMessageCircle}>Chat now</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Consultations</p>
            <p className="mt-0.5 font-display text-lg font-bold text-gray-900">{expert.consultations.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Satisfaction</p>
            <p className="mt-0.5 inline-flex items-center gap-1 font-display text-lg font-bold text-gray-900"><FiThumbsUp className="text-primary-600" aria-hidden="true" /> {expert.satisfaction}%</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Response time</p>
            <p className="mt-0.5 inline-flex items-center gap-1 font-display text-lg font-bold text-gray-900"><FiClock className="text-accent-500" aria-hidden="true" /> {expert.responseTime}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Consult fee</p>
            <p className="mt-0.5 font-display text-lg font-bold text-primary-700">{formatINR(expert.rate)}</p>
          </div>
        </div>
      </Card>

      <Card variant="soft" className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiAward className="text-primary-600" aria-hidden="true" /> Specialises in
        </h3>
        <div className="flex flex-wrap gap-2">
          {expert.focus.map((f) => (
            <Badge key={f} variant="primary" size="md">{f}</Badge>
          ))}
        </div>
        <div className="mt-4 grid gap-2.5">
          {['Wheat & paddy rotation planning', 'Fertilizer and nutrition schedule', 'Disease identification from photos'].map((item) => (
            <p key={item} className="flex items-start gap-2 rounded-xl bg-primary-50/60 p-3 text-sm text-gray-700">
              <FiCheckCircle className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" /> {item}
            </p>
          ))}
        </div>
      </Card>

      <section aria-label="Recent reviews" className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-gray-900">Recent reviews</h3>
          <Link to={`/dashboard/consultation/ratings/${expert.id}`} className="focus-ring rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
            See all {expert.reviews} →
          </Link>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {expertReviews.slice(0, 3).map((review) => (
            <Card key={review.id} variant="soft" className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-bold text-gray-900">{review.author}</p>
                <RatingStars value={review.rating} size="text-xs" />
              </div>
              <p className="mt-0.5 text-[11px] text-gray-400">{review.type} · {review.date}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">“{review.comment}”</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Link to={`/dashboard/consultation/book/${expert.id}`} className="focus-ring rounded-xl">
          <Button fullWidth leftIcon={FiVideo}>Book a consultation</Button>
        </Link>
        <Link to={`/dashboard/consultation/chat/${expert.id}`} className="focus-ring rounded-xl">
          <Button variant="outline" fullWidth leftIcon={FiMessageCircle}>Start a chat</Button>
        </Link>
      </div>
    </PageTransition>
  );
}