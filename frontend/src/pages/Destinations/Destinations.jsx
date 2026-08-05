import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Destinations.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loading, setLoading] = useState(true);

  // ============================================
  // 📸 ADD YOUR DESTINATION IMAGES HERE
  // ============================================
  //
  // TO ADD YOUR IMAGES:
  // 1. Place images in: frontend/src/assets/images/destinations/
  // 2. Import them like:
  //    import lalibelaImg from '../../assets/images/destinations/lalibela.jpg';
  //    import simienImg from '../../assets/images/destinations/simien.jpg';
  //    import danakilImg from '../../assets/images/destinations/danakil.jpg';
  //    import omoImg from '../../assets/images/destinations/omo.jpg';
  //    import axumImg from '../../assets/images/destinations/axum.jpg';
  //    import gondarImg from '../../assets/images/destinations/gondar.jpg';
  //    import lakeTanaImg from '../../assets/images/destinations/lake-tana.jpg';
  //    import blueNileImg from '../../assets/images/destinations/blue-nile.jpg';
  //    import hararImg from '../../assets/images/destinations/harar.jpg';
  //    import baleImg from '../../assets/images/destinations/bale.jpg';
  //    import sofOmarImg from '../../assets/images/destinations/sof-omar.jpg';
  //    import langanoImg from '../../assets/images/destinations/langano.jpg';
  //    import nationalMuseumImg from '../../assets/images/destinations/national-museum.jpg';
  //    import entotoImg from '../../assets/images/destinations/entoto.jpg';
  //    import merkatoImg from '../../assets/images/destinations/merkato.jpg';
  // 3. Replace the image URLs below with your imported images
  // ============================================

  // ============================================
  // 📸 COMPLETE DESTINATION DATA - REPLACE IMAGE URLS
  // ============================================
  // 📸 REPLACE: Each 'image' URL with your own images
  // 📸 EDIT: Change names, descriptions, prices, attractions
  const destinationData = [
    // ===== AMHARA REGION =====
    {
      id: 1,
      name: "Lalibela Rock Churches",
      region: "Amhara",
      subRegion: "North Wollo",
      description:
        "11 monolithic churches carved from rock in the 12th century, a UNESCO World Heritage Site",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=600&h=400&fit=crop",
      price: 1200,
      rating: 4.8,
      reviews: 1234,
      attractions: [
        "Rock Churches",
        "Ancient History",
        "Pilgrimage",
        "UNESCO Site",
      ],
      bestTime: "October to March",
    },
    {
      id: 2,
      name: "Simien Mountains National Park",
      region: "Amhara",
      subRegion: "North Gondar",
      description:
        "Breathtaking landscapes with dramatic escarpments and unique wildlife including Gelada baboons",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
      price: 1500,
      rating: 4.9,
      reviews: 987,
      attractions: ["Trekking", "Wildlife", "Scenic Views", "UNESCO Site"],
      bestTime: "September to November",
    },
    {
      id: 3,
      name: "Gondar Castles",
      region: "Amhara",
      subRegion: "Gondar",
      description:
        'The "Camelot of Africa" featuring medieval castles and royal palaces from the 17th century',
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
      price: 800,
      rating: 4.6,
      reviews: 654,
      attractions: ["Castles", "Royal History", "Architecture", "UNESCO Site"],
      bestTime: "October to April",
    },
    {
      id: 4,
      name: "Lake Tana Monasteries",
      region: "Amhara",
      subRegion: "Bahir Dar",
      description:
        "Sacred lake with ancient island monasteries and churches dating back to the 14th century",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
      price: 600,
      rating: 4.5,
      reviews: 543,
      attractions: [
        "Lake Tours",
        "Monasteries",
        "Bird Watching",
        "Boat Cruises",
      ],
      bestTime: "November to April",
    },
    {
      id: 5,
      name: "Blue Nile Falls",
      region: "Amhara",
      subRegion: "Bahir Dar",
      description:
        'Spectacular waterfall known as "Tis Issat" - the Smoking Water',
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
      price: 400,
      rating: 4.4,
      reviews: 432,
      attractions: ["Waterfalls", "Hiking", "Photography", "Nature"],
      bestTime: "June to September",
    },

    // ===== TIGRAY REGION =====
    {
      id: 6,
      name: "Axum Obelisks",
      region: "Tigray",
      subRegion: "Axum",
      description:
        "Ancient city with towering obelisks, royal tombs, and the legendary Ark of the Covenant",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
      price: 900,
      rating: 4.6,
      reviews: 765,
      attractions: [
        "Ancient History",
        "Archaeology",
        "UNESCO Site",
        "Obelisks",
      ],
      bestTime: "October to April",
    },
    {
      id: 7,
      name: "Tigray Rock-Hewn Churches",
      region: "Tigray",
      subRegion: "Gheralta",
      description:
        "Over 100 ancient rock-hewn churches scattered across the dramatic Tigray landscape",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1590050752117-23802e9b3ee2?w=600&h=400&fit=crop",
      price: 700,
      rating: 4.7,
      reviews: 543,
      attractions: ["Rock Churches", "Climbing", "Ancient Art", "UNESCO Site"],
      bestTime: "October to March",
    },
    {
      id: 8,
      name: "Debre Damo Monastery",
      region: "Tigray",
      subRegion: "Adwa",
      description:
        "Ancient monastery perched on a mountain plateau, accessible only by climbing a rope",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
      price: 500,
      rating: 4.3,
      reviews: 321,
      attractions: [
        "Monastery",
        "Climbing",
        "Religious History",
        "Scenic Views",
      ],
      bestTime: "October to April",
    },

    // ===== AFAR REGION =====
    {
      id: 9,
      name: "Danakil Depression",
      region: "Afar",
      subRegion: "Afar Triangle",
      description:
        "One of the hottest places on Earth with colorful sulfur springs, salt flats, and active volcanoes",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
      price: 1800,
      rating: 5.0,
      reviews: 876,
      attractions: [
        "Volcanoes",
        "Salt Flats",
        "Extreme Adventure",
        "Sulfur Springs",
      ],
      bestTime: "November to March",
    },
    {
      id: 10,
      name: "Erta Ale Volcano",
      region: "Afar",
      subRegion: "Danakil",
      description:
        "Active shield volcano with one of the world's longest-standing lava lakes",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
      price: 2000,
      rating: 4.9,
      reviews: 654,
      attractions: ["Volcano", "Lava Lake", "Night Trekking", "Adventure"],
      bestTime: "November to March",
    },
    {
      id: 11,
      name: "Dallol Sulfur Springs",
      region: "Afar",
      subRegion: "Danakil",
      description:
        "Colorful hydrothermal field with yellow, green, and orange mineral deposits",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
      price: 1600,
      rating: 4.8,
      reviews: 543,
      attractions: [
        "Sulfur Springs",
        "Photography",
        "Geothermal",
        "Unique Landscape",
      ],
      bestTime: "November to March",
    },

    // ===== SOUTHERN REGION =====
    {
      id: 12,
      name: "Omo Valley Tribes",
      region: "Southern",
      subRegion: "Omo Valley",
      description:
        "Rich cultural heritage with indigenous tribes like the Hamer, Mursi, and Karo",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=600&h=400&fit=crop",
      price: 1100,
      rating: 4.7,
      reviews: 765,
      attractions: [
        "Cultural Tours",
        "Tribal Villages",
        "Traditional Ceremonies",
        "Photography",
      ],
      bestTime: "November to March",
    },
    {
      id: 13,
      name: "Mago National Park",
      region: "Southern",
      subRegion: "Omo Valley",
      description:
        "National park home to the Mursi people and diverse wildlife including elephants and buffalos",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop",
      price: 800,
      rating: 4.4,
      reviews: 432,
      attractions: [
        "Wildlife Safari",
        "Mursi Tribe",
        "Bird Watching",
        "Nature",
      ],
      bestTime: "November to March",
    },
    {
      id: 14,
      name: "Turmi Market",
      region: "Southern",
      subRegion: "Omo Valley",
      description:
        "Vibrant Saturday market where different tribes gather to trade and socialize",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop",
      price: 500,
      rating: 4.3,
      reviews: 321,
      attractions: [
        "Local Market",
        "Culture",
        "Photography",
        "Traditional Crafts",
      ],
      bestTime: "November to March",
    },

    // ===== HARARI REGION =====
    {
      id: 15,
      name: "Harar Jugol",
      region: "Harari",
      subRegion: "Harar",
      description:
        "Fortified historic town with unique culture, architecture, and the famous hyena feeding",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1590050752117-23802e9b3ee2?w=600&h=400&fit=crop",
      price: 800,
      rating: 4.5,
      reviews: 654,
      attractions: [
        "Historic Walls",
        "Hyena Feeding",
        "Museums",
        "UNESCO Site",
      ],
      bestTime: "October to April",
    },
    {
      id: 16,
      name: "Harar Old Town",
      region: "Harari",
      subRegion: "Harar",
      description:
        "Ancient walled city with 82 mosques and traditional Harari houses",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1590050752117-23802e9b3ee2?w=600&h=400&fit=crop",
      price: 600,
      rating: 4.4,
      reviews: 432,
      attractions: ["Old City", "Mosques", "Traditional Houses", "Culture"],
      bestTime: "October to April",
    },

    // ===== OROMIA REGION =====
    {
      id: 17,
      name: "Bale Mountains National Park",
      region: "Oromia",
      subRegion: "Bale",
      description:
        "Home to the Ethiopian wolf and unique Afro-alpine ecosystem with stunning landscapes",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
      price: 1000,
      rating: 4.7,
      reviews: 543,
      attractions: ["Wildlife", "Trekking", "Scenic Views", "Ethiopian Wolf"],
      bestTime: "October to April",
    },
    {
      id: 18,
      name: "Sof Omar Caves",
      region: "Oromia",
      subRegion: "Bale",
      description:
        "One of the longest cave systems in Africa with underground rivers and limestone formations",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
      price: 700,
      rating: 4.3,
      reviews: 321,
      attractions: [
        "Cave Exploration",
        "Underground Rivers",
        "Rock Formations",
        "Adventure",
      ],
      bestTime: "October to April",
    },
    {
      id: 19,
      name: "Lake Langano",
      region: "Oromia",
      subRegion: "Rift Valley",
      description:
        "Beautiful lake in the Ethiopian Rift Valley perfect for swimming and bird watching",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
      price: 500,
      rating: 4.2,
      reviews: 432,
      attractions: ["Swimming", "Bird Watching", "Lake Views", "Relaxation"],
      bestTime: "November to April",
    },

    // ===== ADDIS ABABA REGION =====
    {
      id: 20,
      name: "National Museum of Ethiopia",
      region: "Addis Ababa",
      subRegion: "Addis Ababa",
      description:
        'Home to the famous fossil "Lucy" and extensive collection of Ethiopian artifacts',
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
      price: 300,
      rating: 4.6,
      reviews: 876,
      attractions: ["Museum", "Lucy Fossil", "History", "Culture"],
      bestTime: "Year-round",
    },
    {
      id: 21,
      name: "Mount Entoto",
      region: "Addis Ababa",
      subRegion: "Addis Ababa",
      description:
        "Highest peak near Addis Ababa with panoramic views and historic churches",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
      price: 400,
      rating: 4.4,
      reviews: 654,
      attractions: ["Mountain Views", "Hiking", "Churches", "Nature"],
      bestTime: "October to March",
    },
    {
      id: 22,
      name: "Merkato Market",
      region: "Addis Ababa",
      subRegion: "Addis Ababa",
      description:
        "One of the largest open-air markets in Africa with everything from spices to crafts",
      // 📸 REPLACE with your image:
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop",
      price: 200,
      rating: 4.3,
      reviews: 543,
      attractions: ["Shopping", "Local Culture", "Spices", "Crafts"],
      bestTime: "Year-round",
    },
  ];

  // ============================================
  // REGIONS WITH THEIR DESTINATION COUNT
  // ============================================
  const regions = [
    { value: "all", label: "All Regions", count: destinationData.length },
    {
      value: "Amhara",
      label: "Amhara",
      count: destinationData.filter((d) => d.region === "Amhara").length,
    },
    {
      value: "Tigray",
      label: "Tigray",
      count: destinationData.filter((d) => d.region === "Tigray").length,
    },
    {
      value: "Afar",
      label: "Afar",
      count: destinationData.filter((d) => d.region === "Afar").length,
    },
    {
      value: "Southern",
      label: "Southern",
      count: destinationData.filter((d) => d.region === "Southern").length,
    },
    {
      value: "Harari",
      label: "Harari",
      count: destinationData.filter((d) => d.region === "Harari").length,
    },
    {
      value: "Oromia",
      label: "Oromia",
      count: destinationData.filter((d) => d.region === "Oromia").length,
    },
    {
      value: "Addis Ababa",
      label: "Addis Ababa",
      count: destinationData.filter((d) => d.region === "Addis Ababa").length,
    },
  ];

  // ============================================
  // GET REGION ICON
  // ============================================
  const getRegionIcon = (region) => {
    const icons = {
      Amhara: "⛰️",
      Tigray: "🏛️",
      Afar: "🌋",
      Southern: "🎭",
      Harari: "🕌",
      Oromia: "🌿",
      "Addis Ababa": "🏙️",
    };
    return icons[region] || "📍";
  };

  // ============================================
  // FILTER LOGIC
  // ============================================
  useEffect(() => {
    setTimeout(() => {
      setDestinations(destinationData);
      setFilteredDestinations(destinationData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = destinations;

    if (searchTerm) {
      result = result.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.region.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedRegion !== "all") {
      result = result.filter((dest) => dest.region === selectedRegion);
    }

    setFilteredDestinations(result);
  }, [searchTerm, selectedRegion, destinations]);

  return (
    <div className="destinations-page">
      {/* ===== HERO SECTION ===== */}
      <section className="destinations-hero">
        <div className="destinations-hero-content">
          <h1>📍 Explore Destinations</h1>
          <p>
            Discover {destinationData.length} amazing places across Ethiopia
          </p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="destinations-filters">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search destinations..."
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

            <div className="filter-region">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.value === "all"
                      ? "🌍 All Regions"
                      : `${getRegionIcon(region.value)} ${region.label}`}{" "}
                    ({region.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {selectedRegion !== "all" && (
            <div className="active-filters">
              <span className="active-filter">
                {getRegionIcon(selectedRegion)} {selectedRegion} Region
                <button onClick={() => setSelectedRegion("all")}>✕</button>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ===== RESULTS COUNT ===== */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h3>
              {loading
                ? "Loading..."
                : `${filteredDestinations.length} destinations found`}
            </h3>
            {!loading && filteredDestinations.length > 0 && (
              <span className="results-subtitle">
                Showing {filteredDestinations.length} of {destinations.length}{" "}
                destinations
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS GRID ===== */}
      <section className="section destinations-grid-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading destinations...</p>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No destinations found</h3>
              <p>Try adjusting your search or filters</p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("all");
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="destinations-grid">
              {filteredDestinations.map((dest) => (
                <div key={dest.id} className="destination-card">
                  <div className="destination-image">
                    {/* 📸 Image from destinationData */}
                    <img src={dest.image} alt={dest.name} />
                    <div className="destination-badges">
                      <span className="destination-rating">
                        ⭐ {dest.rating}
                      </span>
                      <span className="destination-reviews">
                        {dest.reviews} reviews
                      </span>
                    </div>
                  </div>
                  <div className="destination-info">
                    <div className="destination-header">
                      <h3>{dest.name}</h3>
                      <span className="destination-region-tag">
                        {getRegionIcon(dest.region)} {dest.region}
                      </span>
                    </div>
                    <p className="destination-subregion">📍 {dest.subRegion}</p>
                    <p className="destination-description">
                      {dest.description}
                    </p>
                    <div className="destination-attractions">
                      {dest.attractions.slice(0, 3).map((item, index) => (
                        <span key={index} className="attraction-tag">
                          {item}
                        </span>
                      ))}
                      {dest.attractions.length > 3 && (
                        <span className="attraction-tag more">
                          +{dest.attractions.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="destination-footer">
                      <div>
                        <span className="destination-price">${dest.price}</span>
                        <span className="destination-per-person">/ person</span>
                      </div>
                      <Link
                        to={`/destinations/${dest.id}`}
                        className="destination-btn"
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

export default Destinations;
