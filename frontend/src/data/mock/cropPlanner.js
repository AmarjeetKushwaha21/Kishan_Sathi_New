export const SEASONS = [
  { key: 'rabi', label: 'Rabi · Oct – Mar' },
  { key: 'kharif', label: 'Kharif · Jun – Sep' },
  { key: 'zaid', label: 'Zaid · Apr – May' },
];

export const CROP_PLANS = [
  {
    id: 'PL-221',
    season: 'rabi',
    crop: 'Wheat',
    cropKey: 'wheat',
    emoji: '🌾',
    field: 'North Field',
    area: '3.5 acres',
    variety: 'HD-2967',
    sowDate: '5 Nov',
    expectedHarvest: '15 Apr',
    stage: 'Tillering (45 days)',
    progress: 45,
    status: 'active',
    activities: [
      { name: 'Land preparation & sowing', date: '5 Nov', category: 'sowing', status: 'done', note: 'Zero-till drill, 108 kg/ha' },
      { name: 'First irrigation (crown root)', date: '26 Nov', category: 'irrigation', status: 'done', note: '21 days after sowing' },
      { name: 'Urea top dressing 50%', date: '26 Nov', category: 'fertilizer', status: 'done', note: 'With first irrigation' },
      { name: 'Urea top dressing 25%', date: '20 Dec', category: 'fertilizer', status: 'pending', note: 'At tillering stage' },
      { name: 'Second irrigation', date: '20 Dec', category: 'irrigation', status: 'pending', note: '45 days after sowing' },
      { name: 'Weed control spray', date: '24 Dec', category: 'pest', status: 'pending', note: 'Clodinafop + Metsulfuron' },
      { name: 'Third irrigation (jointing)', date: '14 Jan', category: 'irrigation', status: 'pending', note: '70 days' },
      { name: 'Harvest', date: '15 Apr', category: 'harvest', status: 'pending', note: 'Combine + straw baling' },
    ],
  },
  {
    id: 'PL-220',
    season: 'kharif',
    crop: 'Paddy',
    cropKey: 'paddy',
    emoji: '🍚',
    field: 'East Paddy Plot',
    area: '4 acres',
    variety: 'PR-126',
    sowDate: '25 Jun',
    expectedHarvest: '30 Oct',
    stage: 'Panicle initiation',
    progress: 82,
    status: 'active',
    activities: [
      { name: 'Nursery & transplanting', date: '25 Jun', category: 'sowing', status: 'done', note: 'Mechanical transplanting' },
      { name: 'Basal fertilizer', date: '30 Jun', category: 'fertilizer', status: 'done', note: 'DAP + MOP' },
      { name: 'Panicle initiation spray', date: '18 Sep', category: 'pest', status: 'done', note: 'Tricyclazole preventive' },
      { name: 'Final urea top dressing', date: '22 Sep', category: 'fertilizer', status: 'pending', note: '30% nitrogen' },
      { name: 'Harvest', date: '30 Oct', category: 'harvest', status: 'pending', note: 'Combine harvester' },
    ],
  },
  {
    id: 'PL-219',
    season: 'kharif',
    crop: 'Maize',
    cropKey: 'maize',
    emoji: '🌽',
    field: 'South Field',
    area: '2 acres',
    variety: 'PMH-1',
    sowDate: '10 Jul',
    expectedHarvest: '5 Nov',
    stage: 'Grain filling (92 cm)',
    progress: 78,
    status: 'active',
    activities: [
      { name: 'Sowing with planter', date: '10 Jul', category: 'sowing', status: 'done', note: 'Row spacing 60 cm' },
      { name: 'First top dressing', date: '5 Aug', category: 'fertilizer', status: 'done', note: 'Urea split 1' },
      { name: 'Whorl pest check', date: '20 Aug', category: 'pest', status: 'done', note: 'Fall armyworm scouting' },
      { name: 'Second top dressing', date: '10 Sep', category: 'fertilizer', status: 'done', note: 'Urea split 2' },
      { name: 'Harvest', date: '5 Nov', category: 'harvest', status: 'pending', note: 'Grain moisture ~22%' },
    ],
  },
  {
    id: 'PL-218',
    season: 'zaid',
    crop: 'Tomato',
    cropKey: 'tomato',
    emoji: '🍅',
    field: 'Greenhouse Block B',
    area: '0.5 acre',
    variety: 'NS-501',
    sowDate: '1 Mar',
    expectedHarvest: '15 Jun',
    stage: 'Fruiting',
    progress: 70,
    status: 'active',
    activities: [
      { name: 'Transplanting', date: '1 Mar', category: 'sowing', status: 'done', note: 'Drip + mulch' },
      { name: 'Staking & training', date: '20 Mar', category: 'other', status: 'done', note: 'Single stem' },
      { name: 'Early blight spray', date: '10 Apr', category: 'pest', status: 'done', note: 'Chlorothalonil' },
      { name: 'Weekly picking', date: '20 Apr', category: 'harvest', status: 'pending', note: 'Every 3 days' },
    ],
  },
];

export const PLANNER_STATS = {
  activePlans: 4,
  tasksThisWeek: 6,
  completedTasks: 18,
  harvestNext: 'Wheat · 15 Apr',
};

export const PLANNER_CHART = [
  { month: 'Jun', tasks: 4 },
  { month: 'Jul', tasks: 6 },
  { month: 'Aug', tasks: 5 },
  { month: 'Sep', tasks: 7 },
  { month: 'Oct', tasks: 3 },
  { month: 'Nov', tasks: 6 },
  { month: 'Dec', tasks: 5 },
  { month: 'Jan', tasks: 4 },
];

export const ACTIVITY_CATEGORIES = [
  { key: 'sowing', label: 'Sowing', emoji: '🌱', color: 'text-primary-600 bg-primary-50' },
  { key: 'irrigation', label: 'Irrigation', emoji: '💧', color: 'text-sky-600 bg-sky-50' },
  { key: 'fertilizer', label: 'Fertilizer', emoji: '🧪', color: 'text-accent-600 bg-accent-50' },
  { key: 'pest', label: 'Pest / Weed', emoji: '🐛', color: 'text-red-600 bg-red-50' },
  { key: 'harvest', label: 'Harvest', emoji: '🚜', color: 'text-violet-600 bg-violet-50' },
  { key: 'other', label: 'Other', emoji: '📋', color: 'text-gray-600 bg-gray-100' },
];

export const CROPS_FOR_PLAN = [
  { key: 'wheat', label: 'Wheat', emoji: '🌾' },
  { key: 'paddy', label: 'Paddy', emoji: '🍚' },
  { key: 'maize', label: 'Maize', emoji: '🌽' },
  { key: 'tomato', label: 'Tomato', emoji: '🍅' },
  { key: 'cotton', label: 'Cotton', emoji: '🌱' },
  { key: 'chickpea', label: 'Chickpea', emoji: '🫘' },
];

export const FIELDS_FOR_PLAN = [
  'North Field · 3.5 acres',
  'South Field · 2 acres',
  'East Paddy Plot · 4 acres',
  'Greenhouse Block B · 0.5 acre',
];