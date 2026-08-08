import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ============================================
  // ✅ CHECK LOGIN STATUS & GET USER DATA
  // ============================================
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        setIsLoggedIn(true);
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, [location]);

  // ============================================
  // ✅ GET USER DATA FROM LOCALSTORAGE
  // ============================================
  const getUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const currentUser = getUser();

  // ============================================
  // ✅ GET DISPLAY NAME
  // ============================================
  const getDisplayName = () => {
    if (!currentUser) return "User";
    return currentUser.full_name || currentUser.username || "User";
  };

  // ============================================
  // ✅ GET AVATAR LETTER
  // ============================================
  const getAvatarLetter = () => {
    if (!currentUser) return "U";
    return (currentUser.full_name || currentUser.username || "U").charAt(0).toUpperCase();
  };

  // ============================================
  // ✅ SCROLL EFFECT
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================
  // ✅ CLOSE MOBILE MENU ON ROUTE CHANGE
  // ============================================
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // ============================================
  // ✅ PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
  // ============================================
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // ============================================
  // ✅ LOGOUT HANDLER
  // ============================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  // ============================================
  // ✅ CHECK ACTIVE LINK
  // ============================================
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="logo-icon">🇪🇹</span>
          <h2>
            Explore <span>Ethiopia</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links-desktop">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link
            to="/destinations"
            className={`nav-link ${isActive("/destinations") ? "active" : ""}`}
          >
            Destinations
          </Link>
          <Link
            to="/hotels"
            className={`nav-link ${isActive("/hotels") ? "active" : ""}`}
          >
            Hotels
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          >
            Contact
          </Link>
        </nav>

        {/* ============================================
            ✅ PROFILE LINK WITH IMAGE
            ============================================ */}
        <div className="navbar-actions">
          {isLoggedIn && currentUser ? (
            // ✅ Logged In - Show Profile with Image & Name
            <>
              <Link to="/profile" className="profile-link">
                {/* ✅ Show profile image if exists, otherwise show initials */}
                {currentUser?.profile_image ? (
                  <img 
                    src={currentUser.profile_image} 
                    alt="Profile" 
                    className="avatar-image-small"
                    onError={(e) => {
                      // ✅ If image fails to load, show initials
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      const span = document.createElement('span');
                      span.className = 'avatar-circle-small';
                      span.textContent = getAvatarLetter();
                      parent.insertBefore(span, e.target);
                    }}
                  />
                ) : (
                  <span className="avatar-circle-small">
                    {getAvatarLetter()}
                  </span>
                )}
                <span className="profile-name">
                  {getDisplayName()}
                </span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            // ✅ Logged Out - Show Login & Register
            <>
              <Link to="/login" className="btn-login">
                Sign In
              </Link>
              <Link to="/register" className="btn-signup">
                Sign Up
              </Link>
            </>
          )}

          {/* Hamburger Menu */}
          <button
            className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Overlay */}
        <div
          className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-header">
            <Link
              to="/"
              className="mobile-logo"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="logo-icon">🇪🇹</span>
              <h2>
                Explore <span>Ethiopia</span>
              </h2>
            </Link>
            <button
              className="mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav-links">
            <Link
              to="/"
              className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">🏠</span> Home
            </Link>
            <Link
              to="/destinations"
              className={`mobile-nav-link ${isActive("/destinations") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">📍</span> Destinations
            </Link>
            <Link
              to="/hotels"
              className={`mobile-nav-link ${isActive("/hotels") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">🏨</span> Hotels
            </Link>
            <Link
              to="/about"
              className={`mobile-nav-link ${isActive("/about") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">ℹ️</span> About
            </Link>
            <Link
              to="/contact"
              className={`mobile-nav-link ${isActive("/contact") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">📧</span> Contact
            </Link>

            {/* Mobile Auth Buttons */}
            {isLoggedIn && currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">👤</span>
                  {getDisplayName()}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-nav-link logout-btn-mobile"
                >
                  <span className="mobile-nav-icon">🚪</span> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">🔑</span> Sign In
                </Link>
                <Link
                  to="/register"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">📝</span> Sign Up
                </Link>
              </>
            )}
          </nav>

          <div className="mobile-footer">
            <p>© 2026 Explore Ethiopia</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;