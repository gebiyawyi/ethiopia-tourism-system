import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Destinations from "./pages/Destinations/Destinations";
import DestinationDetail from "./pages/DestinationDetail/DestinationDetail";
import Transport from "./pages/Transport/Transport";
import Hotels from "./pages/Hotels/Hotels";
import HotelDetail from "./pages/HotelDetail/HotelDetail";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Bookings from "./pages/Bookings/Bookings";
import BookingDetail from "./pages/BookingDetail/BookingDetail";

import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import DestinationsManagement from "./pages/Admin/DestinationsManagement/DestinationsManagement";
import HotelsManagement from "./pages/Admin/HotelsManagement/HotelsManagement";
import BookingsManagement from "./pages/Admin/BookingsManagement/BookingsManagement";
import UsersManagement from "./pages/Admin/UsersManagement/UsersManagement";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";

import "./App.css";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route
                  path="/destinations/:id"
                  element={<DestinationDetail />}
                />
                <Route path="/transport" element={<Transport />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings/:id"
                  element={
                    <ProtectedRoute>
                      <BookingDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/destinations"
                  element={
                    <AdminRoute>
                      <DestinationsManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/hotels"
                  element={
                    <AdminRoute>
                      <HotelsManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/bookings"
                  element={
                    <AdminRoute>
                      <BookingsManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <UsersManagement />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
