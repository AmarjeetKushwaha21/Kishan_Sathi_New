import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PublicHero from '@/components/public/PublicHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/utils/cn';

export default function FeaturePage({ page }) {
  return (
    <>
      <PublicHero
        title={page.title}
        subtitle={page.subtitle}
        primaryLabel={page.primaryLabel}
        primaryTo={page.primaryTo}
        secondaryLabel={page.secondaryLabel}
        secondaryTo={page.secondaryTo}
        illustration={
          <span
            aria-hidden="true"
            className={cn(
              'mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-5xl shadow-card',
              `bg-gradient-to-br ${page.color}`
            )}
          >
            {page.icon}
          </span>
        }
      />

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="container-app">
          <SectionHeading
            eyebrow="How it works"
            title={`${page.title} in action`}
            subtitle="Simple, powerful tools built for Indian farmers."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
              >
                <Card variant="soft" className="h-full p-6">
                  <h3 className="font-display text-lg font-semibold text-gray-900">{feat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{feat.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <SectionHeading
                align="left"
                eyebrow="Why farmers love it"
                title={`Benefits of ${page.title}`}
              />
              <ul className="mt-6 space-y-3">
                {page.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <FiCheck
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary-600"
                    />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-center text-white shadow-card"
            >
              <h3 className="font-display text-xl font-bold">Ready to try {page.title.split(' ')[0]}?</h3>
              <p className="mt-2 max-w-sm text-sm text-primary-100">
                Log in to get personalised, AI-powered guidance for your farm.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to={page.secondaryTo} className="focus-ring w-full rounded-xl sm:w-auto">
                  <Button size="lg" variant="secondary" fullWidth className="sm:w-auto">
                    {page.secondaryLabel}
                  </Button>
                </Link>
                <Link to={page.dashboardRoute} className="focus-ring w-full rounded-xl sm:w-auto">
                  <Button size="lg" variant="outline" fullWidth className="border-white/30 text-white hover:bg-white/10 sm:w-auto">
                    Open in Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
