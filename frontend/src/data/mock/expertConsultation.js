function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function dateLabel(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function fullDateLabel(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' });
}

export const SPECIALTIES = ['All', 'Agronomy', 'Plant Pathology', 'Soil Science', 'Horticulture', 'Crop Protection', 'Agri Economics'];

export const EXPERTS = [
  {
    id: 'e1',
    name: 'Dr. Harpreet Kaur',
    specialty: 'Agronomy',
    short: 'Agronomist',
    initials: 'HK',
    gradient: 'from-emerald-400 to-primary-600',
    experience: 12,
    rating: 4.9,
    reviews: 284,
    rate: 499,
    languages: ['Punjabi', 'Hindi', 'English'],
    verified: true,
    govt: true,
    responseTime: '~15 min',
    consultations: 1240,
    satisfaction: 98,
    emoji: '🌾',
    focus: ['Wheat', 'Paddy', 'Maize'],
    bio: 'Agronomist with a decade in Punjab farming systems. Specialises in high-yield wheat and paddy rotations, seed selection and seasonal crop planning.',
  },
  {
    id: 'e2',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Plant Pathology',
    short: 'Plant Pathologist',
    initials: 'RS',
    gradient: 'from-sky-400 to-indigo-500',
    experience: 15,
    rating: 4.8,
    reviews: 211,
    rate: 599,
    languages: ['Hindi', 'English'],
    verified: true,
    govt: false,
    responseTime: '~20 min',
    consultations: 980,
    satisfaction: 97,
    emoji: '🔬',
    focus: ['Disease diagnosis', 'Fungicide', 'Seed treatment'],
    bio: 'Plant pathologist who diagnoses fungal, bacterial and viral diseases from photos. Trusted for timely blast and rust management advice.',
  },
  {
    id: 'e3',
    name: 'Dr. Manpreet Singh',
    specialty: 'Soil Science',
    short: 'Soil Scientist',
    initials: 'MS',
    gradient: 'from-amber-400 to-orange-500',
    experience: 10,
    rating: 4.7,
    reviews: 167,
    rate: 449,
    languages: ['Punjabi', 'Hindi'],
    verified: true,
    govt: true,
    responseTime: '~25 min',
    consultations: 760,
    satisfaction: 96,
    emoji: '🪱',
    focus: ['Soil health', 'Fertility', 'Fertilizer'],
    bio: 'Soil scientist focused on fertility, pH correction and nutrient budgeting. Reads soil test reports and prescribes balanced fertilization.',
  },
  {
    id: 'e4',
    name: 'Dr. Neha Verma',
    specialty: 'Horticulture',
    short: 'Horticulturist',
    initials: 'NV',
    gradient: 'from-rose-400 to-pink-500',
    experience: 8,
    rating: 4.9,
    reviews: 193,
    rate: 549,
    languages: ['Hindi', 'English'],
    verified: true,
    govt: false,
    responseTime: '~10 min',
    consultations: 890,
    satisfaction: 99,
    emoji: '🍅',
    focus: ['Vegetables', 'Fruits', 'Greenhouse'],
    bio: 'Horticulturist for vegetable and fruit growers. Advises on polyhouse cultivation, grafting, pruning and protected farming.',
  },
  {
    id: 'e5',
    name: 'Dr. Amandeep Gill',
    specialty: 'Crop Protection',
    short: 'Crop Protection',
    initials: 'AG',
    gradient: 'from-violet-400 to-purple-600',
    experience: 14,
    rating: 4.8,
    reviews: 232,
    rate: 649,
    languages: ['Punjabi', 'Hindi', 'English'],
    verified: true,
    govt: false,
    responseTime: '~15 min',
    consultations: 1100,
    satisfaction: 97,
    emoji: '🛡️',
    focus: ['Pesticides', 'IPM', 'Pest control'],
    bio: 'Crop protection specialist. Promotes integrated pest management to cut pesticide bills while keeping pests in check.',
  },
  {
    id: 'e6',
    name: 'Dr. Simran Kaur',
    specialty: 'Agri Economics',
    short: 'Agri Economist',
    initials: 'SK',
    gradient: 'from-teal-400 to-cyan-600',
    experience: 9,
    rating: 4.6,
    reviews: 142,
    rate: 399,
    languages: ['Punjabi', 'Hindi', 'English'],
    verified: false,
    govt: true,
    responseTime: '~30 min',
    consultations: 610,
    satisfaction: 95,
    emoji: '📈',
    focus: ['Market prices', 'Crop planning', 'Subsidies'],
    bio: 'Agri economist helping farmers plan profitable crop mixes, understand mandi trends and apply for government schemes.',
  },
];

export const SLOT_TIMES = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

export function isSlotBooked(expertId, date, time) {
  return hash(`${expertId}|${date}|${time}`) % 3 === 0;
}

export function getAvailableSlots(expertId, date) {
  return SLOT_TIMES.filter((t) => !isSlotBooked(expertId, date, t));
}

export const CONSULT_TYPES = [
  { key: 'video', label: 'Video call', desc: 'Face-to-face live advice', priceFactor: 1, emoji: '📹' },
  { key: 'chat', label: 'Chat', desc: 'Text advice, reply in ~15 min', priceFactor: 0.6, emoji: '💬' },
  { key: 'phone', label: 'Phone call', desc: '15 minute voice consult', priceFactor: 0.8, emoji: '📞' },
];

export const APPOINTMENT_SEED = [
  { id: 'apt-1', expertId: 'e1', date: dateLabel(2), fullDate: fullDateLabel(2), time: '10:30 AM', type: 'video', topic: 'Wheat yellowing diagnosis', price: 499, status: 'upcoming', duration: 30, rating: null },
  { id: 'apt-2', expertId: 'e4', date: dateLabel(4), fullDate: fullDateLabel(4), time: '3:30 PM', type: 'chat', topic: 'Tomato transplanting advice', price: 330, status: 'upcoming', duration: 30, rating: null },
  { id: 'apt-3', expertId: 'e2', date: dateLabel(-6), fullDate: fullDateLabel(-6), time: '11:00 AM', type: 'video', topic: 'Leaf rust in wheat', price: 599, status: 'completed', duration: 22, rating: 5 },
  { id: 'apt-4', expertId: 'e3', date: dateLabel(-20), fullDate: fullDateLabel(-20), time: '2:00 PM', type: 'chat', topic: 'Reading my soil test report', price: 270, status: 'completed', duration: 40, rating: 4 },
  { id: 'apt-5', expertId: 'e5', date: dateLabel(-35), fullDate: fullDateLabel(-35), time: '5:00 PM', type: 'phone', topic: 'Pink bollworm control', price: 519, status: 'completed', duration: 15, rating: 5 },
  { id: 'apt-6', expertId: 'e1', date: dateLabel(-50), fullDate: fullDateLabel(-50), time: '9:00 AM', type: 'chat', topic: 'Paddy nursery density', price: 300, status: 'completed', duration: 35, rating: 4 },
];

export const REVIEWS = {
  e1: [
    { id: 1, author: 'Gurpreet Sandhu', rating: 5, date: '12 Aug 2026', type: 'Video call', comment: 'Very practical advice. My wheat recovered within two weeks.' },
    { id: 2, author: 'Manjeet Kaur', rating: 5, date: '28 Jul 2026', type: 'Chat', comment: 'Explained nitrogen deficiency simply, in Punjabi.' },
    { id: 3, author: 'Sukhdev Singh', rating: 4, date: '9 Jul 2026', type: 'Phone call', comment: 'Good suggestions on sowing time. Wished the call was longer.' },
  ],
  e2: [
    { id: 1, author: 'Harnek Singh', rating: 5, date: '18 Aug 2026', type: 'Video call', comment: 'Identified leaf rust from my photo instantly.' },
    { id: 2, author: 'Balwinder Kaur', rating: 4, date: '2 Aug 2026', type: 'Chat', comment: 'Clear dosage instructions for fungicide.' },
  ],
  e3: [
    { id: 1, author: 'Ravinder Gill', rating: 5, date: '5 Aug 2026', type: 'Chat', comment: 'Explained my soil report page by page. Very helpful.' },
    { id: 2, author: 'Amritpal Singh', rating: 4, date: '21 Jul 2026', type: 'Video call', comment: 'Good fertilizer plan for my wheat field.' },
  ],
  e4: [
    { id: 1, author: 'Jaswinder Kaur', rating: 5, date: '14 Aug 2026', type: 'Video call', comment: 'Great tips for my greenhouse tomatoes.' },
    { id: 2, author: 'Parminder Singh', rating: 5, date: '30 Jul 2026', type: 'Chat', comment: 'Helped me fix blossom end rot quickly.' },
  ],
  e5: [
    { id: 1, author: 'Kuldeep Singh', rating: 5, date: '10 Aug 2026', type: 'Phone call', comment: 'Saved my cotton crop from pink bollworm.' },
    { id: 2, author: 'Navdeep Kaur', rating: 4, date: '25 Jul 2026', type: 'Chat', comment: 'IPM plan reduced my pesticide spending.' },
  ],
  e6: [
    { id: 1, author: 'Gurmail Singh', rating: 5, date: '6 Aug 2026', type: 'Video call', comment: 'Suggested a better crop mix for next season.' },
    { id: 2, author: 'Simranjit Kaur', rating: 4, date: '19 Jul 2026', type: 'Chat', comment: 'Helped me apply for the PM-KISAN subsidy.' },
  ],
};

export const CHAT_SEED = {
  e1: [
    { id: 1, from: 'farmer', text: 'Satsriakaal ji, my wheat leaves are turning yellow near the base.', time: '9:12 AM' },
    { id: 2, from: 'expert', text: 'That is often nitrogen deficiency. How old is the crop?', time: '9:15 AM' },
    { id: 3, from: 'farmer', text: 'About 45 days old. Basal dose was 25 kg urea.', time: '9:16 AM' },
    { id: 4, from: 'expert', text: 'Top-dress with 35–40 kg urea now and irrigate the same day. Yellowing should fade in a week.', time: '9:18 AM' },
    { id: 5, from: 'farmer', text: 'Ok ji, thank you! Will do it tomorrow.', time: '9:20 AM' },
  ],
  e2: [
    { id: 1, from: 'farmer', text: 'Sir, I see orange pustules on wheat leaves.', time: '11:02 AM' },
    { id: 2, from: 'expert', text: 'That is leaf rust. Send a close-up photo of the pustules.', time: '11:05 AM' },
    { id: 3, from: 'farmer', text: 'Photo sent. It is spreading fast.', time: '11:08 AM' },
    { id: 4, from: 'expert', text: 'Apply Tebuconazole 25% EC at 0.5 ml/L, two sprays 12 days apart.', time: '11:12 AM' },
  ],
  e4: [
    { id: 1, from: 'farmer', text: 'Mam, tomato fruits have black spots at the bottom.', time: '4:20 PM' },
    { id: 2, from: 'expert', text: 'That is blossom end rot — a calcium issue. Add lime to soil and avoid dry spells.', time: '4:23 PM' },
  ],
  e5: [
    { id: 1, from: 'farmer', text: 'Bollworm holes on cotton bolls this season.', time: '6:10 PM' },
    { id: 2, from: 'expert', text: 'Use pheromone traps at 5/acre and spray Emamectin benzoate in evening.', time: '6:14 PM' },
  ],
};

export const TOPIC_OPTIONS = ['Crop disease diagnosis', 'Fertilizer & nutrition', 'Soil test reading', 'Pest control', 'Crop planning', 'Irrigation advice', 'Market & selling advice', 'Government schemes'];

export const DEFAULT_SELECTED_EXPERT = 'e1';