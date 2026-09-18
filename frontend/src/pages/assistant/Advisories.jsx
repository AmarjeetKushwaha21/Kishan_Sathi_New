import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiCheck, FiSearch } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { AI_ADVISORIES } from '@/data/mock/aiAssistant';
import { cn } from '@/utils/cn';

const TAGS = ['All', 'Fertilizer', 'Disease', 'Pest', 'Soil', 'Mandi'];

export default function Advisories() {
  const [tag, setTag] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(AI_ADVISORIES[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AI_ADVISORIES.filter((a) => {
      if (tag !== 'All' && a.tag !== tag) return false;
      if (q) {
        const haystack = `${a.title} ${a.summary} ${a.crop} ${a.tag}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [tag, query]);

  return (
    <PageTransition>
      <PageHeader title="Agro Advisories" subtitle="Curated tips you can apply today" status={`${AI_ADVISORIES.length} guides`} />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {TAGS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tag === item}
              onClick={() => setTag(item)}
              className={cn(
                'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                tag === item
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-64">
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search advisories…"
            aria-label="Search advisories"
            className="input-base w-full !pl-9"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FiBookOpen}
          title="No advisories found"
          description="Try a different tag or search term — or just ask Sathi in the chat."
          actionLabel="Ask Sathi"
          action
          onAction={() => {
            window.location.href = '/dashboard/ai-assistant';
          }}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((advisory) => {
            const isOpen = expanded === advisory.id;
            return (
              <Card key={advisory.id} variant={isOpen ? 'tinted' : 'soft'} className="p-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : advisory.id)}
                  className="focus-ring flex w-full items-start gap-3 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg" aria-hidden="true">
                    📖
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-sm font-bold text-gray-900">{advisory.title}</span>
                      <Badge size="sm" variant="accent">{advisory.tag}</Badge>
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {advisory.crop} · {advisory.readTime} read
                    </span>
                    <span className="mt-2 block text-sm text-gray-600">{advisory.summary}</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 border-t border-primary-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">What to do</p>
                    <ol className="mt-2 space-y-2">
                      {advisory.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2 text-sm text-gray-700">
                          <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-primary-600" />
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg" aria-hidden="true">💬</span>
          <div>
            <p className="font-display text-sm font-bold">Have a specific question?</p>
            <p className="text-xs text-primary-100">Ask Sathi directly and get an instant answer.</p>
          </div>
        </div>
        <Link to="/dashboard/ai-assistant" className="focus-ring rounded-xl">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
            Open AI Sathi
          </span>
        </Link>
      </div>
    </PageTransition>
  );
}