import { FiSettings, FiShield, FiUser } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Button from '@/components/ui/Button';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import SectionCard from '@/components/farmer/SectionCard';
import Toggle from '@/components/farmer/Toggle';
import { useFarmer } from '@/context/FarmerContext';
import { SETTINGS_SECTIONS } from '@/data/mock/farmerProfile';

import { useLanguage } from '@/context/LanguageContext';

export default function Settings() {
  const { settings, setSetting, resetProfile } = useFarmer();
  const { setLanguage } = useLanguage();

  return (
    <PageTransition>
      <FarmerHeader title="Settings" subtitle="Language, notifications and preferences" showBack status="Saved" />

      <div className="mx-auto max-w-3xl space-y-5">
        {SETTINGS_SECTIONS.map((section) => (
          <SectionCard key={section.id} title={section.title} icon={section.id === 'language' ? FiUser : section.id === 'privacy' ? FiShield : FiSettings}>
            <ul className="divide-y divide-gray-100">
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
                      value={settings[item.key]}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSetting(item.key, val);
                        if (item.key === 'language') {
                          const langMap = {
                            English: 'en',
                            Hindi: 'hi',
                            Punjabi: 'pa',
                            Marathi: 'mr',
                            Bengali: 'bn',
                            Telugu: 'te',
                            Tamil: 'ta',
                            Gujarati: 'gu',
                            Kannada: 'kn',
                            Malayalam: 'ml',
                          };
                          if (langMap[val]) setLanguage(langMap[val]);
                        }
                      }}
                    >
                      {item.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <Toggle
                      checked={Boolean(settings[item.key])}
                      onChange={(value) => setSetting(item.key, value)}
                      label={item.label}
                    />
                  )}
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}

        <SectionCard title="Reset" icon={FiSettings}>
          <p className="mb-3 text-sm text-gray-500">
            Restore default profile details and preferences. Your crops, sales and documents are not affected.
          </p>
          <Button variant="outline" onClick={resetProfile}>
            Reset preferences
          </Button>
        </SectionCard>

        <p className="text-xs leading-relaxed text-gray-400">
          Settings are saved on this device and sync when you log in. Sensitive data like bank details are encrypted and
          never shared without your consent.
        </p>
      </div>
    </PageTransition>
  );
}