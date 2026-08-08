import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";

// ============================================
// 📸 IMPORT YOUR IMAGES HERE
// ============================================
// Place images in: frontend/src/assets/images/
// ============================================
import lalibela from "../../assets/images/lalibela.png";
import denkel from "../../assets/images/Danakil-Depression.png";
import semien from "../../assets/images/walia.png";
import axum from "../../assets/images/axum.png";
import ommo from "../../assets/images/ommovalley.png";
import buhie from "../../assets/images/buhie.png";
import timiket from "../../assets/images/timiket.png";
import ashenda from "../../assets/images/ashenda.png";
import newyear from "../../assets/images/newyear.png";
import meskel from "../../assets/images/meskel.png";
import fiche from "../../assets/images/fiche.png";
import harari from "../../assets/images/harar.png";
import denkele1 from "../../assets/images/denkele1.png";
import coffee from "../../assets/images/coffee.png";
import gondar from "../../assets/images/gondar.png";
import ommo1 from "../../assets/images/ommo1.png";
import rasdashen from "../../assets/images/rasdashen.png";
import wildanimal from "../../assets/images/wildanimal.png";
import semien2 from "../../assets/images/semien2.png";
import bluenile from "../../assets/images/bluenile.png";
import etcu from "../../assets/images/etcu.png";
import culturalfe from "../../assets/images/culturalfe.png";
import debredamo from "../../assets/images/debredamo.png";
import national from "../../assets/images/national.png";
import tana from "../../assets/images/tana.png";
import etmap from "../../assets/images/etmap.png";
import lwommo from "../../assets/images/lwommo.png";
import lwaw from "../../assets/images/lwaw.png";
import konso from "../../assets/images/konso.png";
const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ============================================
  // 📸 ADD YOUR IMAGES HERE
  // ============================================
  const images = {
    // ===== HERO BACKGROUND =====
    heroBg:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&h=1080&fit=crop",

    // ===== VIDEO =====
    heroVideo: "https://www.w3schools.com/html/mov_bbb.mp4",

    // ===== VERTICAL LEFT SIDE IMAGES =====
    verticalLeft1:
      lalibela,
    verticalLeft2:
      semien2,
    verticalLeft3:
      denkele1,
    verticalLeft4:
      ommo1,
    verticalLeft5:
    axum,
    verticalLeft6:
      harari,
    verticalLeft7:
      gondar,
    verticalLeft8:
      bluenile,

    // ===== VERTICAL RIGHT SIDE IMAGES =====
    verticalRight1:
     etcu,
    verticalRight2:
      coffee,
    verticalRight3:
      wildanimal,
    verticalRight4:
      rasdashen,
    verticalRight5:
      culturalfe,
    verticalRight6:
    debredamo,
    verticalRight7:
      national,
    verticalRight8:
      tana,

    // ===== CENTER MAP =====
    ethiopiaMap:
      etmap,

    // ===== FEATURED DESTINATION IMAGES =====
    featured1:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=600&h=400&fit=crop",
    featured2:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
    featured3:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    featured4:
      "https://images.unsplash.com/photo-1523805009344-8f45bb7a72e6?w=600&h=400&fit=crop",

    // ===== UNESCO IMAGES =====
    unesco1:
      harari,
    unesco2:
     lwommo,
    unesco3:
      lwaw,
    unesco4:
    konso,

    // ===== EVENTS IMAGES =====
    event1:
      timiket,
    event2:
      buhie,
    event3:
     ashenda,
    event4:
     newyear,
    event5:meskel
     ,
    event6:
     fiche,
  };

  // ============================================
  // ✅ CAROUSEL SLIDES DATA - FULL DESCRIPTIONS
  // ============================================
  const carouselItems = [
    {
      image: lalibela,
      title: "Lalibela Rock Churches",
      description:
        "The Lalibela Rock Churches are a UNESCO World Heritage Site featuring 11 monolithic churches carved from the living rock in the 12th century. These remarkable structures, still active places of worship today, are connected by a network of tunnels and passages, representing a 'New Jerusalem' for pilgrims. The intricate architecture and ancient religious significance make it one of Ethiopia's most sacred and awe-inspiring destinations.",
    },
    {
      image: semien,
      title: "Simien Mountains National Park",
      description:
        "The Simien Mountains National Park is a UNESCO World Heritage Site renowned for its dramatic landscapes, deep valleys, and jagged peaks. Home to unique wildlife including the Gelada baboon and Ethiopian wolf, the park offers some of the most spectacular trekking experiences in Africa. The stunning escarpments and breathtaking views of the surrounding lowlands make it a paradise for nature lovers and adventure seekers.",
    },
    {
      image: denkel,
      title: "Danakil Depression",
      description:
        "The Danakil Depression is one of the most extreme and fascinating places on Earth, known as the 'Gateway to Hell.' Located in the Afar Triangle, it features colorful sulfur springs, vast salt flats, and active volcanoes like Erta Ale with its permanent lava lake. Despite being one of the hottest places on the planet, this surreal landscape attracts adventurers and photographers from around the world with its otherworldly beauty.",
    },
    {
      image: ommo,
      title: "Omo Valley Tribes",
      description:
        "The Omo Valley is a cultural treasure trove, home to some of Ethiopia's most fascinating indigenous tribes including the Hamer, Mursi, Karo, and Dassanech. This remote region offers a unique glimpse into ancient traditions, body painting, lip plates, and vibrant ceremonies that have been preserved for generations. Visiting the Omo Valley is an immersive cultural experience unlike any other in the world.",
    },
    {
      image: axum,
      title: "Axum Obelisks",
      description:
        "The ancient city of Axum was once the heart of the powerful Aksumite Empire. Today, it is famous for its towering obelisks, royal tombs, and the legendary Church of Our Lady Mary of Zion, which is said to house the Ark of the Covenant. These monumental granite stelae, some standing over 20 meters tall, are a testament to the engineering prowess and rich history of one of the oldest civilizations in Africa.",
    },
  ];

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
  // 📸 EVENTS & FESTIVALS DATA
  // ============================================
  const eventsData = [
    {
      id: 1,
      title: "Timkat - Ethiopian Epiphany",
      amharicTitle: "ጥምቀት",
      description:
        "One of the most colorful and important festivals in Ethiopia, celebrating the baptism of Jesus Christ in the Jordan River.",
      startDate: "Jan 10",
      endDate: "Jan 11",
      location: "Nationwide (Especially Gonder, Lalibela)",
      category: "Religious",
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
      Date: "Aug 13",
      location: "Nationwide",
      category: "Religious",
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
      Date: "Aug 16---21",
      location: "Tigray & Amhara Regions",
      category: "Cultural",
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
      Date: "Sep 1",
      location: "Nationwide",
      category: "Festival",
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
      startDate: "Sep 17",
      location: "Addis Ababa & Nationwide",
      category: "Religious",
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
      {/* ✅ CAROUSEL SECTION - Changes every 3 seconds */}
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

          {/* ✅ interval={3000} = Changes every 3 seconds */}
          <Carousel items={carouselItems} autoPlay={true} interval={3000} />
        </div>
      </section>

      {/* ============================================ */}
      {/* EVENTS SECTION */}
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
                  <img
                    src={event.image}
                    alt={event.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400/1e3a5f/ffffff?text=Event";
                    }}
                  />
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
