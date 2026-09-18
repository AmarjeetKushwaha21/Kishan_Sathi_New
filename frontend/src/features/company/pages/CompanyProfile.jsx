import { useEffect, useState } from 'react';
import { FiBriefcase, FiCheckCircle, FiShield, FiSave } from 'react-icons/fi';
import companyService from '../services/companyService';

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    companyService.getProfile().then(setProfile);
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await companyService.updateProfile(profile);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Company Profile & Verification
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Institutional buyer KYC credentials and registered operational details.
        </p>
      </div>

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-800 dark:bg-green-950/60 dark:text-green-300">
          <FiCheckCircle className="text-base" />
          <span>Company profile details updated successfully!</span>
        </div>
      )}

      {/* Top Banner Card: ID, Account Status, Stats */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft">
              <FiBriefcase />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {profile.companyName}
                </h2>
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-950/60 dark:text-green-300">
                  <FiCheckCircle />
                  <span>{profile.accountStatus}</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Corporate ID: <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{profile.companyId}</span> • Member since {profile.registeredSince}
              </p>
            </div>
          </div>
        </div>

        {/* Mini Performance Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-5 text-center dark:border-gray-800">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Total Purchases</span>
            <p className="font-display text-lg font-extrabold text-primary-700 dark:text-primary-400">
              {profile.totalPurchases}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Active Bids</span>
            <p className="font-display text-lg font-extrabold text-gray-900 dark:text-white">
              {profile.activeBids}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Completed Orders</span>
            <p className="font-display text-lg font-extrabold text-gray-900 dark:text-white">
              {profile.completedOrders}
            </p>
          </div>
        </div>
      </div>

      {/* Editable Fields Form */}
      <form onSubmit={handleSave} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:p-8 space-y-5">
        <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
          Corporate Information & Tax Registration
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Registered Company Name
            </label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Corporate GSTIN (Verified / Read-Only)
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={profile.gstin}
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2 font-mono text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:text-sm cursor-not-allowed"
              />
              <span className="absolute right-3 top-2.5 text-xs text-green-600 flex items-center gap-1 font-semibold">
                <FiShield />
                <span>Verified</span>
              </span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Business Email
            </label>
            <input
              type="email"
              value={profile.businessEmail}
              onChange={(e) => handleChange('businessEmail', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Contact Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Company Category
            </label>
            <input
              type="text"
              value={profile.companyType}
              onChange={(e) => handleChange('companyType', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              State
            </label>
            <input
              type="text"
              value={profile.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              City
            </label>
            <input
              type="text"
              value={profile.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              PIN Code
            </label>
            <input
              type="text"
              value={profile.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-primary-700 active:bg-primary-800 sm:text-sm"
          >
            <FiSave className="text-base" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
