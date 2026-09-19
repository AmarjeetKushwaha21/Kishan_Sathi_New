import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import ScrollToTop from '@/components/common/ScrollToTop';
import PageSkeleton from '@/components/ui/PageSkeleton';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
import CompanyProtectedRoute from '@/routes/CompanyProtectedRoute';
import { StoreProvider } from '@/context/StoreContext';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { WeatherProvider } from '@/context/WeatherContext';
import { RecommendationProvider } from '@/context/RecommendationContext';
import { SoilTestProvider } from '@/context/SoilTestContext';
import { MandiPriceProvider } from '@/context/MandiPriceContext';
import { ExpertProvider } from '@/context/ExpertContext';
import { LogisticsProvider } from '@/context/LogisticsContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { FarmerProvider } from '@/context/FarmerContext';
import { AdminProvider } from '@/context/AdminContext';
import { DiseaseProvider } from '@/context/DiseaseContext';
import { GovernmentProvider } from '@/context/GovernmentContext';

const Splash = lazy(() => import('@/pages/Splash'));
const Landing = lazy(() => import('@/pages/Landing'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const CentralSchemes = lazy(() => import('@/pages/government/CentralSchemes'));
const StateSchemes = lazy(() => import('@/pages/government/StateSchemes'));

const PublicLayout = lazy(() => import('@/components/public/PublicLayout'));
const FeaturesPage = lazy(() => import('@/pages/public/Features'));
const AgricultureStorePage = lazy(() => import('@/pages/public/AgricultureStore'));
const MarketplacePage = lazy(() => import('@/pages/public/Marketplace'));
const WeatherPage = lazy(() => import('@/pages/public/Weather'));
const MandiPricesPage = lazy(() => import('@/pages/public/MandiPrices'));
const CropRecommendationPage = lazy(() => import('@/pages/public/CropRecommendation'));
const DiseaseDetectionPage = lazy(() => import('@/pages/public/DiseaseDetection'));
const ExpertConsultationPage = lazy(() => import('@/pages/public/ExpertConsultation'));
const AboutPage = lazy(() => import('@/pages/public/About'));
const ContactPage = lazy(() => import('@/pages/public/Contact'));

const Login = lazy(() => import('@/pages/auth/Login'));
const CompanyLogin = lazy(() => import('@/pages/auth/CompanyLogin'));
const Register = lazy(() => import('@/pages/auth/Register'));
const CompanyRegister = lazy(() => import('@/pages/auth/CompanyRegister'));
const OtpVerification = lazy(() => import('@/pages/auth/OtpVerification'));


const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));

const CompanyLayout = lazy(() => import('@/features/company/components/CompanyLayout'));
const CompanyDashboard = lazy(() => import('@/features/company/pages/CompanyDashboard'));
const FindCrops = lazy(() => import('@/features/company/pages/FindCrops'));
const CompanyMarketplace = lazy(() => import('@/features/company/pages/Marketplace'));
const MyBids = lazy(() => import('@/features/company/pages/MyBids'));
const PurchaseOrders = lazy(() => import('@/features/company/pages/PurchaseOrders'));
const Transactions = lazy(() => import('@/features/company/pages/Transactions'));
const Logistics = lazy(() => import('@/features/company/pages/Logistics'));
const Messages = lazy(() => import('@/features/company/pages/Messages'));
const CompanyAccountProfile = lazy(() => import('@/features/company/pages/CompanyProfile'));
const CompanyNotifications = lazy(() => import('@/features/company/pages/Notifications'));
const CompanySettings = lazy(() => import('@/features/company/pages/CompanySettings'));

const DashboardHome = lazy(() => import('@/pages/dashboard/DashboardHome'));

const StoreHome = lazy(() => import('@/pages/bazaar/StoreHome'));
const ProductDetails = lazy(() => import('@/pages/bazaar/ProductDetails'));
const WishlistPage = lazy(() => import('@/pages/bazaar/WishlistPage'));
const CartPage = lazy(() => import('@/pages/bazaar/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/bazaar/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('@/pages/bazaar/OrderSuccessPage'));
const MyOrders = lazy(() => import('@/pages/bazaar/MyOrders'));
const NearbyStoreDetails = lazy(() => import('@/pages/bazaar/NearbyStoreDetails'));

const MyListings = lazy(() => import('@/pages/marketplace/MyListings'));
const SellCrop = lazy(() => import('@/pages/marketplace/SellCrop'));
const CropDetails = lazy(() => import('@/pages/marketplace/CropDetails'));
const BuyerOffers = lazy(() => import('@/pages/marketplace/BuyerOffers'));
const OfferDetails = lazy(() => import('@/pages/marketplace/OfferDetails'));
const AcceptedDeals = lazy(() => import('@/pages/marketplace/AcceptedDeals'));
const TransactionHistory = lazy(() => import('@/pages/marketplace/TransactionHistory'));
const CompanyProfile = lazy(() => import('@/pages/marketplace/CompanyProfile'));
const BuyerProfile = lazy(() => import('@/pages/marketplace/BuyerProfile'));

const CurrentWeather = lazy(() => import('@/pages/weather/CurrentWeather'));
const HourlyForecast = lazy(() => import('@/pages/weather/HourlyForecast'));
const WeeklyForecast = lazy(() => import('@/pages/weather/WeeklyForecast'));
const WeatherAlerts = lazy(() => import('@/pages/weather/WeatherAlerts'));
const RainPrediction = lazy(() => import('@/pages/weather/RainPrediction'));
const WeatherCharts = lazy(() => import('@/pages/weather/WeatherCharts'));

const CropRecommendationForm = lazy(() => import('@/pages/recommendation/CropRecommendationForm'));
const RecommendationResult = lazy(() => import('@/pages/recommendation/RecommendationResult'));
const SuitableCrops = lazy(() => import('@/pages/recommendation/SuitableCrops'));
const ProfitPrediction = lazy(() => import('@/pages/recommendation/ProfitPrediction'));
const MarketDemand = lazy(() => import('@/pages/recommendation/MarketDemand'));
const WeatherCompatibility = lazy(() => import('@/pages/recommendation/WeatherCompatibility'));
const SoilCompatibility = lazy(() => import('@/pages/recommendation/SoilCompatibility'));

const BookTest = lazy(() => import('@/pages/soil/BookTest'));
const LabSelection = lazy(() => import('@/pages/soil/LabSelection'));
const Appointment = lazy(() => import('@/pages/soil/Appointment'));
const SoilReport = lazy(() => import('@/pages/soil/SoilReport'));
const Nutrients = lazy(() => import('@/pages/soil/Nutrients'));
const PHLevel = lazy(() => import('@/pages/soil/PHLevel'));
const FertilizerRecommendation = lazy(() => import('@/pages/soil/FertilizerRecommendation'));
const History = lazy(() => import('@/pages/soil/History'));
const Charts = lazy(() => import('@/pages/soil/Charts'));

const TodayPrices = lazy(() => import('@/pages/mandi/TodayPrices'));
const HistoricalPrices = lazy(() => import('@/pages/mandi/HistoricalPrices'));
const PriceCharts = lazy(() => import('@/pages/mandi/PriceCharts'));
const NearbyMandis = lazy(() => import('@/pages/mandi/NearbyMandis'));
const FavoriteMarkets = lazy(() => import('@/pages/mandi/FavoriteMarkets'));
const Comparison = lazy(() => import('@/pages/mandi/Comparison'));

const ExpertList = lazy(() => import('@/pages/expert/ExpertList'));
const ExpertProfile = lazy(() => import('@/pages/expert/ExpertProfile'));
const BookAppointment = lazy(() => import('@/pages/expert/BookAppointment'));
const AppointmentCalendar = lazy(() => import('@/pages/expert/AppointmentCalendar'));
const VideoCallUI = lazy(() => import('@/pages/expert/VideoCallUI'));
const ChatUI = lazy(() => import('@/pages/expert/ChatUI'));
const ConsultationHistory = lazy(() => import('@/pages/expert/ConsultationHistory'));
const Ratings = lazy(() => import('@/pages/expert/Ratings'));

const BookPickup = lazy(() => import('@/pages/logistics/BookPickup'));
const TrackDelivery = lazy(() => import('@/pages/logistics/TrackDelivery'));
const VehicleDetails = lazy(() => import('@/pages/logistics/VehicleDetails'));
const DriverDetails = lazy(() => import('@/pages/logistics/DriverDetails'));
const DeliveryTimeline = lazy(() => import('@/pages/logistics/DeliveryTimeline'));
const CompletedDeliveries = lazy(() => import('@/pages/logistics/CompletedDeliveries'));
const LogisticsMap = lazy(() => import('@/pages/logistics/LogisticsMap'));

const DetectNow = lazy(() => import('@/pages/disease/DetectNow'));
const DetectionResult = lazy(() => import('@/pages/disease/DetectionResult'));
const ScanHistory = lazy(() => import('@/pages/disease/ScanHistory'));
const Treatments = lazy(() => import('@/pages/disease/Treatments'));
const PestAlerts = lazy(() => import('@/pages/disease/PestAlerts'));

const AiAssistant = lazy(() => import('@/pages/assistant/AiAssistant'));
const Advisories = lazy(() => import('@/pages/assistant/Advisories'));

const FieldReports = lazy(() => import('@/pages/fieldReports/FieldReports'));
const ReportDetail = lazy(() => import('@/pages/fieldReports/ReportDetail'));
const NewReport = lazy(() => import('@/pages/fieldReports/NewReport'));

const CropPlanner = lazy(() => import('@/pages/cropPlanner/CropPlanner'));
const PlanDetail = lazy(() => import('@/pages/cropPlanner/PlanDetail'));
const NewPlan = lazy(() => import('@/pages/cropPlanner/NewPlan'));

const NotificationCenter = lazy(() => import('@/pages/notifications/NotificationCenter'));
const NotificationDetails = lazy(() => import('@/pages/notifications/NotificationDetails'));

const ProfileHome = lazy(() => import('@/pages/farmer/ProfileHome'));
const EditProfile = lazy(() => import('@/pages/farmer/EditProfile'));
const FarmDetails = lazy(() => import('@/pages/farmer/FarmDetails'));
const LandDetails = lazy(() => import('@/pages/farmer/LandDetails'));
const Documents = lazy(() => import('@/pages/farmer/Documents'));
const BankDetails = lazy(() => import('@/pages/farmer/BankDetails'));
const CropHistory = lazy(() => import('@/pages/farmer/CropHistory'));
const Achievements = lazy(() => import('@/pages/farmer/Achievements'));
const FarmerSettings = lazy(() => import('@/pages/farmer/Settings'));

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));
const AdminFarmers = lazy(() => import('@/pages/admin/AdminFarmers'));
const AdminCompanies = lazy(() => import('@/pages/admin/AdminCompanies'));
const AdminExperts = lazy(() => import('@/pages/admin/AdminExperts'));
const AdminProducts = lazy(() => import('@/pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'));
const AdminMarketplace = lazy(() => import('@/pages/admin/AdminMarketplace'));
const AdminReports = lazy(() => import('@/pages/admin/AdminReports'));
const AdminAnalytics = lazy(() => import('@/pages/admin/AdminAnalytics'));
const AdminNotifications = lazy(() => import('@/pages/admin/AdminNotifications'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));

function ProviderRoute({ provider: Provider }) {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}

function PageSuspense({ children }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
          <Route path="/splash" element={<PageSuspense><Splash /></PageSuspense>} />
          <Route path="/landing" element={<PageSuspense><Landing /></PageSuspense>} />
          <Route index element={<PageSuspense><Landing /></PageSuspense>} />

          <Route element={<PublicLayout />}>
            <Route path="/features" element={<PageSuspense><FeaturesPage /></PageSuspense>} />
            <Route path="/agriculture-store" element={<PageSuspense><AgricultureStorePage /></PageSuspense>} />
            <Route path="/marketplace" element={<PageSuspense><MarketplacePage /></PageSuspense>} />
            <Route path="/weather" element={<PageSuspense><WeatherPage /></PageSuspense>} />
            <Route path="/mandi-prices" element={<PageSuspense><MandiPricesPage /></PageSuspense>} />
            <Route path="/crop-recommendation" element={<PageSuspense><CropRecommendationPage /></PageSuspense>} />
            <Route path="/disease-detection" element={<PageSuspense><DiseaseDetectionPage /></PageSuspense>} />
            <Route path="/expert-consultation" element={<PageSuspense><ExpertConsultationPage /></PageSuspense>} />
            <Route path="/about" element={<PageSuspense><AboutPage /></PageSuspense>} />
            <Route path="/contact" element={<PageSuspense><ContactPage /></PageSuspense>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<PageSuspense><Login /></PageSuspense>} />
          <Route path="/login/farmer" element={<PageSuspense><Login /></PageSuspense>} />
          <Route path="/login/company" element={<PageSuspense><CompanyLogin /></PageSuspense>} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/register" element={<PageSuspense><Register /></PageSuspense>} />
            <Route path="/register/farmer" element={<PageSuspense><Register /></PageSuspense>} />
            <Route path="/register/company" element={<PageSuspense><CompanyRegister /></PageSuspense>} />
            <Route path="/otp" element={<PageSuspense><OtpVerification /></PageSuspense>} />
            <Route path="/forgot-password" element={<PageSuspense><ForgotPassword /></PageSuspense>} />
          </Route>


          {/* Independent Company Portal Routes */}
          <Route element={<CompanyProtectedRoute />}>
            <Route element={<CompanyLayout />}>
              <Route path="/company/dashboard" element={<PageSuspense><CompanyDashboard /></PageSuspense>} />
              <Route path="/company/crops" element={<PageSuspense><FindCrops /></PageSuspense>} />
              <Route path="/company/marketplace" element={<PageSuspense><CompanyMarketplace /></PageSuspense>} />
              <Route path="/company/bids" element={<PageSuspense><MyBids /></PageSuspense>} />
              <Route path="/company/orders" element={<PageSuspense><PurchaseOrders /></PageSuspense>} />
              <Route path="/company/transactions" element={<PageSuspense><Transactions /></PageSuspense>} />
              <Route path="/company/logistics" element={<PageSuspense><Logistics /></PageSuspense>} />
              <Route path="/company/messages" element={<PageSuspense><Messages /></PageSuspense>} />
              <Route path="/company/profile" element={<PageSuspense><CompanyAccountProfile /></PageSuspense>} />
              <Route path="/company/notifications" element={<PageSuspense><CompanyNotifications /></PageSuspense>} />
              <Route path="/company/settings" element={<PageSuspense><CompanySettings /></PageSuspense>} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <FarmerProvider>
                  <NotificationProvider>
                    <WeatherProvider>
                      <DashboardLayout />
                    </WeatherProvider>
                  </NotificationProvider>
                </FarmerProvider>
              }
            >
              <Route path="/dashboard" element={<PageSuspense><DashboardHome /></PageSuspense>} />
              <Route
                path="/dashboard/field-reports"
                element={<PageSuspense><FieldReports /></PageSuspense>}
              />
              <Route
                path="/dashboard/field-reports/new"
                element={<PageSuspense><NewReport /></PageSuspense>}
              />
              <Route
                path="/dashboard/field-reports/:reportId"
                element={<PageSuspense><ReportDetail /></PageSuspense>}
              />
              <Route
                path="/dashboard/crop-planner"
                element={<PageSuspense><CropPlanner /></PageSuspense>}
              />
              <Route
                path="/dashboard/crop-planner/new"
                element={<PageSuspense><NewPlan /></PageSuspense>}
              />
              <Route
                path="/dashboard/crop-planner/:planId"
                element={<PageSuspense><PlanDetail /></PageSuspense>}
              />
              <Route element={<ProviderRoute provider={MandiPriceProvider} />}>
                <Route path="/dashboard/market-prices" element={<PageSuspense><TodayPrices /></PageSuspense>} />
                <Route path="/dashboard/market-prices/history" element={<PageSuspense><HistoricalPrices /></PageSuspense>} />
                <Route path="/dashboard/market-prices/charts" element={<PageSuspense><PriceCharts /></PageSuspense>} />
                <Route path="/dashboard/market-prices/nearby" element={<PageSuspense><NearbyMandis /></PageSuspense>} />
                <Route path="/dashboard/market-prices/favorites" element={<PageSuspense><FavoriteMarkets /></PageSuspense>} />
                <Route path="/dashboard/market-prices/compare" element={<PageSuspense><Comparison /></PageSuspense>} />
              </Route>
              <Route element={<ProviderRoute provider={ExpertProvider} />}>
                <Route path="/dashboard/consultation" element={<PageSuspense><ExpertList /></PageSuspense>} />
                <Route path="/dashboard/consultation/expert/:expertId" element={<PageSuspense><ExpertProfile /></PageSuspense>} />
                <Route path="/dashboard/consultation/book/:expertId?" element={<PageSuspense><BookAppointment /></PageSuspense>} />
                <Route path="/dashboard/consultation/calendar" element={<PageSuspense><AppointmentCalendar /></PageSuspense>} />
                <Route path="/dashboard/consultation/video/:appointmentId?" element={<PageSuspense><VideoCallUI /></PageSuspense>} />
                <Route path="/dashboard/consultation/chat/:expertId?" element={<PageSuspense><ChatUI /></PageSuspense>} />
                <Route path="/dashboard/consultation/history" element={<PageSuspense><ConsultationHistory /></PageSuspense>} />
                <Route path="/dashboard/consultation/ratings/:expertId?" element={<PageSuspense><Ratings /></PageSuspense>} />
              </Route>
              <Route path="/dashboard/weather" element={<PageSuspense><CurrentWeather /></PageSuspense>} />
              <Route path="/dashboard/weather/hourly" element={<PageSuspense><HourlyForecast /></PageSuspense>} />
              <Route path="/dashboard/weather/7day" element={<PageSuspense><WeeklyForecast /></PageSuspense>} />
              <Route path="/dashboard/weather/alerts" element={<PageSuspense><WeatherAlerts /></PageSuspense>} />
              <Route path="/dashboard/weather/rain" element={<PageSuspense><RainPrediction /></PageSuspense>} />
              <Route path="/dashboard/weather/charts" element={<PageSuspense><WeatherCharts /></PageSuspense>} />
              <Route element={<ProviderRoute provider={RecommendationProvider} />}>
                <Route path="/dashboard/recommendation" element={<PageSuspense><CropRecommendationForm /></PageSuspense>} />
                <Route path="/dashboard/recommendation/result" element={<PageSuspense><RecommendationResult /></PageSuspense>} />
                <Route path="/dashboard/recommendation/crops" element={<PageSuspense><SuitableCrops /></PageSuspense>} />
                <Route path="/dashboard/recommendation/profit" element={<PageSuspense><ProfitPrediction /></PageSuspense>} />
                <Route path="/dashboard/recommendation/demand" element={<PageSuspense><MarketDemand /></PageSuspense>} />
                <Route path="/dashboard/recommendation/weather" element={<PageSuspense><WeatherCompatibility /></PageSuspense>} />
                <Route path="/dashboard/recommendation/soil" element={<PageSuspense><SoilCompatibility /></PageSuspense>} />
              </Route>
              <Route
                path="/dashboard/ai-assistant"
                element={<PageSuspense><AiAssistant /></PageSuspense>}
              />
              <Route
                path="/dashboard/ai-assistant/advisories"
                element={<PageSuspense><Advisories /></PageSuspense>}
              />
              <Route element={<ProviderRoute provider={DiseaseProvider} />}>
                <Route path="/dashboard/disease-detection" element={<PageSuspense><DetectNow /></PageSuspense>} />
                <Route path="/dashboard/disease-detection/result" element={<PageSuspense><DetectionResult /></PageSuspense>} />
                <Route path="/dashboard/disease-detection/history" element={<PageSuspense><ScanHistory /></PageSuspense>} />
                <Route path="/dashboard/disease-detection/treatments" element={<PageSuspense><Treatments /></PageSuspense>} />
                <Route path="/dashboard/disease-detection/alerts" element={<PageSuspense><PestAlerts /></PageSuspense>} />
              </Route>
              <Route element={<ProviderRoute provider={StoreProvider} />}>
                <Route path="/dashboard/bazaar" element={<PageSuspense><StoreHome /></PageSuspense>} />
                <Route path="/dashboard/bazaar/product/:productId" element={<PageSuspense><ProductDetails /></PageSuspense>} />
                <Route path="/dashboard/bazaar/wishlist" element={<PageSuspense><WishlistPage /></PageSuspense>} />
                <Route path="/dashboard/bazaar/cart" element={<PageSuspense><CartPage /></PageSuspense>} />
                <Route path="/dashboard/bazaar/checkout" element={<PageSuspense><CheckoutPage /></PageSuspense>} />
                <Route path="/dashboard/bazaar/order-success/:orderId" element={<PageSuspense><OrderSuccessPage /></PageSuspense>} />
                <Route path="/dashboard/bazaar/my-orders" element={<PageSuspense><MyOrders /></PageSuspense>} />
                <Route path="/dashboard/bazaar/nearby/:storeId" element={<PageSuspense><NearbyStoreDetails /></PageSuspense>} />
                <Route path="/dashboard/store" element={<Navigate to="/dashboard/bazaar" replace />} />
                <Route path="/dashboard/store/nearby/:storeId" element={<Navigate to="/dashboard/bazaar/nearby/:storeId" replace />} />
              </Route>
              <Route element={<ProviderRoute provider={MarketplaceProvider} />}>
                <Route path="/dashboard/marketplace" element={<Navigate to="/dashboard/marketplace/listings" replace />} />
                <Route path="/dashboard/marketplace/listings" element={<PageSuspense><MyListings /></PageSuspense>} />
                <Route path="/dashboard/marketplace/sell" element={<PageSuspense><SellCrop /></PageSuspense>} />
                <Route path="/dashboard/marketplace/crop/:cropId" element={<PageSuspense><CropDetails /></PageSuspense>} />
                <Route path="/dashboard/marketplace/offers" element={<PageSuspense><BuyerOffers /></PageSuspense>} />
                <Route path="/dashboard/marketplace/offers/:offerId" element={<PageSuspense><OfferDetails /></PageSuspense>} />
                <Route path="/dashboard/marketplace/deals" element={<PageSuspense><AcceptedDeals /></PageSuspense>} />
                <Route path="/dashboard/marketplace/transactions" element={<PageSuspense><TransactionHistory /></PageSuspense>} />
                <Route path="/dashboard/marketplace/company/:companyId" element={<PageSuspense><CompanyProfile /></PageSuspense>} />
                <Route path="/dashboard/marketplace/buyer/:buyerId" element={<PageSuspense><BuyerProfile /></PageSuspense>} />
              </Route>

              <Route element={<ProviderRoute provider={SoilTestProvider} />}>
                <Route path="/dashboard/soil" element={<PageSuspense><BookTest /></PageSuspense>} />
                <Route path="/dashboard/soil/lab" element={<PageSuspense><LabSelection /></PageSuspense>} />
                <Route path="/dashboard/soil/appointment" element={<PageSuspense><Appointment /></PageSuspense>} />
                <Route path="/dashboard/soil/report" element={<PageSuspense><SoilReport /></PageSuspense>} />
                <Route path="/dashboard/soil/nutrients" element={<PageSuspense><Nutrients /></PageSuspense>} />
                <Route path="/dashboard/soil/ph" element={<PageSuspense><PHLevel /></PageSuspense>} />
                <Route path="/dashboard/soil/fertilizer" element={<PageSuspense><FertilizerRecommendation /></PageSuspense>} />
                <Route path="/dashboard/soil/history" element={<PageSuspense><History /></PageSuspense>} />
                <Route path="/dashboard/soil/charts" element={<PageSuspense><Charts /></PageSuspense>} />
              </Route>

              <Route element={<ProviderRoute provider={LogisticsProvider} />}>
                <Route path="/dashboard/logistics" element={<PageSuspense><BookPickup /></PageSuspense>} />
                <Route path="/dashboard/logistics/track/:deliveryId?" element={<PageSuspense><TrackDelivery /></PageSuspense>} />
                <Route path="/dashboard/logistics/vehicle/:vehicleId" element={<PageSuspense><VehicleDetails /></PageSuspense>} />
                <Route path="/dashboard/logistics/driver/:driverId" element={<PageSuspense><DriverDetails /></PageSuspense>} />
                <Route path="/dashboard/logistics/timeline/:deliveryId?" element={<PageSuspense><DeliveryTimeline /></PageSuspense>} />
                <Route path="/dashboard/logistics/completed" element={<PageSuspense><CompletedDeliveries /></PageSuspense>} />
                <Route path="/dashboard/logistics/map" element={<PageSuspense><LogisticsMap /></PageSuspense>} />
              </Route>

              <Route path="/dashboard/notifications" element={<PageSuspense><NotificationCenter /></PageSuspense>} />
              <Route path="/dashboard/notifications/:notificationId?" element={<PageSuspense><NotificationDetails /></PageSuspense>} />

              <Route path="/dashboard/profile" element={<PageSuspense><ProfileHome /></PageSuspense>} />
              <Route path="/dashboard/profile/edit" element={<PageSuspense><EditProfile /></PageSuspense>} />
              <Route path="/dashboard/profile/farm" element={<PageSuspense><FarmDetails /></PageSuspense>} />
              <Route path="/dashboard/profile/land" element={<PageSuspense><LandDetails /></PageSuspense>} />
              <Route path="/dashboard/profile/documents" element={<PageSuspense><Documents /></PageSuspense>} />
              <Route path="/dashboard/profile/bank" element={<PageSuspense><BankDetails /></PageSuspense>} />
              <Route path="/dashboard/profile/crops" element={<PageSuspense><CropHistory /></PageSuspense>} />
              <Route path="/dashboard/profile/achievements" element={<PageSuspense><Achievements /></PageSuspense>} />
              <Route path="/dashboard/profile/settings" element={<PageSuspense><FarmerSettings /></PageSuspense>} />

              <Route element={<ProviderRoute provider={AdminProvider} />}>
                <Route path="/dashboard/admin" element={<PageSuspense><AdminDashboard /></PageSuspense>} />
                <Route path="/dashboard/admin/users" element={<PageSuspense><AdminUsers /></PageSuspense>} />
                <Route path="/dashboard/admin/farmers" element={<PageSuspense><AdminFarmers /></PageSuspense>} />
                <Route path="/dashboard/admin/companies" element={<PageSuspense><AdminCompanies /></PageSuspense>} />
                <Route path="/dashboard/admin/experts" element={<PageSuspense><AdminExperts /></PageSuspense>} />
                <Route path="/dashboard/admin/products" element={<PageSuspense><AdminProducts /></PageSuspense>} />
                <Route path="/dashboard/admin/orders" element={<PageSuspense><AdminOrders /></PageSuspense>} />
                <Route path="/dashboard/admin/marketplace" element={<PageSuspense><AdminMarketplace /></PageSuspense>} />
                <Route path="/dashboard/admin/reports" element={<PageSuspense><AdminReports /></PageSuspense>} />
                <Route path="/dashboard/admin/analytics" element={<PageSuspense><AdminAnalytics /></PageSuspense>} />
                <Route path="/dashboard/admin/notifications" element={<PageSuspense><AdminNotifications /></PageSuspense>} />
                <Route path="/dashboard/admin/settings" element={<PageSuspense><AdminSettings /></PageSuspense>} />
              </Route>

              <Route element={<ProviderRoute provider={GovernmentProvider} />}>
                <Route path="/dashboard/central-schemes" element={<PageSuspense><CentralSchemes /></PageSuspense>} />
                <Route path="/dashboard/state-schemes" element={<PageSuspense><StateSchemes /></PageSuspense>} />
              </Route>

              <Route path="/dashboard/orders" element={<Navigate to="/dashboard/bazaar/my-orders" replace />} />
              <Route path="/dashboard/settings" element={<Navigate to="/dashboard/profile/settings" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<PageSuspense><NotFound /></PageSuspense>} />
        </Routes>
    </>
  );
}