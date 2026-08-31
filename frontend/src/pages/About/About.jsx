import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>🇪🇹 About Explore Ethiopia</h1>
          <p>Discover the Land of Origins</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section about-mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-text">
              <span className="section-tag">Our Mission</span>
              <h2>Connecting Travelers to Ethiopia's Wonders</h2>
              <p>
                Explore Ethiopia is dedicated to showcasing the rich cultural
                heritage, breathtaking landscapes, and warm hospitality of
                Ethiopia. We believe in responsible tourism that benefits local
                communities and preserves the natural beauty of this incredible
                country.
              </p>
              <div className="mission-stats">
                <div className="stat-box">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Destinations</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Attractions</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Happy Travelers</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">9</span>
                  <span className="stat-label">UNESCO Sites</span>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <img src="https://i.ytimg.com/vi/ivu4wk0-fQ8/maxresdefault.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section about-values">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2>What We Stand For</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustainable Tourism</h3>
              <p>
                We promote responsible travel that protects Ethiopia's natural
                and cultural heritage.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community First</h3>
              <p>
                We work directly with local communities to ensure tourism
                benefits everyone.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Authentic Experiences</h3>
              <p>
                We curate genuine experiences that connect travelers with
                Ethiopian culture.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Safe & Secure</h3>
              <p>Your safety and satisfaction are our top priorities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Explore Ethiopia?</h2>
          <p>Start planning your dream trip today</p>
          <Link to="/destinations" className="btn-primary">
            Explore Destinations 🚀
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
