import {
  FiCloud,
  FiCloudDrizzle,
  FiCloudLightning,
  FiCloudRain,
  FiCloudSnow,
  FiMoon,
  FiSun,
  FiWind,
} from 'react-icons/fi';

const ICON_MAP = {
  sunny: FiSun,
  'clear-night': FiMoon,
  'partly-cloudy': FiCloudDrizzle,
  cloudy: FiCloud,
  rainy: FiCloudRain,
  'heavy-rain': FiCloudRain,
  stormy: FiCloudLightning,
  foggy: FiCloud,
  windy: FiWind,
  snow: FiCloudSnow,
};

export function weatherIcon(conditionKey) {
  return ICON_MAP[conditionKey] || FiSun;
}