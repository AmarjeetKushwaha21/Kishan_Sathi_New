function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export const MANDIS = [
  { id: 'm1', name: 'Ludhiana Grain Market', short: 'Ludhiana', district: 'Ludhiana', distance: 4, rating: 4.7, arrivals: '1,240 qtl/day', opens: '6:00 AM', closes: '5:00 PM', dala: '₹2.5/qtl', emoji: '🏬', factor: 0.0 },
  { id: 'm2', name: 'Jagraon Mandi', short: 'Jagraon', district: 'Ludhiana', distance: 28, rating: 4.4, arrivals: '860 qtl/day', opens: '6:30 AM', closes: '4:30 PM', dala: '₹2.0/qtl', emoji: '🏬', factor: 0.02 },
  { id: 'm3', name: 'Khanna Grain Market', short: 'Khanna', district: 'Ludhiana', distance: 32, rating: 4.6, arrivals: '1,580 qtl/day', opens: '6:00 AM', closes: '5:30 PM', dala: '₹2.5/qtl', emoji: '🏬', factor: -0.01 },
  { id: 'm4', name: 'Sahnewal Mandi', short: 'Sahnewal', district: 'Ludhiana', distance: 11, rating: 4.2, arrivals: '540 qtl/day', opens: '7:00 AM', closes: '4:00 PM', dala: '₹1.8/qtl', emoji: '🏬', factor: 0.015 },
  { id: 'm5', name: 'Doraha Mandi', short: 'Doraha', district: 'Ludhiana', distance: 17, rating: 4.3, arrivals: '410 qtl/day', opens: '7:00 AM', closes: '4:00 PM', dala: '₹1.5/qtl', emoji: '🏬', factor: -0.02 },
  { id: 'm6', name: 'Raikot Mandi', short: 'Raikot', district: 'Ludhiana', distance: 45, rating: 4.1, arrivals: '350 qtl/day', opens: '7:30 AM', closes: '3:30 PM', dala: '₹1.5/qtl', emoji: '🏬', factor: 0.03 },
];

export const CATEGORIES = ['All', 'Cereals', 'Pulses', 'Oilseeds', 'Vegetables', 'Commercial'];

export const COMMODITIES = [
  { key: 'wheat', name: 'Wheat', emoji: '🌾', category: 'Cereals', unit: '/quintal', base: 2450, vol: 1200 },
  { key: 'paddy', name: 'Paddy (Common)', emoji: '🍚', category: 'Cereals', unit: '/quintal', base: 2180, vol: 980 },
  { key: 'maize', name: 'Maize', emoji: '🌽', category: 'Cereals', unit: '/quintal', base: 2050, vol: 410 },
  { key: 'sugarcane', name: 'Sugarcane', emoji: '🌱', category: 'Commercial', unit: '/tonne', base: 3400, vol: 1500 },
  { key: 'cotton', name: 'Cotton (Seed)', emoji: '🌿', category: 'Commercial', unit: '/quintal', base: 6820, vol: 350 },
  { key: 'mustard', name: 'Mustard', emoji: '🫒', category: 'Oilseeds', unit: '/quintal', base: 5450, vol: 260 },
  { key: 'soybean', name: 'Soybean', emoji: '🫘', category: 'Oilseeds', unit: '/quintal', base: 4800, vol: 320 },
  { key: 'groundnut', name: 'Groundnut', emoji: '🥜', category: 'Oilseeds', unit: '/quintal', base: 6120, vol: 180 },
  { key: 'chana', name: 'Chana', emoji: '🫛', category: 'Pulses', unit: '/quintal', base: 5200, vol: 380 },
  { key: 'moong', name: 'Moong', emoji: '🫛', category: 'Pulses', unit: '/quintal', base: 6120, vol: 210 },
  { key: 'tur', name: 'Arhar (Tur)', emoji: '🫘', category: 'Pulses', unit: '/quintal', base: 6920, vol: 240 },
  { key: 'potato', name: 'Potato', emoji: '🥔', category: 'Vegetables', unit: '/bag', base: 1850, vol: 640 },
  { key: 'onion', name: 'Onion', emoji: '🧅', category: 'Vegetables', unit: '/quintal', base: 1650, vol: 720 },
  { key: 'tomato', name: 'Tomato', emoji: '🍅', category: 'Vegetables', unit: '/quintal', base: 1420, vol: 510 },
  { key: 'garlic', name: 'Garlic', emoji: '🧄', category: 'Vegetables', unit: '/quintal', base: 9200, vol: 90 },
];

export const HISTORY_WEEKS = 24;

function mandiFactor(mandiId) {
  const mandi = MANDIS.find((m) => m.id === mandiId);
  return mandi ? mandi.factor : 0;
}

function buildHistory(commodity) {
  const points = [];
  const seed = hash(commodity.key);
  for (let w = HISTORY_WEEKS - 1; w >= 0; w -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - w * 7);
    const wave = Math.sin((w + seed % 7) / 3) * 0.04 + Math.sin((w * 2 + seed % 5) / 5) * 0.03;
    const noise = (((hash(commodity.key + w) % 51) - 25) / 100) * 0.03;
    const price = Math.round(commodity.base * (1 + wave + noise));
    const volume = Math.round(commodity.vol * (1 + (((hash(commodity.key + 'v' + w) % 41) - 20) / 100) * 0.3));
    points.push({
      week: w + 1,
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      price,
      volume,
    });
  }
  return points;
}

export const HISTORY = Object.fromEntries(COMMODITIES.map((c) => [c.key, buildHistory(c)]));

export function getHistory(key) {
  return HISTORY[key] || [];
}

export function getMandiHistory(mandiId, commodityKey) {
  const factor = mandiFactor(mandiId);
  return getHistory(commodityKey).map((p) => ({ ...p, price: Math.round(p.price * (1 + factor)) }));
}

export function buildTodayPrices() {
  const rows = [];
  let seq = 1;
  MANDIS.forEach((m) => {
    COMMODITIES.forEach((c) => {
      const delta = (((hash(m.id + c.key + 't') % 31) - 15) / 100) * 0.06;
      const modal = Math.round(c.base * (1 + m.factor + delta));
      const changePct = (hash(m.id + c.key + 'c') % 51 - 24) / 100;
      const prev = Math.round(modal / (1 + changePct));
      rows.push({
        id: `tp-${seq++}`,
        commodityKey: c.key,
        commodity: c.name,
        emoji: c.emoji,
        category: c.category,
        unit: c.unit,
        mandiId: m.id,
        mandiName: m.short,
        min: Math.round(modal * 0.97),
        max: Math.round(modal * 1.05),
        modal,
        prev,
        change: modal - prev,
        changePct,
        vol: c.vol,
        updated: '8:45 AM',
      });
    });
  });
  return rows;
}

export const TODAY_PRICES = buildTodayPrices();

export const FAVORITE_SEED = ['m1', 'm3'];

export const COMPARE_SEED = ['wheat', 'paddy', 'maize'];