import { useState } from 'react';
import { FiAlertTriangle, FiSettings, FiShield } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import Toggle from '@/components/farmer/Toggle';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSettings() {
  const { settings } = useAdmin();
  const [values, setValues] = useState(() => {
    const initial = {};
    settings.forEach((section) => {
      section.items.forEach((item) => {
        initial[item.key] = item.value;
      });
    });
    return initial;
  });

  function set(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <PageTransition>
      <AdminHeader title="Settings" subtitle="Platform configuration and moderation" showBack status="Admin" />
      <AdminTabs />

      <div className="mx-auto max-w-3xl space-y-5">
        {settings.map((section) => (
          <Card key={section.id} variant="soft" className="p-4 sm:p-5">
            <h3 className="mb-1 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              {section.id === 'Security & moderation' ? <FiShield className="text-primary-600" aria-hidden="true" /> : <FiSettings className="text-primary-600" aria-hidden="true" />}
              {section.section}
            </h3>
            <ul className="mt-3 divide-y divide-gray-100">
              {section.items.map((item) => (
                <li key={item.key} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    {item.desc && <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>}
                  </div>
                  {item.type === 'select' ? (
                    <select
                      aria-label={item.label}
                      className="focus-ring cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700"
                      value={values[item.key]}
                      onChange={(e) => set(item.key, e.target.value)}
                    >
                      {item.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <Toggle
                      checked={Boolean(values[item.key])}
                      onChange={(value) => set(item.key, value)}
                      label={item.label}
                    />
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Card variant="soft" className="p-4 sm:p-5">
          <h3 className="mb-2 flex items-center gap-2 font-display text-base font-semibold text-red-600">
            <FiAlertTriangle aria-hidden="true" /> Danger zone
          </h3>
          <p className="mb-3 text-sm text-gray-500">
            These actions affect the entire platform. Admin two-factor authentication is required to confirm.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Clear cache</Button>
            <Button variant="danger">Reset platform demo data</Button>
          </div>
        </Card>

        <p className="text-xs leading-relaxed text-gray-400">
          Configuration changes are saved on this device for the demo. In production these map to backend feature flags
          and are logged in the audit trail.
        </p>
      </div>
    </PageTransition>
  );
}