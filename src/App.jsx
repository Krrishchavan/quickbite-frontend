import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import RegisterLanding from './pages/RegisterLanding';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RegisterRider from './pages/RegisterRider';
import RestaurantList from './pages/RestaurantList';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import RestaurantDashboard from './pages/RestaurantDashboard';
import RiderDashboard from './pages/RiderDashboard';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterLanding />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/restaurant" element={<RegisterRestaurant />} />
        <Route path="/register/rider" element={<RegisterRider />} />
        <Route path="/menu/:restaurantId" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderTracking />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
