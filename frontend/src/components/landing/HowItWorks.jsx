import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      number: '1',
      titleKey: 'step1Title',
      defaultTitle: 'Create Account',
      descKey: 'step1Desc',
      defaultDesc: 'Sign up as a farmer or buyer and complete your profile.',
      image: '/assets/how-it-works/step-account.jpg',
    },
    {
      id: 2,
      number: '2',
      titleKey: 'step2Title',
      defaultTitle: 'Explore Tools',
      descKey: 'step2Desc',
      defaultDesc: 'Use AI, weather, market prices and more.',
      image: '/assets/how-it-works/step-tools.jpg',
    },
    {
      id: 3,
      number: '3',
      titleKey: 'step3Title',
      defaultTitle: 'Take Action',
      descKey: 'step3Desc',
      defaultDesc: 'Get advice, buy inputs, sell your produce.',
      image: '/assets/how-it-works/step-action.jpg',
    },
    {
      id: 4,
      number: '4',
      titleKey: 'step4Title',
      defaultTitle: 'Grow Together',
      descKey: 'step4Desc',
      defaultDesc: 'Increase your income and build a better future.',
      image: '/assets/how-it-works/step-grow.jpg',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-16 dark:bg-gray-950 sm:pt-20">
      {/* Decorative leaf branch in top right corner */}
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 opacity-40 dark:opacity-20" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" className="h-full w-full">
          <path d="M160,0 C120,40 100,80 80,120" stroke="#15803D" strokeWidth="2.5" />
          <path d="M120,25 C100,15 85,25 95,45 C115,45 125,35 120,25 Z" fill="#16A34A" />
          <path d="M95,60 C75,50 65,65 75,80 C95,80 105,70 95,60 Z" fill="#22C55E" />
          <path d="M80,115 C60,105 55,125 70,135 C85,135 90,125 80,115 Z" fill="#16A34A" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 sm:text-sm">
            {t('howEyebrow', 'HOW KISHAN SATHI WORKS')}
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            A Simple Journey Towards a <span className="block text-emerald-600 dark:text-emerald-400">Better Harvest</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            {t(
              'howSubtitle',
              'From information to income — everything you need, step by step.'
            )}
          </p>

          {/* Center Leaf Divider */}
          <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
            <span className="h-[1.5px] w-8 bg-emerald-200 dark:bg-emerald-800" />
            <span className="text-lg">🌿</span>
            <span className="h-[1.5px] w-8 bg-emerald-200 dark:bg-emerald-800" />
          </div>
        </div>

        {/* 4 Connected Cards in a Flow */}
        <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-emerald-100/90 bg-white p-6 shadow-soft transition-all duration-300 hover:border-emerald-300 hover:shadow-card dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-700/60 min-h-[230px] sm:min-h-[250px]"
            >
              {/* Top Row: Step Number Circle & 3D Illustration */}
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-xs">
                  {step.number}
                </div>

                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50/40 p-1 dark:bg-emerald-950/20">
                  <img
                    src={step.image}
                    alt={step.defaultTitle}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text Section: Step Title & Step Description */}
              <div className="mt-4 flex flex-1 flex-col justify-end">
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                  {t(step.titleKey, step.defaultTitle)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
                  {t(step.descKey, step.defaultDesc)}
                </p>
              </div>

              {/* Connecting Circle Arrow between cards on desktop */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3.5 top-1/2 z-20 hidden -translate-y-1/2 lg:flex items-center justify-center"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs text-white shadow-md ring-4 ring-white dark:ring-gray-950">
                    <FiArrowRight />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Tagline Pill Banner */}
        <div className="relative z-10 mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-white/95 px-6 py-2.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900/60 dark:bg-gray-900/95 dark:text-emerald-300 sm:text-sm">
            <span className="text-emerald-600 dark:text-emerald-400">🌿</span>
            <span>{t('howTagline', '“Empowered Farmers. A Stronger, Greener India.”')}</span>
          </div>
        </div>
      </div>

      {/* Panoramic Agricultural Landscape Background at Bottom */}
      <div className="relative -mb-4 mt-8 w-full overflow-hidden sm:-mb-6 sm:mt-10">
        <img
          src="/assets/how-it-works/landscape-bg.jpg"
          alt="Farmland Landscape with Tractor and Hills"
          className="h-36 w-full object-cover object-bottom sm:h-48 md:h-56 lg:h-64"
          loading="lazy"
        />
        {/* Soft top gradient to blend landscape into the section background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent dark:from-gray-950" />
      </div>
    </section>
  );
}
