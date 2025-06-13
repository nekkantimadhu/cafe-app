// // pages/CartPage.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import CartItem from '../components/CartItem';
// import { orderService } from '../services/orderService';

// const CartPage = () => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const tableNo = sessionStorage.getItem('tableNo');

//   useEffect(() => {
//     if (!tableNo) {
//       navigate('/');
//       return;
//     }

//     // Load cart from sessionStorage
//     const savedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
//     setCart(savedCart);
//   }, [tableNo, navigate]);

//   useEffect(() => {
//     // Save cart to sessionStorage whenever it changes
//     sessionStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity === 0) {
//       removeItem(itemId);
//       return;
//     }

//     setCart(cart.map(item =>
//       item.id === itemId
//         ? { ...item, quantity: newQuantity }
//         : item
//     ));
//   };

//   const removeItem = (itemId) => {
//     setCart(cart.filter(item => item.id !== itemId));
//   };

//   const getSubtotal = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getTax = () => {
//     return getSubtotal() * 0.05; // 5% tax
//   };

//   const getTotal = () => {
//     return getSubtotal() + getTax();
//   };

//   const proceedToPayment = async () => {
//     if (cart.length === 0) return;

//     setLoading(true);
//     try {
//       // Create order
//       const orderData = {
//         table_no: tableNo,
//         items: cart.map(item => ({
//           menu_id: item.id,
//           quantity: item.quantity,
//           price: item.price
//         })),
//         total_amount: getTotal(),
//         status: 'pending'
//       };

//       const order = await orderService.createOrder(orderData);
      
//       // Store order ID for payment
//       sessionStorage.setItem('orderId', order.id);
//       navigate('/payment');
//     } catch (error) {
//       console.error('Error creating order:', error);
//       alert('Failed to create order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearCart = () => {
//     setCart([]);
//     sessionStorage.removeItem('cart');
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header title="Your Cart" showBack={true} />
//         <div className="flex flex-col items-center justify-center h-64">
//           <div className="text-6xl mb-4">🛒</div>
//           <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
//           <p className="text-gray-500 mb-4">Add some delicious items to get started!</p>
//           <button
//             onClick={() => navigate('/menu')}
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//           >
//             Browse Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title="Your Cart" showBack={true} />
      
//       <div className="p-4">
//         {/* Table Info */}
//         <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
//           <h3 className="font-semibold text-gray-700">Table {tableNo}</h3>
//           <p className="text-sm text-gray-500">{cart.length} items in cart</p>
//         </div>

//         {/* Cart Items */}
//         <div className="space-y-2 mb-4">
//           {cart.map(item => (
//             <CartItem
//               key={item.id}
//               item={item}
//               onUpdateQuantity={updateQuantity}
//               onRemove={removeItem}
//             />
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
//           <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
          
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Subtotal</span>
//               <span>₹{getSubtotal().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Tax (5%)</span>
//               <span>₹{getTax().toFixed(2)}</span>
//             </div>
//             <div className="border-t pt-2">
//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Total</span>
//                 <span>₹{getTotal().toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={proceedToPayment}
//             disabled={loading}
//             className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Creating Order...' : `Proceed to Payment - ₹${getTotal().toFixed(2)}`}
//           </button>

//           <button
//             onClick={clearCart}
//             className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
//           >
//             Clear Cart
//           </button>
//         </div>

//         {/* Add More Items */}
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => navigate('/menu')}
//             className="text-orange-500 font-semibold hover:underline"
//           >
//             + Add more items
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


// CartPage.js
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { calcTotal } from '../utils/helpers';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0);
    updateCart(updated);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="p-4">
      <Header title="Your Cart" />
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
              />
            ))}
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ₹{calcTotal(cart)}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleCheckout}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
