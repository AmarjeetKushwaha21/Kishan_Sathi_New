import { useEffect, useState } from 'react';
import { FiTruck, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import logisticsService from '../services/logisticsService';

export default function Logistics() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    logisticsService.getShipments().then(setShipments);
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'in transit':
      case 'out for delivery':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300';
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Logistics & Shipment Tracking
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Real-time GPS dispatch tracking for bulk commodity dispatches from mandis to corporate warehouses.
        </p>
      </div>

      <div className="space-y-4">
        {shipments.map((shp) => (
          <div
            key={shp.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-800 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
                  <FiTruck className="text-base" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-900 dark:text-white">
                      #{shp.id}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getStatusBadge(
                        shp.status
                      )}`}
                    >
                      {shp.status}
                    </span>
                  </div>
                  <p className="font-display text-sm font-bold text-gray-900 dark:text-white">
                    {shp.crop} • Order #{shp.orderId}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Expected Delivery
                </span>
                <p className="font-bold text-primary-700 dark:text-primary-400">
                  {shp.expectedDelivery}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase">Origin / Dispatch</span>
                <p className="mt-0.5 font-medium text-gray-800 dark:text-gray-200">{shp.origin}</p>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase">Destination Silo</span>
                <p className="mt-0.5 font-medium text-gray-800 dark:text-gray-200">{shp.destination}</p>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase">Current Location</span>
                <p className="mt-0.5 font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1">
                  <FiMapPin />
                  <span>{shp.currentLocation}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl bg-gray-50/80 p-3 text-xs dark:bg-gray-800/40 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span>Fleet: <strong>{shp.carrier}</strong></span>
                <span>Vehicle: <strong className="font-mono">{shp.vehicleNo}</strong></span>
                <span className="text-gray-500">Driver: {shp.driver}</span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Connecting with driver for Shipment #${shp.id}`)}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                <FiPhone className="text-xs" />
                <span>Call Driver</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
