import { FiCheckCircle, FiCreditCard, FiShield, FiSmartphone } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import SectionCard from '@/components/farmer/SectionCard';
import { useFarmer } from '@/context/FarmerContext';
import { formatINR } from '@/utils/format';

export default function BankDetails() {
  const { bank } = useFarmer();

  return (
    <PageTransition>
      <FarmerHeader title="Bank Details" subtitle="Payout account for market and mandi sales" showBack status="KYC done" />

      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 to-emerald-800 p-5 text-white shadow-card sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-xl" aria-hidden="true">
              <FiCreditCard />
            </span>
            <div>
              <p className="font-display text-base font-bold">{bank.bank}</p>
              <p className="text-xs text-white/80">{bank.branch}</p>
            </div>
          </div>
          <Badge variant="outline" size="sm" className="!border-white/40 !bg-white/15 !text-white">{bank.accountType}</Badge>
        </div>

        <p className="mt-6 font-mono text-xl font-bold tracking-[0.2em]">{bank.accountNumber}</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <p>IFSC <span className="font-bold">{bank.ifsc}</span></p>
          <p>UPI <span className="font-bold">{bank.upi}</span></p>
        </div>
      </div>

      <SectionCard title="KYC status" icon={FiShield} className="mt-5">
        <ul className="space-y-3">
          {bank.kycSteps.map((step) => (
            <li key={step.label} className="flex items-center gap-3">
              <FiCheckCircle className={step.done ? 'text-primary-600' : 'text-gray-300'} aria-hidden="true" />
              <span className={`text-sm ${step.done ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>{step.label}</span>
              {step.done && <Badge variant="primary" size="sm" className="ml-auto">Done</Badge>}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Recent payouts" icon={FiSmartphone} className="mt-5">
        <div className="space-y-3">
          {bank.payouts.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-soft">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-lg text-emerald-600" aria-hidden="true">
                ₹
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">{p.source}</p>
                <p className="text-[11px] text-gray-400">{p.id} · {p.date}</p>
              </div>
              <p className="font-display text-sm font-bold text-gray-900">{formatINR(p.amount)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">Payouts are credited within 2 working days of a confirmed sale.</p>
      </SectionCard>
    </PageTransition>
  );
}