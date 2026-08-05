import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// ============================================
// 📸 IMPORT YOUR IMAGES HERE
// ============================================
//
// TO ADD YOUR IMAGES:
// 1. Place images in: frontend/src/assets/images/
// 2. Import them like:
//    import heroBgImage from '../../assets/images/hero-bg.jpg';
//    import event1Image from '../../assets/images/events/event1.jpg';
//    import event2Image from '../../assets/images/events/event2.jpg';
//    import event3Image from '../../assets/images/events/event3.jpg';
//    import event4Image from '../../assets/images/events/event4.jpg';
//    import event5Image from '../../assets/images/events/event5.jpg';
//    import event6Image from '../../assets/images/events/event6.jpg';
// ============================================

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ============================================
  // 📸 ADD YOUR IMAGES HERE
  // ============================================
  const images = {
    // ===== HERO BACKGROUND =====
    // 📸 REPLACE with your hero background image
    heroBg:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&h=1080&fit=crop",

    // ===== VIDEO =====
    // 📸 REPLACE with your hero video
    heroVideo: "https://www.w3schools.com/html/mov_bbb.mp4",

    // ===== VERTICAL LEFT SIDE IMAGES =====
    // 📸 REPLACE with your images
    verticalLeft1:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&h=300&fit=crop",
    verticalLeft2:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=300&fit=crop",
    verticalLeft3:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop",
    verticalLeft4:
      "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=400&h=300&fit=crop",
    verticalLeft5:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    verticalLeft6:
      "https://images.unsplash.com/photo-1590050752117-23802e9b3ee2?w=400&h=300&fit=crop",
    verticalLeft7:
      "https://images.unsplash.com/photo-1551632811-561732d8a11e?w=400&h=300&fit=crop",
    verticalLeft8:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",

    // ===== VERTICAL RIGHT SIDE IMAGES =====
    // 📸 REPLACE with your images
    verticalRight1:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    verticalRight2:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    verticalRight3:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop",
    verticalRight4:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop",
    verticalRight5:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=300&fit=crop",
    verticalRight6:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop",
    verticalRight7:
      "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=400&h=300&fit=crop",
    verticalRight8:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&h=300&fit=crop",

    // ===== CENTER MAP =====
    // 📸 REPLACE with your Ethiopia map image
    ethiopiaMap:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ethiopia_Map.png/800px-Ethiopia_Map.png",

    // ===== CAROUSEL IMAGES =====
    // 📸 REPLACE with your carousel images
    carousel1:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=1200&h=600&fit=crop",
    carousel2:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&h=600&fit=crop",
    carousel3:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=600&fit=crop",
    carousel4:
      "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=1200&h=600&fit=crop",
    carousel5:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=600&fit=crop",

    // ===== FEATURED DESTINATION IMAGES =====
    // 📸 REPLACE with your images
    featured1:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=600&h=400&fit=crop",
    featured2:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
    featured3:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    featured4:
      "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=600&h=400&fit=crop",

    // ===== UNESCO IMAGES =====
    // 📸 REPLACE with your UNESCO images
    unesco1:
      "https://images.unsplash.com/photo-1590050752117-23802e9b3ee2?w=600&h=400&fit=crop",
    unesco2:
      "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=600&h=400&fit=crop",
    unesco3:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    unesco4:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",

    // ===== EVENTS IMAGES =====
    // 📸 REPLACE with your event images
    event1:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop",
    event2:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    event3:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    event4:
      "https://images.unsplash.com/photo-1551632811-561732d8a11e?w=600&h=400&fit=crop",
    event5:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
    event6:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
  };

  // ============================================
  // VERTICAL IMAGES DATA
  // ============================================
  const leftVerticalImages = [
    {
      id: 1,
      image: images.verticalLeft1,
      title: "Lalibela Churches",
      desc: "Ancient rock-hewn churches",
    },
    {
      id: 2,
      image: images.verticalLeft2,
      title: "Simien Mountains",
      desc: "Breathtaking landscapes",
    },
    {
      id: 3,
      image: images.verticalLeft3,
      title: "Danakil Depression",
      desc: "Extreme natural wonder",
    },
    {
      id: 4,
      image: images.verticalLeft4,
      title: "Omo Valley Tribes",
      desc: "Rich cultural heritage",
    },
    {
      id: 5,
      image: images.verticalLeft5,
      title: "Axum Obelisks",
      desc: "Ancient civilization",
    },
    {
      id: 6,
      image: images.verticalLeft6,
      title: "Harar Jugol",
      desc: "Fortified historic town",
    },
    {
      id: 7,
      image: images.verticalLeft7,
      title: "Gondar Castles",
      desc: "Royal architecture",
    },
    {
      id: 8,
      image: images.verticalLeft8,
      title: "Blue Nile Falls",
      desc: "Natural wonder",
    },
  ];

  const rightVerticalImages = [
    {
      id: 1,
      image: images.verticalRight1,
      title: "Ethiopian Cuisine",
      desc: "Rich culinary heritage",
    },
    {
      id: 2,
      image: images.verticalRight2,
      title: "Coffee Ceremony",
      desc: "Traditional coffee culture",
    },
    {
      id: 3,
      image: images.verticalRight3,
      title: "Wildlife Safari",
      desc: "Unique animal species",
    },
    {
      id: 4,
      image: images.verticalRight4,
      title: "Mountain Views",
      desc: "Stunning panoramas",
    },
    {
      id: 5,
      image: images.verticalRight5,
      title: "Cultural Festivals",
      desc: "Vibrant celebrations",
    },
    {
      id: 6,
      image: images.verticalRight6,
      title: "Ancient Monasteries",
      desc: "Spiritual heritage",
    },
    {
      id: 7,
      image: images.verticalRight7,
      title: "National Parks",
      desc: "Protected nature",
    },
    {
      id: 8,
      image: images.verticalRight8,
      title: "Lake Tana",
      desc: "Sacred waters",
    },
  ];

  // ============================================
  // 📸 EVENTS & FESTIVALS DATA - ADD YOUR IMAGES
  // ============================================
  // 📸 EDIT: Change titles, descriptions, dates, and images
  const eventsData = [
    {
      id: 1,
      title: "Timkat - Ethiopian Epiphany",
      amharicTitle: "ጥምቀት",
      description:
        "One of the most colorful and important festivals in Ethiopia, celebrating the baptism of Jesus Christ in the Jordan River.",
      startDate: "Jan 19, 2026",
      endDate: "Jan 20, 2026",
      location: "Nationwide (Especially Gonder, Lalibela)",
      category: "Religious",
      // 📸 REPLACE with your image
      image: images.event1,
      highlights: [
        "Colorful Processions",
        "Church Ceremonies",
        "Water Blessing",
        "Traditional Music",
      ],
    },
    {
      id: 2,
      title: "Buhe - Commemoration of the Transfiguration",
      amharicTitle: "ቡሄ",
      description:
        "Celebration of the Transfiguration of Jesus Christ, marked by traditional songs, bonfires, and festive meals.",
      startDate: "Aug 19, 2026",
      endDate: "Aug 19, 2026",
      location: "Nationwide",
      category: "Religious",
      // 📸 REPLACE with your image
      image: images.event2,
      highlights: [
        "Bonfires",
        "Traditional Songs",
        "Family Gatherings",
        "Festive Meals",
      ],
    },
    {
      id: 3,
      title: "Ashenda - A Lively Celebration of Girls",
      amharicTitle: "አሸንዳ",
      description:
        "A colorful cultural festival celebrating young women with music, dance, and traditional attire across Tigray and Amhara regions.",
      startDate: "Aug 22, 2026",
      endDate: "Aug 25, 2026",
      location: "Tigray & Amhara Regions",
      category: "Cultural",
      // 📸 REPLACE with your image
      image: images.event3,
      highlights: [
        "Traditional Dance",
        "Music",
        "Colorful Attire",
        "Community Celebration",
      ],
    },
    {
      id: 4,
      title: "Enkutatash - Ethiopian New Year",
      amharicTitle: "እንቁጣጣሽ",
      description:
        "Celebrate the Ethiopian New Year with traditional feasts, coffee ceremonies, and the blooming of yellow daisies across the country.",
      startDate: "Sep 11, 2026",
      endDate: "Sep 12, 2026",
      location: "Nationwide",
      category: "Festival",
      // 📸 REPLACE with your image
      image: images.event4,
      highlights: [
        "New Year Celebrations",
        "Coffee Ceremony",
        "Traditional Feasts",
        "Yellow Daisies",
      ],
    },
    {
      id: 5,
      title: "Meskel - The Finding of the True Cross",
      amharicTitle: "መስቀል",
      description:
        "A vibrant religious celebration with massive bonfires, colorful processions, and traditional music commemorating the discovery of the True Cross.",
      startDate: "Sep 27, 2026",
      endDate: "Sep 27, 2026",
      location: "Addis Ababa & Nationwide",
      category: "Religious",
      // 📸 REPLACE with your image
      image: images.event5,
      highlights: [
        "Massive Bonfires",
        "Colorful Processions",
        "Traditional Music",
        "Church Ceremonies",
      ],
    },
    {
      id: 6,
      title: "Fichee-Chambalaalla - Sidama New Year",
      amharicTitle: "ፊቼ-ቻምባላላ",
      description:
        "Traditional New Year celebration of the Sidama people, featuring cultural performances, traditional foods, and community gatherings.",
      startDate: "Dec 12, 2026",
      endDate: "Dec 13, 2026",
      location: "Sidama Region",
      category: "Cultural",
      // 📸 REPLACE with your image
      image: images.event6,
      highlights: [
        "Cultural Performances",
        "Traditional Foods",
        "Community Gatherings",
        "UNESCO Heritage",
      ],
    },
  ];

  // ============================================
  // CAROUSEL DATA
  // ============================================
  const carouselSlides = [
    {
      id: 1,
      image: images.carousel1,
      title: "🏛️ Lalibela Rock Churches",
      description:
        "Discover the ancient 12th-century rock-hewn churches carved from solid rock.",
      location: "Amhara Region",
      rating: "4.8 ⭐",
      category: "UNESCO Heritage",
    },
    {
      id: 2,
      image: images.carousel2,
      title: "🏔️ Simien Mountains National Park",
      description:
        "Experience breathtaking landscapes with dramatic escarpments and unique wildlife.",
      location: "Gondar",
      rating: "4.9 ⭐",
      category: "Nature & Wildlife",
    },
    {
      id: 3,
      image: images.carousel3,
      title: "🌋 Danakil Depression",
      description:
        "Explore one of the most extreme places on Earth with colorful sulfur springs.",
      location: "Afar Region",
      rating: "5.0 ⭐",
      category: "Adventure",
    },
    {
      id: 4,
      image: images.carousel4,
      title: "🎭 Omo Valley Tribes",
      description:
        "Immerse yourself in the rich cultural heritage of Ethiopia's indigenous tribes.",
      location: "Southern Ethiopia",
      rating: "4.7 ⭐",
      category: "Cultural Experience",
    },
    {
      id: 5,
      image: images.carousel5,
      title: "🏛️ Axum Obelisks",
      description:
        "Visit the ancient city of Axum, home to towering obelisks and royal tombs.",
      location: "Tigray Region",
      rating: "4.8 ⭐",
      category: "Historical Site",
    },
  ];

  // ============================================
  // FEATURED DESTINATIONS DATA
  // ============================================
  const featuredDestinations = [
    {
      id: 1,
      image: images.featured1,
      title: "Lalibela Rock Churches",
      location: "Amhara Region",
      description:
        "11 monolithic churches carved from rock in the 12th century",
      price: "$1,200",
      rating: "4.8",
    },
    {
      id: 2,
      image: images.featured2,
      title: "Simien Mountains",
      location: "Gondar",
      description: "Breathtaking landscapes and unique wildlife",
      price: "$1,500",
      rating: "4.9",
    },
    {
      id: 3,
      image: images.featured3,
      title: "Danakil Depression",
      location: "Afar Region",
      description: "One of the hottest places on Earth",
      price: "$1,800",
      rating: "5.0",
    },
    {
      id: 4,
      image: images.featured4,
      title: "Omo Valley",
      location: "Southern Ethiopia",
      description: "Rich cultural heritage and traditions",
      price: "$1,100",
      rating: "4.7",
    },
  ];

  // ============================================
  // UNESCO DATA
  // ============================================
  const unescoSites = [
    {
      id: 1,
      image: images.unesco1,
      title: "Harar Jugol",
      description: "The Fortified Historic Town",
      category: "Cultural",
    },
    {
      id: 2,
      image: images.unesco2,
      title: "Lower Valley of the Omo",
      description: "Ancient Human Fossils",
      category: "Cultural",
    },
    {
      id: 3,
      image: images.unesco3,
      title: "Lower Valley of the Awash",
      description: "Paleontological Site",
      category: "Cultural",
    },
    {
      id: 4,
      image: images.unesco4,
      title: "Konso Cultural Landscape",
      description: "Traditional Culture",
      category: "Cultural",
    },
  ];

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isMobile) {
        setVerticalOffset((prev) => (prev + 1) % 600);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length,
    );
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Religious: "#7c3aed",
      Cultural: "#d97706",
      Festival: "#dc2626",
      Seasonal: "#059669",
    };
    return colors[category] || "#6b7280";
  };

  return (
    <div className="home-page">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="hero-section">
        <div className="hero-video-wrapper">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={images.heroBg}
          >
            <source src={images.heroVideo} type="video/mp4" />
            <img src={images.heroBg} alt="Ethiopia" />
          </video>

          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-badge">🇪🇹 Welcome to Ethiopia</div>
              <h1 className="hero-title">
                <span className="hero-subtitle-top">
                  LET'S EXPLORE ETHIOPIA
                </span>
                <span className="highlight">Where Wonders</span>
                <span className="hero-subtitle-bottom">Await</span>
              </h1>
              <p className="hero-description">
                Prepare for an unforgettable journey through the heart of
                Ethiopia, where ancient traditions meet breathtaking landscapes.
                From the historic wonders of Lalibela and Axum to the stunning
                natural beauty of the Simien Mountains and the Blue Nile Falls.
              </p>
              <div className="hero-buttons">
                <Link to="/destinations" className="btn-primary">
                  Explore Destinations 🚀
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn More →
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Destinations</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Happy Travelers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.9⭐</span>
                  <span className="stat-label">Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="mouse"></div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CAROUSEL SECTION */}
      {/* ============================================ */}
      <section className="section carousel-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🌟 Featured</span>
            <h2>Discover Ethiopia's Wonders</h2>
            <p>
              Explore the most iconic destinations across the Land of Origins
            </p>
          </div>

          <div className="carousel-container">
            <div className="carousel-track">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                  style={{
                    transform: `translateX(${(index - currentSlide) * 100}%)`,
                  }}
                >
                  <div className="carousel-slide-content">
                    <img src={slide.image} alt={slide.title} />
                    <div className="carousel-overlay">
                      <div className="carousel-badge">{slide.category}</div>
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                      <div className="carousel-meta">
                        <span className="carousel-location">
                          📍 {slide.location}
                        </span>
                        <span className="carousel-rating">{slide.rating}</span>
                      </div>
                      <Link
                        to={`/destinations/${slide.id}`}
                        className="carousel-btn"
                      >
                        Explore Now →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-nav prev" onClick={prevSlide}>
              ❮
            </button>
            <button className="carousel-nav next" onClick={nextSlide}>
              ❯
            </button>

            <div className="carousel-dots">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ✨ EVENTS & FESTIVALS SECTION */}
      {/* ============================================ */}
      <section className="section events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🎪 Events</span>
            <h2>Upcoming Events & Festivals</h2>
            <p className="section-subtitle">
              Meet in the Land of Origins - Experience Ethiopia's vibrant
              cultural celebrations
            </p>
          </div>

          <div className="events-grid">
            {eventsData.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  {/* 📸 Image from eventsData */}
                  <img src={event.image} alt={event.title} />
                  <span
                    className="event-category"
                    style={{ background: getCategoryColor(event.category) }}
                  >
                    {event.category}
                  </span>
                </div>
                <div className="event-content">
                  <div className="event-header">
                    <h3 className="event-title">{event.title}</h3>
                    {event.amharicTitle && (
                      <span className="event-amharic">
                        {event.amharicTitle}
                      </span>
                    )}
                  </div>
                  <p className="event-description">{event.description}</p>

                  <div className="event-details">
                    <div className="event-date">
                      <span className="event-icon">📅</span>
                      <span className="event-label">Start:</span>
                      <span className="event-value">{event.startDate}</span>
                    </div>
                    {event.endDate && event.endDate !== event.startDate && (
                      <div className="event-date">
                        <span className="event-icon">📅</span>
                        <span className="event-label">End:</span>
                        <span className="event-value">{event.endDate}</span>
                      </div>
                    )}
                    <div className="event-location">
                      <span className="event-icon">📍</span>
                      <span className="event-value">{event.location}</span>
                    </div>
                  </div>

                  <div className="event-highlights">
                    {event.highlights.map((item, index) => (
                      <span key={index} className="highlight-tag">
                        ✨ {item}
                      </span>
                    ))}
                  </div>

                  <button className="event-btn">Learn More →</button>
                </div>
              </div>
            ))}
          </div>

          {/* ============================================ */}
          {/* ✅ EVENTS FOOTER - FIXED LINK TO /events */}
          {/* ============================================ */}
          <div className="events-footer">
            <Link to="/events" className="events-view-all">
              View All Events 📅
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED DESTINATIONS */}
      {/* ============================================ */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">📍 Featured</span>
            <h2>Featured Destinations</h2>
            <p>Discover the most iconic places in Ethiopia</p>
          </div>

          <div className="featured-grid">
            {featuredDestinations.map((dest) => (
              <div key={dest.id} className="featured-card">
                <div className="featured-image">
                  <img src={dest.image} alt={dest.title} />
                  <div className="featured-badge">⭐ {dest.rating}</div>
                </div>
                <div className="featured-content">
                  <h3>{dest.title}</h3>
                  <p className="featured-location">📍 {dest.location}</p>
                  <p className="featured-description">{dest.description}</p>
                  <div className="featured-footer">
                    <span className="featured-price">From {dest.price}</span>
                    <Link
                      to={`/destinations/${dest.id}`}
                      className="featured-btn"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERTICAL SECTION */}
      {/* ============================================ */}
      <section className="section vertical-section">
        <div className="vertical-container desktop-only">
          <div className="vertical-left">
            <div
              className="vertical-track-left"
              style={{ transform: `translateY(-${verticalOffset}px)` }}
            >
              {[...leftVerticalImages, ...leftVerticalImages].map(
                (item, index) => (
                  <div key={`left-${index}`} className="vertical-item">
                    <img src={item.image} alt={item.title} />
                    <div className="vertical-item-overlay">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
            <div className="vertical-gradient top"></div>
            <div className="vertical-gradient bottom"></div>
          </div>

          <div className="vertical-center">
            <div className="map-container">
              <img
                src={images.ethiopiaMap}
                alt="Ethiopia Map"
                className="map-image"
              />
              <div className="map-overlay">
                <h3>Explore Ethiopia</h3>
                <p>Discover the Land of Origins</p>
                <div className="map-stats">
                  <span>📍 15+ Regions</span>
                  <span>🏛️ 9 UNESCO Sites</span>
                  <span>🌋 50+ Attractions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="vertical-right">
            <div
              className="vertical-track-right"
              style={{ transform: `translateY(${verticalOffset}px)` }}
            >
              {[...rightVerticalImages, ...rightVerticalImages].map(
                (item, index) => (
                  <div key={`right-${index}`} className="vertical-item">
                    <img src={item.image} alt={item.title} />
                    <div className="vertical-item-overlay">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
            <div className="vertical-gradient top"></div>
            <div className="vertical-gradient bottom"></div>
          </div>
        </div>

        <div className="mobile-only">
          <div className="mobile-horizontal-top">
            <div
              className="horizontal-track-left"
              style={{ transform: `translateX(-${verticalOffset}px)` }}
            >
              {[...leftVerticalImages, ...leftVerticalImages].map(
                (item, index) => (
                  <div key={`h-left-${index}`} className="horizontal-item">
                    <img src={item.image} alt={item.title} />
                    <div className="horizontal-item-overlay">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
            <div className="horizontal-gradient left"></div>
            <div className="horizontal-gradient right"></div>
          </div>

          <div className="mobile-map-container">
            <div className="map-container">
              <img
                src={images.ethiopiaMap}
                alt="Ethiopia Map"
                className="map-image"
              />
              <div className="map-overlay">
                <h3>Explore Ethiopia</h3>
                <p>Discover the Land of Origins</p>
                <div className="map-stats">
                  <span>📍 15+ Regions</span>
                  <span>🏛️ 9 UNESCO Sites</span>
                  <span>🌋 50+ Attractions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-horizontal-bottom">
            <div
              className="horizontal-track-right"
              style={{ transform: `translateX(${verticalOffset}px)` }}
            >
              {[...rightVerticalImages, ...rightVerticalImages].map(
                (item, index) => (
                  <div key={`h-right-${index}`} className="horizontal-item">
                    <img src={item.image} alt={item.title} />
                    <div className="horizontal-item-overlay">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
            <div className="horizontal-gradient left"></div>
            <div className="horizontal-gradient right"></div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* UNESCO SECTION */}
      {/* ============================================ */}
      <section className="section unesco-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🏛️ UNESCO</span>
            <h2>UNESCO World Heritage Sites</h2>
            <p>
              Ethiopia is home to several UNESCO World Heritage Sites each
              offering a unique glimpse into the country's rich history and
              culture
            </p>
          </div>

          <div className="unesco-grid">
            {unescoSites.map((site) => (
              <div key={site.id} className="unesco-item">
                <img src={site.image} alt={site.title} />
                <div className="unesco-overlay">
                  <span className="unesco-badge">🏛️ UNESCO</span>
                  <h4>{site.title}</h4>
                  <p>{site.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CALL TO ACTION */}
      {/* ============================================ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Explore Ethiopia?</h2>
            <p>
              Start your adventure today and discover the wonders of the Land of
              Origins
            </p>
            <div className="cta-buttons">
              <Link to="/destinations" className="btn-primary">
                Plan Your Trip Now ✈️
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
