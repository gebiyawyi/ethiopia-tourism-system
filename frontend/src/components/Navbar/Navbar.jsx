import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [location, refreshUser]);

  const getDisplayName = () => {
    if (!user) return "User";
    return user.full_name || user.username || "User";
  };

  const getAvatarLetter = () => {
    if (!user) return "U";
    const name = user.full_name || user.username || "User";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
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
            to="/ransport"
            className={`nav-link ${isActive("/transport") ? "active" : ""}`}
          >
             Transport
          </Link>
          <Link
            to="/otels"
            className={`nav-link ${isActive("/hotels") ? "active" : ""}`}
          >
            Hotels
          </Link>
          <Link
            to="/bout"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
          <Link
            to="/ontact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          >
            Contact
          </Link>
        </nav>

        <div className="navbar-actions">
          {isLoggedIn && user ? (
            <>
              <Link to="/profile" className="profile-link">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="Profile"
                    className="avatar-image-small"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      const span = document.createElement("span");
                      span.className = "avatar-circle-small";
                      span.textContent = getAvatarLetter();
                      parent.insertBefore(span, e.target);
                    }}
                  />
                ) : (
                  <span className="avatar-circle-small">
                    {getAvatarLetter()}
                  </span>
                )}
                <span className="profile-name">{getDisplayName()}</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Sign In
              </Link>
              <Link to="/register" className="btn-signup">
                Sign Up
              </Link>
            </>
          )}

          <ThemeToggle />

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

        <div
          className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

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
              <span className="mobile-nav-icon"></span>
              Home
            </Link>
            <Link
              to="/destinations"
              className={`mobile-nav-link ${isActive("/destinations") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon"></span>
              Destinations
            </Link>
            <Link
              to="/ransport"
              className={`mobile-nav-link ${isActive("/transport") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon"></span>
              Transport
            </Link>
            <Link
              to="/otels"
              className={`mobile-nav-link ${isActive("/hotels") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon"></span>
              Hotels
            </Link>
            <Link
              to="/bout"
              className={`mobile-nav-link ${isActive("/about") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon"></span>
              About
            </Link>
            <Link
              to="/ontact"
              className={`mobile-nav-link ${isActive("/contact") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon"></span>
              Contact
            </Link>

            <div className="mobile-divider"></div>

            {isLoggedIn && user ? (
              <>
                <Link
                  to="/profile"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon"></span>
                  {getDisplayName()}
                  <span className="mobile-badge">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-nav-link logout-btn-mobile"
                >
                  <span className="mobile-nav-icon"></span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-nav-link auth-btn-login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon"></span>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="mobile-nav-link auth-btn-signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon"></span>
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          <div className="mobile-footer">
            <p>© 2026 Explore Ethiopia</p>
            <div className="mobile-social">
              <a href="#" className="mobile-social-icon">
                📘
              </a>
              <a href="#" className="mobile-social-icon">
                📸
              </a>
              <a href="#" className="mobile-social-icon">
                🐦
              </a>
              <a href="#" className="mobile-social-icon">
                ▶️
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
