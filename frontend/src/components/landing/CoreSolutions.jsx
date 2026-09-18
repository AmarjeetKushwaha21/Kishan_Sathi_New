import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSun, FiShoppingCart, FiUserCheck, FiArrowRight, FiCheck } from 'react-icons/fi';
import { MdSpa, MdAccountBalance } from 'react-icons/md';
import { FaHandshake } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import platformService from '@/services/platformService';

const ICON_MAP = {
  weather: FiSun,
  sprout: MdSpa,
  advisor: MdSpa,
  handshake: FaHandshake,
  store: FiShoppingCart,
  schemes: MdAccountBalance,
  expert: FiUserCheck,
};

export default function CoreSolutions() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    platformService.getSolutions().then(setSolutions);
  }, []);

  return (
    <section id="features" className="relative scroll-mt-20 overflow-hidden bg-white py-16 dark:bg-gray-950 sm:py-20">
      {/* Decorative leaf accents in the corners */}
      <div className="pointer-events-none absolute -left-10 top-0 h-64 w-64 opacity-20 dark:opacity-10" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-emerald-600">
          <path d="M20,180 C10,110 70,40 160,20 C150,90 90,170 20,180 Z" fill="currentColor" />
          <path d="M20,180 C70,120 120,70 160,20" stroke="white" strokeWidth="2.5" />
          <path d="M60,150 C80,135 100,130 115,125" stroke="white" strokeWidth="1.5" />
          <path d="M90,125 C110,110 130,105 140,100" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 scale-x-[-1] opacity-20 dark:opacity-10" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-emerald-600">
          <path d="M20,180 C10,110 70,40 160,20 C150,90 90,170 20,180 Z" fill="currentColor" />
          <path d="M20,180 C70,120 120,70 160,20" stroke="white" strokeWidth="2.5" />
          <path d="M60,150 C80,135 100,130 115,125" stroke="white" strokeWidth="1.5" />
          <path d="M90,125 C110,110 130,105 140,100" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
              <FiCheck />
            </span>
            <span>{t('solutionsEyebrow', 'OUR CORE SOLUTIONS')}</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Everything a Farmer Needs, <span className="text-primary-600 dark:text-primary-400">In One Place</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            {t(
              'solutionsSubtitle',
              'Smart tools and real opportunities to help farmers grow better, earn better and live better.'
            )}
          </p>
        </div>

        {/* 6 Cards in 3x2 Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || MdSpa;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-5 shadow-soft transition-all duration-300 hover:border-emerald-300 hover:shadow-card dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-700/60 sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
                  {/* Left Column: Details & Bullets */}
                  <div className="flex flex-col justify-between sm:col-span-7">
                    <div>
                      {/* Icon */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600 shadow-xs transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/60 dark:text-emerald-400 sm:h-12 sm:w-12 sm:text-2xl">
                        <IconComponent aria-hidden="true" />
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 font-display text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                        {t(item.titleKey, item.defaultTitle)}
                      </h3>

                      {/* Description */}
                      <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                        {t(item.descKey, item.defaultDesc)}
                      </p>

                      {/* 3 Bullets with Green Checks */}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-3.5 space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                                <FiCheck />
                              </span>
                              <span className="font-medium">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Action Pill Button */}
                    <div className="mt-5 pt-1">
                      <Link
                        to={
                          item.id === 'weather'
                            ? (isAuthenticated ? '/dashboard/weather' : '/login?redirect=/dashboard/weather')
                            : item.link
                        }
                        state={item.id === 'weather' ? { from: '/dashboard/weather' } : undefined}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary-700 active:scale-95"
                      >
                        <span>{item.btnText || 'Explore →'}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: 3D Art & Floating Badges */}
                  <div className="relative flex h-[210px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/40 sm:col-span-5 sm:h-[220px]">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.defaultTitle}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}

                    {/* 1. Custom Overlay for Weather Updates */}
                    {item.id === 'weather' && (
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <div className="rounded-xl border border-white/80 bg-white/95 p-2.5 shadow-md backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                            <span className="text-sm text-amber-500">☀️</span>
                            <span>28°C</span>
                            <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400">
                              Partly Cloudy
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-center gap-2.5 border-t border-gray-100 pt-1.5 text-[10px] font-semibold text-gray-600 dark:border-gray-800 dark:text-gray-300">
                            <div className="flex flex-col items-center">
                              <span className="text-[9px] text-gray-400">Mon</span>
                              <span>☀️</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[9px] text-gray-400">Tue</span>
                              <span>🌧️</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[9px] text-gray-400">Wed</span>
                              <span>🌧️</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. Custom Overlay for AI Crop Advisor */}
                    {item.id === 'advisor' && (
                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2.5">
                        <div className="self-start">
                          <div className="inline-flex items-center gap-1 rounded-full border border-amber-200/60 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 shadow-sm backdrop-blur-sm dark:bg-gray-900/90 dark:text-amber-300">
                            <span>🟤</span>
                            <span>Healthy Soil</span>
                          </div>
                        </div>
                        <div className="self-end">
                          <div className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shadow-sm backdrop-blur-sm dark:bg-gray-900/90 dark:text-emerald-300">
                            <span>🌿</span>
                            <span>Right Crop</span>
                          </div>
                        </div>
                        <div className="self-end">
                          <div className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 shadow-sm backdrop-blur-sm dark:bg-gray-900/90 dark:text-emerald-400">
                            <span>📊</span>
                            <span>Higher Yield</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Custom Overlay for Direct Sell */}
                    {item.id === 'direct-sell' && (
                      <div className="pointer-events-none absolute right-2 top-2.5 flex flex-col gap-1.5">
                        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-700/95 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <FiCheck className="text-[10px]" />
                          <span>No Middlemen</span>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-700/95 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <FiCheck className="text-[10px]" />
                          <span>Better Price</span>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-700/95 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <FiCheck className="text-[10px]" />
                          <span>Direct Trade</span>
                        </div>
                      </div>
                    )}

                    {/* 4. Custom Overlay for Agriculture Store */}
                    {item.id === 'store' && (
                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-2.5">
                        <div className="flex items-center justify-between gap-1 text-[9px] font-bold text-white">
                          <span className="rounded-md bg-amber-700/90 px-2 py-0.5 shadow-sm backdrop-blur-sm">
                            QUALITY HARVEST
                          </span>
                          <span className="rounded-md bg-emerald-700/90 px-2 py-0.5 shadow-sm backdrop-blur-sm">
                            ORGANIC
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 5. Custom Overlay for Government Schemes */}
                    {item.id === 'schemes' && (
                      <div className="pointer-events-none absolute bottom-2 right-2 top-2 flex flex-col justify-center gap-1.5">
                        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-700/95 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <span className="text-[11px]">🏛️</span>
                          <span>PM-KISAN</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-700/95 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <span className="text-[11px]">📋</span>
                          <span>Soil Health Card</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-700/95 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <span className="text-[11px]">💧</span>
                          <span>Drip Irrigation</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-700/95 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                          <span className="text-[11px]">🛡️</span>
                          <span>Crop Insurance</span>
                        </div>
                      </div>
                    )}

                    {/* 6. Custom Overlay for Expert Consultation */}
                    {item.id === 'expert' && (
                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2">
                        <div className="self-end">
                          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                            <span>💬</span>
                            <span>Expert Advice</span>
                          </div>
                        </div>
                        <div className="rounded-xl border border-white/60 bg-white/95 p-1.5 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
                          <div className="grid grid-cols-4 gap-1 text-center text-[8px] font-bold text-gray-700 dark:text-gray-300">
                            <div className="flex flex-col items-center">
                              <span className="text-[10px]">🌿</span>
                              <span>Crop Care</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[10px]">🧪</span>
                              <span>Soil Test</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[10px]">🛡️</span>
                              <span>Disease</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[10px]">📈</span>
                              <span>Yield</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Tagline Pill */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-6 py-2.5 text-xs font-semibold text-emerald-800 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300 sm:text-sm">
            <span className="text-emerald-600 dark:text-emerald-400">🌿</span>
            <span>“Together for a stronger, greener and self-reliant India.”</span>
            <span className="text-emerald-600 dark:text-emerald-400">🌿</span>
          </div>
        </div>
      </div>
    </section>
  );
}
