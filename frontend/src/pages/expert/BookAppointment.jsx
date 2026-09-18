import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiCheckCircle, FiClock, FiMessageCircle, FiVideo } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ExpertHeader from '@/components/expert/ExpertHeader';
import { useExpert } from '@/context/ExpertContext';
import { dateLabel, getAvailableSlots, TOPIC_OPTIONS } from '@/data/mock/expertConsultation';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const TYPE_ICONS = { video: FiVideo, chat: FiMessageCircle, phone: FiClock };

function nextDays(count) {
  return Array.from({ length: count }, (_, i) => dateLabel(i));
}

export default function BookAppointment() {
  const { expertId } = useParams();
  const { experts, getExpert, consultTypes, topicOptions, bookAppointment, selectedExpertId, setSelectedExpertId } = useExpert();

  const initialExpert = expertId || selectedExpertId;
  const [picker, setPicker] = useState(expertId || selectedExpertId);
  const [type, setType] = useState('video');
  const [date, setDate] = useState(() => nextDays(7)[1]);
  const [time, setTime] = useState(() => getAvailableSlots(initialExpert, nextDays(7)[1])[0]);
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [customTopic, setCustomTopic] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const expert = getExpert(picker);
  const typeInfo = consultTypes.find((t) => t.key === type);
  const price = Math.round((expert.rate * typeInfo.priceFactor) / 10) * 10;
  const slots = getAvailableSlots(picker, date);

  function changeExpert(id) {
    setPicker(id);
    setSelectedExpertId(id);
    setTime(getAvailableSlots(id, date)[0]);
  }

  function changeDate(d) {
    setDate(d);
    setTime(getAvailableSlots(picker, d)[0]);
  }

  function onConfirm() {
    setBusy(true);
    setTimeout(() => {
      const finalTopic = customTopic.trim() || topic;
      const appointment = bookAppointment({ expertId: picker, type, date, time, topic: finalTopic });
      setConfirmation({ appointment, expert });
      setBusy(false);
    }, 900);
  }

  if (confirmation) {
    const { appointment, expert: bookedExpert } = confirmation;
    return (
      <PageTransition>
        <ExpertHeader title="Appointment Confirmed" showBack />

        <Card variant="tinted" className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-600 text-3xl text-white shadow-soft">
            <FiCheckCircle aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-gray-900">Consultation booked</h3>
          <p className="mt-1 text-sm text-gray-500">with {bookedExpert.name} on {appointment.fullDate} at {appointment.time}.</p>

          <dl className="mt-5 space-y-2.5 rounded-2xl bg-white p-4 text-left text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Booking ID</dt><dd className="font-bold text-gray-900">{appointment.id}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="font-bold text-gray-900">{typeInfo.label}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Topic</dt><dd className="text-right font-bold text-gray-900">{appointment.topic}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Fee</dt><dd className="font-bold text-primary-700">{formatINR(appointment.price)}</dd></div>
          </dl>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link to={appointment.type === 'chat' ? `/dashboard/consultation/chat/${appointment.expertId}` : `/dashboard/consultation/video/${appointment.id}`} className="focus-ring rounded-xl">
              <Button fullWidth leftIcon={appointment.type === 'chat' ? FiMessageCircle : FiVideo}>
                {appointment.type === 'chat' ? 'Open chat' : 'Join video call'}
              </Button>
            </Link>
            <Link to="/dashboard/consultation/calendar" className="focus-ring rounded-xl">
              <Button variant="outline" fullWidth>View calendar</Button>
            </Link>
          </div>
        </Card>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ExpertHeader title="Book Appointment" subtitle={`${expert.name} · ${expert.short}`} showBack status={formatINR(price)} />

      {!expertId && (
        <Card variant="soft" className="mb-5 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Choose an expert</p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {experts.map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={picker === e.id}
                onClick={() => changeExpert(e.id)}
                className={cn(
                  'focus-ring flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                  picker === e.id ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                )}
              >
                <span aria-hidden="true">{e.emoji}</span> {e.short}
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card variant="soft">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiVideo className="text-primary-600" aria-hidden="true" /> Consultation type
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {consultTypes.map((t) => {
                const Icon = TYPE_ICONS[t.key] || FiVideo;
                return (
                  <button
                    key={t.key}
                    type="button"
                    aria-pressed={type === t.key}
                    onClick={() => setType(t.key)}
                    className={cn(
                      'focus-ring rounded-2xl border p-4 text-left transition',
                      type === t.key ? 'border-primary-600 bg-primary-50/60 shadow-soft' : 'border-gray-200 bg-white hover:border-primary-300'
                    )}
                  >
                    <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl text-xl', type === t.key ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600')}>
                      <Icon aria-hidden="true" />
                    </span>
                    <p className="mt-3 font-display text-sm font-bold text-gray-900">{t.label}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">{t.desc}</p>
                    <p className="mt-2 text-xs font-bold text-primary-700">{formatINR(Math.round((expert.rate * t.priceFactor) / 10) * 10)}</p>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiCalendar className="text-primary-600" aria-hidden="true" /> Pick a date
            </h3>
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {nextDays(7).map((d, i) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={date === d}
                  onClick={() => changeDate(d)}
                  className={cn(
                    'focus-ring shrink-0 rounded-xl border px-3 py-2.5 text-xs font-semibold transition',
                    date === d ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d}
                </button>
              ))}
            </div>

            <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiClock className="text-primary-600" aria-hidden="true" /> Available slots
            </h3>
            {slots.length === 0 ? (
              <p className="rounded-xl bg-accent-50 p-3 text-sm text-accent-700">No slots left today — pick another date.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={time === t}
                    onClick={() => setTime(t)}
                    className={cn(
                      'focus-ring rounded-xl border px-3 py-2.5 text-xs font-semibold transition',
                      time === t ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">What do you need help with?</h3>
            <div className="flex flex-wrap gap-2">
              {topicOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={topic === t && !customTopic.trim()}
                  onClick={() => setTopic(t)}
                  className={cn(
                    'focus-ring rounded-xl border px-3 py-2 text-xs font-semibold transition',
                    topic === t && !customTopic.trim() ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              value={customTopic}
              onChange={(event) => setCustomTopic(event.target.value)}
              placeholder="Or describe your issue in your own words…"
              aria-label="Describe your issue"
              className="input-base mt-4"
            />
          </Card>
        </div>

        <Card variant="tinted" className="lg:sticky lg:top-24">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Booking summary</h3>
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-xl ${expert.gradient}`} aria-hidden="true">{expert.emoji}</span>
            <div>
              <p className="font-display text-sm font-bold text-gray-900">{expert.name}</p>
              <p className="text-xs text-gray-500">{expert.short} · {expert.rating}★</p>
            </div>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="font-semibold text-gray-900">{typeInfo.label}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Date</dt><dd className="font-semibold text-gray-900">{date}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Time</dt><dd className="font-semibold text-gray-900">{time}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Topic</dt><dd className="text-right font-semibold text-gray-900">{customTopic.trim() || topic}</dd></div>
            <div className="flex justify-between border-t border-primary-100 pt-3"><dt className="font-semibold text-gray-700">Total fee</dt><dd className="font-display text-lg font-bold text-primary-700">{formatINR(price)}</dd></div>
          </dl>
          <Button fullWidth className="mt-5" loading={busy} rightIcon={FiArrowRight} onClick={onConfirm}>
            Confirm booking
          </Button>
          <Badge variant="outline" className="mt-4">Free cancellation up to 2 hours before</Badge>
        </Card>
      </div>
    </PageTransition>
  );
}