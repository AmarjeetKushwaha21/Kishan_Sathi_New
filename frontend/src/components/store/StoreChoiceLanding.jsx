import { FiArrowRight, FiMapPin, FiShoppingCart, FiShield } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StoreChoiceLanding({ onSelectMode }) {
  return (
    <div className="space-y-6 py-2">
      {/* Intro Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
                🌱
              </span>
              <div>
                <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  Agriculture Store & Discovery
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Choose how you want to purchase or discover your agricultural inputs
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-gray-200 text-xs dark:border-gray-700">
              <FiShield className="mr-1 text-primary-600" /> Genuine Agri Inputs
            </Badge>
          </div>
        </div>
      </div>

      {/* Two Choice Options */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 1. ONLINE STORE CARD */}
        <Card
          variant="default"
          className="group relative flex flex-col justify-between overflow-hidden border-2 border-transparent p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-lg dark:hover:border-primary-500"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-2xl text-primary-700 dark:border-primary-900 dark:bg-primary-950/60 dark:text-primary-300">
                <FiShoppingCart />
              </div>
              <Badge variant="primary" size="sm" className="font-bold uppercase tracking-wider">
                Home Delivery
              </Badge>
            </div>

            <h2 className="mt-5 font-display text-2xl font-bold text-gray-900 dark:text-white">
              🛒 Online Store
            </h2>
            <p className="mt-1 text-sm font-semibold text-primary-700 dark:text-primary-400">
              Shop agricultural products online
            </p>

            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Buy certified seeds, fertilizers, crop protection products, farm equipment and farming essentials online with direct delivery to your village or farm.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                30+ verified agri products & toolkits
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                Cart, wishlist & demo checkout flow
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                Transparent prices, delivery & order tracking
              </li>
            </ul>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
            <button
              type="button"
              onClick={() => onSelectMode('online')}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-primary-700 active:scale-[0.99]"
            >
              <span>Shop Online</span>
              <FiArrowRight />
            </button>
          </div>
        </Card>

        {/* 2. NEARBY STORES CARD */}
        <Card
          variant="default"
          className="group relative flex flex-col justify-between overflow-hidden border-2 border-transparent p-6 transition-all duration-200 hover:border-sky-500 hover:shadow-lg dark:hover:border-sky-500"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-2xl text-sky-700 dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-300">
                <FiMapPin />
              </div>
              <Badge variant="info" size="sm" className="font-bold uppercase tracking-wider">
                Local Discovery
              </Badge>
            </div>

            <h2 className="mt-5 font-display text-2xl font-bold text-gray-900 dark:text-white">
              📍 Nearby Stores
            </h2>
            <p className="mt-1 text-sm font-semibold text-sky-700 dark:text-sky-400">
              Find agricultural products at local stores
            </p>

            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Search a product, compare live prices across multiple local shops, check stock availability and find nearby agriculture retailers in Ghaziabad and Hapur.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                Compare identical products across up to 4 shops
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                24+ retailer network in Ghaziabad & Hapur
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                Interactive map markers, phone & directions
              </li>
            </ul>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
            <button
              type="button"
              onClick={() => onSelectMode('nearby')}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-sky-700 active:scale-[0.99]"
            >
              <span>Find Nearby Stores</span>
              <FiArrowRight />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
