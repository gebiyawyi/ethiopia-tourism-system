import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./HotelDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample hotel data - will come from API later
  const hotelData = {
    1: {
      id: 1,
      name: "Lalibela Lodge",
      location: "Lalibela",
      rating: 4.8,
      price: 150,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Parking",
        "Air Conditioning",
        "Pool",
      ],
      description:
        "Beautiful lodge overlooking the Lalibela rock churches with stunning views.",
      longDescription:
        "Nestled in the heart of Lalibela, this lodge offers breathtaking views of the ancient rock-hewn churches. Experience authentic Ethiopian hospitality with modern comforts.",
      contact: "+251 911 234 567",
      email: "info@lalibelalodge.com",
    },
    2: {
      id: 2,
      name: "Simien Mountain Resort",
      location: "Gondar",
      rating: 4.7,
      price: 120,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Parking",
        "Mountain Views",
        "Fireplace",
      ],
      description: "Perfect base for exploring the Simien Mountains.",
      longDescription:
        "Located at the foothills of the Simien Mountains, this resort offers easy access to trekking routes and stunning views of the escarpment.",
      contact: "+251 922 345 678",
      email: "info@simienresort.com",
    },
    3: {
      id: 3,
      name: "Danakil Desert Camp",
      location: "Afar",
      rating: 4.5,
      price: 80,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
      amenities: ["Camping", "Meals", "Guide Service", "Campfire"],
      description: "Experience the desert with comfortable camping.",
      longDescription:
        "An unforgettable desert camping experience in the Danakil Depression. Sleep under the stars and explore the most extreme environment on Earth.",
      contact: "+251 933 456 789",
      email: "info@danakilcamp.com",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const data = hotelData[id];
      if (data) {
        setHotel(data);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="hotel-detail-page">
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading hotel details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-detail-page">
        <Navbar />
        <div className="not-found">
          <h2>Hotel not found</h2>
          <Link to="/hotels" className="btn-primary">
            Back to Hotels
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="hotel-detail-page">
      <Navbar />

      {/* Hero */}
      <section
        className="hotel-detail-hero"
        style={{ backgroundImage: `url(${hotel.image})` }}
      >
        <div className="hotel-detail-hero-overlay">
          <div className="container">
            <h1>{hotel.name}</h1>
            <p className="hotel-location">📍 {hotel.location}</p>
            <div className="hotel-rating">⭐ {hotel.rating} / 5</div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section hotel-detail-content">
        <div className="container">
          <div className="hotel-detail-layout">
            {/* Main Content */}
            <div className="hotel-detail-main">
              <h2>About {hotel.name}</h2>
              <p className="hotel-description">{hotel.longDescription}</p>

              <div className="hotel-amenities-section">
                <h3>Amenities</h3>
                <div className="hotel-amenities-list">
                  {hotel.amenities.map((item, index) => (
                    <span key={index} className="amenity-item">
                      ✅ {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hotel-contact">
                <h3>Contact Information</h3>
                <p>📞 {hotel.contact}</p>
                <p>✉️ {hotel.email}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="hotel-detail-sidebar">
              <div className="booking-card">
                <h3>Book This Hotel</h3>
                <div className="booking-price">
                  <span className="price">${hotel.price}</span>
                  <span className="per-night">/ night</span>
                </div>
                <div className="booking-details">
                  <div className="booking-field">
                    <label>Check-in</label>
                    <input type="date" />
                  </div>
                  <div className="booking-field">
                    <label>Check-out</label>
                    <input type="date" />
                  </div>
                  <div className="booking-field">
                    <label>Guests</label>
                    <select>
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="book-now-btn">Book Now</button>
                <Link to="/contact" className="contact-link">
                  Have questions? Contact us
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

export default HotelDetail; // ✅ THIS IS THE IMPORTANT PART
