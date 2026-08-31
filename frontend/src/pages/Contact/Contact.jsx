
import React, { useState } from "react";
import "./Contact.css";
import api from "../../services/api";

import { FaTelegram } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      console.log("📤 Sending contact form:", formData);

      const response = await api.post("/contact", formData);

      console.log("📥 Response:", response.data);

      if (response.data.success) {
        setSubmitted(true);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError(
          response.data.message || "Failed to send message"
        );
      }
    } catch (err) {
      console.error("❌ Contact form error:", err);
      console.error("❌ Error response:", err.response?.data);

      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="section contact-content">
        <div className="container">

          <div className="contact-grid">

            {/* CONTACT INFORMATION */}
            <div className="contact-info">

              <h2>Get in Touch</h2>

              <p>
                Have questions about planning your trip to Ethiopia?
                Our team is here to help you create the perfect
                adventure.
              </p>

              <div className="contact-details">

                {/* ADDRESS */}
                <div className="contact-item">
                  <span className="contact-icon address-icon">
                    <FaMapMarkerAlt />
                  </span>

                  <div>
                    <h4>Address</h4>
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="contact-item">
                  <span className="contact-icon phone-icon">
                    <FaPhone />
                  </span>

                  <div>
                    <h4>Phone</h4>
                    <p>+251 918939724</p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="contact-item">
                  <span className="contact-icon email-icon">
                    <FaEnvelope />
                  </span>

                  <div>
                    <h4>Email</h4>
                    <p>gebiyaw2004@gmail.com</p>
                  </div>
                </div>

              </div>

              {/* SOCIAL MEDIA */}
              <div className="contact-social">

                {/* TELEGRAM */}
                <a
                  href="https://t.me/"
                  className="social-link telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <FaTelegram />
                </a>

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/251918939724"
                  className="social-link whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <IoLogoWhatsapp />
                </a>

                {/* X / TWITTER */}
                <a
                  href="https://x.com/"
                  className="social-link twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                >
                  <FaXTwitter />
                </a>

              </div>

            </div>

            {/* CONTACT FORM */}
            <div className="contact-form-wrapper">

              <div className="contact-form-card">

                <h2>Send Us a Message</h2>

                {/* SUCCESS MESSAGE */}
                {submitted && (
                  <div className="success-message">
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                  <div className="error-message">
                    ❌ {error}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="contact-form"
                >

                  {/* NAME */}
                  <div className="form-group">
                    <label htmlFor="name">
                      Your Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* SUBJECT */}
                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject
                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="form-group">
                    <label htmlFor="message">
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading
                      ? "Sending..."
                      : "Send Message"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
