import { motion } from 'framer-motion';
import { MdSpa } from 'react-icons/md';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { useLanguage } from '@/context/LanguageContext';
import { TractorIllustration, FarmerHeroSilhouette } from './LandingIllustrations';

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pb-14 pt-28 dark:bg-gray-950 sm:pb-20 sm:pt-36"
    >
      {/* Subtle background agriculture accents (solid light green, no multi-color gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary-50 opacity-80 dark:bg-primary-950/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-primary-50 opacity-80 dark:bg-primary-950/20"
      />

      <div className="container-app relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Hero Headings */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            <span>{t('heroTitle', 'Empowering Farmers,')}</span>{' '}
            <span className="block text-primary-600 dark:text-primary-400">
              {t('heroTitleHighlight', 'Enabling a Better Tomorrow')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            {t(
              'heroSubtitle',
              'AI-powered insights, real-time weather, market prices, expert guidance and direct business opportunities — all in one place.'
            )}
          </motion.p>

          {/* Strong Quote Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary-100 bg-primary-50/70 p-6 shadow-sm dark:border-primary-900/50 dark:bg-primary-950/40 sm:p-7"
          >
            <div className="flex justify-center text-primary-600 dark:text-primary-400">
              <BiSolidQuoteAltLeft className="text-3xl" aria-hidden="true" />
            </div>
            <blockquote className="mt-2 text-base font-bold text-gray-900 dark:text-white sm:text-lg">
              {language === 'hi'
                ? '“जो हाथ देश का पेट भरते हैं, उन्हें सशक्त बनाना भारत के भविष्य को सशक्त बनाना है।”'
                : '“Empower the hands that feed the nation, and you empower the future of India.”'}
            </blockquote>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300 sm:text-sm">
              <MdSpa className="text-base text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span>{t('heroQuoteStep', 'A step towards a smarter, stronger and greener India.')}</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Graphic Elements (Tractor & Farmer with Badges) matching reference design */}
        <div className="relative mt-8 grid grid-cols-1 items-center justify-between gap-6 md:grid-cols-2 md:gap-12">
          {/* Left: Sustainable Farming Tag + Tractor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <div className="text-left font-display font-extrabold italic text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-tight text-primary-700 dark:text-primary-300">
                Sustainable Farming,
              </p>
              <p className="text-xl text-gray-900 dark:text-white">Stronger India</p>
            </div>
            <TractorIllustration className="h-24 w-36 sm:h-28 sm:w-44 drop-shadow-sm" />
          </motion.div>

          {/* Right: Better Farms Tag + Farmer Hero */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex items-center justify-center gap-4 md:justify-end"
          >
            <FarmerHeroSilhouette className="h-24 w-28 sm:h-28 sm:w-32 drop-shadow-sm" />
            <div className="text-left font-display font-extrabold italic text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-tight text-primary-700 dark:text-primary-300">
                Better Farms,
              </p>
              <p className="text-xl text-gray-900 dark:text-white">Brighter Tomorrow</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
