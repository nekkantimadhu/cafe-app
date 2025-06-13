// CartItem.js
import React from 'react';

const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>₹{item.price} x {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-gray-300 px-2 py-1 rounded" onClick={onDecrease}>−</button>
        <span>{item.quantity}</span>
        <button className="bg-gray-300 px-2 py-1 rounded" onClick={onIncrease}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
