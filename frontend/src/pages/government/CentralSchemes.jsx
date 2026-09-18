import { useMemo, useState } from 'react';
import {
  FiAward,
  FiBookmark,
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiFilter,
  FiInfo,
  FiLayers,
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
import { useGovernment, SCHEME_CATEGORIES } from '@/context/GovernmentContext';
import { cn } from '@/utils/cn';

export default function CentralSchemes() {
  const { centralSchemes, savedSchemeIds, applications } = useGovernment();

  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'my-applications' | 'saved'
  const [category, setCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedTimelineApp, setSelectedTimelineApp] = useState(null);

  const safeCentralSchemes = useMemo(
    () => (Array.isArray(centralSchemes) ? centralSchemes : []),
    [centralSchemes]
  );

  const filteredSchemes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return safeCentralSchemes.filter((scheme) => {
      if (!scheme) return false;
      if (activeTab === 'saved' && !savedSchemeIds.includes(scheme.id)) return false;
      if (category !== 'All Categories' && scheme.category !== category) return false;
      if (q) {
        const text = `${scheme.name} ${scheme.category} ${scheme.shortDescription} ${scheme.benefits} ${scheme.tags?.join(' ')}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [safeCentralSchemes, activeTab, savedSchemeIds, category, searchQuery]);

  function handleOpenDetails(scheme) {
    setSelectedScheme(scheme);
    setDetailsModalOpen(true);
  }

  function handleOpenApply(scheme) {
    setSelectedScheme(scheme);
    setApplyModalOpen(true);
  }

  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const underReviewCount = applications.filter((a) => a.status === 'Under Review' || a.status === 'Submitted').length;

  return (
    <PageTransition>
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-lg text-primary-700">
              <FiAward aria-hidden="true" />
            </span>
            <h1 className="font-display text-2xl font-bold text-gray-900">
              Central Government Schemes
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Discover, track, and apply for Central Government agricultural subsidies, loans, and farmer support programs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-800">
            <FiShield className="text-primary-600" /> DBT Enabled Portal
          </span>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={FiLayers}
          label="Central Schemes"
          value={safeCentralSchemes.length}
          trend="100% Subsidized"
          color="primary"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Approved Subsidies"
          value={approvedCount}
          trend="Disbursed via DBT"
          color="accent"
        />
        <StatCard
          icon={FiSend}
          label="In Process"
          value={underReviewCount}
          trend="Under Verification"
          color="sky"
        />
        <StatCard
          icon={FiBookmark}
          label="Saved Schemes"
          value={savedSchemeIds.length}
          trend="Bookmarked"
          color="violet"
        />
      </div>

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
          Explore Central Schemes ({safeCentralSchemes.length})
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
          Saved Schemes ({savedSchemeIds.length})
        </button>
      </div>

      {/* Explore / Saved Schemes Tab Content */}
      {activeTab !== 'my-applications' ? (
        <div className="space-y-6">
          {/* Search Bar & Category Filter Chips */}
          <Card variant="soft" className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative flex-1">
                <span className="sr-only">Search central schemes</span>
                <FiSearch
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by scheme name, benefits, keywords (e.g., PM-KISAN, tractor, subsidy, insurance)…"
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
                        ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
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
              title="No schemes match your criteria"
              description="Try selecting a different category or adjusting your search keywords."
              action={Boolean(searchQuery || category !== 'All Categories')}
              actionLabel="Reset All Filters"
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
                  {filteredSchemes.length === 1 ? '' : 's'}
                </span>
                {category !== 'All Categories' && (
                  <span className="font-medium text-primary-700">Category: {category}</span>
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
        onSuccess={() => {
          // Keep dialog in completed state until user dismisses
        }}
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
