// Weather Service using Open-Meteo (Free, No API Key Required, Global & India High-Resolution)
// and BigDataCloud / Open-Meteo Geocoding for automatic reverse geolocation

const WMO_CODES = {
  0: { condition: 'Clear Sky', conditionKey: 'sunny', nightKey: 'clear-night' },
  1: { condition: 'Mainly Clear', conditionKey: 'sunny', nightKey: 'clear-night' },
  2: { condition: 'Partly Cloudy', conditionKey: 'partly-cloudy', nightKey: 'partly-cloudy' },
  3: { condition: 'Overcast', conditionKey: 'cloudy', nightKey: 'cloudy' },
  45: { condition: 'Foggy', conditionKey: 'foggy', nightKey: 'foggy' },
  48: { condition: 'Depositing Rime Fog', conditionKey: 'foggy', nightKey: 'foggy' },
  51: { condition: 'Light Drizzle', conditionKey: 'rainy', nightKey: 'rainy' },
  53: { condition: 'Moderate Drizzle', conditionKey: 'rainy', nightKey: 'rainy' },
  55: { condition: 'Dense Drizzle', conditionKey: 'rainy', nightKey: 'rainy' },
  61: { condition: 'Slight Rain', conditionKey: 'rainy', nightKey: 'rainy' },
  63: { condition: 'Moderate Rain', conditionKey: 'rainy', nightKey: 'rainy' },
  65: { condition: 'Heavy Rain', conditionKey: 'heavy-rain', nightKey: 'heavy-rain' },
  66: { condition: 'Freezing Rain', conditionKey: 'rainy', nightKey: 'rainy' },
  67: { condition: 'Heavy Freezing Rain', conditionKey: 'heavy-rain', nightKey: 'heavy-rain' },
  71: { condition: 'Slight Snow', conditionKey: 'snow', nightKey: 'snow' },
  73: { condition: 'Moderate Snow', conditionKey: 'snow', nightKey: 'snow' },
  75: { condition: 'Heavy Snow', conditionKey: 'snow', nightKey: 'snow' },
  80: { condition: 'Slight Rain Showers', conditionKey: 'rainy', nightKey: 'rainy' },
  81: { condition: 'Moderate Rain Showers', conditionKey: 'rainy', nightKey: 'rainy' },
  82: { condition: 'Violent Rain Showers', conditionKey: 'heavy-rain', nightKey: 'heavy-rain' },
  95: { condition: 'Thunderstorm', conditionKey: 'stormy', nightKey: 'stormy' },
  96: { condition: 'Thunderstorm with Slight Hail', conditionKey: 'stormy', nightKey: 'stormy' },
  99: { condition: 'Thunderstorm with Heavy Hail', conditionKey: 'stormy', nightKey: 'stormy' },
};

export function getWmoDetails(code, isDay = true) {
  const item = WMO_CODES[code] || { condition: 'Clear Sky', conditionKey: 'sunny', nightKey: 'clear-night' };
  return {
    condition: item.condition,
    conditionKey: isDay ? item.conditionKey : item.nightKey,
  };
}

export function getWindDirection(deg) {
  if (deg == null) return 'NW';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((deg % 360) / 22.5) % 16;
  return dirs[index];
}

export function getUvCategory(uv) {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

function formatHour(isoString) {
  try {
    const d = new Date(isoString);
    let hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours} ${ampm}`;
  } catch {
    return isoString;
  }
}

function formatDay(isoString, index) {
  if (index === 0) return 'Today';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  } catch {
    return `Day ${index + 1}`;
  }
}

function formatDate(isoString) {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  } catch {
    return isoString;
  }
}

function formatClockTime(isoString) {
  try {
    const d = new Date(isoString);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  } catch {
    return isoString;
  }
}

// 1. Reverse Geocode: Get City/District/State from Latitude and Longitude
export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const name = data.locality || data.city || data.principalSubdivision || 'Your Location';
      const district = data.city || data.localityInfo?.administrative?.[2]?.name || data.principalSubdivision || 'Local Area';
      const state = data.principalSubdivision || 'India';
      return {
        id: `loc-${lat.toFixed(3)}-${lng.toFixed(3)}`,
        name,
        district,
        state,
        lat,
        lng,
        isCurrent: true,
      };
    }
  } catch (err) {
    console.warn('[Weather] BigDataCloud reverse geocode failed, attempting fallback', err);
  }

  // Fallback to Open-Meteo or generic coordinates
  return {
    id: `loc-${lat.toFixed(3)}-${lng.toFixed(3)}`,
    name: 'Detected Location',
    district: `${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`,
    state: 'India',
    lat,
    lng,
    isCurrent: true,
  };
}

// 2. Search Locations in India / Globally
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.results) return [];
    return data.results.map((r) => ({
      id: `geo-${r.id}`,
      name: r.name,
      district: r.admin2 || r.admin1 || r.country,
      state: r.admin1 || r.country,
      lat: r.latitude,
      lng: r.longitude,
      country: r.country,
    }));
  } catch (err) {
    console.error('[Weather] Search locations failed:', err);
    return [];
  }
}

// 3. Main Weather Forecast Fetcher via Open-Meteo
export async function fetchLiveWeather(lat, lng, locationInfo = {}) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Open-Meteo request failed with status: ${res.status}`);
  }
  const data = await res.json();

  const isDay = data.current?.is_day === 1;
  const currentWmo = getWmoDetails(data.current?.weather_code, isDay);

  // Determine current hour index in the hourly array
  const nowIso = new Date().toISOString();
  let currentHourIndex = 0;
  if (data.hourly?.time?.length) {
    const nowTime = new Date().getTime();
    let bestDiff = Infinity;
    data.hourly.time.forEach((t, idx) => {
      const diff = Math.abs(new Date(t).getTime() - nowTime);
      if (diff < bestDiff) {
        bestDiff = diff;
        currentHourIndex = idx;
      }
    });
  }

  const currentUv = data.hourly?.uv_index?.[currentHourIndex] ?? data.daily?.uv_index_max?.[0] ?? 6;
  const currentRainProb = data.hourly?.precipitation_probability?.[currentHourIndex] ?? data.daily?.precipitation_probability_max?.[0] ?? 10;
  const windDirText = getWindDirection(data.current?.wind_direction_10m);

  // 1. Process Current Weather
  const current = {
    locationId: locationInfo.id || 'current',
    condition: currentWmo.condition,
    conditionKey: currentWmo.conditionKey,
    temp: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    high: Math.round(data.daily.temperature_2m_max[0]),
    low: Math.round(data.daily.temperature_2m_min[0]),
    humidity: Math.round(data.current.relative_humidity_2m),
    windSpeed: Math.round(data.current.wind_speed_10m),
    windGust: Math.round(data.current.wind_gusts_10m || data.current.wind_speed_10m * 1.3),
    windDir: windDirText,
    rainProbability: Math.round(currentRainProb),
    uvIndex: Math.round(currentUv),
    uvCategory: getUvCategory(currentUv),
    pressure: Math.round(data.current.surface_pressure),
    visibility: 10.0,
    dewPoint: Math.round(data.current.temperature_2m - ((100 - data.current.relative_humidity_2m) / 5)),
    sunrise: formatClockTime(data.daily.sunrise[0]),
    sunset: formatClockTime(data.daily.sunset[0]),
    updatedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    station: locationInfo.name ? `Live GPS · ${locationInfo.name}` : 'Live Weather Station',
    isDay,
  };

  // 2. Process Hourly Forecast (Next 24 hours)
  const hourly = [];
  const startIdx = Math.max(0, currentHourIndex);
  const endIdx = Math.min(data.hourly.time.length, startIdx + 24);
  for (let i = startIdx; i < endIdx; i++) {
    const timeIso = data.hourly.time[i];
    const hDate = new Date(timeIso);
    const hourVal = hDate.getHours();
    const hIsDay = hourVal >= 6 && hourVal < 19;
    const hWmo = getWmoDetails(data.hourly.weather_code[i], hIsDay);
    hourly.push({
      time: formatHour(timeIso),
      temp: Math.round(data.hourly.temperature_2m[i]),
      feelsLike: Math.round(data.hourly.apparent_temperature[i]),
      conditionKey: hWmo.conditionKey,
      condition: hWmo.condition,
      rain: Math.round(data.hourly.precipitation_probability?.[i] ?? 0),
      humidity: Math.round(data.hourly.relative_humidity_2m[i]),
      wind: Math.round(data.hourly.wind_speed_10m[i]),
    });
  }

  // 3. Process Weekly Forecast (7 days)
  const weekly = [];
  const daysCount = Math.min(7, data.daily.time.length);
  for (let i = 0; i < daysCount; i++) {
    const timeIso = data.daily.time[i];
    const dWmo = getWmoDetails(data.daily.weather_code[i], true);
    const uv = data.daily.uv_index_max[i];
    weekly.push({
      day: formatDay(timeIso, i),
      date: formatDate(timeIso),
      conditionKey: dWmo.conditionKey,
      condition: dWmo.condition,
      high: Math.round(data.daily.temperature_2m_max[i]),
      low: Math.round(data.daily.temperature_2m_min[i]),
      rain: Math.round(data.daily.precipitation_probability_max[i] || 0),
      humidity: Math.round(data.current.relative_humidity_2m),
      wind: Math.round(data.daily.wind_speed_10m_max[i]),
      uvIndex: Math.round(uv),
      uvCategory: getUvCategory(uv),
      sunrise: formatClockTime(data.daily.sunrise[i]),
      sunset: formatClockTime(data.daily.sunset[i]),
    });
  }

  // 4. Compute Dynamic Agricultural Alerts
  const alerts = [];
  if (current.temp >= 38) {
    alerts.push({
      id: 'alert-heat',
      severity: 'warning',
      type: 'heat',
      title: 'High temperature / heatwave advisory',
      description: `Current temperature has reached ${current.temp}°C. Field crops and vegetables require protective irrigation to avoid moisture stress.`,
      issuedAt: current.updatedAt,
      validFrom: 'Today · Midday',
      validTo: 'Evening 6 PM',
      district: locationInfo.name || 'Your area',
      source: 'IMD / Agrometeorological Service',
      actions: ['Provide light frequent irrigation in evening', 'Cover nursery seedlings with shade net', 'Keep livestock hydrated in shade'],
    });
  }

  const maxWeeklyRain = Math.max(...data.daily.precipitation_sum);
  if (maxWeeklyRain >= 25 || currentRainProb >= 75) {
    alerts.push({
      id: 'alert-rain',
      severity: 'warning',
      type: 'rain',
      title: 'Heavy rainfall & waterlogging risk',
      description: `Heavy showers anticipated in ${locationInfo.name || 'your region'}. Up to ${Math.round(maxWeeklyRain)} mm rainfall expected.`,
      issuedAt: current.updatedAt,
      validFrom: 'Next 24-48 hours',
      validTo: 'End of rain spell',
      district: locationInfo.name || 'Your area',
      source: 'Meteorological Watch',
      actions: ['Clear field drainage channels and bunds', 'Postpone chemical spray and pesticide applications', 'Store harvested grain in waterproof sheds'],
    });
  }

  if (current.windGust >= 35) {
    alerts.push({
      id: 'alert-wind',
      severity: 'advisory',
      type: 'wind',
      title: 'Gusty winds advisory',
      description: `Wind gusts touching ${current.windGust} km/h recorded. Risk of spray drift and damage to tall standing crops.`,
      issuedAt: current.updatedAt,
      validFrom: 'Today',
      validTo: 'Until wind eases',
      district: locationInfo.name || 'Your area',
      source: 'Agri Advisory',
      actions: ['Suspend foliar nutrient and herbicide spraying', 'Stake tall plants and nursery support poles'],
    });
  }

  if (current.humidity >= 80) {
    alerts.push({
      id: 'alert-humidity',
      severity: 'advisory',
      type: 'humidity',
      title: 'High humidity · Fungal disease alert',
      description: `Relative humidity at ${current.humidity}%. Humid conditions favor fungal blast, blight and powdery mildew.`,
      issuedAt: current.updatedAt,
      validFrom: 'Current spell',
      validTo: 'Next 3 days',
      district: locationInfo.name || 'Your area',
      source: 'Crop Health Dept.',
      actions: ['Inspect underside of leaves during morning rounds', 'Prepare prophylactic bio-fungicide spray if symptoms appear'],
    });
  }

  if (current.uvIndex >= 8) {
    alerts.push({
      id: 'alert-uv',
      severity: 'info',
      type: 'uv',
      title: `Very high solar UV index (${current.uvIndex})`,
      description: 'Intense solar radiation during afternoon hours. Take protective precautions while performing field work.',
      issuedAt: current.updatedAt,
      validFrom: '11:00 AM',
      validTo: '3:30 PM',
      district: locationInfo.name || 'Your area',
      source: 'Solar Radiation Monitor',
      actions: ['Schedule field operations during morning or late afternoon', 'Wear hat/turban and stay hydrated'],
    });
  }

  // If no critical alerts, provide good weather confirmation
  if (alerts.length === 0) {
    alerts.push({
      id: 'alert-good',
      severity: 'info',
      type: 'good',
      title: 'Favorable farming weather',
      description: `Current conditions in ${locationInfo.name || 'your region'} are well suited for standard cultivation, field preparation, and intercultural operations.`,
      issuedAt: current.updatedAt,
      validFrom: 'Today',
      validTo: 'Tomorrow',
      district: locationInfo.name || 'Your area',
      source: 'Kishan Sathi Weather Advisory',
      actions: ['Proceed with scheduled sowing and irrigation', 'Ideal window for field weeding and inspection'],
    });
  }

  // 5. Process Rain Prediction & Soil Analysis
  const total7DayRain = Math.round(data.daily.precipitation_sum.reduce((acc, v) => acc + (v || 0), 0));
  const rainyDaysCount = data.daily.precipitation_sum.filter((v) => v > 1).length;
  const heaviestIdx = data.daily.precipitation_sum.indexOf(Math.max(...data.daily.precipitation_sum));
  const heaviestDayName = formatDay(data.daily.time[heaviestIdx], heaviestIdx);

  const rainPrediction = {
    summary: {
      totalRain: total7DayRain,
      rainyDays: rainyDaysCount,
      heaviestDay: heaviestDayName,
      nextRain: currentRainProb > 30 ? `Today · ${currentRainProb}%` : 'Low probability this week',
      lastRain: total7DayRain > 0 ? 'Recent rainfall recorded' : 'Dry spell',
      floodRisk: total7DayRain > 60 ? 'Moderate' : 'Low',
      droughtRisk: total7DayRain === 0 && current.temp > 35 ? 'Moderate' : 'Low',
    },
    daily: data.daily.time.slice(0, 7).map((t, idx) => ({
      day: formatDay(t, idx),
      date: formatDate(t),
      amount: Math.round(data.daily.precipitation_sum[idx] || 0),
      probability: Math.round(data.daily.precipitation_probability_max[idx] || 0),
      intensity: (data.daily.precipitation_sum[idx] || 0) > 20 ? 'Heavy' : (data.daily.precipitation_sum[idx] || 0) > 5 ? 'Moderate' : (data.daily.precipitation_sum[idx] || 0) > 0 ? 'Light' : 'None',
    })),
    soil: {
      moisture: Math.min(95, Math.max(25, Math.round(current.humidity * 0.45 + (total7DayRain > 10 ? 25 : 5)))),
      capacity: 65,
      fieldCapacity: 75,
      lastRain: total7DayRain > 0 ? 'Recent' : '3+ days ago',
      trend: total7DayRain > 15 ? 'rising' : 'falling',
    },
    windows: [
      {
        time: 'Today · Morning to Afternoon',
        title: current.temp > 33 ? 'Warm dry window' : 'Fair weather',
        probability: currentRainProb,
      },
      {
        time: 'Next 48 Hours',
        title: total7DayRain > 10 ? 'Precipitation expected' : 'Stable weather window',
        probability: Math.round(data.daily.precipitation_probability_max[1] || 15),
      },
    ],
    insights: [
      {
        type: total7DayRain > 20 ? 'warning' : 'good',
        text: total7DayRain > 20
          ? `Substantial rain (${total7DayRain} mm) expected over 7 days. Pause flood irrigation and check drainage.`
          : `Dry spell persisting with ${total7DayRain} mm rain. Plan routine drip/canal watering for moisture balance.`,
      },
      {
        type: current.temp >= 35 ? 'caution' : 'good',
        text: current.temp >= 35
          ? `High temperatures (${current.temp}°C) accelerate evapotranspiration. Mulching recommended.`
          : `Comfortable thermal window (${current.temp}°C). Excellent for weeding and fertilizer application.`,
      },
    ],
    irrigationAdvice: [
      total7DayRain > 25
        ? 'Rainfall in forecast will fulfill moisture requirements; hold off heavy irrigation.'
        : 'Maintain regular irrigation intervals during evening hours to avoid daytime evaporation.',
      current.windSpeed > 20
        ? 'High wind speed may reduce sprinkler uniformity; prefer ground or drip lines.'
        : 'Wind conditions suitable for all irrigation methods.',
      'Check root-zone soil moisture before turning on borewells or pumps.',
    ],
  };

  // 6. Formatted Charts Data
  const charts = {
    hourly: hourly.map((h) => ({
      time: h.time,
      temp: h.temp,
      humidity: h.humidity,
      rain: h.rain,
      wind: h.wind,
    })),
    weekly: weekly.map((d) => ({
      day: d.day,
      high: d.high,
      low: d.low,
      rain: d.rain,
      humidity: d.humidity,
      wind: d.wind,
      uvIndex: d.uvIndex,
    })),
  };

  return {
    current,
    hourly,
    weekly,
    alerts,
    rain: rainPrediction,
    charts,
  };
}

export default {
  fetchLiveWeather,
  reverseGeocode,
  searchLocations,
  getWmoDetails,
};
