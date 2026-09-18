import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiDroplet } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SoilHeader from '@/components/soil/SoilHeader';
import StepIndicator from '@/components/soil/StepIndicator';
import PackageCard from '@/components/soil/PackageCard';
import { useSoilTest } from '@/context/SoilTestContext';

const WHY_ITEMS = [
  { title: 'Know your soil', text: 'A test reveals the exact pH, nutrients and organic matter of your field.' },
  { title: 'Spend less, grow more', text: 'Fertilise only what is needed and cut input costs by up to 20%.' },
  { title: 'Fix problems early', text: 'Catch zinc or boron deficiencies before they hurt yield.' },
];

export default function BookTest() {
  const navigate = useNavigate();
  const { packages, selectedPackage, setSelectedPackage } = useSoilTest();
  const [selectedKey, setSelectedKey] = useState(selectedPackage);

  function handleSelect(key) {
    setSelectedKey(key);
    setSelectedPackage(key);
  }

  return (
    <PageTransition>
      <SoilHeader title="Book Soil Test" subtitle="Sample your soil before the next sowing" />

      <StepIndicator current="book" />

      <Card variant="tinted">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft">
            <FiDroplet aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-gray-900">Why test your soil?</h3>
            <ul className="mt-2 space-y-1.5">
              {WHY_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                  <span><strong className="text-gray-800">{item.title}.</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.key} pkg={pkg} selected={selectedKey === pkg.key} onSelect={handleSelect} />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg" rightIcon={FiArrowRight} onClick={() => navigate('/dashboard/soil/lab')}>
          Choose a lab
        </Button>
      </div>
    </PageTransition>
  );
}