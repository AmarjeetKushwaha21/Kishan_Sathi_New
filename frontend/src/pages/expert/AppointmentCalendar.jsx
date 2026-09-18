import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import ExpertHeader from '@/components/expert/ExpertHeader';
import AppointmentCard from '@/components/expert/AppointmentCard';
import { useExpert } from '@/context/ExpertContext';
import { dateLabel } from '@/data/mock/expertConsultation';
import { cn } from '@/utils/cn';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AppointmentCalendar() {
  const { appointments, upcoming } = useExpert();
  const [monthOffset, setMonthOffset] = useState(0);

  const viewDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + monthOffset);
    return d;
  }, [monthOffset]);

  const grid = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
    return cells;
  }, [viewDate]);

  const dayAppointments = useMemo(() => {
    const map = {};
    appointments.forEach((a) => {
      const match = a.fullDate.match(/(\d{1,2}) ([A-Za-z]{3})/);
      if (!match) return;
      const [day, mon] = [Number(match[1]), match[2]];
      const key = `${day}-${mon}`;
      if (!map[key]) map[key] = [];
      map[key].push(a);
    });
    return map;
  }, [appointments]);

  const monthLabel = viewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  return (
    <PageTransition>
      <ExpertHeader
        title="Appointment Calendar"
        subtitle={`${upcoming.length} upcoming · ${appointments.filter((a) => a.status === 'completed').length} completed`}
        showBack
        status={monthLabel}
      />

      <Card variant="soft" className="p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMonthOffset((m) => m - 1)}
            aria-label="Previous month"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:text-primary-600"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <h3 className="font-display text-base font-bold text-gray-900">{monthLabel}</h3>
          <button
            type="button"
            onClick={() => setMonthOffset((m) => m + 1)}
            aria-label="Next month"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:text-primary-600"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {WEEKDAYS.map((w) => (
            <p key={w} className="py-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">{w}</p>
          ))}
          {grid.map((day, i) => {
            const key = day ? `${day}-${viewDate.toLocaleDateString('en-IN', { month: 'short' })}` : null;
            const dayAppts = key ? dayAppointments[key] : null;
            const isToday = day === new Date().getDate() && monthOffset === 0;
            return (
              <div
                key={i}
                className={cn(
                  'flex h-10 items-center justify-center rounded-xl text-sm font-semibold',
                  day === null && 'invisible',
                  isToday ? 'bg-primary-600 text-white shadow-soft' : dayAppts?.length ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200' : 'text-gray-600'
                )}
              >
                {day ?? ''}
              </div>
            );
          })}
        </div>
        <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <span className="inline-block h-2.5 w-2.5 rounded-md bg-primary-50 ring-1 ring-primary-200" aria-hidden="true" /> has appointments
        </p>
      </Card>

      <section aria-label="Upcoming appointments" className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-gray-900">Upcoming consultations</h3>
          <Link to="/dashboard/consultation/book" className="focus-ring rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
            Book another →
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <EmptyState title="No upcoming appointments" description="Book a consultation to see it here on the calendar." />
        ) : (
          <div className="space-y-3">
            {upcoming.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </section>

      <section aria-label="Past appointments" className="mt-6">
        <h3 className="mb-3 font-display text-base font-semibold text-gray-900">Recently completed</h3>
        <div className="flex flex-wrap gap-2">
          {appointments
            .filter((a) => a.status === 'completed')
            .slice(0, 3)
            .map((a) => (
              <Badge key={a.id} variant="default" size="sm">
                {dateLabel(0)} · {a.time} · {a.topic}
              </Badge>
            ))}
        </div>
      </section>
    </PageTransition>
  );
}