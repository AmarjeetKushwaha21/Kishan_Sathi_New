import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiBell, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import { MdSpa } from 'react-icons/md';

import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CompanyHeader({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login/company', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="text-lg" />
        </button>

        {/* Brand Logo & Corporate Badge */}
        <Link to="/company/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-xl text-white shadow-soft">
            <MdSpa />
          </div>
          <div className="hidden sm:flex sm:flex-col">
            <span className="font-display text-base font-bold leading-tight text-gray-900 dark:text-white">
              Kishan Sathi
            </span>
            <span className="text-[10px] font-semibold text-primary-700 dark:text-primary-400">
              Company / Institutional Buyer
            </span>
          </div>
        </Link>
      </div>

      {/* Right Controls: Global Language Selector, Theme, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Language Selector */}
        <LanguageSelector dropdownAlign="right" />

        {/* Dark Mode Toggle */}
        <ThemeToggle className="!h-9 !w-9 !rounded-xl !border !border-primary-200/80 !bg-primary-50/80 !text-primary-700 dark:!border-primary-800/60 dark:!bg-primary-950/50 dark:!text-primary-300" />

        {/* Notifications Icon with Badge */}
        <Link
          to="/company/notifications"
          className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          title="Company Notifications"
        >
          <FiBell className="text-base" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[9px] font-bold text-white">
            2
          </span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((o) => !o)}
            className="focus-ring flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-expanded={profileOpen}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
              <FiBriefcase />
            </div>
            <span className="hidden text-xs font-semibold text-gray-800 dark:text-gray-200 md:inline">
              {user?.companyName || user?.fullName || 'Corporate Partner'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-800">
                <p className="truncate text-xs font-bold text-gray-900 dark:text-white">
                  {user?.companyName || 'AgriCorp Global B2B'}
                </p>
                <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                  {user?.email || 'company@kishansathi.demo'}
                </p>
              </div>

              <div className="mt-1 space-y-1">
                <Link
                  to="/company/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <FiUser className="text-sm" />
                  <span>Company Profile</span>
                </Link>
                <Link
                  to="/company/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <FiBriefcase className="text-sm" />
                  <span>Procurement Settings</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <FiLogOut className="text-sm" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
