import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { BOTTOM_NAV_ITEMS } from '@/constants/nav';
import { cn } from '@/utils/cn';

export default memo(function BottomNav() {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="flex items-stretch justify-around">
        {BOTTOM_NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'focus-ring flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition',
                  isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-8 w-12 items-center justify-center rounded-full text-lg transition',
                      isActive && 'bg-primary-100'
                    )}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});