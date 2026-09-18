import { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/utils/cn';

export default function LanguageSelector({ className, dropdownAlign = 'right' }) {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-soft transition-colors hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 sm:px-3.5 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <FiGlobe className="text-sm sm:text-base text-white" aria-hidden="true" />
        <span>{activeLang.nativeName || activeLang.name}</span>
        <FiChevronDown
          className={cn('text-xs transition-transform duration-200', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={cn(
            'absolute z-50 mt-2 max-h-72 w-48 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl transition dark:border-gray-800 dark:bg-gray-900',
            dropdownAlign === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Select Language
          </div>
          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition sm:text-sm',
                  isSelected
                    ? 'bg-primary-50 font-semibold text-primary-700 dark:bg-primary-950/60 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <span>{lang.nativeName}</span>
                <span className="text-[11px] text-gray-400 dark:text-gray-400">{lang.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
