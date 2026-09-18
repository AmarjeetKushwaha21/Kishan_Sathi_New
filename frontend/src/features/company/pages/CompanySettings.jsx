import { useState } from 'react';
import { FiUser, FiBell, FiGlobe, FiMoon, FiShield, FiCheck } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function CompanySettings() {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const { theme, toggle } = useTheme();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoEscrow, setAutoEscrow] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Company Settings & Preferences
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Customize language, appearance, procurement alerts and security controls.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-800 dark:bg-green-950/60 dark:text-green-300">
          <FiCheck className="text-base" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Global Language Setting */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
            <FiGlobe className="text-base" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
              Platform Language
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Synchronized globally across all Kishan Sathi portals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-800 dark:bg-primary-950/70 dark:text-primary-300'
                    : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <span className="text-xs font-bold">{lang.nativeName}</span>
                <span className="text-[10px] text-gray-400">{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dark Mode Theme Setting */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
              <FiMoon className="text-base" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
                Display Theme
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Current theme: <strong className="capitalize">{theme} Mode</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggle}
            className="rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-soft hover:bg-primary-700"
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>

      {/* Procurement & Notification Preferences */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
            <FiBell className="text-base" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
              Procurement Alert Preferences
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Configure notifications for bid acceptances and transport milestones
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100 text-xs text-gray-700 dark:divide-gray-800 dark:text-gray-300">
          <div className="flex items-center justify-between py-3">
            <span>Email alerts on bid acceptance and order confirmations</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <span>SMS & WhatsApp tracking alerts for active truck shipments</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <span>Automatic corporate escrow release upon destination weighbridge verification</span>
            <input
              type="checkbox"
              checked={autoEscrow}
              onChange={(e) => setAutoEscrow(e.target.checked)}
              className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Security & Authentication */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
            <FiShield className="text-base" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
              Corporate Account Security
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Two-factor authentication and authorized procurement signatory controls
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <p>
            Current Status: <strong>Corporate 2FA Active (SMS OTP + Corporate Email)</strong>
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            Password last rotated: 30 days ago.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-primary-700"
        >
          Save All Preferences
        </button>
      </div>
    </div>
  );
}
