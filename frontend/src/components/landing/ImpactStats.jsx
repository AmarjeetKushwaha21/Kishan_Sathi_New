import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiMapPin, FiHeart, FiFileText } from 'react-icons/fi';
import { MdOutlineCorporateFare, MdSpa } from 'react-icons/md';
import { useLanguage } from '@/context/LanguageContext';
import platformService from '@/services/platformService';

const STAT_ICONS = {
  farmers: FiUsers,
  building: MdOutlineCorporateFare,
  sprout: MdSpa,
  mapPin: FiMapPin,
  expert: FiHeart,
  report: FiFileText,
};

export default function ImpactStats() {
  const { t } = useLanguage();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    platformService.getStats().then(setStats);
  }, []);

  return (
    <section className="bg-white py-12 dark:bg-gray-950 sm:py-16">
      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {t('impactEyebrow', 'OUR IMPACT (DEMO STATISTICS)')}
          </span>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('impactHeading', 'Growing Together for a Stronger India')}
          </h2>
          <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400 sm:text-sm">
            {t(
              'impactDemoLabel',
              'These are demo numbers highlighting our vision for impact. Demo statistics — placeholder values for prototype'
            )}
          </p>
        </div>

        {/* 6 Statistics Cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, idx) => {
            const Icon = STAT_ICONS[stat.icon] || FiUsers;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-5 text-center shadow-soft transition-all hover:border-primary-200 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
                  <Icon aria-hidden="true" />
                </div>
                <dd className="font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {t(stat.labelKey, stat.defaultLabel)}
                </dt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
