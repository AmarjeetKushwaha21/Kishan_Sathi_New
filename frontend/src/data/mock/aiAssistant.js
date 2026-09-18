export const AI_SEED_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    text: 'Namaste Amarjeet! 👋 I am Sathi, your AI farming assistant. Ask me about sowing dates, fertilizer doses, pest control, mandi prices or weather — in Hindi, Punjabi or English.',
    time: '9:02 AM',
  },
  {
    id: 'm2',
    role: 'user',
    text: 'Urea ka kitna dose dena chahiye wheat mein?',
    time: '9:03 AM',
  },
  {
    id: 'm3',
    role: 'assistant',
    text: 'For wheat (HD-2967) in Punjab, apply urea in 3 splits:\n\n• 50% at first irrigation (21 days after sowing)\n• 25% at tillering (45 days)\n• 25% at jointing (70 days)\n\nTotal nitrogen: 120–125 kg/ha. Avoid late urea after flag leaf — it invites rust. 🌾',
    time: '9:03 AM',
  },
];

export const AI_SUGGESTED_PROMPTS = [
  'Wheat sowing date for Punjab?',
  'Give me a urea dose for paddy',
  'How to control pink bollworm?',
  'Weather for my farm tomorrow?',
  'Best time to harvest maize?',
  'What is the mandi price of wheat?',
];

export function generateAiReply(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes('urea') || lower.includes('fertil')) {
    return 'For paddy (PR-126) apply urea in 3 splits — 40% basal, 30% at tillering, 30% at panicle initiation. Total nitrogen stays under 100 kg/ha to prevent blast. Split dose before standing water and broadcast on dry soil. 🌾';
  }
  if (lower.includes('sow') || lower.includes('sowing') || lower.includes('date')) {
    return 'For central Punjab, wheat (PBW-723 / HD-3086) should be sown between 25 October and 15 November. Sowing after 15 November reduces yield by 1.2% per day. Use a zero-till drill and target seed rate of 100–112 kg/ha. 📅';
  }
  if (lower.includes('bollworm') || lower.includes('pink')) {
    return 'Pink bollworm: install pheromone traps (8/acre), destroy crop residue by 15 May, and spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L only if traps catch 10+ moths/week. Prefer neem-based sprays first. 🐛';
  }
  if (lower.includes('weather')) {
    return 'Tomorrow for Ludhiana: partly cloudy, max 31°C, min 18°C, 40% chance of light rain in the evening, humidity 58%. Good day for urea top dressing — avoid if evening rain is confirmed. ☁️';
  }
  if (lower.includes('harvest') || lower.includes('maize')) {
    return 'Harvest maize when the husk is dry and grain moisture is 20–22% (around 100–110 days after sowing). Shell early and dry to 14% before storage. Current grain moisture in your region: 24% — about 1 week to go. 🌽';
  }
  if (lower.includes('mandi') || lower.includes('price')) {
    return 'Wheat at Ludhiana mandi: ₹2,450/quintal (up 2.4% today). Paddy: ₹2,180/quintal. Maize: ₹2,020/quintal. Best rate right now is at Khanna mandi for wheat — check the Mandi Prices page for trends. 📈';
  }
  if (lower.includes('pest') || lower.includes('spray') || lower.includes('insect')) {
    return 'For a general insect check: spray Imidacloprid 17.8% SL @ 0.3 ml/L at first sighting, then rotate with a different group (e.g., Emamectin benzoate) to avoid resistance. Always spray in early morning or late evening. 🕐';
  }
  if (lower.includes('irrigation')) {
    return 'For wheat in Punjab: schedule 5 irrigations — crown root (21 days), tillering (45 days), jointing (70 days), boot (90 days), grain filling (110 days). Skip one if rain comes; waterlogging at grain filling hurts quality. 💧';
  }
  if (lower.includes('disease') || lower.includes('leaf') || lower.includes('rust')) {
    return 'If you see orange-brown pustules on wheat leaves, it is likely brown rust. Spray Propiconazole 25% EC @ 0.1% within 3 days. Keep an eye on the Disease Detection module — you can scan a leaf photo right now. 🔬';
  }
  return 'Great question! For that, I would recommend: (1) check the current weather for your farm, (2) scan a leaf if you see any spots, and (3) consult an expert for field-specific advice. You can also tap the Market Prices tile to see live mandi rates. I have also saved this to your advisor history. 🌱';
}

export const AI_ADVISORIES = [
  {
    id: 'adv-1',
    title: 'Wheat — 3 split urea schedule',
    crop: 'Wheat',
    tag: 'Fertilizer',
    readTime: '2 min',
    summary: 'Split your nitrogen into three doses matched with irrigation timing to cut losses and lift yield.',
    steps: ['50% urea with first irrigation (21 days)', '25% at tillering (45 days)', '25% at jointing (70 days)'],
  },
  {
    id: 'adv-2',
    title: 'Paddy blast prevention at flowering',
    crop: 'Paddy',
    tag: 'Disease',
    readTime: '2 min',
    summary: 'Cool nights and dew during flowering raise blast risk — plan a preventive spray at the boot stage.',
    steps: ['Apply Tricyclazole 75% WP @ 0.6 g/L at booting', 'Drain field 2 days before spraying', 'Re-spray after 10 days if humid'],
  },
  {
    id: 'adv-3',
    title: 'Fall armyworm early detection',
    crop: 'Maize',
    tag: 'Pest',
    readTime: '3 min',
    summary: 'Catch the worm inside the whorl before it spreads. Hand-pick egg masses in the first 8 weeks.',
    steps: ['Check whorls weekly for window-pane marks', 'Apply Chlorantraniliprole granules in whorl', 'Conserve earwigs and spiders'],
  },
  {
    id: 'adv-4',
    title: 'Soil test before rabi sowing',
    crop: 'All crops',
    tag: 'Soil',
    readTime: '2 min',
    summary: 'Test your soil every 2–3 years. Book a lab visit and get fertilizer mapped to your field.',
    steps: ['Collect samples from 10 spots per acre', 'Mix and send 500 g to the lab', 'Apply fertilizer as per report'],
  },
  {
    id: 'adv-5',
    title: 'Ludhiana mandi price alert setup',
    crop: 'Wheat',
    tag: 'Mandi',
    readTime: '1 min',
    summary: 'Set a target price for wheat and get notified the moment Khanna or Ludhiana crosses it.',
    steps: ['Open Mandi Prices → Comparison', 'Tap the bell on your crop', 'Enter target rate per quintal'],
  },
];