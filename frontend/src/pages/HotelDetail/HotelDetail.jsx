import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./HotelDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { hotelsData } from "../../data/hotelsData";

const HotelDetail = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      const selectedHotel = hotelsData.find((item) => item.id === Number(id));

      setHotel(selectedHotel || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
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

      <section
        className="hotel-detail-hero"
        style={{
          backgroundImage: `url(${hotel.image})`,
        }}
      >
        <div className="hotel-detail-hero-overlay">
          <div className="container">
            <h1>{hotel.name}</h1>

            <p className="hotel-location">{hotel.location}</p>
          </div>
        </div>
      </section>

      <section className="section hotel-detail-content">
        <div className="container">
          <div className="hotel-detail-layout">
            <div className="hotel-detail-main">
              <h2>About {hotel.name}</h2>

              <p className="hotel-description">{hotel.longDescription}</p>

              <div className="hotel-amenities-section">
                <h3>Amenities</h3>

                <div className="hotel-amenities-list">
                  {hotel.amenities.map((item, index) => (
                    <span key={index} className="amenity-item">
                      {item}
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
          </div>
        </div>
      </section>


    </div>
  );
};

export default HotelDetail;
