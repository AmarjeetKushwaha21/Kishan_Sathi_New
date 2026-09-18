import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import platformService from '@/services/platformService';
import { FarmerIllustration, CompanyIllustration } from './LandingIllustrations';

export default function RoleSelection() {
  const { isAuthenticated, isCompany, isFarmer } = useAuth();
  const { t } = useLanguage();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    platformService.getRoles().then(setRoles);
  }, []);

  const farmerLink = '/login/farmer';
  const companyLink = '/login/company';

  return (
    <section className="scroll-mt-20 bg-white py-12 dark:bg-gray-950 sm:py-16">
      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {t('roleEyebrow', 'CHOOSE YOUR ROLE')}
          </span>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('roleHeading', 'Join the Movement for a Greener India')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            {t(
              'roleSubtitle',
              'Whether you grow food or power the supply chain — Kishan Sathi is for you.'
            )}
          </p>
        </div>

        {/* Two Large Role Cards */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
          {/* Card 1: Farmer */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col justify-between rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
          >
            <Link to={farmerLink} className="flex flex-col items-center gap-5 sm:flex-row sm:items-start text-left">
              <div className="shrink-0">
                <FarmerIllustration className="h-28 w-28 drop-shadow-sm transition-transform duration-200 group-hover:scale-105 sm:h-32 sm:w-32" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors dark:text-white dark:group-hover:text-primary-400">
                  {t('farmerTitle', 'Farmer')}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t(
                    'farmerDesc',
                    'Get AI crop advice, real-time weather updates, market prices, access to agriculture store, government schemes and expert support.'
                  )}
                </p>
              </div>
            </Link>

            <div className="mt-6 pt-2">
              <Link
                to={farmerLink}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary-700 active:bg-primary-800"
              >
                <span>{t('continueFarmer', 'Continue as Farmer →')}</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Company / Buyer */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col justify-between rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
          >
            <Link to={companyLink} className="flex flex-col items-center gap-5 sm:flex-row sm:items-start text-left">
              <div className="shrink-0">
                <CompanyIllustration className="h-28 w-28 drop-shadow-sm transition-transform duration-200 group-hover:scale-105 sm:h-32 sm:w-32" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors dark:text-white dark:group-hover:text-primary-400">
                  {t('companyTitle', 'Company / Buyer')}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t(
                    'companyDesc',
                    'Find quality crops, connect with farmers, manage procurement, place bids and orders, and build your supply chain.'
                  )}
                </p>
              </div>
            </Link>

            <div className="mt-6 pt-2">
              <Link
                to={companyLink}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary-700 active:bg-primary-800"
              >
                <span>{t('continueCompany', 'Continue as Company →')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
