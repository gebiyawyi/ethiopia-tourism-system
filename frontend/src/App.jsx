import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ============================================
// ✅ IMPORT NAVBAR & FOOTER
// ============================================
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ============================================
// ✅ IMPORT ONLY THE PAGES WE NEED
// ============================================
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Destinations from "./pages/Destinations/Destinations";
import Hotels from "./pages/Hotels/Hotels";

// ============================================
// ✅ IMPORT STYLES
// ============================================
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* 
          ============================================
          NAVBAR - Shows on ALL pages
          ============================================
        */}
        <Navbar />

        {/* 
          ============================================
          MAIN CONTENT - Only Home & Hotels Routes
          ============================================
        */}
        <main className="main-content">
          <Routes>
            {/* ===== HOME PAGE ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/destinations" element={<Destinations />} />

            {/* ===== HOTELS PAGE ===== */}
            <Route path="/hotels" element={<Hotels />} />

            {/* 
              ===== OTHER ROUTES (Coming Soon) =====
              Uncomment when pages are ready:
              
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            */}
          </Routes>
        </main>

        {/* 
          ============================================
          FOOTER - Shows on ALL pages
          ============================================
        */}
        <Footer />

        {/* 
          ============================================
          TOAST NOTIFICATIONS
          ============================================
        */}
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
  );
}

export default App;
