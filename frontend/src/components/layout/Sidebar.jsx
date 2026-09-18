import { Link, NavLink } from 'react-router-dom';
import { FiLogOut, FiX } from 'react-icons/fi';

import Logo from '@/components/ui/Logo';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { SIDEBAR_NAV_SECTIONS } from '@/constants/nav';
import { useAuth } from '@/context/AuthContext';
import { useFarmer } from '@/context/FarmerContext';
import { useNotification } from '@/context/NotificationContext';
import { cn } from '@/utils/cn';

function NavItem({ item, onClick }) {
  const { icon: Icon, label, to, end } = item;
  const { unreadCount } = useNotification();
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'focus-ring group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition',
          isActive
            ? 'bg-primary-600 text-white shadow-soft'
            : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
        )
      }
    >
      <Icon className="text-lg" aria-hidden="true" />
      <span className="flex-1">{label}</span>
      {label === 'AI Assistant' && <Badge size="sm">New</Badge>}
      {to === '/dashboard/notifications' && unreadCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </NavLink>
  );
}

function SidebarContent({ onClose }) {
  const { user, logout } = useAuth();
  const { profile } = useFarmer();

  const displayName = user?.fullName || user?.name || profile?.fullName || 'Farmer';
  const displayPhone = user?.phone || profile?.phone || '+91 98765 43210';

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pb-6 pt-6">
        <Link
          to="/dashboard"
          onClick={onClose}
          className="focus-ring rounded-xl"
          aria-label="Kishan Sathi dashboard home"
        >
          <Logo size="sm" />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <FiX aria-hidden="true" className="text-lg" />
          </button>
        )}
      </div>

      <nav aria-label="Dashboard sections" className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        {SIDEBAR_NAV_SECTIONS.map((section) => (
          <div key={section.id}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavItem item={item} onClick={onClose} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-primary-50/60 p-3">
          <Link
            to="/dashboard/profile"
            onClick={onClose}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
            aria-label="Go to My Profile"
          >
            <Avatar name={displayName} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="truncate text-xs text-gray-500">{displayPhone}</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={logout}
            aria-label="Log out"
            title="Log out"
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ className }) {
  return (
    <aside
      className={cn('sticky top-0 hidden h-screen w-72 shrink-0 border-r border-gray-200 bg-white lg:block', className)}
    >
      <SidebarContent />
    </aside>
  );
}

export { SidebarContent };