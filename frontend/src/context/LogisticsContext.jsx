import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  COMMODITIES,
  COMPLETED_SEED,
  DELIVERY_SEED,
  DESTINATIONS,
  DRIVERS,
  FARM_DEFAULT,
  VEHICLES,
  estimateFare,
} from '@/data/mock/logistics';

const DELIVERIES_KEY = 'ks_logistics_deliveries';

function load(key, fallback) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (stored !== null && stored !== undefined) return stored;
  } catch {
    // ignore corrupt storage
  }
  return fallback;
}

const LogisticsContext = createContext(null);

export function LogisticsProvider({ children }) {
  const [deliveries, setDeliveries] = useState(() => load(DELIVERIES_KEY, [...COMPLETED_SEED, ...DELIVERY_SEED]));
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLES[0].id);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(DELIVERY_SEED[0].id);

  useEffect(() => {
    localStorage.setItem(DELIVERIES_KEY, JSON.stringify(deliveries));
  }, [deliveries]);

  const active = useMemo(() => deliveries.filter((d) => d.status === 'in-transit' || d.status === 'scheduled'), [deliveries]);
  const completed = useMemo(() => deliveries.filter((d) => d.status === 'delivered'), [deliveries]);

  const bookPickup = useCallback(({ vehicleId, destinationId, commodity, quantity, pickupTime, contact }) => {
    const vehicle = VEHICLES.find((v) => v.id === vehicleId);
    const destination = DESTINATIONS.find((d) => d.id === destinationId);
    const amount = estimateFare(vehicle, destination.km, quantity);
    const delivery = {
      id: `dlv-${Date.now()}`,
      bookingId: `KS-LG-${1040 + Math.floor(Math.random() * 900)}`,
      from: FARM_DEFAULT,
      to: destination.name,
      toCity: destination.city,
      km: destination.km,
      commodity,
      quantity,
      vehicleId,
      driverId: vehicle.driverId,
      status: 'scheduled',
      progress: 0,
      pickupTime,
      eta: 'On confirmation',
      amount,
      currentLocation: FARM_DEFAULT,
      contact: contact || DRIVERS.find((d) => d.id === vehicle.driverId)?.phone,
      startedAt: pickupTime,
      timeline: [{ time: pickupTime, label: 'Booking confirmed', detail: `${commodity} pickup scheduled for ${pickupTime}.`, done: true }],
    };
    setDeliveries((prev) => [delivery, ...prev]);
    setSelectedDeliveryId(delivery.id);
    return delivery;
  }, []);

  const refreshProgress = useCallback((deliveryId) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id !== deliveryId || d.status !== 'in-transit') return d;
        const next = Math.min(100, d.progress + 7);
        const status = next >= 100 ? 'delivered' : 'in-transit';
        return {
          ...d,
          progress: next,
          status,
          eta: next >= 100 ? 'Delivered' : d.eta,
          currentLocation: next >= 100 ? d.to : `${d.toCity} · ${Math.max(1, Math.round(32 * (1 - next / 100)))} km to go`,
        };
      })
    );
  }, []);

  const getVehicle = useCallback((id) => VEHICLES.find((v) => v.id === id) || VEHICLES[0], []);
  const getDriver = useCallback((id) => DRIVERS.find((d) => d.id === id) || DRIVERS[0], []);
  const getDelivery = useCallback((id) => deliveries.find((d) => d.id === id), [deliveries]);
  const getDestination = useCallback((id) => DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0], []);

  const value = useMemo(
    () => ({
      vehicles: VEHICLES,
      drivers: DRIVERS,
      commodities: COMMODITIES,
      destinations: DESTINATIONS,
      farmDefault: FARM_DEFAULT,
      deliveries,
      active,
      completed,
      selectedVehicleId,
      setSelectedVehicleId,
      selectedDeliveryId,
      setSelectedDeliveryId,
      bookPickup,
      refreshProgress,
      getVehicle,
      getDriver,
      getDelivery,
      getDestination,
      estimateFare,
    }),
    [
      deliveries,
      active,
      completed,
      selectedVehicleId,
      selectedDeliveryId,
      bookPickup,
      refreshProgress,
      getVehicle,
      getDriver,
      getDelivery,
      getDestination,
    ]
  );

  return <LogisticsContext.Provider value={value}>{children}</LogisticsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLogistics() {
  const ctx = useContext(LogisticsContext);
  if (!ctx) throw new Error('useLogistics must be used within a LogisticsProvider');
  return ctx;
}