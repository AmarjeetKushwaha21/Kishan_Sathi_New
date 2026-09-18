import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { MdSpa } from 'react-icons/md';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const destination = isAuthenticated ? '/dashboard' : '/register';

  return (
    <section className="bg-white py-12 dark:bg-gray-950 sm:py-16">
      <div className="container-app">
        <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-6 py-10 shadow-card sm:px-12 sm:py-14">
          {/* Subtle Decorative Leaf Shapes on sides */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 -top-6 text-7xl text-primary-500/40 sm:text-8xl"
          >
            <MdSpa />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-6 text-7xl text-primary-500/40 sm:text-8xl"
          >
            <MdSpa />
          </div>

          <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {t('ctaHeading', 'Join Kishan Sathi Today')}
              </h2>
              <p className="mt-2 text-sm text-primary-100 sm:text-base">
                {t(
                  'ctaSubtitle',
                  'Be part of a smarter, stronger and greener India.'
                )}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to={destination}
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-primary-700 shadow-md transition-all hover:bg-primary-50 active:bg-white"
              >
                <span>{t('ctaButton', 'Get Started →')}</span>
                <FiArrowRight className="text-base" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
