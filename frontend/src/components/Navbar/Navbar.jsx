import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
            to="/transport"
            className={`nav-link ${isActive("/transport") ? "active" : ""}`}
          >
            Transport
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

        {/* Actions */}
        <div className="navbar-actions">
          <Link to="/login" className="btn-login">
            Sign In
          </Link>
          <Link to="/register" className="btn-signup">
            Sign Up
          </Link>

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
              to="/transport"
              className={`mobile-nav-link ${isActive("/transport") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">🚌</span> Transport
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
          </nav>

          <div className="mobile-auth">
            <Link
              to="/login"
              className="mobile-btn-login"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="mobile-btn-signup"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>

          <div className="mobile-footer">
            <p>© 2026 Explore Ethiopia</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
