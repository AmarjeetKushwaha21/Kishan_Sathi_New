import { FiMoon, FiSun } from 'react-icons/fi';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/utils/cn';

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'focus-ring relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-lg text-gray-600 transition hover:bg-primary-50 hover:text-primary-700',
        isDark && 'text-gray-300 hover:bg-gray-800 hover:text-accent-300',
        className
      )}
    >
      <FiSun
        aria-hidden="true"
        className={cn(
          'absolute transition-all duration-300',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        )}
      />
      <FiMoon
        aria-hidden="true"
        className={cn(
          'absolute transition-all duration-300',
          isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )}
      />
    </button>
  );
}