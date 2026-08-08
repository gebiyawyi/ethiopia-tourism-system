import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hotels.css";
import lalibelalodge from "../../assets/images/LalibelaLodge.png";
import semienresort from "../../assets/images/SimienResort.png";
import danikilhotel from "../../assets/images/danikilhotel.png";
import ommoresort from "../../assets/images/OmoResort.png";
import axumhotel from "../../assets/images/axumhotel.png";
import hararguest from "../../assets/images/HararGuest.png";
import balelodge from "../../assets/images/baleLodge.png";
import BahirDarResort from "../../assets/images/BahirDarResort.png";

// ============================================
// 📸 FALLBACK IMAGES
// ============================================
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop";

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedAmenity, setSelectedAmenity] = useState("all");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // 📸 HOTEL DATA - FIXED
  // ============================================
  const hotelsData = [
    {
      id: 1,
      name: "Lalibela Lodge",
      destination: "Lalibela",
      region: "Amhara",
      rating: 4.8,
      price: 150,
      image: lalibelalodge || FALLBACK_IMAGE,
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Parking",
        "Air Conditioning",
        "24/7 Reception",
      ],
      description:
        "Beautiful lodge overlooking the Lalibela rock churches with stunning views",
      availability: "Available",
    },
    {
      id: 2,
      name: "Simien Mountain Resort",
      destination: "Gondar",
      region: "Amhara",
      rating: 4.7,
      price: 120,
      image: semienresort || FALLBACK_IMAGE,
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Parking",
        "Mountain Views",
        "Fireplace",
      ],
      description:
        "Perfect base for exploring the Simien Mountains with panoramic views",
      availability: "Available",
    },
    {
      id: 3,
      name: "Danakil Desert Camp",
      destination: "Danakil",
      region: "Afar",
      rating: 4.5,
      price: 80,
      image: danikilhotel || FALLBACK_IMAGE,
      amenities: [
        "Camping",
        "Meals",
        "Guide Service",
        "Star Gazing",
        "Bonfire",
      ],
      description:
        "Experience the desert with comfortable camping and guided tours",
      availability: "Limited",
    },
    {
      id: 4,
      name: "Omo Valley Resort",
      destination: "Jinka",
      region: "Southern",
      rating: 4.6,
      price: 100,
      image: ommoresort || FALLBACK_IMAGE,
      amenities: ["Free WiFi", "Restaurant", "Pool", "Parking", "Spa"],
      description:
        "Modern resort in the heart of Omo Valley with cultural experiences",
      availability: "Available",
    },
    {
      id: 5,
      name: "Axum Heritage Hotel",
      destination: "Axum",
      region: "Tigray",
      rating: 4.4,
      price: 90,
      image: axumhotel || FALLBACK_IMAGE,
      amenities: ["Free WiFi", "Restaurant", "Parking", "Heritage Tours"],
      description:
        "Heritage hotel in the ancient city of Axum near the obelisks",
      availability: "Available",
    },
    {
      id: 6,
      name: "Harar Guest House",
      destination: "Harar",
      region: "Harari",
      rating: 4.3,
      price: 70,
      image: hararguest || FALLBACK_IMAGE,
      amenities: ["Free WiFi", "Breakfast", "Cultural Tours", "Terrace"],
      description: "Charming guesthouse in the historic walled city of Harar",
      availability: "Available",
    },
    {
      id: 7,
      name: "Bale Mountain Lodge",
      destination: "Bale",
      region: "Oromia",
      rating: 4.7,
      price: 130,
      image: balelodge || FALLBACK_IMAGE,
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Parking",
        "Hiking Trails",
        "Wildlife Viewing",
      ],
      description:
        "Luxury lodge in the Bale Mountains with unique wildlife experiences",
      availability: "Available",
    },
    {
      id: 8,
      name: "Bahir Dar Resort",
      destination: "Bahir Dar",
      region: "Amhara",
      rating: 4.5,
      price: 110,
      image: BahirDarResort || FALLBACK_IMAGE,
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Pool",
        "Lake Views",
        "Boat Tours",
      ],
      description:
        "Beautiful resort on the shores of Lake Tana near the Blue Nile Falls",
      availability: "Available",
    },
  ];

  // ============================================
  // FILTER OPTIONS
  // ============================================
  const destinations = [
    { value: "all", label: "All Destinations" },
    { value: "Lalibela", label: " Lalibela" },
    { value: "Gondar", label: " Gondar" },
    { value: "Danakil", label: " Danakil" },
    { value: "Jinka", label: " Jinka" },
    { value: "Axum", label: " Axum" },
    { value: "Harar", label: " Harar" },
    { value: "Bale", label: " Bale" },
    { value: "Bahir Dar", label: " Bahir Dar" },
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

    setTimeout(() => {
      let result = hotelsData;

      if (searchTerm) {
        result = result.filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.destination
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            hotel.description.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      if (selectedDestination !== "all") {
        result = result.filter(
          (hotel) => hotel.destination === selectedDestination,
        );
      }

      if (selectedPrice !== "all") {
        if (selectedPrice === "budget") {
          result = result.filter((hotel) => hotel.price < 80);
        } else if (selectedPrice === "mid") {
          result = result.filter(
            (hotel) => hotel.price >= 80 && hotel.price < 130,
          );
        } else if (selectedPrice === "luxury") {
          result = result.filter((hotel) => hotel.price >= 130);
        }
      }

      if (selectedRating !== "all") {
        result = result.filter(
          (hotel) => hotel.rating >= parseFloat(selectedRating),
        );
      }

      if (selectedAmenity !== "all") {
        result = result.filter((hotel) =>
          hotel.amenities.includes(selectedAmenity),
        );
      }

      setFilteredHotels(result);
      setLoading(false);
    }, 300);
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

  const getDestinationIcon = (destination) => {
    const icons = {
      Lalibela: "",
      Gondar: "",
      Danakil: "",
      Jinka: "",
      Axum: "",
      Harar: "",
      Bale: "",
      "Bahir Dar": "",
    };
    return icons[destination] || "📍";
  };

  return (
    <div className="hotels-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hotels-hero">
        <div className="hotels-hero-content">
          <h1> Hotels & Accommodations</h1>
          <p>Find the perfect place to stay in Ethiopia</p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="hotels-filters">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search hotels, destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
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
                {destinations.map((dest) => (
                  <option key={dest.value} value={dest.value}>
                    {dest.label}
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

            <button className="reset-filters" onClick={resetFilters}>
              ↺ Reset
            </button>
          </div>

          <div className="active-filters">
            {selectedDestination !== "all" && (
              <span className="active-filter">
                📍 {selectedDestination}
                <button onClick={() => setSelectedDestination("all")}>✕</button>
              </span>
            )}
            {selectedPrice !== "all" && (
              <span className="active-filter">
                💰 {priceRanges.find((p) => p.value === selectedPrice)?.label}
                <button onClick={() => setSelectedPrice("all")}>✕</button>
              </span>
            )}
            {selectedRating !== "all" && (
              <span className="active-filter">
                ⭐ {selectedRating}+ Stars
                <button onClick={() => setSelectedRating("all")}>✕</button>
              </span>
            )}
            {selectedAmenity !== "all" && (
              <span className="active-filter">
                {amenityOptions.find((a) => a.value === selectedAmenity)?.label}
                <button onClick={() => setSelectedAmenity("all")}>✕</button>
              </span>
            )}
            {searchTerm && (
              <span className="active-filter">
                🔍 "{searchTerm}"
                <button onClick={() => setSearchTerm("")}>✕</button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h3>
              {loading ? "Loading..." : `${filteredHotels.length} hotels found`}
            </h3>
            {!loading && filteredHotels.length > 0 && (
              <span className="results-subtitle">
                Showing {filteredHotels.length} of {hotelsData.length} hotels
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== HOTELS GRID ===== */}
      <section className="section hotels-grid-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading hotels...</p>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No hotels found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="hotels-grid">
              {filteredHotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card">
                  <div className="hotel-image">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="hotel-badges">
                      <span className="hotel-rating">⭐ {hotel.rating}</span>
                      <span
                        className={`hotel-availability ${hotel.availability === "Available" ? "available" : "limited"}`}
                      >
                        {hotel.availability}
                      </span>
                    </div>
                  </div>
                  <div className="hotel-info">
                    <div className="hotel-header">
                      <h3>{hotel.name}</h3>
                      <span className="hotel-destination">
                        {getDestinationIcon(hotel.destination)}{" "}
                        {hotel.destination}
                      </span>
                    </div>
                    <p className="hotel-description">{hotel.description}</p>
                    <div className="hotel-amenities">
                      {hotel.amenities.slice(0, 4).map((item, index) => (
                        <span key={index} className="amenity-tag">
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
                      <div>
                        <span className="hotel-price">${hotel.price}</span>
                        <span className="per-night">/ night</span>
                      </div>
                      <Link to={`/hotels/${hotel.id}`} className="hotel-btn">
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
