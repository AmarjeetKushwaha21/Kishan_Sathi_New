export const ADMIN_NAV = [
  { to: '/dashboard/admin', label: 'Dashboard', icon: 'FiHome', end: true },
  { to: '/dashboard/admin/users', label: 'Users', icon: 'FiUsers' },
  { to: '/dashboard/admin/farmers', label: 'Farmers', icon: 'FiUser' },
  { to: '/dashboard/admin/companies', label: 'Companies', icon: 'FiBriefcase' },
  { to: '/dashboard/admin/experts', label: 'Experts', icon: 'FiAward' },
  { to: '/dashboard/admin/products', label: 'Products', icon: 'FiBox' },
  { to: '/dashboard/admin/orders', label: 'Orders', icon: 'FiShoppingCart' },
  { to: '/dashboard/admin/marketplace', label: 'Marketplace', icon: 'FiShoppingBag' },
  { to: '/dashboard/admin/reports', label: 'Reports', icon: 'FiFileText' },
  { to: '/dashboard/admin/analytics', label: 'Analytics', icon: 'FiBarChart2' },
  { to: '/dashboard/admin/notifications', label: 'Notifications', icon: 'FiBell' },
  { to: '/dashboard/admin/settings', label: 'Settings', icon: 'FiSettings' },
];

export const REVENUE_TREND = [
  { month: 'Sep', revenue: 320000, orders: 1420 },
  { month: 'Oct', revenue: 380000, orders: 1680 },
  { month: 'Nov', revenue: 355000, orders: 1540 },
  { month: 'Dec', revenue: 460000, orders: 2010 },
  { month: 'Jan', revenue: 428000, orders: 1870 },
  { month: 'Feb', revenue: 510000, orders: 2260 },
  { month: 'Mar', revenue: 578000, orders: 2540 },
  { month: 'Apr', revenue: 522000, orders: 2310 },
  { month: 'May', revenue: 640000, orders: 2780 },
  { month: 'Jun', revenue: 590000, orders: 2620 },
  { month: 'Jul', revenue: 720000, orders: 3150 },
  { month: 'Aug', revenue: 782000, orders: 3410 },
];

export const WEEKLY_ORDERS = [
  { day: 'Mon', orders: 320, revenue: 72000 },
  { day: 'Tue', orders: 410, revenue: 91000 },
  { day: 'Wed', orders: 385, revenue: 84500 },
  { day: 'Thu', orders: 452, revenue: 101200 },
  { day: 'Fri', orders: 498, revenue: 112400 },
  { day: 'Sat', orders: 560, revenue: 128900 },
  { day: 'Sun', orders: 301, revenue: 68400 },
];

export const USER_GROWTH = [
  { month: 'Mar', users: 8200, farmers: 7100 },
  { month: 'Apr', users: 9800, farmers: 8500 },
  { month: 'May', users: 11400, farmers: 9900 },
  { month: 'Jun', users: 13200, farmers: 11400 },
  { month: 'Jul', users: 15800, farmers: 13600 },
  { month: 'Aug', users: 18600, farmers: 15900 },
];

export const CATEGORY_SPLIT = [
  { name: 'Seeds', value: 340, color: '#16a34a' },
  { name: 'Fertilizer', value: 285, color: '#f59e0b' },
  { name: 'Pesticides', value: 190, color: '#0ea5e9' },
  { name: 'Equipment', value: 140, color: '#8b5cf6' },
  { name: 'Services', value: 95, color: '#f43f5e' },
];

export const ADMIN_USERS = [
  { id: 'U-1042', name: 'Amarjeet Kushwaha', phone: '+91 98765 43210', role: 'Farmer', joined: '12 Mar 2026', status: 'active' },
  { id: 'U-1041', name: 'Gurpreet Singh', phone: '+91 98144 22001', role: 'Farmer', joined: '11 Mar 2026', status: 'active' },
  { id: 'U-1040', name: 'AgroCorp India', phone: '+91 99155 11200', role: 'Company', joined: '10 Mar 2026', status: 'active' },
  { id: 'U-1039', name: 'Dr. Amandeep Kaur', phone: '+91 99600 77812', role: 'Expert', joined: '09 Mar 2026', status: 'pending' },
  { id: 'U-1038', name: 'Shubham Traders', phone: '+91 93310 44567', role: 'Company', joined: '08 Mar 2026', status: 'active' },
  { id: 'U-1037', name: 'Harpreet Kaur', phone: '+91 98555 33210', role: 'Farmer', joined: '07 Mar 2026', status: 'banned' },
  { id: 'U-1036', name: 'Kisan Mandi Ltd.', phone: '+91 98100 55678', role: 'Company', joined: '05 Mar 2026', status: 'active' },
  { id: 'U-1035', name: 'Mohinder Singh', phone: '+91 98711 88776', role: 'Farmer', joined: '02 Mar 2026', status: 'inactive' },
  { id: 'U-1034', name: 'Punjab Agro', phone: '+91 98222 99001', role: 'Company', joined: '28 Feb 2026', status: 'active' },
  { id: 'U-1033', name: 'Suresh Kumar', phone: '+91 98123 44556', role: 'Driver', joined: '25 Feb 2026', status: 'active' },
];

export const ADMIN_FARMERS = [
  { id: 'F-2101', name: 'Amarjeet Kushwaha', village: 'Gaddowal', district: 'Ludhiana', landArea: '22.5 acres', verified: true, status: 'active', lastActive: 'Today' },
  { id: 'F-2100', name: 'Gurpreet Singh', village: 'Jassian', district: 'Ludhiana', landArea: '14 acres', verified: true, status: 'active', lastActive: 'Today' },
  { id: 'F-2099', name: 'Harpreet Kaur', village: 'Sahnewal', district: 'Ludhiana', landArea: '9 acres', verified: false, status: 'active', lastActive: '2 days ago' },
  { id: 'F-2098', name: 'Mohinder Singh', village: 'Khanna', district: 'Khanna', landArea: '31 acres', verified: true, status: 'inactive', lastActive: '1 week ago' },
  { id: 'F-2097', name: 'Baldev Singh', village: 'Jagraon', district: 'Ludhiana', landArea: '18 acres', verified: true, status: 'active', lastActive: 'Yesterday' },
  { id: 'F-2096', name: 'Simran Kaur', village: 'Samrala', district: 'Ludhiana', landArea: '7 acres', verified: true, status: 'active', lastActive: '3 days ago' },
  { id: 'F-2095', name: 'Jaswinder Singh', village: 'Raikot', district: 'Ludhiana', landArea: '26 acres', verified: false, status: 'banned', lastActive: '3 weeks ago' },
];

export const ADMIN_COMPANIES = [
  { id: 'C-304', name: 'AgroCorp India', sector: 'Fertilizer & Seeds', location: 'Ludhiana', listings: 42, rating: 4.7, status: 'active' },
  { id: 'C-303', name: 'Shubham Traders', sector: 'Crop Trading', location: 'Khanna', listings: 28, rating: 4.5, status: 'active' },
  { id: 'C-302', name: 'Kisan Mandi Ltd.', sector: 'Crop Trading', location: 'Jagraon', listings: 35, rating: 4.3, status: 'active' },
  { id: 'C-301', name: 'Punjab Agro', sector: 'Warehousing & Logistics', location: 'Ludhiana', listings: 18, rating: 4.8, status: 'active' },
  { id: 'C-300', name: 'GreenSeeds Co.', sector: 'Seeds', location: 'Mandi Gobindgarh', listings: 15, rating: 4.1, status: 'pending' },
  { id: 'C-299', name: 'Mahindra AgroTech', sector: 'Equipment', location: 'Chandigarh', listings: 22, rating: 4.9, status: 'active' },
];

export const ADMIN_EXPERTS = [
  { id: 'E-110', name: 'Dr. Amandeep Singh', specialty: 'Agronomy', experience: 14, rating: 4.8, consultations: 342, fee: '₹500', status: 'verified' },
  { id: 'E-109', name: 'Dr. Preeti Sharma', specialty: 'Soil Science', experience: 9, rating: 4.7, consultations: 214, fee: '₹400', status: 'verified' },
  { id: 'E-108', name: 'Dr. Vikram Bedi', specialty: 'Plant Pathology', experience: 18, rating: 4.9, consultations: 428, fee: '₹600', status: 'verified' },
  { id: 'E-107', name: 'Er. Sandeep Gill', specialty: 'Irrigation & Machinery', experience: 11, rating: 4.5, consultations: 156, fee: '₹350', status: 'verified' },
  { id: 'E-106', name: 'Dr. Ritu Verma', specialty: 'Crop Insurance', experience: 7, rating: 4.2, consultations: 88, fee: '₹300', status: 'pending' },
  { id: 'E-105', name: 'Dr. Naresh Joshi', specialty: 'Agri-Marketing', experience: 12, rating: 3.9, consultations: 73, fee: '₹400', status: 'suspended' },
];

export const ADMIN_PRODUCTS = [
  { id: 'P-501', name: 'HD-2967 Wheat Seeds (10kg)', category: 'Seeds', price: 480, stock: 240, sold: 1320, status: 'active' },
  { id: 'P-502', name: 'DAP Fertilizer 50kg', category: 'Fertilizer', price: 1350, stock: 88, sold: 2110, status: 'active' },
  { id: 'P-503', name: 'Urea 45kg Bag', category: 'Fertilizer', price: 266, stock: 510, sold: 3480, status: 'active' },
  { id: 'P-504', name: 'Neem Oil Spray 500ml', category: 'Pesticides', price: 220, stock: 0, sold: 640, status: 'out-of-stock' },
  { id: 'P-505', name: 'PVC Drip Pipe Kit', category: 'Equipment', price: 2499, stock: 64, sold: 180, status: 'active' },
  { id: 'P-506', name: 'Bio-Growth Booster 1L', category: 'Fertilizer', price: 340, stock: 12, sold: 390, status: 'active' },
  { id: 'P-507', name: 'Power Sprayer 16L', category: 'Equipment', price: 3299, stock: 24, sold: 95, status: 'draft' },
];

export const ADMIN_ORDERS = [
  { id: 'KS-BZ-1187', customer: 'Amarjeet Kushwaha', items: 3, amount: 1540, status: 'delivered', date: '12 Aug 2026', payment: 'UPI' },
  { id: 'KS-BZ-1186', customer: 'Gurpreet Singh', items: 2, amount: 1620, status: 'shipped', date: '12 Aug 2026', payment: 'COD' },
  { id: 'KS-BZ-1185', customer: 'Harpreet Kaur', items: 5, amount: 4010, status: 'placed', date: '11 Aug 2026', payment: 'UPI' },
  { id: 'KS-BZ-1184', customer: 'Simran Kaur', items: 1, amount: 266, status: 'shipped', date: '10 Aug 2026', payment: 'Wallet' },
  { id: 'KS-BZ-1183', customer: 'Baldev Singh', items: 4, amount: 3380, status: 'delivered', date: '09 Aug 2026', payment: 'UPI' },
  { id: 'KS-BZ-1182', customer: 'Mohinder Singh', items: 2, amount: 960, status: 'cancelled', date: '08 Aug 2026', payment: 'UPI' },
  { id: 'KS-BZ-1181', customer: 'Gurpreet Singh', items: 6, amount: 5220, status: 'delivered', date: '07 Aug 2026', payment: 'COD' },
  { id: 'KS-BZ-1180', customer: 'Amarjeet Kushwaha', items: 1, amount: 450, status: 'refunded', date: '06 Aug 2026', payment: 'UPI' },
];

export const ADMIN_LISTINGS = [
  { id: 'CR-021', crop: 'Wheat', quantity: '12 qtl', price: '₹2,140/q', farmer: 'Amarjeet Kushwaha', company: 'AgroCorp India', offers: 4, status: 'open', date: '12 Aug 2026' },
  { id: 'CR-020', crop: 'Potato', quantity: '45 qtl', price: '₹1,150/q', farmer: 'Gurpreet Singh', company: 'Shubham Traders', offers: 7, status: 'open', date: '11 Aug 2026' },
  { id: 'CR-019', crop: 'Paddy', quantity: '80 qtl', price: '₹2,300/q', farmer: 'Baldev Singh', company: 'Kisan Mandi Ltd.', offers: 2, status: 'deal', date: '09 Aug 2026' },
  { id: 'CR-018', crop: 'Onion', quantity: '20 qtl', price: '₹1,180/q', farmer: 'Simran Kaur', company: '—', offers: 1, status: 'open', date: '08 Aug 2026' },
  { id: 'CR-017', crop: 'Maize', quantity: '40 qtl', price: '₹1,975/q', farmer: 'Amarjeet Kushwaha', company: 'Punjab Agro', offers: 3, status: 'deal', date: '05 Aug 2026' },
  { id: 'CR-016', crop: 'Fodder', quantity: '30 qtl', price: '₹700/q', farmer: 'Harpreet Kaur', company: '—', offers: 0, status: 'closed', date: '01 Aug 2026' },
];

export const ADMIN_REPORTS = [
  { id: 'RPT-2208', title: 'Monthly performance — August 2026', type: 'Monthly', date: '01 Sep 2026', status: 'generated', summary: 'Revenue up 12% MoM, 3,410 orders, 1,240 new farmers.' },
  { id: 'RPT-2207', title: 'Quarterly marketplace review — Q2', type: 'Quarterly', date: '01 Jul 2026', status: 'generated', summary: 'Fertilizer and seed sales lead category growth.' },
  { id: 'RPT-2206', title: 'Compliance report — KYC coverage', type: 'Compliance', date: '20 Jun 2026', status: 'generated', summary: '92% of active sellers completed KYC verification.' },
  { id: 'RPT-2205', title: 'Draft — Logistics performance', type: 'Monthly', date: '—', status: 'draft', summary: 'On-time delivery rate improved to 96%.' },
  { id: 'RPT-2204', title: 'Fraud flag review — May 2026', type: 'Compliance', date: '05 Jun 2026', status: 'generated', summary: '6 accounts flagged, 4 suspended after review.' },
];

export const ADMIN_ISSUES = [
  { id: 'ISS-88', from: 'Mohinder Singh', subject: 'Payout delay for maize deal', priority: 'high', status: 'open', date: '12 Aug 2026' },
  { id: 'ISS-87', from: 'Shubham Traders', subject: 'Listing approval pending since 3 days', priority: 'medium', status: 'open', date: '11 Aug 2026' },
  { id: 'ISS-86', from: 'Harpreet Kaur', subject: 'Wrong soil report values', priority: 'high', status: 'resolved', date: '09 Aug 2026' },
  { id: 'ISS-85', from: 'GreenSeeds Co.', subject: 'KYC document rejected — resubmit', priority: 'low', status: 'open', date: '07 Aug 2026' },
  { id: 'ISS-84', from: 'Gurpreet Singh', subject: 'Coupon not applied on order', priority: 'low', status: 'resolved', date: '05 Aug 2026' },
];

export const ANALYTICS_REGIONS = [
  { region: 'Ludhiana', sales: 184000, orders: 980, share: 32 },
  { region: 'Khanna', sales: 118000, orders: 640, share: 21 },
  { region: 'Jagraon', sales: 92000, orders: 510, share: 16 },
  { region: 'Samrala', sales: 74000, orders: 400, share: 13 },
  { region: 'Mandi Gobindgarh', sales: 61000, orders: 330, share: 11 },
  { region: 'Other', sales: 39000, orders: 210, share: 7 },
];

export const ANALYTICS_CHANNELS = [
  { name: 'Direct', value: 38, color: '#16a34a' },
  { name: 'Referrals', value: 22, color: '#f59e0b' },
  { name: 'Social', value: 18, color: '#0ea5e9' },
  { name: 'Marketplace', value: 14, color: '#8b5cf6' },
  { name: 'SMS', value: 8, color: '#f43f5e' },
];

export const ANALYTICS_RETENTION = [
  { week: 'W1', retention: 82 },
  { week: 'W2', retention: 74 },
  { week: 'W3', retention: 68 },
  { week: 'W4', retention: 61 },
  { week: 'W5', retention: 57 },
  { week: 'W6', retention: 54 },
  { week: 'W7', retention: 52 },
  { week: 'W8', retention: 50 },
];

export const ADMIN_NOTIFICATIONS = [
  { id: 'an-1', category: 'system', title: 'Server maintenance scheduled', body: 'Platform will be under maintenance on 16 Aug, 2:00–3:00 AM IST.', minutesAgo: 30, read: false },
  { id: 'an-2', category: 'order', title: 'High refund rate this week', body: 'Refunds rose to 3.2% of orders. Review the cancelled order queue.', minutesAgo: 120, read: false },
  { id: 'an-3', category: 'user', title: 'New expert pending approval', body: 'Dr. Ritu Verma (Crop Insurance) submitted credentials for review.', minutesAgo: 240, read: false },
  { id: 'an-4', category: 'report', title: 'Monthly report generated', body: 'August performance report is ready for download.', minutesAgo: 500, read: false },
  { id: 'an-5', category: 'user', title: '3 sellers flagged', body: 'Automated checks flagged potential listing issues. Review recommended.', minutesAgo: 900, read: true },
  { id: 'an-6', category: 'system', title: 'API upgrade complete', body: 'Payments API upgraded to v2 without downtime.', minutesAgo: 1500, read: true },
];

export const ADMIN_SETTINGS = [
  {
    section: 'Platform',
    items: [
      { key: 'maintenanceMode', label: 'Maintenance mode', desc: 'Show a maintenance page to all users', type: 'toggle', value: false },
      { key: 'newRegistrations', label: 'Allow new registrations', desc: 'Accept new farmer and buyer sign-ups', type: 'toggle', value: true },
      { key: 'autoVerify', label: 'Auto-verify farmers', desc: 'Auto-approve KYC-verified farmers', type: 'toggle', value: false },
    ],
  },
  {
    section: 'Commissions & fees',
    items: [
      { key: 'marketplaceFee', label: 'Marketplace fee (%)', desc: 'Per-transaction commission on sales', type: 'select', options: ['2%', '3%', '4%', '5%'], value: '3%' },
      { key: 'payoutWindow', label: 'Payout window', desc: 'Days to settle seller payouts', type: 'select', options: ['1 day', '2 days', '3 days', '7 days'], value: '2 days' },
      { key: 'codEnabled', label: 'Cash on delivery', desc: 'Allow COD for Bazaar orders', type: 'toggle', value: true },
    ],
  },
  {
    section: 'Security & moderation',
    items: [
      { key: 'contentModeration', label: 'AI content moderation', desc: 'Scan listings and chat for harmful content', type: 'toggle', value: true },
      { key: 'twoFactor', label: 'Admin 2FA', desc: 'Require two-factor auth for admin accounts', type: 'toggle', value: true },
      { key: 'riskThreshold', label: 'Refund risk threshold', desc: 'Flag orders above this amount for review', type: 'select', options: ['₹2,000', '₹5,000', '₹10,000'], value: '₹5,000' },
    ],
  },
];