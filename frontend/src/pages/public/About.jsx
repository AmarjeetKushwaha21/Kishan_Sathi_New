import { FiTarget, FiUsers, FiGlobe } from 'react-icons/fi';

import PublicHero from '@/components/public/PublicHero';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { APP } from '@/constants/app';

const VALUES = [
  {
    icon: FiTarget,
    title: 'Farmer-first',
    text: 'Every feature is built to solve a real problem a farmer faces in the field.',
  },
  {
    icon: FiUsers,
    title: 'Local expertise',
    text: 'We partner with KVKs, agronomists and local cooperatives across India.',
  },
  {
    icon: FiGlobe,
    title: 'Regional languages',
    text: 'AI and alerts are delivered in the language farmers speak at home.',
  },
];

export default function About() {
  return (
    <>
      <PublicHero
        title="Building technology that respects the soil and the farmer"
        subtitle="Kishan Sathi was born in the fields of Punjab, walking alongside farmers to understand their real challenges — and building tools that actually work where they work."
        primaryLabel="Join the mission"
        primaryTo="/register"
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
        illustration={
          <span aria-hidden="true" className="text-6xl sm:text-7xl">
            🌾
          </span>
        }
        bg="bg-gradient-to-b from-white via-primary-50/40 to-white dark:from-[#0a0f1e] dark:via-[#0f172a] dark:to-[#0a0f1e]"
      />

      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">Our mission</h2>
              <p className="mt-4 text-gray-600">
                To make smallholder farming profitable, sustainable and climate-resilient across India by
                putting world-class AI advisory, transparent markets and expert support directly into
                the hands of every farmer.
              </p>
              <p className="mt-4 text-gray-600">
                We work with agronomists, state agricultural universities and local cooperatives to make
                sure every recommendation is practical, affordable and — above all — trustworthy.
              </p>
              <Link to="/register" className="focus-ring mt-6 inline-block rounded-xl">
                <Button rightIcon="→">Start growing with AI</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card variant="soft" className="p-6 text-center">
                <span aria-hidden="true" className="text-3xl">
                  50K+
                </span>
                <dt className="mt-1 text-xs font-medium text-gray-500">Active Farmers</dt>
              </Card>
              <Card variant="soft" className="p-6 text-center">
                <span aria-hidden="true" className="text-3xl">
                  120+
                </span>
                <dt className="mt-1 text-xs font-medium text-gray-500">Districts Covered</dt>
              </Card>
              <Card variant="soft" className="p-6 text-center">
                <span aria-hidden="true" className="text-3xl">
                  8
                </span>
                <dt className="mt-1 text-xs font-medium text-gray-500">Languages</dt>
              </Card>
              <Card variant="soft" className="p-6 text-center">
                <span aria-hidden="true" className="text-3xl">
                  98%
                </span>
                <dt className="mt-1 text-xs font-medium text-gray-500">Happy Farmers</dt>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/30">
        <div className="container-app">
          <h2 className="font-display text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            What drives us
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <Card key={v.title} variant="soft" className="p-6 text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-2xl text-primary-600"
                >
                  <v.icon />
                </span>
                <h3 className="font-display text-lg font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} {APP.name}. Built with ❤ in India.
          </p>
        </div>
      </section>
    </>
  );
}
