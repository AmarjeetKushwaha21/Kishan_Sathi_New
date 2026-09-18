import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export default function PublicHero({
  title,
  subtitle,
  primaryLabel = 'Get Started',
  primaryTo = '/register',
  secondaryLabel = 'Log in',
  secondaryTo = '/login',
  illustration,
  bg = 'bg-gradient-to-b from-primary-50 via-primary-100/40 to-white dark:from-[#0c1322] dark:via-[#0f1a2c] dark:to-[#0a0f1e]',
}) {
  return (
    <section
      className={cn('relative overflow-hidden py-16 sm:py-24', bg)}
      aria-label={title}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full bg-accent-300/20 blur-3xl"
      />

      <div className="container-app relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mx-auto mt-5 max-w-xl text-base text-gray-600 sm:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to={primaryTo} className="focus-ring w-full rounded-xl sm:w-auto">
              <Button size="lg" fullWidth className="sm:w-auto">
                {primaryLabel}
              </Button>
            </Link>
            {secondaryLabel && (
              <Link to={secondaryTo} className="focus-ring w-full rounded-xl sm:w-auto">
                <Button size="lg" variant="outline" fullWidth className="sm:w-auto">
                  {secondaryLabel}
                </Button>
              </Link>
            )}
          </motion.div>

          {illustration && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              aria-hidden="true"
              className="mx-auto mt-14 max-w-3xl"
            >
              {illustration}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
