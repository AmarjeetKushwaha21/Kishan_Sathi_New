import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiClock, FiDroplet, FiFileText } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SoilHeader from '@/components/soil/SoilHeader';
import ScoreRing from '@/components/recommendation/ScoreRing';
import { useSoilTest } from '@/context/SoilTestContext';
import { cn } from '@/utils/cn';

export default function History() {
  const { reports, bookings } = useSoilTest();
  const safeReports = useMemo(() => (Array.isArray(reports) ? reports.filter(Boolean) : []), [reports]);
  const safeBookings = useMemo(() => (Array.isArray(bookings) ? bookings.filter(Boolean) : []), [bookings]);

  const readyCount = safeReports.filter((r) => r.status === 'ready').length;
  const avgScore =
    safeReports.length > 0
      ? Math.round(safeReports.reduce((sum, r) => sum + (r.score || 0), 0) / safeReports.length)
      : 76;

  const activeBookings = safeBookings.filter((b) => b.status === 'processing');

  return (
    <PageTransition>
      <SoilHeader title="History" subtitle="All your soil tests and bookings" showBack />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Reports ready</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{readyCount}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg health score</p>
          <p className="mt-1 font-display text-xl font-bold text-primary-700">{avgScore}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Last tested</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{safeReports[0]?.testedAt || 'Recently'}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Active bookings</p>
          <p className="mt-1 font-display text-xl font-bold text-accent-600">{activeBookings.length}</p>
        </Card>
      </div>

      {activeBookings.length > 0 && (
        <section aria-label="Bookings" className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
            <FiClock className="text-accent-500" aria-hidden="true" /> Scheduled bookings
          </h2>
          <div className="space-y-3">
            {activeBookings.map((booking) => (
              <Card key={booking.id} variant="soft" className="flex flex-wrap items-center gap-4 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-xl text-accent-600">
                  <FiClock aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold text-gray-900">{booking.package}</p>
                  <p className="text-xs text-gray-500">{booking.labName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{booking.date} · {booking.time}</p>
                  <p className="text-[11px] text-gray-400">{booking.slot}</p>
                </div>
                <Badge variant="accent" size="sm">In progress</Badge>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section aria-label="Past reports" className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiFileText className="text-primary-600" aria-hidden="true" /> Past reports
        </h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} variant="soft" className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
              <ScoreRing score={report.score} size={64} stroke={6} label="score" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-sm font-bold text-gray-900">{report.id}</p>
                  <Badge variant={report.rating === 'Good' ? 'primary' : 'accent'} size="sm">{report.rating}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{report.testedAt} · {report.labName} · {report.package}</p>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1"><FiDroplet aria-hidden="true" /> pH {report.ph}</span>
                  <span>OC {report.organicCarbon}%</span>
                  <span>N {report.nitrogen} · P {report.phosphorus} · K {report.potassium}</span>
                </p>
              </div>
              {report.id === reports[0]?.id ? (
                <Link to="/dashboard/soil/report" className="focus-ring rounded-xl">
                  <Badge variant="outline" size="sm" className="gap-1 py-1.5">
                    Open report <FiArrowRight aria-hidden="true" />
                  </Badge>
                </Link>
              ) : (
                <Badge variant="default" size="sm" className={cn('gap-1')}>
                  <FiCheckCircle aria-hidden="true" /> Archived
                </Badge>
              )}
            </Card>
          ))}
        </div>
      </section>

      <Card variant="tinted" className="mt-6">
        <p className="text-center text-xs leading-relaxed text-gray-500">
          Want a fresh reading? <Link to="/dashboard/soil" className="font-semibold text-primary-600 hover:underline">Book a new soil test</Link> — reports arrive within 3–5 days.
        </p>
      </Card>
    </PageTransition>
  );
}