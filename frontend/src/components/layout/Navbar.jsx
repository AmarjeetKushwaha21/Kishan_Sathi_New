import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { MdSpa } from 'react-icons/md';

import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isCompany, isFarmer } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('navHome', 'Home'), href: '/#home', path: '/' },
    { label: t('navFeatures', 'Features'), href: '/#features', path: '/features' },
    { label: t('navAbout', 'About'), href: '/#about', path: '/about' },
    { label: t('navContact', 'Contact'), href: '/#contact', path: '/contact' },
  ];

  const farmerDestination = isAuthenticated && isFarmer ? '/dashboard' : '/login/farmer';
  const companyDestination = isAuthenticated && isCompany ? '/company/dashboard' : '/login/company';
  const profileDestination = isAuthenticated
    ? isCompany
      ? '/company/profile'
      : '/dashboard/profile'
    : '/login/farmer';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || mobileMenuOpen
          ? 'border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/95'
          : 'border-b border-transparent bg-white/80 backdrop-blur-sm dark:bg-gray-950/80'
      )}
    >
      <div className="container-app flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="focus-ring group flex items-center gap-2.5 rounded-xl transition"
          aria-label="Kishan Sathi Home"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xl text-white shadow-soft transition-transform group-hover:scale-105">
            <MdSpa />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Kishan Sathi
            </span>
            <span className="text-[10px] font-medium leading-none text-primary-700 dark:text-primary-400">
              Farmers Today, A Greener Tomorrow
            </span>
          </div>
        </NavLink>

        {/* Center Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full border border-gray-100 bg-gray-50/80 px-3 py-1.5 dark:border-gray-800 dark:bg-gray-900/60 lg:flex"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150',
                item.href === '/#home' && location.pathname === '/' && !location.hash
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300'
                  : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions Toolbar */}
        <div className="hidden items-center gap-2 sm:flex sm:gap-2.5">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Farmer Role Button */}
          <NavLink
            to={farmerDestination}
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary-700 active:bg-primary-800 sm:px-3.5 sm:text-sm"
            aria-label="Farmer Portal"
          >
            <FiHome className="text-sm sm:text-base text-white" aria-hidden="true" />
            <span>{t('navFarmer', 'Farmer')}</span>
          </NavLink>

          {/* Company / Buyer Button */}
          <NavLink
            to={companyDestination}
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary-700 active:bg-primary-800 sm:px-3.5 sm:text-sm"
            aria-label="Company or Buyer Portal"
          >
            <FiBriefcase className="text-sm sm:text-base text-white" aria-hidden="true" />
            <span className="hidden md:inline">{t('navCompany', 'Company / Buyer')}</span>
            <span className="md:hidden">Company</span>
          </NavLink>

          {/* Theme Toggle */}
          <ThemeToggle className="!h-9 !w-9 !rounded-xl !border !border-primary-200/80 !bg-primary-50/80 !text-primary-700 shadow-soft transition-all duration-200 hover:!bg-primary-100 hover:!text-primary-800 dark:!border-primary-800/60 dark:!bg-primary-950/50 dark:!text-primary-300 dark:hover:!bg-primary-900/60 sm:!h-10 sm:!w-10" />

          {/* Profile / User */}
          <NavLink
            to={profileDestination}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-base text-white shadow-soft transition-all duration-200 hover:bg-primary-700 active:bg-primary-800 sm:h-10 sm:w-10 sm:text-lg"
            aria-label="Profile or Sign in"
            title={isAuthenticated ? 'My Profile' : 'Sign in / Profile'}
          >
            <FiUser aria-hidden="true" />
          </NavLink>
        </div>

        {/* Mobile controls: language + toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageSelector dropdownAlign="right" />
          <ThemeToggle className="!h-9 !w-9 !rounded-xl !border !border-primary-200/80 !bg-primary-50/80 !text-primary-700 dark:!border-primary-800/60 dark:!bg-primary-950/50 dark:!text-primary-300" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white px-4 py-5 shadow-lg dark:border-gray-800 dark:bg-gray-950 sm:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-700 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-primary-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-gray-100 pt-4 dark:border-gray-800">
            <NavLink
              to={farmerDestination}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
            >
              <FiHome aria-hidden="true" />
              <span>{t('navFarmer', 'Farmer')}</span>
            </NavLink>

            <NavLink
              to={companyDestination}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
            >
              <FiBriefcase aria-hidden="true" />
              <span>{t('navCompany', 'Company / Buyer')}</span>
            </NavLink>

            <NavLink
              to={profileDestination}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950/60 dark:text-primary-300"
            >
              <FiUser aria-hidden="true" />
              <span>{isAuthenticated ? 'My Profile' : 'Sign In'}</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
