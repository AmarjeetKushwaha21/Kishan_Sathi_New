import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckSquare } from 'react-icons/fi';

export default function NotificationHeader({ title = 'Notification Center', subtitle, unreadCount = 0, onMarkAllRead, showBack = false }) {
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      {showBack && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-600 transition hover:text-primary-600"
        >
          <FiArrowLeft aria-hidden="true" />
        </button>
      )}

      <div className="min-w-0 flex-1">
        <h2 className="truncate font-display text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {unreadCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-bold text-primary-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-60" aria-hidden="true" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" aria-hidden="true" />
            </span>
            {unreadCount} unread
          </span>
        )}
        {onMarkAllRead && unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-primary-300 bg-white px-3 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50"
          >
            <FiCheckSquare aria-hidden="true" /> Mark all read
          </button>
        )}
      </div>
    </div>
  );
}