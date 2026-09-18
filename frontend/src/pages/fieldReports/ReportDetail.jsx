import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiEdit2, FiMapPin, FiShare2 } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { FIELD_REPORTS, FIELDS } from '@/data/mock/fieldReports';
import { cn } from '@/utils/cn';

const TYPE_BADGE = {
  'field-visit': 'primary',
  irrigation: 'sky',
  fertilizer: 'accent',
  'pest-check': 'danger',
  'disease-check': 'violet',
  soil: 'outline',
};

const TYPE_LABEL = {
  'field-visit': 'Field visit',
  irrigation: 'Irrigation',
  fertilizer: 'Fertilizer',
  'pest-check': 'Pest check',
  'disease-check': 'Disease scan',
  soil: 'Soil',
};

const TONE_STYLES = {
  good: 'border-primary-200 bg-primary-50 text-primary-800',
  watch: 'border-accent-300 bg-accent-50 text-accent-800',
};

export default function ReportDetail() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const report = useMemo(
    () => FIELD_REPORTS.find((r) => r.id === reportId) || FIELD_REPORTS[0],
    [reportId]
  );
  const field = FIELDS.find((f) => f.id === report.fieldId);

  if (!report) {
    return (
      <PageTransition>
        <EmptyState icon={FiMapPin} title="Report not found" description="This report may have been removed." />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHeader title={report.title} subtitle={`${report.id} · ${report.date}`} showBack />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card variant="soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 text-2xl" aria-hidden="true">
                  {report.emoji}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-gray-900">{report.title}</h3>
                    <Badge size="sm" variant={TYPE_BADGE[report.type] || 'outline'}>{TYPE_LABEL[report.type]}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{report.crop} · {report.agent}</p>
                </div>
              </div>
              <Badge variant="primary" className="capitalize">{report.status.replace('-', ' ')}</Badge>
            </div>

            <p className="mt-4 rounded-xl bg-primary-50/50 p-4 text-sm leading-relaxed text-gray-700">
              {report.summary}
            </p>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Notes from the visit</p>
              <ul className="mt-2 space-y-2">
                {report.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-sm text-gray-700">
                    <FiCheckCircle aria-hidden="true" className="mt-0.5 shrink-0 text-primary-600" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card variant="soft">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Field readings</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {report.readings.map((reading) => (
                <div key={reading.label} className={cn('rounded-xl border p-4', TONE_STYLES[reading.tone])}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70">{reading.label}</p>
                  <p className="mt-1 font-display text-lg font-bold">{reading.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {field && (
            <Card variant="tinted">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-xl text-white" aria-hidden="true">
                    <FiMapPin />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-gray-900">{field.name}</p>
                    <p className="text-xs text-gray-500">
                      {field.area} · {field.crop} · {field.stage}
                    </p>
                  </div>
                </div>
                <Link to="/dashboard/field-reports" className="focus-ring rounded-xl">
                  <Button variant="outline" size="sm" rightIcon={FiArrowRight}>All reports</Button>
                </Link>
              </div>
            </Card>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              leftIcon={FiShare2}
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 1500);
              }}
            >
              {saved ? 'Shared!' : 'Share report'}
            </Button>
            <Button variant="ghost" leftIcon={FiEdit2} onClick={() => navigate('/dashboard/field-reports/new')}>
              Add a new report
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <Card variant="flat">
            <p className="font-display text-sm font-bold text-gray-900">Also on this farm</p>
            <div className="mt-3 space-y-2">
              {FIELD_REPORTS.slice(0, 4).map((other) => (
                <Link key={other.id} to={`/dashboard/field-reports/${other.id}`} className="focus-ring block rounded-xl border border-gray-200 p-3 transition hover:border-primary-300">
                  <p className="text-xs font-bold text-gray-800">{other.title}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">{other.field} · {other.date}</p>
                </Link>
              ))}
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-accent-400 to-accent-500 text-primary-950">
            <p className="font-display text-sm font-bold">Pro tip</p>
            <p className="mt-1 text-xs opacity-90">
              Log readings weekly — trends in soil moisture and leaf colour flag problems before you can see them.
            </p>
          </Card>
        </aside>
      </div>
    </PageTransition>
  );
}