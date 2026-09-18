import initialShipments from '../data/shipments.json';

export const logisticsService = {
  async getShipments() {
    return new Promise((resolve) => setTimeout(() => resolve([...initialShipments]), 50));
  },
};

export default logisticsService;
