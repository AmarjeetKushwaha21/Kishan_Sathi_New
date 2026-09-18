import initialOrders from '../data/orders.json';

export const orderService = {
  async getOrders(statusFilter = 'All') {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...initialOrders];
        if (statusFilter && statusFilter !== 'All') {
          list = list.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
        }
        resolve(list);
      }, 50);
    });
  },

  async getOrderById(id) {
    return new Promise((resolve) => {
      const order = initialOrders.find((o) => o.id === id) || null;
      setTimeout(() => resolve(order), 50);
    });
  },
};

export default orderService;
