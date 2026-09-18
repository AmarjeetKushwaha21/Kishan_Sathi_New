import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiStar } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import ExpertHeader from '@/components/expert/ExpertHeader';
import RatingStars from '@/components/ui/RatingStars';
import ScoreRing from '@/components/recommendation/ScoreRing';
import { useExpert } from '@/context/ExpertContext';
import { cn } from '@/utils/cn';

function distribution(rating, count) {
  const weights = [0.55, 0.25, 0.12, 0.06, 0.02];
  return [5, 4, 3, 2, 1].map((s) => {
    const diff = Math.abs(s - rating);
    const weight = weights[Math.min(diff, 4)];
    return { stars: s, count: Math.round(weight * count * (diff === 0 ? 1 : 0.6)) };
  });
}

export default function Ratings() {
  const { expertId } = useParams();
  const { experts, getExpert, reviews, myRatings, submitRating, setSelectedExpertId, completed } = useExpert();
  const [activeId, setActiveId] = useState(() => expertId || experts[0].id);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');
  const [ratedApt, setRatedApt] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setActiveId(expertId || experts[0].id);
    setSelectedExpertId(expertId || experts[0].id);
  }, [expertId, experts, setSelectedExpertId]);

  const expert = getExpert(activeId);
  const expertReviews = reviews[activeId] || [];
  const my = myRatings.filter((r) => r.expertId === activeId);
  const unrated = completed.filter((a) => a.expertId === activeId && !a.rating);

  const dist = useMemo(() => distribution(expert.rating, expert.reviews), [expert.rating, expert.reviews]);

  function pickAppointment(id) {
    setRatedApt(id);
    setSaved(false);
  }

  function saveRating() {
    if (!star || !ratedApt) return;
    submitRating({ appointmentId: ratedApt, expertId: activeId, rating: star });
    setSaved(true);
    setStar(0);
    setComment('');
    setRatedApt(null);
  }

  return (
    <PageTransition>
      <ExpertHeader title="Ratings & Reviews" subtitle="See what farmers say, and share your feedback" showBack status={expert.short} />

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {experts.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={activeId === e.id}
            onClick={() => setActiveId(e.id)}
            className={cn(
              'focus-ring flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition',
              activeId === e.id ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            <span aria-hidden="true">{e.emoji}</span> {e.short}
          </button>
        ))}
      </div>

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-3">
        <Card variant="soft" className="flex flex-col items-center p-5 text-center">
          <ScoreRing score={Math.round(expert.rating * 20)} size={120} stroke={10} label="rating" />
          <RatingStars value={expert.rating} size="text-lg" className="mt-3" />
          <p className="mt-1 text-xs text-gray-500">Based on {expert.reviews} reviews</p>

          <div className="mt-5 w-full space-y-2">
            {dist.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-xs">
                <span className="flex w-8 shrink-0 items-center gap-0.5 font-semibold text-gray-600">{d.stars}<FiStar className="text-accent-500" aria-hidden="true" /></span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-accent-400"
                    style={{ width: `${Math.min(100, (d.count / expert.reviews) * 100)}%` }}
                    aria-hidden="true"
                  />
                </div>
                <span className="w-8 text-right text-gray-400">{d.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2">
          {unrated.length > 0 && (
            <Card variant="tinted" className="mb-5 p-5">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-gray-900">
                <FiStar className="text-accent-500" aria-hidden="true" /> Rate your consultation
              </h3>
              <p className="mt-1 text-xs text-gray-500">Pick a completed consultation to rate.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {unrated.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={ratedApt === a.id}
                    onClick={() => pickAppointment(a.id)}
                    className={cn(
                      'focus-ring rounded-xl border px-3 py-2 text-xs font-semibold transition',
                      ratedApt === a.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                    )}
                  >
                    {a.topic} · {a.fullDate}
                  </button>
                ))}
              </div>

              {ratedApt && (
                <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft">
                  <p className="mb-2 text-xs font-semibold text-gray-500">Tap to rate</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStar(s)}
                        aria-label={`${s} star`}
                        className="focus-ring text-2xl"
                      >
                        <FiStar className={cn(s <= star ? 'text-accent-500' : 'text-gray-300')} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Share what helped (optional)…"
                    aria-label="Rating comment"
                    rows={2}
                    className="input-base mt-3 resize-none"
                  />
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" disabled={!star} onClick={saveRating} leftIcon={FiCheckCircle}>Submit rating</Button>
                  </div>
                </div>
              )}

              {saved && <Alert variant="success" className="mt-4" title="Thanks for your feedback!">Your rating has been saved.</Alert>}
            </Card>
          )}

          <h3 className="mb-3 font-display text-base font-semibold text-gray-900">Your ratings for {expert.short}</h3>
          {my.length === 0 ? (
            <p className="rounded-xl bg-white px-4 py-3 text-sm text-gray-400 shadow-soft">You haven&apos;t rated this expert yet.</p>
          ) : (
            <div className="space-y-2">
              {my.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-soft">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">{expert.short}</Badge>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <RatingStars value={r.rating} size="text-xs" />
                </div>
              ))}
            </div>
          )}

          <h3 className="mb-3 mt-6 font-display text-base font-semibold text-gray-900">All reviews</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {expertReviews.map((review) => (
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
        </div>
      </div>
    </PageTransition>
  );
}