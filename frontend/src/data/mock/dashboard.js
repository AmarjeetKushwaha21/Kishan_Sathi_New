export const SEASON_INFO = {
  name: 'Kharif Season',
  year: 2026,
  status: 'Active',
  progress: 68,
  daysElapsed: 74,
  seasonGoal: '₹2,00,000',
  seasonEarned: '₹1,84,500',
  nextMilestone: 'Harvest window for paddy — 2 weeks away',
};

export const STATS = [
  { id: 'crops', label: 'Active Crops', value: '4', icon: 'FiLayers', color: 'primary', trend: '+1 this season' },
  { id: 'land', label: 'Land Area', value: '12.5 ac', icon: 'FiMapPin', color: 'accent', trend: '4 plots' },
  { id: 'yield', label: 'Expected Yield', value: '38.2 t', icon: 'FiTarget', color: 'sky', trend: '+12% vs last season' },
  { id: 'income', label: 'Season Income', value: '₹1.84L', icon: 'FiTrendingUp', color: 'violet', trend: 'Of ₹2.0L goal' },
];

export const WEATHER = {
  current: {
    temp: 31,
    feelsLike: 34,
    condition: 'Partly Cloudy',
    conditionKey: 'partly-cloudy',
    humidity: 68,
    windSpeed: 12,
    windDir: 'NW',
    rainProbability: 20,
    uvIndex: 7,
    updatedAt: '6:00 AM',
  },
  forecast: [
    { day: 'Today', temp: 31, high: 34, low: 24, conditionKey: 'partly-cloudy', rain: 20 },
    { day: 'Wed', temp: 32, high: 35, low: 25, conditionKey: 'sunny', rain: 10 },
    { day: 'Thu', temp: 30, high: 33, low: 24, conditionKey: 'cloudy', rain: 40 },
    { day: 'Fri', temp: 28, high: 31, low: 23, conditionKey: 'rainy', rain: 75 },
    { day: 'Sat', temp: 27, high: 30, low: 22, conditionKey: 'rainy', rain: 80 },
  ],
};

export const FARMING_TIPS = [
  {
    id: 't1',
    title: 'Irrigate wheat plot #2',
    text: 'Soil moisture is at 34%. Give 30 minutes of drip irrigation before noon.',
    tag: 'Irrigation',
    priority: 'high',
  },
  {
    id: 't2',
    title: 'Apply urea top dressing',
    text: 'Recommended 25 kg urea for the maize field this evening. Light rain expected.',
    tag: 'Fertiliser',
    priority: 'medium',
  },
  {
    id: 't3',
    title: 'Watch for leaf blast',
    text: 'Humidity is rising. Check paddy leaves for early blast spots after 4 PM.',
    tag: 'Pest Watch',
    priority: 'medium',
  },
  {
    id: 't4',
    title: 'Best window to sell wheat',
    text: 'Mandi prices are trending up. Consider selling 10 quintals this week.',
    tag: 'Market',
    priority: 'low',
  },
];

export const QUICK_ACTIONS = [
  { label: 'AI Sathi', to: '/dashboard/ai-assistant', icon: 'FiCpu', color: 'primary' },
  { label: 'Weather', to: '/dashboard/weather', icon: 'FiCloudDrizzle', color: 'sky' },
  { label: 'Market Prices', to: '/dashboard/market-prices', icon: 'FiTrendingUp', color: 'accent' },
  { label: 'Buy & Sell', to: '/dashboard/marketplace/listings', icon: 'FiShoppingBag', color: 'violet' },
];

export const MANDI_PRICES = [
  { crop: 'Wheat', price: 2450, unit: '/quintal', market: 'Ludhiana', change: 2.4, up: true },
  { crop: 'Paddy', price: 2180, unit: '/quintal', market: 'Patiala', change: 1.1, up: true },
  { crop: 'Maize', price: 2020, unit: '/quintal', market: 'Jalandhar', change: 0.8, up: false },
  { crop: 'Cotton', price: 7350, unit: '/quintal', market: 'Bathinda', change: 1.6, up: true },
  { crop: 'Sugarcane', price: 340, unit: '/quintal', market: 'Amritsar', change: 0.3, up: false },
];

export const ORDERS = [
  {
    id: 'ORD-2841',
    crop: 'Wheat',
    qty: '12 quintals',
    amount: '₹29,400',
    status: 'Delivered',
    statusKey: 'delivered',
    date: 'Today, 9:15 AM',
    buyer: 'Punjab Agro Corp',
  },
  {
    id: 'ORD-2838',
    crop: 'Paddy',
    qty: '8 quintals',
    amount: '₹17,440',
    status: 'In Transit',
    statusKey: 'transit',
    date: 'Yesterday, 4:20 PM',
    buyer: 'Local Mandi Buyer',
  },
  {
    id: 'ORD-2835',
    crop: 'Maize',
    qty: '5 quintals',
    amount: '₹10,100',
    status: 'Placed',
    statusKey: 'placed',
    date: '2 days ago',
    buyer: 'Kisan Store Co-op',
  },
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'weather',
    title: 'Heavy rain expected Friday',
    text: '76% chance of rainfall in your area. Consider delaying urea application.',
    time: '10 min ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'price',
    title: 'Wheat price crossed ₹2,450',
    text: 'Ludhiana mandi is offering the best rate in the region today.',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'order',
    title: 'Order ORD-2841 delivered',
    text: 'Payment of ₹29,400 will be credited within 24 hours.',
    time: '3 hrs ago',
    unread: false,
  },
  {
    id: 'n4',
    type: 'tip',
    title: 'Soil test reminder',
    text: 'Your last soil test was 6 months ago. Schedule a new one soon.',
    time: 'Yesterday',
    unread: false,
  },
];

export const CROPS = [
  { name: 'Wheat', image: '/assets/crops/wheat.jpg', area: '4.5 ac', stage: 'Harvest ready', stageProgress: 92, health: 'Excellent', healthKey: 'excellent', yield: '14.2 t' },
  { name: 'Basmati Paddy', image: '/assets/crops/rice.jpg', area: '3.2 ac', stage: 'Grain filling', stageProgress: 71, health: 'Good', healthKey: 'good', yield: '11.6 t' },
  { name: 'Potato (Kufri Jyoti)', image: '/assets/crops/potato.jpg', area: '2.5 ac', stage: 'Tuber bulking', stageProgress: 80, health: 'Excellent', healthKey: 'excellent', yield: '18.5 t' },
  { name: 'Onion (Nashik Red)', image: '/assets/crops/onion.jpg', area: '2.0 ac', stage: 'Bulb maturity', stageProgress: 88, health: 'Good', healthKey: 'good', yield: '15.0 t' },
  { name: 'Garlic (Yamuna Safed)', image: '/assets/crops/garlic.jpg', area: '1.2 ac', stage: 'Clove development', stageProgress: 75, health: 'Excellent', healthKey: 'excellent', yield: '6.4 t' },
  { name: 'Gram (Chana)', image: '/assets/crops/gram.jpg', area: '2.2 ac', stage: 'Pod filling', stageProgress: 65, health: 'Good', healthKey: 'good', yield: '5.2 t' },
  { name: 'French Beans', image: '/assets/crops/beans.jpg', area: '1.0 ac', stage: 'Harvesting', stageProgress: 95, health: 'Excellent', healthKey: 'excellent', yield: '4.8 t' },
  { name: 'Arhar Dal (Toor)', image: '/assets/crops/arhardal.jpg', area: '2.0 ac', stage: 'Pod maturity', stageProgress: 82, health: 'Good', healthKey: 'good', yield: '7.1 t' },
  { name: 'Maize', image: '/assets/crops/maize.jpg', area: '2.8 ac', stage: 'Vegetative', stageProgress: 45, health: 'Needs attention', healthKey: 'attention', yield: '8.1 t' },
  { name: 'Mustard', image: '/assets/crops/mustard.jpg', area: '1.8 ac', stage: 'Pod setting', stageProgress: 78, health: 'Good', healthKey: 'good', yield: '3.9 t' },
  { name: 'Cotton', image: '/assets/crops/cotton.jpg', area: '2.0 ac', stage: 'Boll development', stageProgress: 60, health: 'Good', healthKey: 'good', yield: '4.3 t' },
];

export const SOIL_HEALTH = {
  rating: 'Good',
  ratingScore: 76,
  ph: { value: 6.8, range: '6.5 - 7.5', status: 'Optimal' },
  npk: [
    { name: 'Nitrogen (N)', value: 62, ideal: 'High', status: 'Optimal' },
    { name: 'Phosphorus (P)', value: 48, ideal: 'Medium', status: 'Moderate' },
    { name: 'Potassium (K)', value: 55, ideal: 'Medium-High', status: 'Optimal' },
  ],
  moisture: 34,
  organicCarbon: 0.68,
  texture: 'Loamy sand',
  lastTested: 'Feb 2026',
};

export const RECOMMENDED_CROPS = [
  { name: 'Arhar Dal (Toor)', image: '/assets/crops/arhardal.jpg', suitability: 94, window: 'Jul - Nov', reason: 'GI-tagged pulse with top market demand', color: '#16a34a' },
  { name: 'Garlic (Yamuna Safed)', image: '/assets/crops/garlic.jpg', suitability: 91, window: 'Sep - Jan', reason: 'High margin cash crop, optimal soil fit', color: '#0ea5e9' },
  { name: 'Potato (Kufri Jyoti)', image: '/assets/crops/potato.jpg', suitability: 88, window: 'Oct - Feb', reason: 'High yield potential & strong buyer offtake', color: '#f59e0b' },
];

export const CHART_PRICE_TREND = [
  { month: 'Mar', wheat: 2050, paddy: 1980 },
  { month: 'Apr', wheat: 2120, paddy: 2010 },
  { month: 'May', wheat: 2210, paddy: 2050 },
  { month: 'Jun', wheat: 2280, paddy: 2100 },
  { month: 'Jul', wheat: 2360, paddy: 2150 },
  { month: 'Aug', wheat: 2450, paddy: 2180 },
];

export const CHART_CROP_DISTRIBUTION = [
  { name: 'Wheat', value: 36, color: '#16a34a' },
  { name: 'Paddy', value: 26, color: '#22c55e' },
  { name: 'Maize', value: 22, color: '#f59e0b' },
  { name: 'Cotton', value: 16, color: '#0ea5e9' },
];

export const CHART_YIELD_COMPARISON = [
  { season: 'Rabi 2024', actual: 31.4, target: 30 },
  { season: 'Kharif 2025', actual: 33.8, target: 32 },
  { season: 'Rabi 2025', actual: 34.2, target: 34 },
  { season: 'Kharif 2026', actual: 38.2, target: 36 },
];