import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanyHeader from './CompanyHeader';
import CompanySidebar from './CompanySidebar';

export default function CompanyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
      <CompanyHeader onToggleSidebar={() => setSidebarOpen((o) => !o)} />

      <div className="flex flex-1 overflow-hidden">
        <CompanySidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main id="company-main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
