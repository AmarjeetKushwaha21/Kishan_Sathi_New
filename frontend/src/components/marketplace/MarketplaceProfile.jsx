import { FiCheckCircle, FiMapPin, FiShield, FiStar, FiTrendingUp } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Timeline from '@/components/marketplace/Timeline';
import { formatINR } from '@/utils/format';

export default function MarketplaceProfile({ party, deals, extraLabel }) {
  const partyDeals = deals.filter((d) => d.buyerId === party.id);
  const dealValue = partyDeals.reduce((sum, d) => sum + d.total, 0);

  const relationshipTimeline = [
    { id: 'r1', title: 'First connected', description: `You and ${party.name} started working together`, date: '2026-03-12', status: 'done' },
    ...partyDeals.slice(0, 2).map((d, i) => ({
      id: `r${i + 2}`,
      title: `${d.crop} deal completed`,
      description: `${d.quantity} quintals · ${formatINR(d.total)}`,
      date: d.dealDate,
      status: 'done',
    })),
    { id: 'r-end', title: 'Ongoing partnership', description: 'Ready for your next lot', date: null, status: 'current' },
  ];

  return (
    <div className="space-y-6">
      <Card variant="soft">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={party.name} size="lg" color={party.type === 'Company' || party.deals >= 20 ? '#15803d' : '#f59e0b'} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-gray-900">{party.name}</h1>
              <Badge variant="outline">{party.type}</Badge>
              {party.verified ? (
                <Badge variant="primary"><FiShield aria-hidden="true" /> Verified</Badge>
              ) : (
                <Badge variant="accent">Pending verification</Badge>
              )}
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <FiMapPin aria-hidden="true" /> {party.location}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700">
                <FiStar aria-hidden="true" className="fill-accent-400 text-accent-400" /> {party.rating}
              </span>
              <span className="text-xs text-gray-500">· {party.deals} total deals</span>
              <span className="text-xs text-gray-400">· {extraLabel}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-primary-50/60 p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Value with you</p>
            <p className="font-display text-xl font-bold text-primary-700">{formatINR(dealValue)}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-600">{party.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(party.sectors || party.preferences || []).map((sector) => (
            <Badge key={sector} variant="outline">{sector}</Badge>
          ))}
          <Badge variant="primary">
            <FiTrendingUp aria-hidden="true" /> {party.paymentTerms}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="soft">
          <h2 className="mb-4 font-display text-base font-semibold text-gray-900">Your deals with {party.name}</h2>
          {partyDeals.length > 0 ? (
            <ul className="space-y-3">
              {partyDeals.map((deal) => (
                <li key={deal.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5">
                  <span className="text-2xl" aria-hidden="true">{deal.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">{deal.crop} · {deal.variety}</p>
                    <p className="text-xs text-gray-500">{deal.quantity} quintals · {deal.dealDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{formatINR(deal.total)}</p>
                    <p className="text-[10px] font-medium text-primary-600">{deal.paymentStatus === 'received' ? 'Paid' : 'Pending'}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <FiCheckCircle aria-hidden="true" className="text-primary-500" /> No completed deals yet with this buyer.
            </p>
          )}
        </Card>

        <Card variant="soft">
          <Timeline title="Partnership timeline" items={relationshipTimeline} />
        </Card>
      </div>
    </div>
  );
}