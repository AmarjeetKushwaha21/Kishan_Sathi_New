export const PUBLIC_PAGES = {
  agriculture: {
    title: 'Agriculture Store',
    subtitle:
      'Seeds, fertilisers, tools and equipment delivered to your village haat. Quality-assured inputs, transparent pricing, and pay-on-delivery — all in one place.',
    primaryLabel: 'Shop Inputs',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '🛒',
    color: 'from-sky-400 to-blue-500',
    features: [
      {
        title: 'Trusted Agri-Inputs',
        text: 'Certified seeds, organic fertilisers and farm tools from verified retailers across your district.',
      },
      {
        title: 'Local Delivery',
        text: 'Get inputs delivered to your doorstep, even in remote areas, with real-time tracking.',
      },
      {
        title: 'Pay Later Options',
        text: 'Zero-cost EMI, pay-on-delivery and crop-sale backed financing available for eligible farmers.',
      },
    ],
    benefits: [
      'Up to 25% savings vs local arhtiyas',
      'Genuine quality guarantee on every product',
      'Same-day delivery in major mandi towns',
      'Regional language support for product info',
    ],
    dashboardRoute: '/dashboard/bazaar',
  },
  marketplace: {
    title: 'Buy & Sell Bazaar',
    subtitle:
      'Sell your produce directly to verified buyers and buy what you need from trusted sellers — no middlemen, better prices, every season.',
    primaryLabel: 'Start Trading',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '🌾',
    color: 'from-amber-400 to-orange-500',
    features: [
      {
        title: 'Sell Your Harvest',
        text: 'List your crops in seconds, set your price, and get matched with nearby buyers.',
      },
      {
        title: 'Discover Inputs',
        text: 'Source quality seeds, fertiliser and tools directly from sellers, without middlemen.',
      },
      {
        title: 'Secure Transactions',
        text: 'Escrow-backed payments and doorstep pickup/drop so every trade is safe.',
      },
    ],
    benefits: [
      '2.5x more price discovery than local mandis',
      'Direct buyer-seller matching',
      'Trusted seller and buyer ratings',
      'Multi-language chat built in',
    ],
    dashboardRoute: '/dashboard/marketplace/listings',
  },
  weather: {
    title: 'Weather Intelligence',
    subtitle:
      'Hyper-local forecasts, rain alerts and advisory warnings tailored to your village so you can protect your yield from bad weather.',
    primaryLabel: 'Check Forecast',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '🌦️',
    color: 'from-sky-400 to-cyan-500',
    features: [
      {
        title: 'Village-Level Forecasts',
        text: '7-day and hourly forecasts for your exact field location, in your language.',
      },
      {
        title: 'Early Warnings',
        text: 'Storm, hail, heatwave and frost alerts sent before they hit your crop.',
      },
      {
        title: 'Irrigation Advisory',
        text: 'AI suggests irrigation timing based on soil moisture and upcoming weather.',
      },
    ],
    benefits: [
      'Reduce weather-related crop loss by up to 30%',
      'Voice alerts even on basic phones',
      'Offline forecasts for patchy networks',
      'Advisories in 8 Indian languages',
    ],
    dashboardRoute: '/dashboard/weather',
  },
  'mandi-prices': {
    title: 'Live Market Prices',
    subtitle:
      'Real-time mandi prices across nearby markets so you always sell at the right time and never leave money on the table.',
    primaryLabel: 'View Prices',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '📈',
    color: 'from-primary-400 to-primary-600',
    features: [
      {
        title: 'Today’s Rates',
        text: 'Live modal prices for your crops across every mandi within 100 km.',
      },
      {
        title: 'Price Trends',
        text: '7-day, 30-day and seasonal trends with charts so you time your sell right.',
      },
      {
        title: 'Best Market Finder',
        text: 'Instantly compare rates and get a recommendation for the best mandi to sell at.',
      },
    ],
    benefits: [
      'Know the price before you harvest',
      'Compare 120+ mandis in one view',
      'Get notified when prices rise',
      'Historical data for every commodity',
    ],
    dashboardRoute: '/dashboard/market-prices',
  },
  'crop-recommendation': {
    title: 'AI Crop Advisor',
    subtitle:
      'Personalised sowing, irrigation and fertiliser advice based on your soil type, weather and the crops you grow.',
    primaryLabel: 'Get Recommendations',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '🧠',
    color: 'from-primary-500 to-emerald-600',
    features: [
      {
        title: 'Crop Selection',
        text: 'AI suggests the best crop to grow next based on soil, season and local yields.',
      },
      {
        title: 'Sowing Schedule',
        text: 'Get personalised sowing, intercropping and harvesting dates for your farm.',
      },
      {
        title: 'Input Guidance',
        text: 'Recommended fertiliser, pesticide and irrigation plans to maximise profit.',
      },
    ],
    benefits: [
      '10–25% higher yields with better planning',
      'Advice in your regional language',
      'Works offline in remote fields',
      'Trusted by KVKs and agronomists',
    ],
    dashboardRoute: '/dashboard/recommendation',
  },
  'disease-detection': {
    title: 'Pest & Disease Alerts',
    subtitle:
      'Spot crop problems early with photo-based AI detection and get instant, locally relevant remedies and treatment schedules.',
    primaryLabel: 'Detect Problem',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '🔍',
    color: 'from-red-400 to-rose-500',
    features: [
      {
        title: 'Photo Diagnosis',
        text: 'Snap a picture of the affected leaf or stem and get an instant diagnosis in seconds.',
      },
      {
        title: 'Treatment Plan',
        text: 'Actionable remedies, dosages and spray schedules tailored to your crop and region.',
      },
      {
        title: 'Prevention Alerts',
        text: 'Proactive warnings about pest cycles and weather conditions that favour disease spread.',
      },
    ],
    benefits: [
      'Save up to 40% of your crop loss',
      'No internet? Diagnosis works offline',
      'Trusted remedies from local agronomists',
      'Multilingual treatment instructions',
    ],
    dashboardRoute: '/dashboard/disease-detection',
  },
  'expert-consultation': {
    title: 'Expert Support',
    subtitle:
      'Chat or video call with certified agricultural experts in your own language — anytime, anywhere — and get answers you can act on.',
    primaryLabel: 'Chat with an Expert',
    primaryTo: '/register',
    secondaryLabel: 'Log in',
    secondaryTo: '/login',
    icon: '👨‍🌾',
    color: 'from-indigo-400 to-purple-600',
    features: [
      {
        title: 'Multilingual Experts',
        text: 'Talk to agronomists who speak your language and understand your local conditions.',
      },
      {
        title: 'Live + Chat Support',
        text: 'Choose a quick chat, voice note or a scheduled video call at your convenience.',
      },
      {
        title: 'Save & Learn',
        text: 'Every session is saved so you can review advice and build your own knowledge base.',
      },
    ],
    benefits: [
      'Response in under 5 minutes',
      'Pay only for the minutes you use',
      'Verified experts with local experience',
      'Available 7 AM – 9 PM, all days',
    ],
    dashboardRoute: '/dashboard/consultation',
  },
};

export const FEATURE_NAV = [
  { label: 'AI Crop Advisor', to: '/crop-recommendation' },
  { label: 'Weather Intelligence', to: '/weather' },
  { label: 'Live Market Prices', to: '/mandi-prices' },
  { label: 'Pest & Disease Alerts', to: '/disease-detection' },
  { label: 'Buy & Sell Bazaar', to: '/marketplace' },
  { label: 'Agriculture Store', to: '/agriculture-store' },
  { label: 'Expert Support', to: '/expert-consultation' },
];
