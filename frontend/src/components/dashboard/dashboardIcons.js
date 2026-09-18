import {
  FiCpu,
  FiCloudDrizzle,
  FiTrendingUp,
  FiShoppingBag,
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCloudLightning,
  FiMoon,
  FiLayers,
  FiMapPin,
  FiTarget,
} from 'react-icons/fi';

import { weatherIcon } from '@/components/weather/weatherIcons';

const ICONS = {
  FiCpu,
  FiCloudDrizzle,
  FiTrendingUp,
  FiShoppingBag,
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCloudLightning,
  FiMoon,
  FiLayers,
  FiMapPin,
  FiTarget,
};

export function getIcon(name) {
  return ICONS[name] || FiTarget;
}

export { weatherIcon };

export default ICONS;