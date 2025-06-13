// OrderStatus.js
import React from 'react';
import Header from '../components/Header';

const OrderStatus = () => {
  return (
    <div className="p-4 text-center">
      <Header title="Order Status" />
      <p className="mt-4 text-lg">✅ Your order has been placed.</p>
      <p className="text-gray-500 mt-2">Please wait while we prepare and serve it to your table.</p>
    </div>
  );
};

export default OrderStatus;
