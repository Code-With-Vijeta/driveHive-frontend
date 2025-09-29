import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext"; // Import useAppContext

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
// (Rest of your component imports)
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";

const App = () => {
  // 1. Destructure 'loading' state from the context
  const { showLogin, loading } = useAppContext(); 
  
  const { pathname } = useLocation();
  const isOwnerPath = pathname.startsWith("/owner");

  // --- LOADING CHECK ---
  // 2. If data is still loading, return a simple loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>Loading Application Data...</h1> 
        {/* You can replace this H1 with your actual Loader component (e.g., <Loader />) */}
      </div>
    );
  }
  // ---------------------

  // 3. Once loading is complete (loading is false), render the full application
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
        {/* Note: You may want to add an auth check here later */}
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