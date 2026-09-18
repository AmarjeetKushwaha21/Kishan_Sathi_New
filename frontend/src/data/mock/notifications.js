export const NOTIFICATION_CATEGORIES = [
  { id: 'weather', label: 'Weather Alerts', color: 'sky' },
  { id: 'order', label: 'Order Updates', color: 'emerald' },
  { id: 'offer', label: 'Buyer Offers', color: 'violet' },
  { id: 'message', label: 'Messages', color: 'indigo' },
  { id: 'announcement', label: 'Announcements', color: 'amber' },
];

export const NOTIFICATION_SEED = [
  {
    id: 'ntf-w1',
    category: 'weather',
    title: 'Thunderstorm expected tonight',
    body: 'Heavy rain with thunderstorms likely over Ludhiana district between 6 PM and 10 PM. Secure loose crop covers and keep harvested wheat indoors.',
    minutesAgo: 12,
    read: false,
    action: { label: 'View weather', to: '/dashboard/weather' },
  },
  {
    id: 'ntf-o1',
    category: 'order',
    title: 'Order delivered',
    body: 'Your order #KS-BZ-1187 for hybrid seeds has been delivered to Village Gaddowal. Rate your order to earn Sathi points.',
    minutesAgo: 48,
    read: false,
    action: { label: 'View order', to: '/dashboard/bazaar/my-orders' },
  },
  {
    id: 'ntf-b1',
    category: 'offer',
    title: 'New buyer offer on your wheat',
    body: 'AgroCorp India has placed a bid of ₹2,140/q on your wheat listing #CR-021 (12 qtl). Respond before it expires in 24 hours.',
    minutesAgo: 85,
    read: false,
    action: { label: 'View offer', to: '/dashboard/marketplace/offers' },
  },
  {
    id: 'ntf-a1',
    category: 'announcement',
    title: 'MSP increased for wheat',
    body: 'The government announced MSP of ₹2,420/q for wheat for the 2026-27 season, an increase of ₹95/q over last year.',
    minutesAgo: 150,
    read: false,
    action: { label: 'Check mandi prices', to: '/dashboard/market-prices' },
  },
  {
    id: 'ntf-m1',
    category: 'message',
    title: 'Message from Dr. Amandeep',
    body: 'Your soil report is ready. Dr. Amandeep Singh (Agronomist) suggests a quick consultation to plan the next sowing season.',
    minutesAgo: 200,
    read: false,
    action: { label: 'Open chat', to: '/dashboard/consultation/chat' },
  },
  {
    id: 'ntf-w2',
    category: 'weather',
    title: 'Heatwave advisory',
    body: 'Temperatures may cross 42°C for the next 3 days. Protect nursery beds with shade nets and irrigate during evening hours.',
    minutesAgo: 330,
    read: true,
    action: { label: 'Weather alerts', to: '/dashboard/weather/alerts' },
  },
  {
    id: 'ntf-o2',
    category: 'order',
    title: 'Order shipped',
    body: 'Order #KS-BZ-1184 (bio-fertilizer kit) has been shipped via BlueDart. Expected delivery by tomorrow evening.',
    minutesAgo: 410,
    read: false,
    action: { label: 'Track order', to: '/dashboard/bazaar/my-orders' },
  },
  {
    id: 'ntf-b2',
    category: 'offer',
    title: 'Deal accepted on maize',
    body: 'Punjab Agro accepted your maize deal at ₹1,950/q for 8 qtl. The amount will be transferred to your bank account in 2 working days.',
    minutesAgo: 520,
    read: true,
    action: { label: 'View accepted deals', to: '/dashboard/marketplace/deals' },
  },
  {
    id: 'ntf-m2',
    category: 'message',
    title: 'New buyer message',
    body: 'Shubham Traders sent a message about your onion lot: "Can you supply 20 qtl every week for the next month?"',
    minutesAgo: 690,
    read: false,
    action: { label: 'View listing', to: '/dashboard/marketplace/listings' },
  },
  {
    id: 'ntf-a2',
    category: 'announcement',
    title: 'PM-Kisan instalment credited',
    body: 'The 19th instalment of ₹2,000 under PM-Kisan Samman Nidhi has been released to 9.8 crore farmers across the country.',
    minutesAgo: 1420,
    read: true,
    action: null,
  },
  {
    id: 'ntf-w3',
    category: 'weather',
    title: 'Strong winds ahead',
    body: 'Winds of 35-45 km/h expected tomorrow morning. Take extra care if wheat is ready for harvest in your fields.',
    minutesAgo: 1560,
    read: true,
    action: { label: 'View forecast', to: '/dashboard/weather/7day' },
  },
  {
    id: 'ntf-o3',
    category: 'order',
    title: 'Refund processed',
    body: 'A refund of ₹450 for order #KS-BZ-1179 has been credited to your Kishan Sathi wallet. It will reflect in your bank within 24-48 hours.',
    minutesAgo: 2880,
    read: true,
    action: { label: 'My orders', to: '/dashboard/bazaar/my-orders' },
  },
  {
    id: 'ntf-b3',
    category: 'offer',
    title: 'Counter-offer received',
    body: 'Kisan Mandi Ltd. countered ₹1,180/q for your paddy listing #CR-018. That is ₹40/q above your asking price.',
    minutesAgo: 4320,
    read: false,
    action: { label: 'Review offer', to: '/dashboard/marketplace/offers' },
  },
  {
    id: 'ntf-a3',
    category: 'announcement',
    title: 'Kisan Mela at PAU Ludhiana',
    body: 'Free soil testing camp and crop clinic on 25 August at Punjab Agricultural University. Walk-in between 9 AM and 4 PM.',
    minutesAgo: 5760,
    read: false,
    action: { label: 'Book soil test', to: '/dashboard/soil' },
  },
  {
    id: 'ntf-w4',
    category: 'weather',
    title: 'Frost alert for tomorrow',
    body: 'Light frost expected early morning tomorrow. Cover vegetable nursery beds and keep irrigation pipes drained overnight.',
    minutesAgo: 7200,
    read: true,
    action: { label: 'Weather alerts', to: '/dashboard/weather/alerts' },
  },
  {
    id: 'ntf-m3',
    category: 'message',
    title: 'Market Committee update',
    body: 'Weekly market data for Ludhiana mandi is now published. Potato and onion arrivals increased by 12% this week.',
    minutesAgo: 10080,
    read: true,
    action: { label: 'Mandi prices', to: '/dashboard/market-prices' },
  },
];

export function categoryLabel(id) {
  return NOTIFICATION_CATEGORIES.find((c) => c.id === id)?.label || 'Notification';
}

export function formatTimeAgo(minutesAgo) {
  if (minutesAgo < 1) return 'Just now';
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  if (minutesAgo < 1440) return `${Math.round(minutesAgo / 60)}h ago`;
  if (minutesAgo < 2880) return 'Yesterday';
  return `${Math.round(minutesAgo / 1440)} days ago`;
}

export function groupNotifications(notifications) {
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  notifications.forEach((n) => {
    if (n.minutesAgo < 1440) groups.Today.push(n);
    else if (n.minutesAgo < 2880) groups.Yesterday.push(n);
    else groups.Earlier.push(n);
  });
  return Object.entries(groups).filter(([, items]) => items.length > 0);
}