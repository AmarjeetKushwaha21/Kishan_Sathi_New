import { FiCpu, FiTrendingUp } from 'react-icons/fi';
import { MdSpa, MdOutlineVerifiedUser, MdAccountBalance } from 'react-icons/md';
import { useLanguage } from '@/context/LanguageContext';
import { SproutIllustration } from './LandingIllustrations';

export default function AboutSection() {
  const { t } = useLanguage();

  const badges = [
    { id: 'tech', label: t('pillTech', 'Powered by Technology'), icon: FiCpu },
    { id: 'experts', label: t('pillExperts', 'Guided by Experts'), icon: MdOutlineVerifiedUser },
    { id: 'markets', label: t('pillMarkets', 'Connected to Markets'), icon: FiTrendingUp },
    { id: 'gov', label: t('pillGov', 'Linked with Government'), icon: MdAccountBalance },
    { id: 'green', label: t('pillGreen', 'Built for a Greener India'), icon: MdSpa },
  ];

  return (
    <section id="about" className="scroll-mt-20 bg-white py-12 dark:bg-gray-950 sm:py-16">
      <div className="container-app">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Farmer Portrait & Quote matching visual reference */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-primary-100 bg-primary-50/50 p-3 shadow-soft dark:border-gray-800 dark:bg-gray-900">
              <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-80">
                <img
                  src="/assets/farmer-morning.jpg"
                  alt="Indian farmer standing proudly in lush agricultural field during early morning golden sunrise"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                {/* Overlay Quote Badge */}
                <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 p-3.5 shadow-md backdrop-blur-sm dark:bg-gray-900/95">
                  <p className="font-display text-sm font-bold italic leading-snug text-primary-800 dark:text-primary-300 sm:text-base">
                    {t(
                      'aboutQuote',
                      '“Technology for today’s farmers. A greener tomorrow for India.”'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and 5 Badges */}
          <div className="lg:col-span-7">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                  {t('aboutEyebrow', 'ABOUT US')}
                </span>
                <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  {t('aboutHeading', 'About Kishan Sathi')}
                </h2>
              </div>
              <div className="hidden sm:block">
                <SproutIllustration className="h-16 w-16 drop-shadow-sm" />
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              {t(
                'aboutParagraph',
                'Kishan Sathi is a digital agriculture platform that connects farmers, technology, experts, markets and government services — all in one place. Our mission is to empower farmers with the right information, better opportunities and continuous support for a more prosperous and sustainable India.'
              )}
            </p>

            {/* Feature Highlight Badges / Pills */}
            <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-50/80 px-3.5 py-2 text-xs font-semibold text-primary-800 shadow-sm transition-all hover:bg-primary-100 dark:border-primary-900 dark:bg-primary-950/60 dark:text-primary-300 sm:text-sm"
                  >
                    <Icon className="text-base text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
