// orderService.js
import api from './api';

export const createOrder = async (payload) => {
  const res = await api.post('/order', payload);
  return res.data;
};
