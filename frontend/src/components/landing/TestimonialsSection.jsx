import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import testimonialService from '@/services/testimonialService';

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    testimonialService.getTestimonials().then(setTestimonials);
  }, []);

  return (
    <section className="bg-white py-12 dark:bg-gray-950 sm:py-16">
      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {t('testimonialsEyebrow', 'WHAT PEOPLE SAY (DEMO TESTIMONIALS)')}
          </span>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('testimonialsHeading', 'Real Stories. Real Impact.')}
          </h2>
          <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400 sm:text-sm">
            {t(
              'testimonialsNotice',
              'Demo testimonials — Replace with verified farmer feedback after launch.'
            )}
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="flex flex-col justify-between rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all hover:border-primary-200 dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Quote */}
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author Info & Rating */}
              <div className="mt-6 flex items-center gap-3.5 border-t border-gray-100 pt-4 dark:border-gray-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-11 w-11 rounded-full object-cover shadow-sm ring-2 ring-primary-100 dark:ring-primary-900"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-sm font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {item.role}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} className="fill-current text-xs" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
