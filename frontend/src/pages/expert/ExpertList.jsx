import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShield, FiStar } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import ExpertHeader from '@/components/expert/ExpertHeader';
import ExpertCard from '@/components/expert/ExpertCard';
import SpecialtyChips from '@/components/expert/SpecialtyChips';
import { useExpert } from '@/context/ExpertContext';

export default function ExpertList() {
  const { experts, specialties } = useExpert();
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return experts.filter((e) => {
      if (specialty !== 'All' && e.specialty !== specialty) return false;
      if (q && !`${e.name} ${e.short} ${e.focus.join(' ')}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [experts, search, specialty]);

  const featured = [...experts].sort((a, b) => b.rating - a.rating)[0];

  return (
    <PageTransition>
      <ExpertHeader
        title="Expert Consultation"
        subtitle="Certified agronomists, pathologists & advisors"
        status={`${experts.length} experts`}
      />

      {featured && (
        <Card variant="tinted" className="mb-5 overflow-hidden p-0">
          <div className={`flex flex-col gap-4 bg-gradient-to-br p-5 sm:flex-row sm:items-center ${featured.gradient}`}>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-3xl backdrop-blur" aria-hidden="true">
              {featured.emoji}
            </span>
            <div className="min-w-0 flex-1 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Top rated this week</p>
              <h3 className="font-display text-lg font-bold">{featured.name}</h3>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85">
                <span className="inline-flex items-center gap-1"><FiStar aria-hidden="true" /> {featured.rating} · {featured.reviews} reviews</span>
                <span>{featured.short}</span>
                <span>{featured.experience} yrs experience</span>
              </p>
            </div>
            <Link to={`/dashboard/consultation/expert/${featured.id}`} className="focus-ring rounded-xl">
              <Button size="sm" className="!bg-white !text-primary-700">View profile</Button>
            </Link>
          </div>
        </Card>
      )}

      <Card variant="soft" className="p-4">
        <div className="relative">
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or specialty…"
            aria-label="Search experts"
            className="input-base pl-11"
          />
        </div>
        <div className="mt-3">
          <SpecialtyChips specialties={specialties} selected={specialty} onSelect={setSpecialty} />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <div className="mt-5">
          <EmptyState title="No experts found" description="Try a different specialty or search term." />
        </div>
      ) : (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {filtered.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      )}

      <Card variant="soft" className="mt-6 flex items-start gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg text-primary-600">
          <FiShield aria-hidden="true" />
        </span>
        <p className="text-xs leading-relaxed text-gray-500">
          <strong className="text-gray-700">All experts are verified.</strong> Every advisor holds a recognised agricultural
          degree or registration. Consultations are recorded for your safety and quality control.
        </p>
      </Card>
    </PageTransition>
  );
}