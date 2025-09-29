import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";

// Owner Pages
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";

const App = () => {
  const { showLogin } = useAppContext();
  const { pathname } = useLocation();
  const isOwnerPath = pathname.startsWith("/owner");

  return (
    <>
      {/* Global Toast Notifications */}
      <Toaster />

      {/* Login Modal */}
      {showLogin && <Login />}

      {/* Public Navigation */}
      {!isOwnerPath && <Navbar />}

      {/* Routing */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-booking" element={<MyBookings />} />

        {/* Owner Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>

      </Routes>

      {/* Public Footer */}
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
