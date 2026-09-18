import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiFilePlus } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import PageHeader from '@/components/ui/PageHeader';
import { FIELDS, REPORT_TYPES } from '@/data/mock/fieldReports';
import { cn } from '@/utils/cn';

const REPORT_TYPE_OPTIONS = REPORT_TYPES.filter((r) => r.key !== 'all');

export default function NewReport() {
  const navigate = useNavigate();
  const [type, setType] = useState('field-visit');
  const [fieldId, setFieldId] = useState(FIELDS[0].id);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedField = FIELDS.find((f) => f.id === fieldId);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard/field-reports'), 900);
    }, 1100);
  }

  return (
    <PageTransition>
      <PageHeader title="New Field Report" subtitle="Log a visit, irrigation, fertilizer or pest check" showBack />

      {success ? (
        <Card variant="tinted" className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft" aria-hidden="true">
            <FiCheckCircle />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-gray-900">Report saved!</h3>
          <p className="mt-1 text-sm text-gray-500">Redirecting you to your field reports…</p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <Card variant="soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Report type</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {REPORT_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    aria-pressed={type === option.key}
                    onClick={() => setType(option.key)}
                    className={cn(
                      'focus-ring rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                      type === option.key
                        ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Field</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <button
                    key={field.id}
                    type="button"
                    aria-pressed={fieldId === field.id}
                    onClick={() => setFieldId(field.id)}
                    className={cn(
                      'focus-ring flex items-center gap-3 rounded-xl border p-3 text-left transition',
                      fieldId === field.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white hover:border-primary-300'
                    )}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-xl" aria-hidden="true">
                      {field.emoji}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-gray-800">{field.name}</span>
                      <span className="block text-xs text-gray-500">{field.crop} · {field.area}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Details</p>
              <div className="mt-3 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-gray-600">Title</span>
                  <input
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="e.g. Weekly field visit — tillering stage"
                    className="input-base w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-gray-600">Summary / observations</span>
                  <textarea
                    required
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    rows={5}
                    placeholder="Describe what you saw, applied or measured…"
                    className="input-base w-full resize-none"
                  />
                </label>
              </div>
            </Card>

            <Alert variant="info" title={`Logged against ${selectedField?.name}`}>
              Photos and GPS location are saved automatically in the demo. Your report appears instantly on the reports page.
            </Alert>
          </div>

          <aside className="space-y-4">
            <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <p className="font-display text-sm font-bold">Keep it simple</p>
              <ul className="mt-3 space-y-2 text-xs text-primary-100">
                <li>• One clear observation per line</li>
                <li>• Include any readings you took</li>
                <li>• Note the next action & date</li>
              </ul>
            </Card>
            <Card variant="flat">
              <Button type="submit" fullWidth loading={submitting} leftIcon={!submitting ? FiFilePlus : undefined} rightIcon={FiArrowRight}>
                Save report
              </Button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="focus-ring mt-3 w-full rounded-xl py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </Card>
          </aside>
        </form>
      )}
    </PageTransition>
  );
}