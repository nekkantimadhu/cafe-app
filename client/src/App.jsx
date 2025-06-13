import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderStatus from './pages/OrderStatus';
import PaymentPage from './pages/PaymentPage';
import QRScanner from './pages/QRScanner';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router basename="/cafe-app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<QRScanner />} /> */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-status" element={<OrderStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
