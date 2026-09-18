import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiSearch,
  FiShoppingBag,
  FiFileText,
  FiDollarSign,
  FiTruck,
  FiMessageSquare,
  FiUser,
  FiBell,
  FiSettings,
  FiX,
  FiCheckSquare,
} from 'react-icons/fi';
import { cn } from '@/utils/cn';

const SIDEBAR_SECTIONS = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', to: '/company/dashboard', icon: FiGrid },
    ],
  },
  {
    title: 'PROCUREMENT',
    items: [
      { label: 'Find Crops', to: '/company/crops', icon: FiSearch },
      { label: 'Marketplace', to: '/company/marketplace', icon: FiShoppingBag },
      { label: 'My Bids', to: '/company/bids', icon: FiCheckSquare },
      { label: 'Purchase Orders', to: '/company/orders', icon: FiFileText },
    ],
  },
  {
    title: 'BUSINESS',
    items: [
      { label: 'Transactions', to: '/company/transactions', icon: FiDollarSign },
      { label: 'Logistics', to: '/company/logistics', icon: FiTruck },
      { label: 'Messages', to: '/company/messages', icon: FiMessageSquare },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { label: 'Company Profile', to: '/company/profile', icon: FiUser },
      { label: 'Notifications', to: '/company/notifications', icon: FiBell },
      { label: 'Settings', to: '/company/settings', icon: FiSettings },
    ],
  },
];

export default function CompanySidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white shadow-soft transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6 dark:border-gray-800 lg:hidden">
          <span className="font-display text-sm font-bold text-gray-900 dark:text-white">
            Company Navigation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {SIDEBAR_SECTIONS.map((sec) => (
            <div key={sec.title} className="mb-6 last:mb-2">
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {sec.title}
              </span>
              <ul className="mt-2 space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={({ isActive }) =>
                          cn(
                            'focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-150 sm:text-sm',
                            isActive
                              ? 'bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-white'
                          )
                        }
                      >
                        <Icon className="text-base shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Corporate Status Card at bottom */}
        <div className="border-t border-gray-100 p-4 dark:border-gray-800">
          <div className="rounded-xl border border-primary-100 bg-primary-50/70 p-3 text-xs dark:border-primary-900 dark:bg-primary-950/40">
            <p className="font-bold text-primary-800 dark:text-primary-300">
              Verified B2B Buyer
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
              Escrow Protection Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
