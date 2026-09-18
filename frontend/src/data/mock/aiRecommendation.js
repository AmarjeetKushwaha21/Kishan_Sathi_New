export const SOIL_TYPES = [
  { key: 'loamy', label: 'Loamy', emoji: '🟢' },
  { key: 'alluvial', label: 'Alluvial', emoji: '🟤' },
  { key: 'black', label: 'Black (Regur)', emoji: '⚫' },
  { key: 'red', label: 'Red', emoji: '🟠' },
  { key: 'sandy', label: 'Sandy', emoji: '🟨' },
  { key: 'laterite', label: 'Laterite', emoji: '🟥' },
];

export const SEASONS = [
  { key: 'kharif', label: 'Kharif', months: 'Jun – Sep', emoji: '🌧️' },
  { key: 'rabi', label: 'Rabi', months: 'Oct – Mar', emoji: '❄️' },
  { key: 'zaid', label: 'Zaid', months: 'Apr – Jun', emoji: '☀️' },
  { key: 'round-year', label: 'Round the year', months: 'All seasons', emoji: '🌱' },
];

export const IRRIGATION_OPTIONS = [
  { key: 'full', label: 'Full irrigation', emoji: '💧' },
  { key: 'partial', label: 'Partial / rainfed', emoji: '🌦️' },
  { key: 'rainfed', label: 'Rainfed only', emoji: '☁️' },
];

export const BUDGET_RANGES = [
  { key: 'low', label: 'Under ₹15,000 / acre', max: 15000 },
  { key: 'medium', label: '₹15,000 – ₹30,000 / acre', max: 30000 },
  { key: 'high', label: 'Above ₹30,000 / acre', max: Infinity },
];

export const REGIONS = [
  { key: 'punjab', label: 'Punjab' },
  { key: 'haryana', label: 'Haryana' },
  { key: 'up', label: 'Uttar Pradesh' },
  { key: 'madhya-pradesh', label: 'Madhya Pradesh' },
  { key: 'maharashtra', label: 'Maharashtra' },
  { key: 'gujarat', label: 'Gujarat' },
  { key: 'rajasthan', label: 'Rajasthan' },
  { key: 'bihar', label: 'Bihar' },
];

export const CROP_LIBRARY = [
  {
    key: 'maize',
    name: 'Maize',
    emoji: '🌽',
    seasons: ['kharif', 'rabi', 'zaid'],
    durationMonths: 3.5,
    waterNeed: 3,
    investmentPerAcre: 13800,
    yieldPerAcre: 24,
    pricePerQuintal: 2020,
    demandScore: 8,
    demandTrend: 'Stable',
    marketNote: 'Steady demand from feed and starch industries; export window open till December.',
    temperature: '20 – 32°C',
    rainfall: '450 – 600 mm',
    frostRisk: 'Medium',
    humidityPref: 'Moderate (50 – 70%)',
    ph: '5.8 – 7.0',
    drainage: 'Well drained',
    nutrient: 'Nitrogen heavy feeding',
    soilFit: { loamy: 5, alluvial: 4, black: 4, red: 4, sandy: 2, laterite: 3 },
    bestRegions: ['Punjab', 'Karnataka', 'Bihar'],
    risks: ['Fallow armyworm pressure', 'Needs timely weeding in first 30 days'],
    tips: ['Apply zinc sulphate at sowing', 'Harvest at 25% moisture for best rates'],
  },
  {
    key: 'paddy',
    name: 'Paddy',
    emoji: '🍚',
    seasons: ['kharif'],
    durationMonths: 4.5,
    waterNeed: 5,
    investmentPerAcre: 16500,
    yieldPerAcre: 26,
    pricePerQuintal: 2180,
    demandScore: 9,
    demandTrend: 'Rising',
    marketNote: 'MSP-backed procurement; strong demand in North India throughout Kharif.',
    temperature: '21 – 37°C',
    rainfall: '900 – 1200 mm',
    frostRisk: 'Low',
    humidityPref: 'High (70 – 90%)',
    ph: '5.5 – 7.0',
    drainage: 'Flood tolerant',
    nutrient: 'NPK balanced with zinc',
    soilFit: { loamy: 4, alluvial: 5, black: 5, red: 2, sandy: 1, laterite: 1 },
    bestRegions: ['Punjab', 'Haryana', 'West Bengal'],
    risks: ['Heavy water requirement', 'Blast in humid stretches'],
    tips: ['Use SRI method to cut water 30%', 'Drain field 10 days before harvest'],
  },
  {
    key: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
    seasons: ['rabi', 'zaid', 'round-year'],
    durationMonths: 3.5,
    waterNeed: 4,
    investmentPerAcre: 28000,
    yieldPerAcre: 150,
    pricePerQuintal: 950,
    demandScore: 8,
    demandTrend: 'Seasonal',
    marketNote: 'Price swings with season; high returns when sold in lean windows.',
    temperature: '20 – 27°C',
    rainfall: '600 – 700 mm',
    frostRisk: 'Medium',
    humidityPref: 'Low – Moderate',
    ph: '6.0 – 7.0',
    drainage: 'Well drained',
    nutrient: 'Phosphorus & potassium',
    soilFit: { loamy: 5, alluvial: 4, red: 4, black: 3, sandy: 2, laterite: 2 },
    bestRegions: ['Maharashtra', 'Karnataka', 'Haryana'],
    risks: ['Blight in humid spells', 'Fruit cracking after heavy rain'],
    tips: ['Stake plants early', 'Mulch beds to control weeds'],
  },
  {
    key: 'moong',
    name: 'Moong Dal',
    emoji: '🫘',
    seasons: ['kharif', 'zaid'],
    durationMonths: 2.5,
    waterNeed: 2,
    investmentPerAcre: 9000,
    yieldPerAcre: 6,
    pricePerQuintal: 7600,
    demandScore: 9,
    demandTrend: 'Rising',
    marketNote: 'Protein demand lifting pulses; premium price for clean, bold grains.',
    temperature: '25 – 35°C',
    rainfall: '300 – 500 mm',
    frostRisk: 'Low',
    humidityPref: 'Low – Moderate',
    ph: '6.0 – 7.5',
    drainage: 'Well drained',
    nutrient: 'Low input, fixes own nitrogen',
    soilFit: { loamy: 4, alluvial: 5, red: 4, black: 3, sandy: 3, laterite: 2 },
    bestRegions: ['Rajasthan', 'Maharashtra', 'Madhya Pradesh'],
    risks: ['Yellow mosaic virus in humid zones'],
    tips: ['Short 65-day varieties cut risk', 'Harvest before pod shattering'],
  },
  {
    key: 'cotton',
    name: 'Cotton',
    emoji: '🧵',
    seasons: ['kharif'],
    durationMonths: 6,
    waterNeed: 4,
    investmentPerAcre: 22000,
    yieldPerAcre: 7,
    pricePerQuintal: 7350,
    demandScore: 9,
    demandTrend: 'Rising',
    marketNote: 'Textile mills pay premiums for long-staple varieties; export friendly.',
    temperature: '21 – 38°C',
    rainfall: '500 – 700 mm',
    frostRisk: 'Low',
    humidityPref: 'Moderate',
    ph: '6.0 – 8.0',
    drainage: 'Well drained',
    nutrient: 'Balanced with boron & sulphur',
    soilFit: { loamy: 4, alluvial: 4, black: 5, red: 3, sandy: 1, laterite: 2 },
    bestRegions: ['Maharashtra', 'Gujarat', 'Punjab'],
    risks: ['Pink bollworm pressure', 'Prolonged wet spells hurt fibre'],
    tips: ['Install pheromone traps early', 'Pick only fully opened bolls'],
  },
  {
    key: 'groundnut',
    name: 'Groundnut',
    emoji: '🥜',
    seasons: ['kharif', 'rabi'],
    durationMonths: 4,
    waterNeed: 3,
    investmentPerAcre: 16000,
    yieldPerAcre: 12,
    pricePerQuintal: 5800,
    demandScore: 8,
    demandTrend: 'Stable',
    marketNote: 'Oil mills absorb produce; kernel grade earns up to 15% premium.',
    temperature: '24 – 33°C',
    rainfall: '500 – 600 mm',
    frostRisk: 'Medium',
    humidityPref: 'Moderate',
    ph: '6.0 – 6.5',
    drainage: 'Sandy, well drained',
    nutrient: 'Calcium & gypsum at pegging',
    soilFit: { loamy: 4, alluvial: 3, black: 2, red: 4, sandy: 5, laterite: 2 },
    bestRegions: ['Gujarat', 'Rajasthan', 'Andhra Pradesh'],
    risks: ['Tikka leaf spot in wet season'],
    tips: ['Gypsum at flowering boosts pods', 'Harvest at 70% pod maturity'],
  },
  {
    key: 'mustard',
    name: 'Mustard',
    emoji: '🌼',
    seasons: ['rabi'],
    durationMonths: 3.5,
    waterNeed: 2,
    investmentPerAcre: 11000,
    yieldPerAcre: 10,
    pricePerQuintal: 5400,
    demandScore: 8,
    demandTrend: 'Rising',
    marketNote: 'Edible oil deficit keeps prices firm; good for Rabi rotation with wheat.',
    temperature: '10 – 25°C',
    rainfall: '350 – 450 mm',
    frostRisk: 'Low',
    humidityPref: 'Low – Moderate',
    ph: '6.0 – 7.5',
    drainage: 'Well drained',
    nutrient: 'Sulphur responsive',
    soilFit: { loamy: 5, alluvial: 5, black: 3, red: 3, sandy: 3, laterite: 2 },
    bestRegions: ['Rajasthan', 'Haryana', 'Uttar Pradesh'],
    risks: ['Aphid attack during flowering'],
    tips: ['Sulphur at 20 kg/acre lifts oil content', 'Irrigate at pod formation'],
  },
  {
    key: 'wheat',
    name: 'Wheat',
    emoji: '🌾',
    seasons: ['rabi'],
    durationMonths: 4,
    waterNeed: 3,
    investmentPerAcre: 14500,
    yieldPerAcre: 22,
    pricePerQuintal: 2450,
    demandScore: 9,
    demandTrend: 'Rising',
    marketNote: 'MSP procurement is assured; strong milling demand across North India.',
    temperature: '14 – 28°C',
    rainfall: '400 – 600 mm',
    frostRisk: 'High',
    humidityPref: 'Moderate',
    ph: '6.0 – 7.5',
    drainage: 'Well drained',
    nutrient: 'Nitrogen at tillering & boot',
    soilFit: { loamy: 5, alluvial: 5, black: 4, red: 3, sandy: 3, laterite: 2 },
    bestRegions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
    risks: ['Yellow rust in cool humid Feb', 'Lodging with excess nitrogen'],
    tips: ['Skip seeding by 7 days to avoid rust', 'Split nitrogen into 3 doses'],
  },
  {
    key: 'sugarcane',
    name: 'Sugarcane',
    emoji: '🛎️',
    seasons: ['round-year'],
    durationMonths: 12,
    waterNeed: 5,
    investmentPerAcre: 48000,
    yieldPerAcre: 420,
    pricePerQuintal: 340,
    demandScore: 7,
    demandTrend: 'Stable',
    marketNote: 'Mills guarantee offtake; sugar prices linked to FRP for cane.',
    temperature: '20 – 35°C',
    rainfall: '800 – 1200 mm',
    frostRisk: 'Low',
    humidityPref: 'Moderate – High',
    ph: '6.0 – 7.5',
    drainage: 'Well drained, ratoon friendly',
    nutrient: 'Heavy nitrogen feeder',
    soilFit: { loamy: 4, alluvial: 5, black: 5, red: 2, sandy: 1, laterite: 1 },
    bestRegions: ['Uttar Pradesh', 'Maharashtra', 'Punjab'],
    risks: ['Long capital lock-in', 'Red rot in wet years'],
    tips: ['Use treated setts', 'Trash mulching cuts water 20%'],
  },
  {
    key: 'bajra',
    name: 'Bajra (Pearl Millet)',
    emoji: '🌾',
    seasons: ['kharif'],
    durationMonths: 3,
    waterNeed: 2,
    investmentPerAcre: 10000,
    yieldPerAcre: 14,
    pricePerQuintal: 2150,
    demandScore: 7,
    demandTrend: 'Stable',
    marketNote: 'Climate-resilient millet gaining premium for gluten-free health food.',
    temperature: '25 – 40°C',
    rainfall: '250 – 400 mm',
    frostRisk: 'Low',
    humidityPref: 'Low',
    ph: '6.5 – 8.0',
    drainage: 'Drought tolerant',
    nutrient: 'Low input crop',
    soilFit: { loamy: 4, alluvial: 3, black: 2, red: 4, sandy: 5, laterite: 3 },
    bestRegions: ['Rajasthan', 'Haryana', 'Gujarat'],
    risks: ['Downy mildew in humid pockets'],
    tips: ['Thin to 45 cm spacing', 'Intercrop with moong for extra income'],
  },
];

const WEIGHT = { soil: 0.4, season: 0.25, water: 0.2, demand: 0.15 };

function waterScoreFor(crop, irrigation) {
  const adequate =
    irrigation === 'full' ? true : irrigation === 'partial' ? crop.waterNeed <= 3 : crop.waterNeed <= 2;
  if (adequate) return 5;
  return Math.max(1, 6 - crop.waterNeed);
}

function buildWeather(crop, input) {
  const rainStatus =
    crop.waterNeed <= 2 ? 'good' : crop.waterNeed <= 4 ? 'fair' : 'poor';
  return {
    score: Math.round((waterScoreFor(crop, input.irrigation) / 5) * 100),
    notes: crop.waterNeed <= 2
      ? 'Low water crop — thrives even in lean rainfall years.'
      : crop.waterNeed >= 5
      ? 'High water need — depends on assured irrigation or heavy monsoon.'
      : 'Balanced water need — manageable with partial irrigation.',
    factors: [
      { label: 'Temperature', value: crop.temperature, status: 'good' },
      { label: 'Rainfall need', value: crop.rainfall, status: rainStatus },
      { label: 'Frost risk', value: crop.frostRisk, status: crop.frostRisk === 'Low' ? 'good' : 'fair' },
      { label: 'Humidity', value: crop.humidityPref, status: crop.humidityPref.toLowerCase().includes('high') ? 'fair' : 'good' },
    ],
  };
}

function buildSoil(crop, input, soilLabel) {
  const fit = crop.soilFit[input.soilType] ?? 2;
  return {
    score: Math.round((fit / 5) * 100),
    notes: fit >= 4
      ? `${crop.name} grows exceptionally well in ${soilLabel} soil.`
      : fit === 3
      ? `${crop.name} can grow in ${soilLabel} soil with amendments.`
      : `${soilLabel} soil is a weak match — consider raised beds or amendments.`,
    factors: [
      { label: 'Soil match', value: `${soilLabel} (${fit}/5)`, status: fit >= 4 ? 'good' : fit === 3 ? 'fair' : 'poor' },
      { label: 'Ideal pH', value: crop.ph, status: 'good' },
      { label: 'Drainage', value: crop.drainage, status: crop.drainage.toLowerCase().includes('well') ? 'good' : 'fair' },
      { label: 'Feeding need', value: crop.nutrient, status: 'good' },
    ],
  };
}

export function generateRecommendation(input) {
  const seasonLabel = SEASONS.find((s) => s.key === input.season)?.label || input.season;
  const soilLabel = SOIL_TYPES.find((s) => s.key === input.soilType)?.label || input.soilType;
  const irrigationLabel = IRRIGATION_OPTIONS.find((i) => i.key === input.irrigation)?.label || input.irrigation;

  const evaluated = CROP_LIBRARY.map((crop) => {
    const soilFit = crop.soilFit[input.soilType] ?? 2;
    const seasonFit = crop.seasons.includes(input.season)
      ? 5
      : crop.seasons.includes('round-year')
      ? 4
      : 1;
    const seasonMatch = seasonFit >= 4;
    const waterScore = waterScoreFor(crop, input.irrigation);
    const demand = crop.demandScore;

    let suitability = Math.round(
      (soilFit / 5) * WEIGHT.soil * 100 +
        (seasonFit / 5) * WEIGHT.season * 100 +
        (waterScore / 5) * WEIGHT.water * 100 +
        (demand / 10) * WEIGHT.demand * 100
    );
    if (!seasonMatch) suitability = Math.min(suitability, 45);

    const cost = crop.investmentPerAcre;
    const revenue = Math.round(crop.yieldPerAcre * crop.pricePerQuintal);
    const profit = revenue - cost;
    const margin = Math.round((profit / cost) * 100);

    return {
      ...crop,
      suitability,
      seasonMatch,
      seasonLabel,
      profit: { costPerAcre: cost, revenuePerAcre: revenue, profitPerAcre: profit, margin },
      weather: buildWeather(crop, input),
      soil: buildSoil(crop, input, soilLabel),
    };
  });

  const sorted = [...evaluated].sort((a, b) => b.suitability - a.suitability);
  const recommendations = sorted.filter((c) => c.suitability >= 55);
  const alternatives = sorted.filter((c) => c.suitability < 55);

  const best = recommendations[0];
  const avgMargin = recommendations.length
    ? Math.round(recommendations.reduce((s, c) => s + c.profit.margin, 0) / recommendations.length)
    : 0;

  const summary = `For ${soilLabel.toLowerCase()} soil in the ${seasonLabel.toLowerCase()} season with ${irrigationLabel.toLowerCase()}, I ranked ${recommendations.length} crops. ${
    best ? `${best.name} tops the list at ${best.suitability}% suitability.` : ''
  } Estimated average return is ${avgMargin}% per acre.`;

  return {
    id: `ai-rec-${Date.now()}`,
    generatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    input: { ...input, soilLabel, seasonLabel, irrigationLabel },
    summary,
    avgSuitability: recommendations.length
      ? Math.round(recommendations.reduce((s, c) => s + c.suitability, 0) / recommendations.length)
      : 0,
    avgMargin,
    recommendations,
    alternatives,
  };
}

export const DEFAULT_INPUT = {
  soilType: 'loamy',
  season: 'kharif',
  irrigation: 'full',
  landArea: 5,
  budget: 'medium',
  region: 'punjab',
};

export const SEED_RESULT = generateRecommendation(DEFAULT_INPUT);