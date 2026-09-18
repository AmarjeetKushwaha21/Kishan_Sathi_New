import { useMemo, useState } from 'react';
import {
  FiBookmark,
  FiChevronDown,
  FiFileText,
  FiFilter,
  FiInfo,
  FiLayers,
  FiMapPin,
  FiSearch,
  FiSend,
  FiShield,
} from 'react-icons/fi';
import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import EmptyState from '@/components/ui/EmptyState';
import SchemeCard from '@/components/government/SchemeCard';
import SchemeDetailsModal from '@/components/government/SchemeDetailsModal';
import ApplySchemeModal from '@/components/government/ApplySchemeModal';
import MyApplicationsSection from '@/components/government/MyApplicationsSection';
import ApplicationTimelineModal from '@/components/government/ApplicationTimelineModal';
import { useGovernment, SCHEME_CATEGORIES, INDIAN_STATES } from '@/context/GovernmentContext';
import { cn } from '@/utils/cn';

export default function StateSchemes() {
  const { stateSchemes, selectedState, setSelectedState, savedSchemeIds, applications } = useGovernment();

  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'my-applications' | 'saved'
  const [category, setCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedTimelineApp, setSelectedTimelineApp] = useState(null);

  const safeStateSchemes = useMemo(
    () => (Array.isArray(stateSchemes) ? stateSchemes : []),
    [stateSchemes]
  );

  // Schemes for currently selected state
  const stateSchemesList = useMemo(() => {
    return safeStateSchemes.filter((s) => s.state === selectedState);
  }, [safeStateSchemes, selectedState]);

  // Filtered by Search, Category, and Saved Tab
  const filteredSchemes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return stateSchemesList.filter((scheme) => {
      if (!scheme) return false;
      if (activeTab === 'saved' && !savedSchemeIds.includes(scheme.id)) return false;
      if (category !== 'All Categories' && scheme.category !== category) return false;
      if (q) {
        const text = `${scheme.name} ${scheme.category} ${scheme.description} ${scheme.benefits} ${scheme.tags?.join(' ')}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [stateSchemesList, activeTab, savedSchemeIds, category, searchQuery]);

  function handleOpenDetails(scheme) {
    setSelectedScheme(scheme);
    setDetailsModalOpen(true);
  }

  function handleOpenApply(scheme) {
    setSelectedScheme(scheme);
    setApplyModalOpen(true);
  }

  return (
    <PageTransition>
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700">
              <FiMapPin aria-hidden="true" />
            </span>
            <h1 className="font-display text-2xl font-bold text-gray-900">
              State Government Schemes
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Select your state to discover localized farm subsidies, irrigation grants, and state-level agricultural assistance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <FiShield className="text-emerald-600" /> State DBT Portal
          </span>
        </div>
      </div>

      {/* Step 1: State Selection Card */}
      <Card
        variant="tinted"
        className="mb-6 border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-primary-50/50 p-5 shadow-soft"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
              Step 1: Select Your State
            </span>
            <h2 className="mt-1 font-display text-base font-bold text-gray-900 sm:text-lg">
              Currently viewing schemes for{' '}
              <span className="text-emerald-700 underline decoration-emerald-400">
                {selectedState}
              </span>
            </h2>
            <p className="text-xs text-gray-600">
              Showing active agricultural initiatives and farmer schemes launched by the Government of {selectedState}.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <label className="relative block">
              <span className="sr-only">Choose State</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                aria-label="Select State"
                className="input-base w-full appearance-none !border-emerald-300 bg-white font-semibold text-gray-900 shadow-soft pr-10"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <FiChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-lg"
                aria-hidden="true"
              />
            </label>
          </div>
        </div>

        {/* Quick State Pills */}
        <div className="mt-4 border-t border-emerald-100 pt-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Popular States:
          </p>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {INDIAN_STATES.map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setSelectedState(state)}
                className={cn(
                  'focus-ring shrink-0 rounded-xl px-3 py-1 text-xs font-semibold transition',
                  selectedState === state
                    ? 'bg-emerald-600 text-white shadow-soft'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                )}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Tab Switcher */}
      <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('explore')}
          className={cn(
            'focus-ring flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition',
            activeTab === 'explore'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <FiLayers aria-hidden="true" />
          {selectedState} Schemes ({stateSchemesList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my-applications')}
          className={cn(
            'focus-ring flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition',
            activeTab === 'my-applications'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <FiFileText aria-hidden="true" />
          My Applications ({applications.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={cn(
            'focus-ring flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition',
            activeTab === 'saved'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <FiBookmark aria-hidden="true" />
          Saved Schemes
        </button>
      </div>

      {/* Explore / Saved Schemes Tab Content */}
      {activeTab !== 'my-applications' ? (
        <div className="space-y-6">
          {/* Search Bar & Category Filter Chips */}
          <Card variant="soft" className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative flex-1">
                <span className="sr-only">Search state schemes</span>
                <FiSearch
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedState} schemes by keyword, crop, subsidy, equipment…`}
                  className="input-base w-full !pl-10 text-sm"
                />
              </label>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-primary-700 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                <FiFilter aria-hidden="true" />
                Filter by Category
              </div>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                {SCHEME_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'focus-ring shrink-0 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition',
                      category === cat
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-soft'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Schemes Grid */}
          {filteredSchemes.length === 0 ? (
            <EmptyState
              icon={FiInfo}
              title={`No schemes found for ${selectedState} in this category`}
              description="Try resetting your category filter or choosing another state from the dropdown above."
              action={Boolean(searchQuery || category !== 'All Categories')}
              actionLabel="Reset Category Filter"
              onAction={() => {
                setSearchQuery('');
                setCategory('All Categories');
              }}
            />
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                <span>
                  Showing <strong className="text-gray-900">{filteredSchemes.length}</strong> scheme
                  {filteredSchemes.length === 1 ? '' : 's'} for <strong>{selectedState}</strong>
                </span>
                {category !== 'All Categories' && (
                  <span className="font-medium text-emerald-700">Category: {category}</span>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onViewDetails={handleOpenDetails}
                    onApply={handleOpenApply}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* My Applications Tab Content */
        <div className="space-y-6">
          <SectionHeader
            title="My Government Applications"
            subtitle="Real-time status tracking for all your submitted and in-progress scheme requests"
          />
          <MyApplicationsSection
            onSelectTimeline={(app) => setSelectedTimelineApp(app)}
            onBrowseSchemes={() => setActiveTab('explore')}
          />
        </div>
      )}

      {/* Scheme Details Modal */}
      <SchemeDetailsModal
        scheme={selectedScheme}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onApply={handleOpenApply}
      />

      {/* Apply Scheme Multi-step Modal */}
      <ApplySchemeModal
        scheme={selectedScheme}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />

      {/* Application Timeline Modal */}
      <ApplicationTimelineModal
        application={selectedTimelineApp}
        isOpen={Boolean(selectedTimelineApp)}
        onClose={() => setSelectedTimelineApp(null)}
      />
    </PageTransition>
  );
}
