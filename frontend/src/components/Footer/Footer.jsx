
import React from "react";
import { Link } from "react-router-dom";
import { FaTelegramPlane, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
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
            <a href="#" className="social-icon" aria-label="Telegram">
              <FaTelegramPlane />
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" className="social-icon" aria-label="X">
              <FaXTwitter />
            </a>
            <a href="#" className="social-icon" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

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

        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>gebiyaw2004@gmail.com</li>
            <li>+251 918 939 724</li>
            <li>Addis Ababa, Ethiopia</li>
          </ul>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe for travel updates</p>

            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2026 Explore Ethiopia. All Rights Reserved.</p>

          <p className="developer-credit">
            Developed by <strong>Gebiyaw Yigermal</strong>
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

