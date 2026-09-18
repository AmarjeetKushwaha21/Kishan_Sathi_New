import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdSpa } from 'react-icons/md';

import { APP } from '@/constants/app';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/', { replace: true }), 2600);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-primary-100/70 to-white px-6 text-center dark:from-[#0c1322] dark:via-[#0f1a2c] dark:to-[#0a0f1e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-300/30 blur-3xl"
      />

      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 text-5xl text-white shadow-card"
        aria-hidden="true"
      >
        <MdSpa />
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="font-display text-3xl font-bold text-gray-900 sm:text-4xl"
      >
        {APP.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-3 max-w-xs text-sm text-gray-600 sm:max-w-sm"
      >
        {APP.tagline}
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ delay: 1.4, duration: 1.2, repeat: Infinity }}
        className="mt-10 h-1.5 w-24 overflow-hidden rounded-full bg-primary-100"
        aria-hidden="true"
      >
        <motion.span
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-full w-1/2 rounded-full bg-primary-500"
        />
      </motion.span>
    </div>
  );
}