import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Card from '@/components/ui/Card';
import { FEATURES } from '@/data/mock/landing';
import { cn } from '@/utils/cn';

export default function FeatureShowcase() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map(({ icon: Icon, title, text, to }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
        >
          <Link
            to={to}
            className={cn(
              'group block h-full transform rounded-2xl p-0.5 outline-none transition-all duration-250 ease-out focus-visible:ring-4 focus-visible:ring-primary-500/30'
            )}
          >
            <Card
              variant="soft"
              className={cn(
                'relative h-full cursor-pointer border-2 border-transparent bg-white transition-all duration-250 ease-out group-hover:scale-102 group-hover:border-primary-400 group-hover:shadow-card'
              )}
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-2xl text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-primary-700">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 text-xl text-gray-300 transition group-hover:text-primary-400"
              >
                →
              </span>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
