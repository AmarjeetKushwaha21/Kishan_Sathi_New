import platformStats from '@/data/mock/platformStats.json';
import solutionsData from '@/data/mock/solutions.json';
import rolesData from '@/data/mock/roles.json';

/**
 * Service to fetch platform stats, solutions, and roles.
 * Currently uses mock data; easily swappable with Axios/fetch when backend is connected.
 */
export const platformService = {
  async getStats() {
    // Simulated network delay for realistic async architecture
    return new Promise((resolve) => {
      setTimeout(() => resolve([...platformStats]), 50);
    });
  },

  async getSolutions() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...solutionsData]), 50);
    });
  },

  async getRoles() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...rolesData]), 50);
    });
  },
};

export default platformService;
