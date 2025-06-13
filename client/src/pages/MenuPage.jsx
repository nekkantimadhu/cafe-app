// // pages/MenuPage.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import MenuCard from '../components/MenuCard';
// import { menuService } from '../services/menuService';

// const MenuPage = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const tableNo = sessionStorage.getItem('tableNo');

//   useEffect(() => {
//     if (!tableNo) {
//       navigate('/');
//       return;
//     }
//     fetchMenuData();
//   }, [tableNo, navigate]);

//   const fetchMenuData = async () => {
//     try {
//       setLoading(true);
//       const items = await menuService.getMenuItems();
//       setMenuItems(items);
      
//       // Extract unique categories
//       const uniqueCategories = ['All', ...new Set(items.map(item => item.category))];
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredItems = menuItems.filter(item => {
//     const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch && item.is_available;
//   });

//   const addToCart = (item) => {
//     const existingItem = cart.find(cartItem => cartItem.id === item.id);
//     if (existingItem) {
//       setCart(cart.map(cartItem =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       ));
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//   };

//   const getCartItemCount = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const goToCart = () => {
//     sessionStorage.setItem('cart', JSON.stringify(cart));
//     navigate('/cart');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title={`Table ${tableNo}`} showBack={true} />
      
//       {/* Search Bar */}
//       <div className="p-4 bg-white shadow-sm">
//         <input
//           type="text"
//           placeholder="Search menu items..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
//       </div>

//       {/* Category Filter */}
//       <div className="p-4 bg-white">
//         <div className="flex overflow-x-auto space-x-2 pb-2">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap ${
//                 selectedCategory === category
//                   ? 'bg-orange-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <div className="p-4 pb-20">
//         {filteredItems.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-gray-500">No items found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredItems.map(item => (
//               <MenuCard
//                 key={item.id}
//                 item={item}
//                 onAddToCart={addToCart}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Floating Cart Button */}
//       {getCartItemCount() > 0 && (
//         <div className="fixed bottom-4 right-4">
//           <button
//             onClick={goToCart}
//             className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 flex items-center space-x-2"
//           >
//             <span>🛒</span>
//             <span className="bg-white text-orange-500 rounded-full px-2 py-1 text-sm font-bold">
//               {getCartItemCount()}
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuPage;



// MenuPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenu } from '../services/menuService';
import MenuCard from '../components/MenuCard';
import Header from '../components/Header';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMenu().then((data) => setMenuItems(data));
  }, []);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart`);
  };

  return (
    <div className="p-4">
      <Header title="Menu" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-md"
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
