import api from './api';

export const paymentService = {
  async createCheckoutSession(plan) {
    const response = await api.post('/payment/create-checkout-session', { plan });
    return response.data;
  },
};