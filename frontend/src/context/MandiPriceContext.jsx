import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  CATEGORIES,
  COMMODITIES,
  COMPARE_SEED,
  FAVORITE_SEED,
  MANDIS,
  buildTodayPrices,
  getHistory,
  getMandiHistory,
} from '@/data/mock/mandiPrices';
import { fetchMandiPrices, fetchMandiMeta, fetchMandiComparison } from '@/services/mandiService';

const FAVORITES_KEY = 'ks_mandi_favorites';
const TODAY_PRICE_ALL = buildTodayPrices();

export function getCropEmoji(commodity = '') {
  const c = (commodity || '').toLowerCase();
  if (c.includes('wheat') || c.includes('gehu')) return '🌾';
  if (c.includes('paddy') || c.includes('rice') || c.includes('dhan')) return '🌾';
  if (c.includes('onion') || c.includes('pyaz')) return '🧅';
  if (c.includes('potato') || c.includes('aloo')) return '🥔';
  if (c.includes('tomato') || c.includes('tamatar')) return '🍅';
  if (c.includes('garlic') || c.includes('lahsun')) return '🧄';
  if (c.includes('mustard') || c.includes('sarson')) return '🌿';
  if (c.includes('maize') || c.includes('makka')) return '🌽';
  if (c.includes('cotton') || c.includes('kapas')) return '☁️';
  if (c.includes('soyabean')) return '🌱';
  if (c.includes('gram') || c.includes('chana')) return '🟤';
  if (c.includes('brinjal') || c.includes('baingan')) return '🍆';
  if (c.includes('chilli') || c.includes('mirch')) return '🌶️';
  if (c.includes('banana') || c.includes('kela')) return '🍌';
  if (c.includes('cauliflower') || c.includes('gobhi')) return '🥦';
  if (c.includes('bottle gourd') || c.includes('lauki')) return '🥒';
  if (c.includes('cucumbar') || c.includes('kheera')) return '🥒';
  return '🌱';
}

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {
    // ignore corrupt storage
  }
  return FAVORITE_SEED;
}

export const STATE_DISTRICTS_MAP = {
  'All States': ['All Districts'],
  Punjab: [
    'All Districts',
    'Amritsar',
    'Barnala',
    'Bathinda',
    'Faridkot',
    'Fatehgarh Sahib',
    'Fazilka',
    'Ferozepur',
    'Gurdaspur',
    'Hoshiarpur',
    'Jalandhar',
    'Kapurthala',
    'Ludhiana',
    'Mansa',
    'Moga',
    'Muktsar',
    'Pathankot',
    'Patiala',
    'Rupnagar',
    'Sangrur',
    'SAS Nagar (Mohali)',
    'SBS Nagar (Nawanshahr)',
    'Tarn Taran',
  ],
  Haryana: [
    'All Districts',
    'Ambala',
    'Bhiwani',
    'Charkhi Dadri',
    'Faridabad',
    'Fatehabad',
    'Gurugram',
    'Hisar',
    'Jhajjar',
    'Jind',
    'Kaithal',
    'Karnal',
    'Kurukshetra',
    'Mahendragarh',
    'Nuh',
    'Palwal',
    'Panchkula',
    'Panipat',
    'Rewari',
    'Rohtak',
    'Sirsa',
    'Sonipat',
    'Yamunanagar',
  ],
  'Uttar Pradesh': [
    'All Districts',
    'Agra',
    'Aligarh',
    'Ambedkar Nagar',
    'Amethi',
    'Amroha',
    'Ayodhya',
    'Azamgarh',
    'Bahraich',
    'Ballia',
    'Banda',
    'Barabanki',
    'Bareilly',
    'Basti',
    'Bijnor',
    'Budaun',
    'Bulandshahr',
    'Etawah',
    'Farrukhabad',
    'Fatehpur',
    'Firozabad',
    'Ghaziabad',
    'Gorakhpur',
    'Hardoi',
    'Hathras',
    'Jhansi',
    'Kannauj',
    'Kanpur Dehat',
    'Kanpur Nagar',
    'Kheri',
    'Lucknow',
    'Mathura',
    'Meerut',
    'Mirzapur',
    'Moradabad',
    'Muzaffarnagar',
    'Pilibhit',
    'Prayagraj',
    'Raebareli',
    'Rampur',
    'Saharanpur',
    'Shahjahanpur',
    'Sitapur',
    'Sultanpur',
    'Unnao',
    'Varanasi',
  ],
  'Madhya Pradesh': [
    'All Districts',
    'Agar Malwa',
    'Bhopal',
    'Burhanpur',
    'Chhatarpur',
    'Chhindwara',
    'Dewas',
    'Dhar',
    'Gwalior',
    'Hoshangabad',
    'Indore',
    'Jabalpur',
    'Khandwa',
    'Khargone',
    'Mandsaur',
    'Morena',
    'Neemuch',
    'Raisen',
    'Rajgarh',
    'Ratlam',
    'Rewa',
    'Sagar',
    'Satna',
    'Sehore',
    'Shajapur',
    'Ujjain',
    'Vidisha',
  ],
  Maharashtra: [
    'All Districts',
    'Ahmednagar',
    'Akola',
    'Amravati',
    'Chhatrapati Sambhaji Nagar',
    'Buldhana',
    'Chandrapur',
    'Dhule',
    'Jalgaon',
    'Jalna',
    'Kolhapur',
    'Latur',
    'Mumbai',
    'Nagpur',
    'Nanded',
    'Nashik',
    'Pune',
    'Raigad',
    'Sangli',
    'Satara',
    'Solapur',
    'Thane',
    'Wardha',
    'Yavatmal',
  ],
  Rajasthan: [
    'All Districts',
    'Ajmer',
    'Alwar',
    'Barmer',
    'Bharatpur',
    'Bhilwara',
    'Bikaner',
    'Bundi',
    'Chittorgarh',
    'Churu',
    'Dausa',
    'Hanumangarh',
    'Jaipur',
    'Jodhpur',
    'Kota',
    'Nagaur',
    'Pali',
    'Sawai Madhopur',
    'Sikar',
    'Sri Ganganagar',
    'Tonk',
    'Udaipur',
  ],
  Gujarat: [
    'All Districts',
    'Ahmedabad',
    'Amreli',
    'Anand',
    'Banaskantha',
    'Bharuch',
    'Bhavnagar',
    'Dahod',
    'Gandhinagar',
    'Jamnagar',
    'Junagadh',
    'Kutch',
    'Mehsana',
    'Morbi',
    'Patan',
    'Porbandar',
    'Rajkot',
    'Surat',
    'Surendranagar',
    'Vadodara',
    'Valsad',
  ],
  Bihar: [
    'All Districts',
    'Araria',
    'Aurangabad',
    'Begusarai',
    'Bhagalpur',
    'Bhojpur',
    'Darbhanga',
    'Gaya',
    'Katihar',
    'Madhubani',
    'Muzaffarpur',
    'Nalanda',
    'Patna',
    'Purnia',
    'Rohtas',
    'Samastipur',
    'Saran',
    'Vaishali',
  ],
  'Andhra Pradesh': [
    'All Districts',
    'Ananthapuramu',
    'Chittoor',
    'East Godavari',
    'Guntur',
    'Krishna',
    'Kurnool',
    'Nellore',
    'Prakasam',
    'Visakhapatnam',
    'West Godavari',
  ],
  Karnataka: [
    'All Districts',
    'Bagalkote',
    'Ballari',
    'Belagavi',
    'Bengaluru Rural',
    'Bengaluru Urban',
    'Bidar',
    'Davanagere',
    'Dharwad',
    'Hassan',
    'Haveri',
    'Kalaburagi',
    'Mandya',
    'Mysuru',
    'Raichur',
    'Shivamogga',
    'Tumakuru',
    'Vijayapura',
  ],
  'West Bengal': [
    'All Districts',
    'Bankura',
    'Birbhum',
    'Cooch Behar',
    'Hooghly',
    'Howrah',
    'Jalpaiguri',
    'Malda',
    'Murshidabad',
    'Nadia',
    'North 24 Parganas',
    'Paschim Bardhaman',
    'Purba Bardhaman',
    'South 24 Parganas',
  ],
  Odisha: [
    'All Districts',
    'Balangir',
    'Balasore',
    'Bargarh',
    'Bhadrak',
    'Cuttack',
    'Ganjam',
    'Kalahandi',
    'Khordha',
    'Mayurbhanj',
    'Puri',
    'Sambalpur',
    'Sundargarh',
  ],
  'Tamil Nadu': [
    'All Districts',
    'Coimbatore',
    'Cuddalore',
    'Dharmapuri',
    'Dindigul',
    'Erode',
    'Kanchipuram',
    'Madurai',
    'Namakkal',
    'Salem',
    'Thanjavur',
    'Tiruchirappalli',
    'Tirunelveli',
    'Tiruppur',
    'Vellore',
  ],
  Telangana: [
    'All Districts',
    'Adilabad',
    'Hyderabad',
    'Karimnagar',
    'Khammam',
    'Mahabubnagar',
    'Medak',
    'Nalgonda',
    'Nizamabad',
    'Rangareddy',
    'Warangal',
  ],
};

const MandiPriceContext = createContext(null);

export function MandiPriceProvider({ children }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('modal-desc');
  const [selectedMandiId, setSelectedMandiId] = useState(MANDIS[0].id);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [compare, setCompare] = useState(COMPARE_SEED);

  // Live Government State, District & Crop Filters
  const [selectedState, setSelectedState] = useState('Punjab');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCrop, setSelectedCrop] = useState('All Crops');

  const [statesList, setStatesList] = useState([
    'All States',
    'Punjab',
    'Haryana',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Maharashtra',
    'Rajasthan',
    'Gujarat',
    'Bihar',
    'Andhra Pradesh',
    'Karnataka',
    'West Bengal',
    'Odisha',
    'Tamil Nadu',
    'Telangana',
  ]);

  const [cropsList, setCropsList] = useState([
    'All Crops',
    'Wheat',
    'Paddy(Common)',
    'Potato',
    'Onion',
    'Tomato',
    'Mustard',
    'Maize',
    'Cotton',
    'Soyabean',
    'Bengal Gram(Gram)',
    'Garlic',
    'Green Gram (Moong)',
    'Chilli',
    'Groundnut',
  ]);

  const [liveGovRows, setLiveGovRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Load Metadata (States and Crops) on mount
  useEffect(() => {
    fetchMandiMeta()
      .then((meta) => {
        if (meta.states && meta.states.length > 0) setStatesList(meta.states);
        if (meta.crops && meta.crops.length > 0) setCropsList(meta.crops);
      })
      .catch((err) => console.warn('Mandi meta load failed:', err.message));
  }, []);

  // Fetch Live Mandi Prices from Backend when State, District, or Crop changes
  const loadPrices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMandiPrices({
        state: selectedState,
        district: selectedDistrict,
        commodity: selectedCrop,
        limit: 60,
      });

      if (data.records && data.records.length > 0) {
        const formatted = data.records.map((r, idx) => ({
          id: r.id || `mandi-${idx}`,
          commodity: r.commodity,
          commodityKey: (r.commodity || 'crop').toLowerCase().replace(/[^a-z0-9]/g, '-'),
          category: `${r.district}, ${r.state}`,
          mandiName: r.market,
          state: r.state,
          district: r.district,
          market: r.market,
          variety: r.variety || 'Standard',
          grade: r.grade || 'FAQ',
          arrivalDate: r.arrivalDate || 'Today',
          modal: r.modalPrice,
          min: r.minPrice || Math.round(r.modalPrice * 0.92),
          max: r.maxPrice || Math.round(r.modalPrice * 1.08),
          unit: '₹/qtl',
          vol: Math.round(((r.modalPrice * 3) % 450) + 120),
          changePct: +(((r.modalPrice % 7) - 3) * 0.6).toFixed(1),
          emoji: getCropEmoji(r.commodity),
          isLive: true,
        }));

        setLiveGovRows(formatted);
        setIsLive(true);
        if (data.updatedAt) {
          setUpdatedAt(new Date(data.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
        }
      } else {
        setLiveGovRows([]);
      }
    } catch (err) {
      console.warn('[MandiPriceContext] Failed to load live prices, using fallback:', err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedState, selectedDistrict, selectedCrop]);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Derived districts list that stays stable and rich for the selected state
  const availableDistricts = useMemo(() => {
    const baseDistricts = STATE_DISTRICTS_MAP[selectedState] || ['All Districts'];
    const set = new Set(baseDistricts);

    // Merge in any extra districts found from live API rows
    liveGovRows.forEach((r) => {
      if (r.district && r.district !== 'District' && r.district.trim().length > 0) {
        set.add(r.district.trim());
      }
    });

    const sorted = Array.from(set).filter((d) => d !== 'All Districts').sort();
    return ['All Districts', ...sorted];
  }, [selectedState, liveGovRows]);

  const resetFilters = useCallback(() => {
    setSelectedState('All States');
    setSelectedDistrict('All Districts');
    setSelectedCrop('All Crops');
    setSearch('');
    setSort('modal-desc');
  }, []);

  const filteredCommodities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMMODITIES.filter((c) => {
      if (category !== 'All' && c.category !== category) return false;
      if (q && !`${c.name} ${c.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, category]);

  // Filtered & Sorted Today Prices
  const todayPrices = useMemo(() => {
    let rows = liveGovRows.length > 0 ? liveGovRows : buildTodayPrices();

    // Apply search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.commodity.toLowerCase().includes(q) ||
          r.mandiName.toLowerCase().includes(q) ||
          (r.district && r.district.toLowerCase().includes(q)) ||
          (r.state && r.state.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    return [...rows].sort((a, b) => {
      if (sort === 'modal-asc') return a.modal - b.modal;
      if (sort === 'modal-desc') return b.modal - a.modal;
      return b.changePct - a.changePct;
    });
  }, [liveGovRows, search, sort]);

  const bestPriceMap = useMemo(() => {
    const map = {};
    COMMODITIES.forEach((c) => {
      const rows = TODAY_PRICE_ALL.filter((r) => r.commodityKey === c.key);
      const best = rows.reduce((max, r) => (r.modal > max.modal ? r : max), rows[0]);
      map[c.key] = best;
    });
    return map;
  }, []);

  const selectedMandi = useMemo(() => {
    if (liveGovRows.length > 0 && liveGovRows[0].market) {
      return {
        id: 'selected-gov',
        name: `${selectedState} Mandis`,
        short: selectedState,
        distance: 15,
      };
    }
    return MANDIS.find((m) => m.id === selectedMandiId) || MANDIS[0];
  }, [liveGovRows, selectedState, selectedMandiId]);

  const toggleFavorite = useCallback((mandiId) => {
    setFavorites((prev) => (prev.includes(mandiId) ? prev.filter((id) => id !== mandiId) : [...prev, mandiId]));
  }, []);

  const isFavorite = useCallback((mandiId) => favorites.includes(mandiId), [favorites]);

  const toggleCompare = useCallback((commodityKey) => {
    setCompare((prev) =>
      prev.includes(commodityKey) ? prev.filter((key) => key !== commodityKey) : [...prev, commodityKey].slice(-4)
    );
  }, []);

  const value = useMemo(
    () => ({
      mandis: MANDIS,
      categories: CATEGORIES,
      commodities: COMMODITIES,
      search,
      setSearch,
      category,
      setCategory,
      sort,
      setSort,
      selectedMandiId,
      setSelectedMandiId,
      selectedMandi,
      favorites,
      toggleFavorite,
      isFavorite,
      compare,
      toggleCompare,
      filteredCommodities,
      todayPrices,
      bestPriceMap,
      getHistory,
      getMandiHistory,

      // Live Government Mandi Props
      selectedState,
      setSelectedState,
      selectedDistrict,
      setSelectedDistrict,
      selectedCrop,
      setSelectedCrop,
      statesList,
      cropsList,
      availableDistricts,
      loading,
      isLive,
      updatedAt,
      refreshPrices: loadPrices,
      resetFilters,
      fetchMandiComparison,
    }),
    [
      search,
      category,
      sort,
      selectedMandiId,
      selectedMandi,
      favorites,
      toggleFavorite,
      isFavorite,
      compare,
      toggleCompare,
      filteredCommodities,
      todayPrices,
      bestPriceMap,
      selectedState,
      selectedDistrict,
      selectedCrop,
      statesList,
      cropsList,
      availableDistricts,
      loading,
      isLive,
      updatedAt,
      loadPrices,
      resetFilters,
    ]
  );

  return <MandiPriceContext.Provider value={value}>{children}</MandiPriceContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMandiPrice() {
  const ctx = useContext(MandiPriceContext);
  if (!ctx) throw new Error('useMandiPrice must be used within a MandiPriceProvider');
  return ctx;
}