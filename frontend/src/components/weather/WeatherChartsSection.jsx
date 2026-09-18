import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import WeatherChartCard from './WeatherChartCard';
import { useWeather } from '@/context/WeatherContext';

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #e0f2fe',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(14, 165, 233, 0.18)',
};

export function HourlyTempChart() {
  const { charts, convert, unitSymbol } = useWeather();
  return (
    <WeatherChartCard title="Temperature (next 24 hours)" subtitle="Hourly air temperature">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={charts.hourly} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
          <defs>
            <linearGradient id="hourlyTempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} interval={2} />
          <YAxis
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(v) => `${v}°`}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${convert(value)}${unitSymbol}`, 'Temp']} />
          <Area type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={3} fill="url(#hourlyTempGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}

export function HourlyHumidityChart() {
  const { charts } = useWeather();
  return (
    <WeatherChartCard title="Humidity (next 24 hours)" subtitle="Relative humidity %">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={charts.hourly} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
          <defs>
            <linearGradient id="hourlyHumidityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} interval={2} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value}%`, 'Humidity']} />
          <Area type="monotone" dataKey="humidity" stroke="#14b8a6" strokeWidth={3} fill="url(#hourlyHumidityGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}

export function HourlyRainChart() {
  const { charts } = useWeather();
  return (
    <WeatherChartCard title="Rain probability (next 24 hours)" subtitle="Chance of precipitation %">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={charts.hourly} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} interval={2} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value}%`, 'Rain chance']} cursor={{ fill: 'rgba(14, 165, 233, 0.06)' }} />
          <Bar dataKey="rain" fill="#0ea5e9" radius={[5, 5, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}

export function WeeklyTempChart() {
  const { charts, convert, unitSymbol } = useWeather();
  return (
    <WeatherChartCard title="7 day high / low" subtitle="Temperature range per day">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={charts.weekly} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(v) => `${v}°`}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value, name) => [`${convert(value)}${unitSymbol}`, name]} />
          <Area type="monotone" dataKey="high" name="High" stroke="#f59e0b" strokeWidth={3} fill="rgba(245, 158, 11, 0.15)" />
          <Area type="monotone" dataKey="low" name="Low" stroke="#0ea5e9" strokeWidth={3} fill="rgba(14, 165, 233, 0.12)" />
        </AreaChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}

export function WeeklyRainChart() {
  const { charts } = useWeather();
  return (
    <WeatherChartCard title="Weekly rain chance" subtitle="Probability of rain per day">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={charts.weekly} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value}%`, 'Rain chance']} cursor={{ fill: 'rgba(14, 165, 233, 0.06)' }} />
          <Bar dataKey="rain" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}

export function WeeklyWindChart() {
  const { charts } = useWeather();
  return (
    <WeatherChartCard title="Weekly wind speed" subtitle="Average wind km/h">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={charts.weekly} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} km/h`, 'Wind']} />
          <Line type="monotone" dataKey="wind" stroke="#6366f1" strokeWidth={3} dot={{ r: 3, fill: '#6366f1' }} />
        </LineChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}

export function WeeklyUVChart() {
  const { charts } = useWeather();
  return (
    <WeatherChartCard title="Weekly UV index" subtitle="Max UV level per day">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={charts.weekly} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 12]} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} UV`, 'Index']} cursor={{ fill: 'rgba(245, 158, 11, 0.08)' }} />
          <Bar dataKey="uvIndex" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </WeatherChartCard>
  );
}