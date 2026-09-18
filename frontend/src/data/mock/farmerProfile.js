import mockUser from '@/data/mockUser.json';

export const FARMER_IDENTITY = {
  id: mockUser.id,
  fullName: mockUser.fullName,
  firstName: mockUser.firstName,
  lastName: mockUser.lastName,
  role: mockUser.role,
  phone: mockUser.phone,
  email: mockUser.email,
  village: mockUser.village,
  district: mockUser.district,
  state: mockUser.state,
  pincode: mockUser.pincode,
  languages: mockUser.languages,
  bio: mockUser.bio,
  memberSince: mockUser.memberSince,
  membership: mockUser.membership,
  membershipTier: mockUser.membershipTier,
  avatarColor: mockUser.avatarColor,
  upi: mockUser.upi,
};

export const FARM_DETAILS = {
  name: 'Gaddowal Green Fields',
  type: 'Mixed farming (crops + vegetables)',
  totalArea: 22.5,
  ownedArea: 16,
  leasedArea: 6.5,
  soilType: 'Alluvial (loamy)',
  soilPH: 6.8,
  irrigation: 'Canal + Tube well',
  tubeWells: 2,
  electricity: 'Agricultural connection (10 HP)',
  farmingPractice: 'Integrated nutrient management',
  machinery: ['Mahindra 605DI tractor', 'Seed drill', 'Rotavator', 'Tractor sprayer', 'Trailer trolley'],
  address: 'Village Gaddowal, Ludhiana District, Punjab 141116',
  since: '2004',
};

export const LAND_PARCELS = [
  { id: 'L1', khasra: 'Khasra No. 128/1', location: 'Gaddowal East', size: 7.5, ownership: 'Owned', irrigation: 'Canal', soil: 'Loamy', currentCrop: 'Wheat', status: 'Cultivated' },
  { id: 'L2', khasra: 'Khasra No. 132/4', location: 'Gaddowal West', size: 5, ownership: 'Owned', irrigation: 'Tube well', soil: 'Loamy', currentCrop: 'Potato', status: 'Cultivated' },
  { id: 'L3', khasra: 'Khasra No. 141/2', location: 'Jassian Road', size: 3.5, ownership: 'Owned', irrigation: 'Canal', soil: 'Sandy loam', currentCrop: 'Fallow', status: 'Resting' },
  { id: 'L4', khasra: 'Khasra No. 155/7', location: 'Samrala Road', size: 6.5, ownership: 'Leased', irrigation: 'Canal + Bore', soil: 'Loamy', currentCrop: 'Paddy', status: 'Cultivated' },
];

export const DOCUMENTS = [
  { id: 'D1', name: 'Jama Bandi / Land Record', type: 'Land record', ref: 'DLR-2026-00821', status: 'verified', updated: '12 Aug 2026' },
  { id: 'D2', name: 'Aadhaar Card', type: 'Identity', ref: 'XXXX-XXXX-1234', status: 'verified', updated: '05 Mar 2026' },
  { id: 'D3', name: 'PAN Card', type: 'Tax', ref: 'XXXXX2341K', status: 'verified', updated: '05 Mar 2026' },
  { id: 'D4', name: 'Soil Health Card', type: 'Soil test', ref: 'SHC-PB-55211', status: 'verified', updated: '18 Jun 2026' },
  { id: 'D5', name: 'Passbook / Bank Statement', type: 'Bank', ref: 'SBIN00 5524 6678', status: 'pending', updated: 'Uploaded 02 Aug 2026' },
  { id: 'D6', name: 'Crop Insurance Certificate', type: 'Insurance', ref: 'PMFBY-26-1140', status: 'verified', updated: '30 Jul 2026' },
  { id: 'D7', name: 'Fertilizer Licence (old)', type: 'Dealer', ref: 'FL-2019-003', status: 'expired', updated: 'Expired 31 Mar 2025' },
];

export const BANK_DETAILS = {
  bank: 'State Bank of India',
  branch: 'Ludhiana Main Branch',
  accountNumber: '•••• •••• 4678',
  ifsc: 'SBIN0005524',
  accountType: 'Savings (Joint)',
  kyc: 'Completed',
  upi: mockUser.upi,
  kycSteps: [
    { label: 'Identity verification', done: true },
    { label: 'Address verification', done: true },
    { label: 'Bank account linking', done: true },
    { label: 'UPI activation', done: true },
  ],
  payouts: [
    { id: 'PY-8841', date: '12 Aug 2026', source: 'Maize sale · Jagraon Mandi', amount: 7980 },
    { id: 'PY-8839', date: '09 Aug 2026', source: 'Potato sale · Khanna Market', amount: 21500 },
    { id: 'PY-8812', date: '02 Aug 2026', source: 'PM-Kisan instalment', amount: 2000 },
  ],
};

export const CROP_HISTORY = [
  { id: 'CH1', season: 'Rabi 2025-26', crop: 'Wheat', area: 12, yield: '38 qtl/acre', price: '₹2,325/q', revenue: 1059000, profit: 287500, notes: 'Record yield, sold at mandi premium.' },
  { id: 'CH2', season: 'Rabi 2025-26', crop: 'Potato', area: 5, yield: '180 qtl/acre', price: '₹1,150/q', revenue: 1035000, profit: 412000, notes: 'Sold via Marketplace to Shubham Traders.' },
  { id: 'CH3', season: 'Kharif 2025', crop: 'Paddy', area: 10, yield: '34 qtl/acre', price: '₹2,300/q', revenue: 782000, profit: 198000, notes: 'Basmati + PUSA-44 mix.' },
  { id: 'CH4', season: 'Kharif 2025', crop: 'Maize', area: 4, yield: '24 qtl/acre', price: '₹1,975/q', revenue: 189600, profit: 64000, notes: 'Direct deal at Jagraon Mandi.' },
  { id: 'CH5', season: 'Rabi 2024-25', crop: 'Wheat', area: 12, yield: '36 qtl/acre', price: '₹2,275/q', revenue: 982800, profit: 244000, notes: 'Normal season, moderate rains.' },
];

export const ACHIEVEMENTS = [
  { id: 'A1', title: 'First Sale', desc: 'Completed your first mandi sale', icon: '🌾', points: 100, unlocked: 'Apr 2019', locked: false },
  { id: 'A2', title: 'Soil Champion', desc: 'Tested soil 5 times this year', icon: '🧪', points: 250, unlocked: 'Jun 2026', locked: false },
  { id: 'A3', title: 'Weather Wise', desc: 'Followed 20 weather alerts', icon: '☀️', points: 150, unlocked: 'Jul 2026', locked: false },
  { id: 'A4', title: 'Market Pro', desc: 'Sold above mandi average 10 times', icon: '💰', points: 300, unlocked: 'Aug 2026', locked: false },
  { id: 'A5', title: 'Early Adopter', desc: 'Joined during the first launch month', icon: '🚀', points: 200, unlocked: 'Mar 2019', locked: false },
  { id: 'A6', title: 'Referral Star', desc: 'Invite 5 farmers to Kishan Sathi', icon: '🤝', points: 400, unlocked: null, locked: true, progress: 3 },
  { id: 'A7', title: 'Green Grower', desc: 'Grow organic produce for 3 seasons', icon: '🌱', points: 500, unlocked: null, locked: true },
  { id: 'A8', title: 'Crop Pro', desc: 'Use the AI recommender for 10 crops', icon: '🌽', points: 350, unlocked: null, locked: true },
];

export const SETTINGS_SECTIONS = [
  {
    id: 'language',
    title: 'Language & Region',
    items: [
      { key: 'language', label: 'App language', type: 'select', options: ['English', 'Punjabi', 'Hindi'], value: 'English' },
      { key: 'region', label: 'Market region', type: 'select', options: ['Ludhiana, Punjab', 'Khanna, Punjab', 'Jagraon, Punjab', 'Gobindgarh, Punjab'], value: 'Ludhiana, Punjab' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    items: [
      { key: 'weatherAlerts', label: 'Weather alerts', desc: 'Rain, heatwave and storm warnings', type: 'toggle', value: true },
      { key: 'orderUpdates', label: 'Order updates', desc: 'Delivery and refund updates from Buy & Sell', type: 'toggle', value: true },
      { key: 'buyerOffers', label: 'Buyer offers', desc: 'New offers and counter-offers on your crops', type: 'toggle', value: true },
      { key: 'messages', label: 'Messages', desc: 'Chats from experts and buyers', type: 'toggle', value: true },
      { key: 'announcements', label: 'Announcements', desc: 'MSP updates and government schemes', type: 'toggle', value: false },
    ],
  },
  {
    id: 'app',
    title: 'App preferences',
    items: [
      { key: 'darkMode', label: 'Dark mode', desc: 'Reduce brightness in low light', type: 'toggle', value: false },
      { key: 'dataSaver', label: 'Data saver', desc: 'Load lighter images on mobile data', type: 'toggle', value: false },
      { key: 'nativeDigits', label: 'Numbers in native script', desc: 'Display amounts in Devanagari script', type: 'toggle', value: true },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & account',
    items: [
      { key: 'shareSoilData', label: 'Share soil reports with advisors', desc: 'Allow experts to view your soil reports', type: 'toggle', value: true },
      { key: 'smsAlerts', label: 'SMS alerts', desc: 'Get critical alerts on your phone via SMS', type: 'toggle', value: false },
    ],
  },
];