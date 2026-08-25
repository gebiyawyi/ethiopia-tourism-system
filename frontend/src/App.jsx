// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ============================================
// ✅ AUTH CONTEXT
// ============================================
import { AuthProvider } from "./context/AuthContext";

// ============================================
// ✅ COMPONENTS (Shared)
// ============================================
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ============================================
// ✅ PAGES
// ============================================
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

// ============================================
// ✅ ADMIN PAGES
// ============================================
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import DestinationsManagement from "./pages/Admin/DestinationsManagement/DestinationsManagement";
import HotelsManagement from "./pages/Admin/HotelsManagement/HotelsManagement";
import BookingsManagement from "./pages/Admin/BookingsManagement/BookingsManagement";
import UsersManagement from "./pages/Admin/UsersManagement/UsersManagement";

// ============================================
// ✅ ROUTE GUARDS
// ============================================
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";

// ============================================
// ✅ STYLES
// ============================================
import "./App.css";
import "./index.css";

function App() {
  console.log("🚀 App is rendering");

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* ✅ Navbar - Always visible */}
          <Navbar />

          {/* ✅ Main Content */}
          <main className="main-content">
            <Routes>
              {/* ============================================
                  PUBLIC ROUTES (No Login Required)
              ============================================ */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:id" element={<HotelDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ============================================
                  PROTECTED ROUTES (Login Required)
              ============================================ */}
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

              {/* ============================================
                  ADMIN ROUTES (Admin Only)
              ============================================ */}
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

          {/* ✅ Footer - Always visible */}
          <Footer />

          {/* ✅ Toast Notifications */}
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
  );
}

export default App;
