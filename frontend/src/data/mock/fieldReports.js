export const FIELDS = [
  { id: 'F-01', name: 'North Field', area: '3.5 acres', crop: 'Wheat', stage: 'Tillering', emoji: '🌾' },
  { id: 'F-02', name: 'South Field', area: '2 acres', crop: 'Maize', stage: 'Grain filling', emoji: '🌽' },
  { id: 'F-03', name: 'East Paddy Plot', area: '4 acres', crop: 'Paddy', stage: 'Panicle initiation', emoji: '🍚' },
  { id: 'F-04', name: 'Greenhouse Block B', area: '0.5 acre', crop: 'Tomato', stage: 'Fruiting', emoji: '🍅' },
];

export const FIELD_REPORTS = [
  {
    id: 'FR-1184',
    field: 'North Field',
    fieldId: 'F-01',
    crop: 'Wheat',
    emoji: '🌾',
    type: 'field-visit',
    title: 'Weekly field visit — tillering stage',
    date: 'Today, 8:15 AM',
    status: 'completed',
    summary:
      'Crop is at 45 days in healthy tillering stage. Stand count is uniform. Light aphid activity seen on edges — below threshold.',
    notes: [
      'Stand count 78 plants/sq m — slightly below ideal 85',
      'Aphids below economic threshold, no spray needed',
      'First irrigation completed on schedule (21 days)',
    ],
    readings: [
      { label: 'Soil moisture', value: '62%', tone: 'good' },
      { label: 'Leaf greenness (SPAD)', value: '41', tone: 'good' },
      { label: 'Aphid count', value: '8 / plant', tone: 'watch' },
    ],
    agent: 'Amarjeet Kushwaha (Self)',
    photos: 3,
  },
  {
    id: 'FR-1183',
    field: 'East Paddy Plot',
    fieldId: 'F-03',
    crop: 'Paddy',
    emoji: '🍚',
    type: 'pest-check',
    title: 'Pest check — leaf folder scouting',
    date: 'Yesterday, 5:30 PM',
    status: 'completed',
    summary:
      'Leaf folder damage seen on 12% of leaves in the northern strip. One preventive spray recommended before panicle initiation.',
    notes: [
      'Damaged leaves concentrated near the canal edge',
      'Dragonfly and spider populations healthy',
      'Recommend Chlorantraniliprole if damage crosses 20%',
    ],
    readings: [
      { label: 'Leaf damage', value: '12%', tone: 'watch' },
      { label: 'Water depth', value: '8 cm', tone: 'good' },
      { label: 'Beneficial insects', value: 'High', tone: 'good' },
    ],
    agent: 'Baldev Singh (Farm helper)',
    photos: 4,
  },
  {
    id: 'FR-1182',
    field: 'South Field',
    fieldId: 'F-02',
    crop: 'Maize',
    emoji: '🌽',
    type: 'fertilizer',
    title: 'Top dressing — urea application',
    date: '3 days ago',
    status: 'completed',
    summary:
      'Second split of urea (25% of total) applied to 2 acres. Broadcast on moist soil before light irrigation.',
    notes: [
      'Applied 62.5 kg urea on 2 acres',
      'Soil was moist — no burn risk',
      'Next irrigation scheduled in 4 days',
    ],
    readings: [
      { label: 'Urea applied', value: '62.5 kg', tone: 'good' },
      { label: 'Plant height', value: '92 cm', tone: 'good' },
      { label: 'Soil moisture', value: '58%', tone: 'good' },
    ],
    agent: 'Amarjeet Kushwaha (Self)',
    photos: 2,
  },
  {
    id: 'FR-1181',
    field: 'Greenhouse Block B',
    fieldId: 'F-04',
    crop: 'Tomato',
    emoji: '🍅',
    type: 'disease-check',
    title: 'Disease scan — early blight watch',
    date: '5 days ago',
    status: 'completed',
    summary:
      'Scanned 24 plants with the AI leaf tool. Two plants flagged with early blight at 91% confidence. Removed affected leaves and sprayed.',
    notes: [
      'Removed 6 infected lower leaves',
      'Sprayed Chlorothalonil 75% WP @ 2 g/L',
      'Mulch intact, drip lines working',
    ],
    readings: [
      { label: 'Plants scanned', value: '24', tone: 'good' },
      { label: 'Flagged plants', value: '2', tone: 'watch' },
      { label: 'Humidity (GH)', value: '71%', tone: 'watch' },
    ],
    agent: 'Amarjeet Kushwaha (Self)',
    photos: 5,
  },
  {
    id: 'FR-1180',
    field: 'North Field',
    fieldId: 'F-01',
    crop: 'Wheat',
    emoji: '🌾',
    type: 'irrigation',
    title: 'Second irrigation — tillering',
    date: '6 days ago',
    status: 'completed',
    summary:
      'Second irrigation completed on schedule. Water reached the field end uniformly in 2.5 hours.',
    notes: ['Tubewell ran 6 hours', 'No runoff observed', 'Third irrigation due around 70 days'],
    readings: [
      { label: 'Duration', value: '6 hrs', tone: 'good' },
      { label: 'Field coverage', value: '100%', tone: 'good' },
      { label: 'Water level', value: 'OK', tone: 'good' },
    ],
    agent: 'Baldev Singh (Farm helper)',
    photos: 1,
  },
  {
    id: 'FR-1179',
    field: 'East Paddy Plot',
    fieldId: 'F-03',
    crop: 'Paddy',
    emoji: '🍚',
    type: 'soil',
    title: 'Soil moisture check — panicle stage',
    date: '1 week ago',
    status: 'completed',
    summary: 'Soil probe shows 55% moisture at 15 cm depth. Standing water is maintained per paddy schedule.',
    notes: ['Inlet kept at 60% open', 'No pest pressure observed'],
    readings: [
      { label: 'Moisture @15cm', value: '55%', tone: 'good' },
      { label: 'Water temp', value: '24°C', tone: 'good' },
    ],
    agent: 'Amarjeet Kushwaha (Self)',
    photos: 0,
  },
];

export const REPORT_TYPES = [
  { key: 'all', label: 'All reports' },
  { key: 'field-visit', label: 'Field visits' },
  { key: 'irrigation', label: 'Irrigation' },
  { key: 'fertilizer', label: 'Fertilizer' },
  { key: 'pest-check', label: 'Pest checks' },
  { key: 'disease-check', label: 'Disease scans' },
  { key: 'soil', label: 'Soil' },
];

export const FIELD_REPORT_STATS = {
  totalReports: 48,
  openTasks: 3,
  fieldsMonitored: 4,
  thisMonth: 12,
};

export const REPORT_CHART = [
  { month: 'Jan', field: 5, pest: 2 },
  { month: 'Feb', field: 6, pest: 3 },
  { month: 'Mar', field: 4, pest: 1 },
  { month: 'Apr', field: 3, pest: 0 },
  { month: 'May', field: 2, pest: 2 },
  { month: 'Jun', field: 1, pest: 1 },
  { month: 'Jul', field: 4, pest: 4 },
  { month: 'Aug', field: 7, pest: 2 },
];

export const UPCOMING_TASKS = [
  { id: 'T-1', title: 'Third irrigation — wheat', field: 'North Field', due: 'In 4 days', priority: 'high' },
  { id: 'T-2', title: 'Trap monitoring — maize', field: 'South Field', due: 'Tomorrow', priority: 'medium' },
  { id: 'T-3', title: 'Harvest greenhouse tomatoes', field: 'Greenhouse Block B', due: 'In 6 days', priority: 'medium' },
];