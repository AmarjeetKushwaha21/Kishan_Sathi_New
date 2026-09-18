import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiTrendingUp,
  FiShoppingBag,
  FiShoppingCart,
  FiCpu,
  FiSettings,
  FiUser,
  FiTag,
  FiPlusCircle,
  FiInbox,
  FiCheckCircle,
  FiCloudDrizzle,
  FiSun,
  FiClock,
  FiUmbrella,
  FiAlertTriangle,
  FiBarChart2,
  FiDroplet,
  FiLayers,
  FiFileText,
  FiMapPin,
  FiThermometer,
  FiHeart,
  FiColumns,
  FiUsers,
  FiVideo,
  FiMessageCircle,
  FiStar,
  FiPackage,
  FiNavigation,
  FiList,
  FiMap,
  FiBell,
  FiCreditCard,
  FiAward,
  FiBriefcase,
  FiBox,
  FiShield,
  FiLogIn,
  FiUserPlus,
  FiInfo,
  FiMail,
} from 'react-icons/fi';

export const PUBLIC_NAV = [
  { label: 'Home', to: '/', icon: FiHome, end: true },
  { label: 'Features', to: '/features', icon: FiGrid },
  { label: 'Agriculture Store', to: '/agriculture-store', icon: FiShoppingCart },
  { label: 'Marketplace', to: '/marketplace', icon: FiShoppingBag },
  { label: 'Weather', to: '/weather', icon: FiCloudDrizzle },
  { label: 'Mandi Prices', to: '/mandi-prices', icon: FiTrendingUp },
  { label: 'AI Crop Advisor', to: '/crop-recommendation', icon: FiCpu },
  { label: 'Disease Detection', to: '/disease-detection', icon: FiShield },
  { label: 'Expert Consultation', to: '/expert-consultation', icon: FiUsers },
  { label: 'About', to: '/about', icon: FiInfo },
  { label: 'Contact', to: '/contact', icon: FiMail },
  { label: 'Login', to: '/login', icon: FiLogIn, auth: true },
  { label: 'Get Started', to: '/register', icon: FiUserPlus, auth: true },
];

export const SIDEBAR_NAV_SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: '/dashboard', icon: FiHome, end: true },
    ],
  },
  {
    id: 'ai-intelligence',
    label: 'AI & Intelligence',
    items: [
      { label: 'AI Assistant', to: '/dashboard/ai-assistant', icon: FiCpu },
      { label: 'Crop Recommender', to: '/dashboard/recommendation', icon: FiTrendingUp },
      { label: 'Agro Advisories', to: '/dashboard/ai-assistant/advisories', icon: FiFileText },
    ],
  },
  {
    id: 'crop-health',
    label: 'Crop Health',
    items: [
      { label: 'Disease Detection', to: '/dashboard/disease-detection', icon: FiShield, end: true },
      { label: 'Scan History', to: '/dashboard/disease-detection/history', icon: FiFileText },
      { label: 'Treatment Library', to: '/dashboard/disease-detection/treatments', icon: FiList },
      { label: 'Pest Alerts', to: '/dashboard/disease-detection/alerts', icon: FiAlertTriangle },
    ],
  },
  {
    id: 'market-business',
    label: 'Market & Business',
    items: [
      { label: 'Buy & Sell', to: '/dashboard/marketplace/listings', icon: FiShoppingBag },
      { label: 'Mandi Prices', to: '/dashboard/market-prices', icon: FiTrendingUp, end: true },
      { label: 'Agriculture Store', to: '/dashboard/bazaar', icon: FiShoppingCart },
    ],
  },
  {
    id: 'farm-management',
    label: 'Farm Management',
    items: [
      { label: 'Weather', to: '/dashboard/weather', icon: FiCloudDrizzle },
      { label: 'Soil Health', to: '/dashboard/soil', icon: FiDroplet },
    ],
  },
  {
    id: 'government-services',
    label: 'Government Services',
    items: [
      { label: 'Central Schemes', to: '/dashboard/central-schemes', icon: FiAward },
      { label: 'State Schemes', to: '/dashboard/state-schemes', icon: FiMapPin },
    ],
  },
  {
    id: 'expert-support',
    label: 'Expert Support',
    items: [
      { label: 'Expert Consultation', to: '/dashboard/consultation', icon: FiUsers },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    items: [
      { label: 'Transport & Tracking', to: '/dashboard/logistics', icon: FiPackage },
    ],
  },
  {
    id: 'activity',
    label: 'Activity',
    items: [
      { label: 'Orders', to: '/dashboard/bazaar/my-orders', icon: FiBox },
      { label: 'Notifications', to: '/dashboard/notifications', icon: FiBell },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      { label: 'Profile', to: '/dashboard/profile', icon: FiUser },
      { label: 'Settings', to: '/dashboard/profile/settings', icon: FiSettings },
    ],
  },
];

export const BOTTOM_NAV_ITEMS = [
  { label: 'Home', to: '/dashboard', icon: FiHome, end: true },
  { label: 'AI Sathi', to: '/dashboard/ai-assistant', icon: FiCpu },
  { label: 'Crop Health', to: '/dashboard/disease-detection', icon: FiShield },
  { label: 'Store', to: '/dashboard/bazaar', icon: FiShoppingCart },
  { label: 'Schemes', to: '/dashboard/central-schemes', icon: FiAward },
];