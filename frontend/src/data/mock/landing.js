import {
  FiCpu,
  FiCloudDrizzle,
  FiTrendingUp,
  FiShield,
  FiShoppingBag,
  FiMessageSquare,
  FiSun,
  FiBookOpen,
  FiCalendar,
} from 'react-icons/fi';

export const HERO_STATS = [
  { value: '50K+', label: 'Active Farmers' },
  { value: '120+', label: 'Districts Covered' },
  { value: '98%', label: 'Happy Farmers' },
];

export const FEATURES = [
  {
    icon: FiCpu,
    title: 'AI Crop Advisor',
    text: 'Get personalised sowing, irrigation and fertiliser advice based on your soil and crop.',
    to: '/dashboard/recommendation',
  },
  {
    icon: FiCloudDrizzle,
    title: 'Weather Intelligence',
    text: 'Hyper-local forecasts and early warnings to protect your yield from bad weather.',
    to: '/dashboard/weather',
  },
  {
    icon: FiTrendingUp,
    title: 'Live Market Prices',
    text: 'Real-time mandi prices across nearby markets so you always sell at the right time.',
    to: '/dashboard/market-prices',
  },
  {
    icon: FiShield,
    title: 'Pest & Disease Alerts',
    text: 'Spot crop problems early with photo-based detection and instant remedies.',
    to: '/dashboard/disease-detection/alerts',
  },
  {
    icon: FiShoppingBag,
    title: 'Buy & Sell Bazaar',
    text: 'Connect directly with buyers, sellers and local cooperatives in your region.',
    to: '/dashboard/marketplace/listings',
  },
  {
    icon: FiMessageSquare,
    title: 'Expert Support',
    text: 'Chat with agricultural experts in your language, anytime, anywhere.',
    to: '/dashboard/consultation',
  },
];

export const STEPS = [
  {
    icon: FiSun,
    step: '01',
    title: 'Create your farm profile',
    text: 'Tell us your location, soil type and the crops you grow.',
  },
  {
    icon: FiCalendar,
    step: '02',
    title: 'Get daily smart guidance',
    text: 'Receive tailored advice on sowing, watering and fertilising.',
  },
  {
    icon: FiTrendingUp,
    step: '03',
    title: 'Sell at the best price',
    text: 'Track live market rates and connect with verified buyers.',
  },
  {
    icon: FiBookOpen,
    step: '04',
    title: 'Grow with confidence',
    text: 'Learn, improve and watch your farm yields grow every season.',
  },
];

export const WHY_US = [
  'Works offline for remote farms',
  'Support in 8 Indian languages',
  'Privacy-first data handling',
  'Built with local agri experts',
];

export const TESTIMONIALS = [
  {
    name: 'Baldev Singh',
    village: 'Ludhiana, Punjab',
    quote:
      'The AI advisor saved my wheat crop this season. The pest alert came right on time and the remedy worked within days.',
  },
  {
    name: 'Lakshmi Devi',
    village: 'Madurai, Tamil Nadu',
    quote:
      'Market price updates helped me earn ₹4,000 more per quintal. My whole village now uses Kishan Sathi.',
  },
  {
    name: 'Suresh Patil',
    village: 'Nashik, Maharashtra',
    quote:
      'Even without great internet, everything works. The weather alerts have been spot on every single time.',
  },
];

export const STATS = [
  { value: '50K+', label: 'Farmers Onboard' },
  { value: '8', label: 'Languages' },
  { value: '120+', label: 'Districts' },
  { value: '2M+', label: 'Crop Reports' },
];