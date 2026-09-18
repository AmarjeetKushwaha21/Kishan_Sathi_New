import { NavLink } from 'react-router-dom';
import { FiBarChart2, FiBell, FiBox, FiBriefcase, FiAward, FiFileText, FiHome, FiSettings, FiShoppingBag, FiShoppingCart, FiUser, FiUsers } from 'react-icons/fi';

import { ADMIN_NAV } from '@/data/mock/admin';
import { cn } from '@/utils/cn';

const ICON_MAP = {
  FiHome,
  FiUsers,
  FiUser,
  FiBriefcase,
  FiAward,
  FiBox,
  FiShoppingCart,
  FiShoppingBag,
  FiFileText,
  FiBarChart2,
  FiBell,
  FiSettings,
};

export default function AdminTabs() {
  return (
    <nav aria-label="Admin sections" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {ADMIN_NAV.map((item) => {
        const Icon = ICON_MAP[item.icon] || FiHome;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition',
                isActive
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-700'
              )
            }
          >
            <Icon aria-hidden="true" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}