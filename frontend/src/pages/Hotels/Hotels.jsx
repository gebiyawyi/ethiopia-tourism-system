
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Hotels.css";
import { hotelsData, FALLBACK_IMAGE } from "../../data/hotelsData";

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedAmenity, setSelectedAmenity] = useState("all");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const destinations = [
    { value: "all", label: "All Destinations" },
    { value: "Lalibela", label: "Lalibela" },
    { value: "Gondar", label: "Gondar" },
    { value: "Danakil", label: "Danakil" },
    { value: "Jinka", label: "Jinka" },
    { value: "Axum", label: "Axum" },
    { value: "Harar", label: "Harar" },
    { value: "Bale", label: "Bale" },
    { value: "Bahir Dar", label: "Bahir Dar" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "budget", label: "Budget ($0-79)" },
    { value: "mid", label: "Mid Range ($80-129)" },
    { value: "luxury", label: "Luxury ($130+)" },
  ];

  const ratingOptions = [
    { value: "all", label: "All Ratings" },
    { value: "4.5", label: "⭐ 4.5+ Stars" },
    { value: "4.0", label: "⭐ 4.0+ Stars" },
    { value: "3.5", label: "⭐ 3.5+ Stars" },
  ];

  const amenityOptions = [
    { value: "all", label: "All Amenities" },
    { value: "Free WiFi", label: "📶 Free WiFi" },
    { value: "Restaurant", label: "🍽️ Restaurant" },
    { value: "Pool", label: "🏊 Pool" },
    { value: "Parking", label: "🅿️ Parking" },
    { value: "Spa", label: "💆 Spa" },
  ];

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let result = [...hotelsData];

      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase().trim();

        result = result.filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(search) ||
            hotel.destination.toLowerCase().includes(search) ||
            hotel.region.toLowerCase().includes(search) ||
            hotel.description.toLowerCase().includes(search)
        );
      }

      if (selectedDestination !== "all") {
        result = result.filter(
          (hotel) => hotel.destination === selectedDestination
        );
      }

      if (selectedPrice !== "all") {
        if (selectedPrice === "budget") {
          result = result.filter((hotel) => hotel.price < 80);
        }

        if (selectedPrice === "mid") {
          result = result.filter(
            (hotel) => hotel.price >= 80 && hotel.price < 130
          );
        }

        if (selectedPrice === "luxury") {
          result = result.filter((hotel) => hotel.price >= 130);
        }
      }

      if (selectedRating !== "all") {
        result = result.filter(
          (hotel) => hotel.rating >= Number(selectedRating)
        );
      }

      if (selectedAmenity !== "all") {
        result = result.filter((hotel) =>
          hotel.amenities.includes(selectedAmenity)
        );
      }

      setFilteredHotels(result);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    selectedDestination,
    selectedPrice,
    selectedRating,
    selectedAmenity,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDestination("all");
    setSelectedPrice("all");
    setSelectedRating("all");
    setSelectedAmenity("all");
  };

  return (
    <div className="hotels-page">
      <section className="hotels-hero">
        <div className="hotels-hero-content">
          <h1>Hotels & Accommodations</h1>
          <p>Find the perfect place to stay in Ethiopia</p>
        </div>
      </section>

      <section className="hotels-filters">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <FaSearch className="search-icon" />

              <input
                type="text"
                placeholder="Search hotels, destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="filter-group">
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="filter-select"
              >
                {destinations.map((destination) => (
                  <option
                    key={destination.value}
                    value={destination.value}
                  >
                    {destination.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="filter-select"
              >
                {priceRanges.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="filter-select"
              >
                {ratingOptions.map((rating) => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                value={selectedAmenity}
                onChange={(e) => setSelectedAmenity(e.target.value)}
                className="filter-select"
              >
                {amenityOptions.map((amenity) => (
                  <option key={amenity.value} value={amenity.value}>
                    {amenity.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="reset-filters"
              onClick={resetFilters}
            >
              ↺ Reset
            </button>
          </div>

          <div className="active-filters">
            {selectedDestination !== "all" && (
              <span className="active-filter">
                {selectedDestination}
                <button
                  onClick={() => setSelectedDestination("all")}
                >
                  ✕
                </button>
              </span>
            )}

            {selectedPrice !== "all" && (
              <span className="active-filter">
                {
                  priceRanges.find(
                    (price) => price.value === selectedPrice
                  )?.label
                }

                <button
                  onClick={() => setSelectedPrice("all")}
                >
                  ✕
                </button>
              </span>
            )}

            {selectedRating !== "all" && (
              <span className="active-filter">
                {selectedRating}+ Stars

                <button
                  onClick={() => setSelectedRating("all")}
                >
                  ✕
                </button>
              </span>
            )}

            {selectedAmenity !== "all" && (
              <span className="active-filter">
                {
                  amenityOptions.find(
                    (amenity) => amenity.value === selectedAmenity
                  )?.label
                }

                <button
                  onClick={() => setSelectedAmenity("all")}
                >
                  ✕
                </button>
              </span>
            )}

            {searchTerm && (
              <span className="active-filter">
                "{searchTerm}"

                <button onClick={() => setSearchTerm("")}>
                  ✕
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h3>
              {loading
                ? "Loading..."
                : `${filteredHotels.length} hotels found`}
            </h3>

            {!loading && filteredHotels.length > 0 && (
              <span className="results-subtitle">
                Showing {filteredHotels.length} of{" "}
                {hotelsData.length} hotels
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section hotels-grid-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading hotels...</p>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                🏨
              </div>

              <h3>No hotels found</h3>

              <p>
                Try adjusting your search or filters
              </p>

              <button
                className="reset-filters-btn"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="hotels-grid">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="hotel-card"
                >
                  <div className="hotel-image">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>

                  <div className="hotel-info">
                    <div className="hotel-header">
                      <h3>{hotel.name}</h3>

                      <span className="hotel-destination">
                        {hotel.destination}
                      </span>
                    </div>

                    <p className="hotel-description">
                      {hotel.description}
                    </p>

                    <div className="hotel-amenities">
                      {hotel.amenities
                        .slice(0, 4)
                        .map((item, index) => (
                          <span
                            key={index}
                            className="amenity-tag"
                          >
                            {item}
                          </span>
                        ))}

                      {hotel.amenities.length > 4 && (
                        <span className="amenity-tag more">
                          +{hotel.amenities.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="hotel-footer">
                      <Link
                        to={`/hotels/${hotel.id}`}
                        className="hotel-btn"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hotels;

