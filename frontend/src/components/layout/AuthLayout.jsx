import { Link } from 'react-router-dom';
import { FiShield, FiTrendingUp, FiCloudDrizzle } from 'react-icons/fi';

import Logo from '@/components/ui/Logo';
import PageTransition from '@/components/ui/PageTransition';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { APP } from '@/constants/app';

const HIGHLIGHTS = [
  {
    icon: FiShield,
    title: 'Smart Crop Guidance',
    text: 'AI-powered recommendations tailored to your soil and climate.',
  },
  {
    icon: FiTrendingUp,
    title: 'Live Market Prices',
    text: 'Real-time mandi prices so you always sell at the best rate.',
  },
  {
    icon: FiCloudDrizzle,
    title: 'Weather Alerts',
    text: 'Hyper-local forecasts and warnings delivered to your phone.',
  },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 lg:flex lg:w-[45%] lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"
        />

        <Link to="/" className="focus-ring relative z-10 inline-block rounded-xl">
          <span className="inline-flex items-center gap-2 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl text-accent-300">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                <path d="M12 2C7 6 3 10 3 15a9 9 0 0018 0c0-5-4-9-9-13z" />
              </svg>
            </span>
            <span className="font-display text-xl font-bold">{APP.name}</span>
          </span>
        </Link>

        <div className="relative z-10">
          <p className="mb-6 max-w-md font-display text-3xl font-bold leading-snug text-white">
            Farming gets smarter when AI walks beside you.
          </p>
          <ul className="space-y-5">
            {HIGHLIGHTS.map(({ icon: Icon, title: t, text }) => (
              <li key={t} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-accent-300">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-white">{t}</p>
                  <p className="text-sm text-primary-100/80">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-primary-100/60">
          Trusted by 50,000+ farmers across India
        </p>
      </aside>

      <main id="main-content" className="relative flex flex-1 flex-col bg-primary-50/40 dark:bg-[#0a0f1e]">
        <div className="hidden items-center justify-end p-6 lg:flex">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between p-4 sm:p-6 lg:hidden">
          <Link to="/" className="focus-ring rounded-xl">
            <Logo size="sm" />
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 pt-2 sm:px-6 lg:p-8">
          <PageTransition className="w-full max-w-md">
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <header className="mb-6">
                <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-[1.7rem]">
                  {title}
                </h1>
                {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
              </header>
              {children}
            </div>
          </PageTransition>
        </div>
      </main>
    </div>
  );
}