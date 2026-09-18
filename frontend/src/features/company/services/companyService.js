import dashboardStats from '../data/dashboardStats.json';
import companyProfileData from '../data/companyProfile.json';
import marketOverviewData from '../data/marketOverview.json';
import notificationsData from '../data/notifications.json';

export const companyService = {
  async getDashboardStats() {
    return new Promise((resolve) => setTimeout(() => resolve({ ...dashboardStats }), 50));
  },

  async getProfile() {
    const stored = localStorage.getItem('ks_company_profile');
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
    return new Promise((resolve) => setTimeout(() => resolve({ ...companyProfileData }), 50));
  },

  async updateProfile(updates) {
    const current = await this.getProfile();
    const merged = { ...current, ...updates };
    localStorage.setItem('ks_company_profile', JSON.stringify(merged));
    return merged;
  },

  async getMarketOverview() {
    return new Promise((resolve) => setTimeout(() => resolve([...marketOverviewData]), 50));
  },

  async getNotifications() {
    return new Promise((resolve) => setTimeout(() => resolve([...notificationsData]), 50));
  },
};

export default companyService;
