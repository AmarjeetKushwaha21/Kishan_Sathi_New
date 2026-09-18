import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

import FeatureShowcase from '@/components/public/FeatureShowcase';
import PublicHero from '@/components/public/PublicHero';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { WHY_US } from '@/data/mock/landing';

export default function Features() {
  return (
    <>
      <PublicHero
        title="Everything your farm needs"
        subtitle="AI crop advice, live mandi prices, weather alerts, pest detection and expert support — all in one app."
        primaryLabel="Get the App"
        primaryTo="/register"
        secondaryLabel="Chat with support"
        secondaryTo="/contact"
        illustration={
          <span aria-hidden="true" className="text-6xl sm:text-7xl">
            🌾
          </span>
        }
      />

      <section className="py-16 sm:py-20">
        <div className="container-app text-center">
          <FeatureShowcase />
          <Link to="/register" className="focus-ring mt-12 inline-block rounded-xl">
            <Button size="lg" rightIcon={FiCheck}>
              Join 50,000+ farmers getting smarter guidance
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Why Kishan Sathi?
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Built with farmers, agronomists and KVKs to work even where networks are slow.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="soft" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {WHY_US.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-4 text-left">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <FiCheck aria-hidden="true" className="text-sm" />
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}
