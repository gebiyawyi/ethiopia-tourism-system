import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ============================================
            COLUMN 1 - Brand
        ============================================ */}
        <div className="footer-column">
          <div className="footer-brand">
            <h3>🇪🇹 Explore Ethiopia</h3>
            <p>Discover the Land of Origins</p>
          </div>
          <p className="footer-description">
            Your premier travel guide to Ethiopia's ancient wonders,
            breathtaking landscapes, and vibrant culture.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              📘
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              📸
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              🐦
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              ▶️
            </a>
          </div>
        </div>

        {/* ============================================
            COLUMN 2 - Destinations
        ============================================ */}
        <div className="footer-column">
          <h4>Destinations</h4>
          <ul className="footer-links">
            <li>
              <Link to="/destinations/lalibela">Lalibela</Link>
            </li>
            <li>
              <Link to="/destinations/simien">Simien Mountains</Link>
            </li>
            <li>
              <Link to="/destinations/danakil">Danakil Depression</Link>
            </li>
            <li>
              <Link to="/destinations/axum">Axum</Link>
            </li>
            <li>
              <Link to="/destinations/omo-valley">Omo Valley</Link>
            </li>
          </ul>
        </div>

        {/* ============================================
            COLUMN 3 - Quick Links
        ============================================ */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* ============================================
            COLUMN 4 - Contact & Newsletter
        ============================================ */}
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>📧 gebiyaw2004@gmail.com</li>
            <li>📞 +251 918 939 724</li>
            <li>📍 Addis Ababa, Ethiopia</li>
          </ul>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe for travel updates</p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* ============================================
          FOOTER BOTTOM - With Developer Credit
      ============================================ */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2026 Explore Ethiopia. All Rights Reserved.</p>

          {/* ✅ Developer Credit */}
          <p className="developer-credit">
            Developed by <strong>Gebiyaw Yigermal</strong> 🚀
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
