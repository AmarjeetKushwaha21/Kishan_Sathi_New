import { useState } from 'react';
import { FiCheck, FiRefreshCw, FiSave } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import { useFarmer } from '@/context/FarmerContext';

const LANGUAGE_OPTIONS = ['English', 'Punjabi', 'Hindi'];

export default function EditProfile() {
  const { profile, updateProfile, resetProfile } = useFarmer();
  const [form, setForm] = useState({
    fullName: profile.fullName,
    phone: profile.phone,
    email: profile.email,
    village: profile.village,
    district: profile.district,
    state: profile.state,
    language: profile.languages[0],
    bio: profile.bio,
  });
  const [saved, setSaved] = useState(false);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function onSave() {
    updateProfile({
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      village: form.village,
      district: form.district,
      state: form.state,
      languages: [form.language, ...profile.languages.filter((l) => l !== form.language)],
      bio: form.bio,
    });
    setSaved(true);
  }

  function onReset() {
    resetProfile();
    setForm({
      fullName: profile.fullName,
      phone: profile.phone,
      email: profile.email,
      village: profile.village,
      district: profile.district,
      state: profile.state,
      language: profile.languages[0],
      bio: profile.bio,
    });
    setSaved(false);
  }

  return (
    <PageTransition>
      <FarmerHeader title="Edit Profile" subtitle={`Farmer ID ${profile.id}`} showBack />

      <div className="mx-auto max-w-3xl space-y-5">
        <Card variant="soft">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Basic information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} required />
            <Input label="Mobile number" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            <Input label="Email address" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} hint="Used for invoices and payouts." />
            <div>
              <label className="label-base" htmlFor="language">App language</label>
              <select id="language" aria-label="App language" className="input-base cursor-pointer appearance-none" value={form.language} onChange={(e) => set('language', e.target.value)}>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card variant="soft">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Location</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Village" value={form.village} onChange={(e) => set('village', e.target.value)} />
            <Input label="District" value={form.district} onChange={(e) => set('district', e.target.value)} />
            <Input label="State" value={form.state} onChange={(e) => set('state', e.target.value)} />
          </div>
        </Card>

        <Card variant="soft">
          <h3 className="mb-3 font-display text-base font-semibold text-gray-900">About you</h3>
          <label className="label-base" htmlFor="bio">Short bio</label>
          <textarea
            id="bio"
            aria-label="Short bio"
            rows="3"
            className="input-base resize-none"
            value={form.bio}
            onChange={(e) => set('bio', e.target.value)}
          />
          <p className="mt-1.5 text-xs text-gray-500">This appears on your buyer and expert profiles.</p>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <Button leftIcon={saved ? FiCheck : FiSave} onClick={onSave}>
            {saved ? 'Saved' : 'Save changes'}
          </Button>
          <Button variant="outline" leftIcon={FiRefreshCw} onClick={onReset}>
            Reset
          </Button>
          {saved && (
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
              <FiCheck aria-hidden="true" /> Profile updated
            </p>
          )}
        </div>
      </div>
    </PageTransition>
  );
}