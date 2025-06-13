// MenuCard.js
import React from 'react';

const MenuCard = ({ item, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.category}</p>
      <p className="text-md font-bold mt-1">₹{item.price}</p>
      <button
        className="mt-2 bg-green-500 text-white px-4 py-1 rounded-md"
        onClick={onAdd}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuCard;
