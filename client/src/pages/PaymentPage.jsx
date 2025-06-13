// // pages/PaymentPage.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import { paymentService } from '../services/paymentService';
// import { orderService } from '../services/orderService';

// const PaymentPage = () => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
//   const navigate = useNavigate();

//   const orderId = sessionStorage.getItem('orderId');
//   const tableNo = sessionStorage.getItem('tableNo');

//   useEffect(() => {
//     if (!orderId || !tableNo) {
//       navigate('/');
//       return;
//     }
//     fetchOrderDetails();
//   }, [orderId, tableNo, navigate]);

//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
//       const orderData = await orderService.getOrder(orderId);
//       setOrder(orderData);
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       alert('Error loading order details');
//       navigate('/cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     if (!order) return;

//     setProcessing(true);
//     try {
//       // Initialize Razorpay payment
//       const paymentData = await paymentService.initiatePayment({
//         orderId: order.id,
//         amount: order.total_amount,
//         method: selectedPaymentMethod
//       });

//       if (selectedPaymentMethod === 'razorpay') {
//         // Razorpay integration
//         const options = {
//           key: paymentData.razorpay_key,
//           amount: paymentData.amount * 100, // Convert to paise
//           currency: 'INR',
//           name: 'Cafe App',
//           description: `Order #${order.order_number}`,
//           order_id: paymentData.razorpay_order_id,
//           handler: async function (response) {
//             await handlePaymentSuccess(response);
//           },
//           prefill: {
//             name: 'Customer',
//             contact: '9999999999'
//           },
//           theme: {
//             color: '#f97316'
//           }
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       } else {
//         // For UPI/other methods, simulate payment
//         setTimeout(async () => {
//           await handlePaymentSuccess({ 
//             payment_id: 'sim_' + Date.now(),
//             method: selectedPaymentMethod 
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Payment initialization failed:', error);
//       alert('Payment failed. Please try again.');
//       setProcessing(false);
//     }
//   };

//   const handlePaymentSuccess = async (paymentResponse) => {
//     try {
//       // Verify payment with backend
//       await paymentService.verifyPayment({
//         orderId: order.id,
//         paymentId: paymentResponse.payment_id,
//         razorpaySignature: paymentResponse.razorpay_signature
//       });

//       // Clear cart and navigate to order status
//       sessionStorage.removeItem('cart');
//       sessionStorage.setItem('currentOrderId', order.id);
//       navigate('/order-status');
//     } catch (error) {
//       console.error('Payment verification failed:', error);
//       alert('Payment verification failed. Please contact support.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const paymentMethods = [
//     { id: 'upi', name: 'UPI', icon: '📱', description: 'Pay with UPI apps' },
//     { id: 'razorpay', name: 'Card/Wallet', icon: '💳', description: 'Credit/Debit Card, Wallets' },
//     { id: 'cash', name: 'Pay at Counter', icon: '💵', description: 'Pay when you collect' }
//   ];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">Order not found</p>
//           <button
//             onClick={() => navigate('/menu')}
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//           >
//             Back to Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title="Payment" showBack={true} />
      
//       <div className="p-4">
//         {/* Order Summary */}
//         <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
//           <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Order #{order.order_number}</span>
//               <span className="text-sm text-gray-500">Table {order.table_no}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Items ({order.items?.length || 0})</span>
//               <span>₹{(order.total_amount - (order.total_amount * 0.05)).toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Tax</span>
//               <span>₹{(order.total_amount * 0.05).toFixed(2)}</span>
//             </div>
//             <div className="border-t pt-2">
//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Total Amount</span>
//                 <span>₹{order.total_amount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment Methods */}
//         <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
//           <h3 className="font-semibold text-gray-700 mb-4">Choose Payment Method</h3>
//           <div className="space-y-3">
//             {paymentMethods.map(method => (
//               <div
//                 key={method.id}
//                 onClick={() => setSelectedPaymentMethod(method.id)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                   selectedPaymentMethod === method.id
//                     ? 'border-orange-500 bg-orange-50'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <span className="text-2xl">{method.icon}</span>
//                   <div className="flex-1">
//                     <h4 className="font-medium">{method.name}</h4>
//                     <p className="text-sm text-gray-500">{method.description}</p>
//                   </div>
//                   <div className={`w-4 h-4 rounded-full border-2 ${
//                     selectedPaymentMethod === method.id
//                       ? 'border-orange-500 bg-orange-500'
//                       : 'border-gray-300'
//                   }`}>
//                     {selectedPaymentMethod === method.id && (
//                       <div className="w-full h-full rounded-full bg-white scale-50"></div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Payment Button */}
//         <button
//           onClick={handlePayment}
//           disabled={processing}
//           className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {processing ? (
//             <div className="flex items-center justify-center space-x-2">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               <span>Processing...</span>
//             </div>
//           ) : (
//             `Pay ₹${order.total_amount.toFixed(2)}`
//           )}
//         </button>

//         {/* Security Note */}
//         <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//           <div className="flex items-start space-x-2">
//             <span className="text-blue-500">🔒</span>
//             <div>
//               <p className="text-sm text-blue-700 font-medium">Secure Payment</p>
//               <p className="text-xs text-blue-600">Your payment information is encrypted and secure</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

// PaymentPage.js
import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { calcTotal } from '../utils/helpers';
import { createOrder } from '../services/orderService';
import { makePayment } from '../services/paymentService';

const PaymentPage = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tableNo = sessionStorage.getItem('tableNo');

  const handlePayment = async () => {
    const totalAmount = calcTotal(cart);

    // Create order
    const orderPayload = {
      table_no: tableNo,
      total_amount: totalAmount,
      items: cart.map((item) => ({
        menu_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const orderRes = await createOrder(orderPayload);
    const orderId = orderRes.order_id;

    // Simulate payment (you can replace this with Razorpay logic)
    await makePayment({
      order_id: orderId,
      amount: totalAmount,
      method: 'UPI',
    });

    // Clear cart and redirect
    localStorage.removeItem('cart');
    navigate('/order-status');
  };

  return (
    <div className="p-4">
      <Header title="Payment" />
      <p className="mb-2">Table No: <strong>{tableNo}</strong></p>
      <p className="mb-4">Amount to Pay: ₹{calcTotal(cart)}</p>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-md"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
