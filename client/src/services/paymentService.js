// paymentService.js
import api from './api';

export const makePayment = async (paymentData) => {
  const res = await api.post('/pay', paymentData);
  return res.data;
};
