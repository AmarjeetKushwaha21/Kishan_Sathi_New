import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CURRENT_WEATHER,
  HOURLY_FORECAST,
  RAIN_PREDICTION,
  WEATHER_ALERTS,
  WEATHER_CHARTS,
  WEEKLY_FORECAST,
  WEATHER_LOCATIONS,
} from '@/data/mock/weather';
import { fetchLiveWeather, reverseGeocode, searchLocations } from '@/services/weatherService';

const WeatherContext = createContext(null);

const DEFAULT_LOCATION = WEATHER_LOCATIONS[0] || {
  id: 'loc-ludhiana',
  name: 'Ludhiana',
  district: 'Ludhiana',
  state: 'Punjab',
  lat: 30.9,
  lng: 75.85,
};

export function WeatherProvider({ children }) {
  const [unit, setUnit] = useState('c');
  const [activeLocation, setActiveLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('ks_weather_location');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_LOCATION;
  });

  const [current, setCurrent] = useState(CURRENT_WEATHER);
  const [hourly, setHourly] = useState(HOURLY_FORECAST);
  const [weekly, setWeekly] = useState(WEEKLY_FORECAST);
  const [alerts, setAlerts] = useState(WEATHER_ALERTS);
  const [rain, setRain] = useState(RAIN_PREDICTION);
  const [charts, setCharts] = useState(WEATHER_CHARTS);

  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isLiveLocation, setIsLiveLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Load weather for specific coordinates
  const loadWeather = useCallback(async (lat, lng, locInfo) => {
    setLoading(true);
    try {
      const weatherData = await fetchLiveWeather(lat, lng, locInfo);
      setCurrent(weatherData.current);
      setHourly(weatherData.hourly);
      setWeekly(weatherData.weekly);
      setAlerts(weatherData.alerts);
      setRain(weatherData.rain);
      setCharts(weatherData.charts);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error('[WeatherContext] Failed to fetch live weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Detect user's current GPS location
  const detectCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      // Load fallback location
      loadWeather(activeLocation.lat, activeLocation.lng, activeLocation);
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const locInfo = await reverseGeocode(lat, lng);
          
          setActiveLocation(locInfo);
          setIsLiveLocation(true);
          try {
            localStorage.setItem('ks_weather_location', JSON.stringify(locInfo));
          } catch {
            // ignore
          }

          await loadWeather(lat, lng, locInfo);
        } catch (err) {
          console.error('[WeatherContext] Geocoding or weather fetch failed:', err);
          setLocationError('Could not resolve location name. Using fallback.');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn('[WeatherContext] Geolocation denied or unavailable:', err.message);
        setIsLocating(false);
        setIsLiveLocation(false);
        setLocationError(err.code === 1 ? 'Location access was denied. Showing regional weather.' : 'Location request timed out.');
        // Fallback to active or default location
        loadWeather(activeLocation.lat, activeLocation.lng, activeLocation);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 60000,
      }
    );
  }, [activeLocation, loadWeather]);

  // Select a location manually from search
  const selectLocation = useCallback(async (location) => {
    setActiveLocation(location);
    setIsLiveLocation(location.isCurrent || false);
    setLocationError(null);
    try {
      localStorage.setItem('ks_weather_location', JSON.stringify(location));
    } catch {
      // ignore
    }
    await loadWeather(location.lat, location.lng, location);
  }, [loadWeather]);

  // Refresh current active location weather
  const refreshWeather = useCallback(() => {
    if (activeLocation?.lat && activeLocation?.lng) {
      loadWeather(activeLocation.lat, activeLocation.lng, activeLocation);
    }
  }, [activeLocation, loadWeather]);

  // Initial mount: automatically detect location or load saved location
  useEffect(() => {
    detectCurrentLocation();
    // Auto-refresh every 20 minutes
    const timer = setInterval(() => {
      refreshWeather();
    }, 20 * 60 * 1000);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const convert = useMemo(
    () => (celsius) => (unit === 'f' ? Math.round((celsius * 9) / 5 + 32) : celsius),
    [unit]
  );

  const value = useMemo(
    () => ({
      unit,
      setUnit,
      unitSymbol: unit === 'f' ? '°F' : '°C',
      convert,
      activeLocation,
      selectLocation,
      detectCurrentLocation,
      refreshWeather,
      searchLocations,
      loading,
      isLocating,
      isLiveLocation,
      locationError,
      lastRefreshed,
      current,
      hourly,
      weekly,
      alerts,
      rain,
      charts,
    }),
    [
      unit,
      convert,
      activeLocation,
      selectLocation,
      detectCurrentLocation,
      refreshWeather,
      loading,
      isLocating,
      isLiveLocation,
      locationError,
      lastRefreshed,
      current,
      hourly,
      weekly,
      alerts,
      rain,
      charts,
    ]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used within a WeatherProvider');
  return ctx;
}