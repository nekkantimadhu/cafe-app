// helpers.js

export const calcTotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
};

export const confirmDialog = (msg) => {
  return window.confirm(msg);
};
