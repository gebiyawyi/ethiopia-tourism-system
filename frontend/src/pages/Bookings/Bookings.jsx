import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual backend call
    const fetchBookings = () => {
      const mockBookings = [
        {
          id: 1,
          title: "Lalibela Rock Churches Tour",
          type: "Tour",
          startDate: "Jan 15, 2026",
          endDate: "Jan 18, 2026",
          guests: 2,
          totalPrice: 2400,
          status: "confirmed",
          image:
            "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=200&h=150&fit=crop",
          destination: "Lalibela",
          bookingId: "BK-001",
        },
        {
          id: 2,
          title: "Simien Mountains Trek",
          type: "Tour",
          startDate: "Feb 5, 2026",
          endDate: "Feb 10, 2026",
          guests: 3,
          totalPrice: 4500,
          status: "pending",
          image:
            "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=200&h=150&fit=crop",
          destination: "Gondar",
          bookingId: "BK-002",
        },
        {
          id: 3,
          title: "Danakil Depression Adventure",
          type: "Tour",
          startDate: "Mar 1, 2026",
          endDate: "Mar 5, 2026",
          guests: 1,
          totalPrice: 1800,
          status: "cancelled",
          image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=150&fit=crop",
          destination: "Afar Region",
          bookingId: "BK-003",
        },
        {
          id: 4,
          title: "Omo Valley Cultural Tour",
          type: "Tour",
          startDate: "Apr 10, 2026",
          endDate: "Apr 14, 2026",
          guests: 2,
          totalPrice: 2200,
          status: "confirmed",
          image:
            "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=200&h=150&fit=crop",
          destination: "Omo Valley",
          bookingId: "BK-004",
        },
        {
          id: 5,
          title: "Axum Heritage Hotel Stay",
          type: "Hotel",
          startDate: "May 1, 2026",
          endDate: "May 3, 2026",
          guests: 2,
          totalPrice: 270,
          status: "pending",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop",
          destination: "Axum",
          bookingId: "BK-005",
        },
      ];

      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  // Filter bookings
  useEffect(() => {
    if (filter === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((b) => b.status === filter));
    }
  }, [filter, bookings]);

  const getStatusBadge = (status) => {
    const classes = {
      confirmed: "status-confirmed",
      pending: "status-pending",
      cancelled: "status-cancelled",
    };
    return classes[status] || "";
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
      );
    }
  };

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="container">
        <div className="bookings-header">
          <div>
            <h1>📋 My Bookings</h1>
            <p>View and manage all your travel bookings</p>
          </div>
          <div className="booking-count">
            {bookings.length} {bookings.length === 1 ? "Booking" : "Bookings"}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="booking-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === "confirmed" ? "active" : ""}`}
            onClick={() => setFilter("confirmed")}
          >
            ✅ Confirmed (
            {bookings.filter((b) => b.status === "confirmed").length})
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            ⏳ Pending ({bookings.filter((b) => b.status === "pending").length})
          </button>
          <button
            className={`filter-btn ${filter === "cancelled" ? "active" : ""}`}
            onClick={() => setFilter("cancelled")}
          >
            ❌ Cancelled (
            {bookings.filter((b) => b.status === "cancelled").length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">✈️</div>
            <h3>No bookings found</h3>
            <p>
              You don't have any {filter !== "all" ? filter : ""} bookings yet
            </p>
            <Link to="/destinations" className="btn-primary">
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-image">
                  <img src={booking.image} alt={booking.title} />
                  <span
                    className={`booking-status-badge ${getStatusBadge(booking.status)}`}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </div>
                <div className="booking-info">
                  <div className="booking-header">
                    <h3>{booking.title}</h3>
                    <span className="booking-id">#{booking.bookingId}</span>
                  </div>
                  <div className="booking-meta">
                    <span className="booking-type">{booking.type}</span>
                    <span className="booking-destination">
                      📍 {booking.destination}
                    </span>
                    <span className="booking-dates">
                      📅 {booking.startDate} - {booking.endDate}
                    </span>
                    <span className="booking-guests">
                      👥 {booking.guests} guests
                    </span>
                  </div>
                  <div className="booking-footer">
                    <span className="booking-price">${booking.totalPrice}</span>
                    <div className="booking-actions">
                      <Link
                        to={`/bookings/${booking.id}`}
                        className="view-details-btn"
                      >
                        View Details →
                      </Link>
                      {booking.status === "pending" && (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(booking.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
