// // menuService.js
// import api from './api';

// export const getMenuItems = async () => {
//   const res = await api.get('/menu');
//   return res.data;
// };

import api from './api';

export const getMenu = async () => {
  try {
    const res = await api.get('/menu');
    return res.data;
  } catch (err) {
    console.error('Error fetching menu:', err);
    return [];
  }
};
