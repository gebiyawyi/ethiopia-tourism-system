import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookingDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample booking data - will come from API later
  const bookingData = {
    1: {
      id: 1,
      reference: "TRIP-20260115-123",
      status: "confirmed",
      total_price: 3700,
      travel_date: "2026-01-15",
      return_date: "2026-01-22",
      number_of_travelers: 2,
      created_at: "2026-01-10T10:30:00",
      items: [
        {
          id: 1,
          type: "destination",
          name: "Lalibela Rock Churches",
          price: 1200,
        },
        { id: 2, type: "destination", name: "Simien Mountains", price: 1500 },
        { id: 3, type: "transport", name: "Ethiopian Airlines", price: 200 },
        { id: 4, type: "transport", name: "4x4 Safari", price: 150 },
        { id: 5, type: "hotel", name: "Lalibela Lodge", price: 150, nights: 2 },
        { id: 6, type: "hotel", name: "Simien Resort", price: 120, nights: 3 },
      ],
    },
    2: {
      id: 2,
      reference: "TRIP-20260220-456",
      status: "pending",
      total_price: 1800,
      travel_date: "2026-02-20",
      return_date: "2026-02-25",
      number_of_travelers: 1,
      created_at: "2026-02-01T14:20:00",
      items: [
        { id: 1, type: "destination", name: "Danakil Depression", price: 1800 },
        { id: 2, type: "transport", name: "Desert Expedition", price: 250 },
      ],
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const data = bookingData[id];
      if (data) {
        setBooking(data);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "#059669",
      pending: "#d97706",
      cancelled: "#dc2626",
      completed: "#2563eb",
    };
    return colors[status] || "#6b7280";
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: "✅",
      pending: "⏳",
      cancelled: "❌",
      completed: "🎉",
    };
    return icons[status] || "📋";
  };

  if (loading) {
    return (
      <div className="booking-detail-page">
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading booking details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="booking-detail-page">
        <Navbar />
        <div className="not-found">
          <h2>Booking not found</h2>
          <Link to="/bookings" className="btn-primary">
            Back to Bookings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="booking-detail-page">
      <Navbar />

      <section className="booking-detail-hero">
        <div className="container">
          <div className="booking-detail-header">
            <div>
              <h1>Booking #{booking.reference}</h1>
              <p className="booking-date">
                Created: {new Date(booking.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="booking-status">
              <span
                className="status-badge"
                style={{ background: getStatusColor(booking.status) }}
              >
                {getStatusIcon(booking.status)} {booking.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section booking-detail-content">
        <div className="container">
          <div className="booking-detail-grid">
            {/* Main Content */}
            <div className="booking-detail-main">
              <div className="booking-summary">
                <h2>Trip Summary</h2>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Travel Date</span>
                    <span className="summary-value">{booking.travel_date}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Return Date</span>
                    <span className="summary-value">
                      {booking.return_date || "N/A"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Travelers</span>
                    <span className="summary-value">
                      {booking.number_of_travelers}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Price</span>
                    <span className="summary-value price">
                      ${booking.total_price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="booking-items">
                <h2>Booking Items</h2>
                <div className="items-list">
                  {booking.items.map((item) => (
                    <div key={item.id} className="item-row">
                      <div className="item-info">
                        <span className="item-type">
                          {item.type.toUpperCase()}
                        </span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <div className="item-price">
                        {item.nights ? (
                          <span>
                            ${item.price} × {item.nights} nights
                          </span>
                        ) : (
                          <span>${item.price}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="booking-detail-sidebar">
              <div className="action-card">
                <h3>Booking Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn primary">
                    Download Invoice
                  </button>
                  <button className="action-btn secondary">
                    Contact Support
                  </button>
                  {booking.status === "pending" && (
                    <button className="action-btn danger">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>

              <div className="help-card">
                <h4>Need Help?</h4>
                <p>
                  Contact our support team for assistance with your booking.
                </p>
                <Link to="/contact" className="help-link">
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingDetail; // ✅ THIS IS REQUIRED
