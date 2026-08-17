import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Transport.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import yegna from "../../assets/images/yegna.png";
import yegna1 from "../../assets/images/yegna1.png";
import yegna2 from "../../assets/images/yegna2.png";
import yegna3 from "../../assets/images/yegna3.png";
import yegna4 from "../../assets/images/yegna4.png";
import yegna5 from "../../assets/images/yegna5.png";
import yegna6 from "../../assets/images/yegna6.png";
import yegna7 from "../../assets/images/yegna7.png";
import yegna8 from "../../assets/images/yegna8.png";
import yegna9 from "../../assets/images/yegna9.png";
import zemen from "../../assets/images/zemen.png";
import zemen1 from "../../assets/images/zemen1.png";
import zemen2 from "../../assets/images/zemen2.png";
import zemen3 from "../../assets/images/zemen3.png";
import zemen4 from "../../assets/images/zemen4.png";
import bair from "../../assets/images/bair.png";
import bahir from "../../assets/images/bahir.png";
import axumair from "../../assets/images/axumair.png";
import lair from "../../assets/images/lair.png";
import gair from "../../assets/images/gair.png";
import bole from "../../assets/images/bole.png";
import semeraair from "../../assets/images/semeraair.png";
import jinka from "../../assets/images/jinka.png";
import diredawaair from "../../assets/images/diredawaair.png";
const Transport = () => {
  const navigate = useNavigate();
  const [transportOptions, setTransportOptions] = useState([]);
  const [filteredTransport, setFilteredTransport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransport, setSelectedTransport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [destinations, setDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [totalSelected, setTotalSelected] = useState(0);

  // ============================================
  // 📸 TRANSPORT DATA - CORRECT AIRPORT & BUS NAMES
  // ============================================
  const sampleTransport = [
    {
      id: 1,
      name: "Lalibela Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Lalibela Airport",
      destination_id: 1,
      destination_name: "Lalibela Rock Churches",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Lalibela Airport. Distance: 560 km | Flight time: 1 hour 15 minutes",
      price: 200,
      capacity: 60,
      available_seats: 45,
      duration: "1 hour 15 min",
      departure_time: "08:00",
      arrival_time: "09:15",
      days_available: ["Mon", "Wed", "Fri", "Sun"],
      rating: 4.8,
      reviews: 234,
      image: lair,
      amenities: ["WiFi", "Meal Included", "TV"],
      is_available: true,
    },
    {
      id: 2,
      name: "Axum Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Axum Airport",
      destination_id: 6,
      destination_name: "Axum Obelisks",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Axum Airport. Distance: 780 km | Flight time: 1 hour 30 minutes",
      price: 180,
      capacity: 60,
      available_seats: 38,
      duration: "1 hour 30 min",
      departure_time: "09:00",
      arrival_time: "10:30",
      days_available: ["Mon", "Wed", "Fri", "Sun"],
      rating: 4.7,
      reviews: 156,
      image: axumair,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 3,
      name: "Gondar Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Gondar Airport",
      destination_id: 3,
      destination_name: "Gondar Castles",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Gondar Airport. Distance: 440 km | Flight time: 55 minutes",
      price: 160,
      capacity: 60,
      available_seats: 42,
      duration: "55 min",
      departure_time: "07:30",
      arrival_time: "08:25",
      days_available: ["Tue", "Thu", "Sat"],
      rating: 4.6,
      reviews: 189,
      image: gair,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 4,
      name: "Bahir Dar Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Bahir Dar Airport",
      destination_id: 4,
      destination_name: "Lake Tana Monasteries",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Bahir Dar Airport. Distance: 560 km | Flight time: 1 hour",
      price: 170,
      capacity: 60,
      available_seats: 40,
      duration: "1 hour",
      departure_time: "10:00",
      arrival_time: "11:00",
      days_available: ["Mon", "Wed", "Fri"],
      rating: 4.5,
      reviews: 145,
      image: bahir,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 5,
      name: "Jinka Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Jinka Airport",
      destination_id: 12,
      destination_name: "Omo Valley Tribes",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Jinka Airport. Distance: 650 km | Flight time: 1 hour 20 minutes",
      price: 190,
      capacity: 60,
      available_seats: 35,
      duration: "1 hour 20 min",
      departure_time: "11:30",
      arrival_time: "12:50",
      days_available: ["Tue", "Thu", "Sat"],
      rating: 4.6,
      reviews: 112,
      image:
       jinka,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 6,
      name: "Bale Robe Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Bale Robe Airport",
      destination_id: 17,
      destination_name: "Bale Mountains National Park",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Bale Robe Airport. Distance: 430 km | Flight time: 50 minutes",
      price: 155,
      capacity: 60,
      available_seats: 44,
      duration: "50 min",
      departure_time: "13:00",
      arrival_time: "13:50",
      days_available: ["Mon", "Wed", "Fri", "Sun"],
      rating: 4.4,
      reviews: 98,
      image:
bair,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 7,
      name: "Semera Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Semera Airport",
      destination_id: 9,
      destination_name: "Danakil Depression",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Semera Airport. Distance: 700 km | Flight time: 1 hour 25 minutes",
      price: 195,
      capacity: 60,
      available_seats: 32,
      duration: "1 hour 25 min",
      departure_time: "06:30",
      arrival_time: "07:55",
      days_available: ["Mon", "Thu", "Sat"],
      rating: 4.8,
      reviews: 87,
      image:
       semeraair,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 8,
      name: "Dire Dawa Airport",
      type: "flight",
      from_location: "Addis Ababa Bole International Airport",
      to_location: "Dire Dawa Airport",
      destination_id: 15,
      destination_name: "Harar Jugol",
      description:
        "Direct flight from Addis Ababa Bole International Airport to Dire Dawa Airport. Distance: 510 km | Flight time: 55 minutes",
      price: 165,
      capacity: 60,
      available_seats: 42,
      duration: "55 min",
      departure_time: "14:00",
      arrival_time: "14:55",
      days_available: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      rating: 4.5,
      reviews: 134,
      image:
        diredawaair,
      amenities: ["WiFi", "Meal", "TV"],
      is_available: true,
    },
    {
      id: 9,
      name: "Addis Ababa Bole International Airport",
      type: "flight",
      from_location: "International Hub",
      to_location: "Addis Ababa Bole International Airport",
      destination_id: 0,
      destination_name: "Ethiopia - The Land of Origins",
      description:
        "Ethiopia's main international gateway. Connecting to all major Ethiopian cities and international destinations.",
      price: 0,
      capacity: 250,
      available_seats: 200,
      duration: "Varies",
      departure_time: "24/7",
      arrival_time: "24/7",
      days_available: ["Daily"],
      rating: 4.9,
      reviews: 5000,
      image:
        bole,
      amenities: ["WiFi", "Lounge", "Shopping", "Restaurants"],
      is_available: true,
    },

    // ============================================
    // 🚌 BUS TRANSPORT - TRUE NAMES
    // ============================================
    {
      id: 10,
      name: "Addis Ababa - Lalibela Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Lalibela Town Bus Station",
      destination_id: 1,
      destination_name: "Lalibela Rock Churches",
      description:
        "Comfortable bus service from Addis Ababa to Lalibela.npm  km | Travel time: 8 hours",
      price: 30,
      capacity: 40,
      available_seats: 12,
      duration: "8 hours",
      departure_time: "06:00",
      arrival_time: "14:00",
      days_available: ["Daily"],
      rating: 4.2,
      reviews: 156,
      image: yegna,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 11,
      name: "Addis Ababa - Axum Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Axum Town Bus Station",
      destination_id: 6,
      destination_name: "Axum Obelisks",
      description:
        "Long-distance bus from Addis Ababa to Axum. Distance: 780 km | Travel time: 12 hours",
      price: 45,
      capacity: 40,
      available_seats: 18,
      duration: "12 hours",
      departure_time: "05:00",
      arrival_time: "17:00",
      days_available: ["Mon", "Wed", "Fri"],
      rating: 4.0,
      reviews: 98,
      image: yegna1,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 12,
      name: "Addis Ababa - Gondar Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Gondar City Bus Station",
      destination_id: 3,
      destination_name: "Gondar Castles",
      description:
        "Bus service from Addis Ababa to Gondar. Distance: 440 km | Travel time: 6 hours",
      price: 25,
      capacity: 40,
      available_seats: 22,
      duration: "6 hours",
      departure_time: "07:00",
      arrival_time: "13:00",
      days_available: ["Daily"],
      rating: 4.1,
      reviews: 112,
      image: yegna2,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 13,
      name: "Addis Ababa - Bahir Dar Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Bahir Dar City Bus Station",
      destination_id: 4,
      destination_name: "Lake Tana Monasteries",
      description:
        "Express bus from Addis Ababa to Bahir Dar. Distance: 560 km | Travel time: 7 hours",
      price: 28,
      capacity: 40,
      available_seats: 15,
      duration: "7 hours",
      departure_time: "06:30",
      arrival_time: "13:30",
      days_available: ["Daily"],
      rating: 4.3,
      reviews: 134,
      image: yegna3,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 14,
      name: "Addis Ababa - Jinka Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Jinka Town Bus Station",
      destination_id: 12,
      destination_name: "Omo Valley Tribes",
      description:
        "Cultural tour bus from Addis Ababa to Jinka (Omo Valley). Distance: 650 km | Travel time: 12 hours",
      price: 55,
      capacity: 30,
      available_seats: 18,
      duration: "12 hours",
      departure_time: "05:30",
      arrival_time: "17:30",
      days_available: ["Tue", "Thu", "Sat"],
      rating: 4.5,
      reviews: 78,
      image: yegna4,
      amenities: ["AC", "Guide", "Refreshments"],
      is_available: true,
    },
    {
      id: 15,
      name: "Addis Ababa - Bale Robe Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Bale Robe Town Bus Station",
      destination_id: 17,
      destination_name: "Bale Mountains National Park",
      description:
        "Bus from Addis Ababa to Bale Robe (gateway to Bale Mountains). Distance: 430 km | Travel time: 5 hours",
      price: 22,
      capacity: 40,
      available_seats: 25,
      duration: "5 hours",
      departure_time: "08:00",
      arrival_time: "13:00",
      days_available: ["Daily"],
      rating: 4.0,
      reviews: 67,
      image: yegna5,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 16,
      name: "Mekele - Semera Bus",
      type: "bus",
      from_location: "Mekele City Bus Station",
      to_location: "Semera Town Bus Station",
      destination_id: 9,
      destination_name: "Danakil Depression",
      description:
        "Bus from Mekele to Semera (gateway to Danakil Depression). Distance: 180 km | Travel time: 3 hours",
      price: 35,
      capacity: 20,
      available_seats: 8,
      duration: "3 hours",
      departure_time: "06:00",
      arrival_time: "09:00",
      days_available: ["Mon", "Thu"],
      rating: 4.4,
      reviews: 45,
      image: yegna6,
      amenities: ["Guide", "Refreshments"],
      is_available: true,
    },
    {
      id: 17,
      name: "Addis Ababa - Dire Dawa Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Dire Dawa City Bus Station",
      destination_id: 15,
      destination_name: "Harar Jugol",
      description:
        "Bus from Addis Ababa to Dire Dawa (gateway to Harar). Distance: 510 km | Travel time: 7 hours",
      price: 27,
      capacity: 40,
      available_seats: 20,
      duration: "7 hours",
      departure_time: "07:00",
      arrival_time: "14:00",
      days_available: ["Daily"],
      rating: 4.2,
      reviews: 89,
      image: yegna7,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 18,
      name: "Gondar - Debark Bus",
      type: "bus",
      from_location: "Gondar City Bus Station",
      to_location: "Debark Town Bus Station",
      destination_id: 2,
      destination_name: "Simien Mountains National Park",
      description:
        "Bus from Gondar to Debark (gateway to Simien Mountains). Distance: 120 km | Travel time: 2.5 hours",
      price: 15,
      capacity: 20,
      available_seats: 10,
      duration: "2.5 hours",
      departure_time: "07:30",
      arrival_time: "10:00",
      days_available: ["Daily"],
      rating: 4.6,
      reviews: 72,
      image: yegna8,
      amenities: ["Refreshments", "Scenic Views"],
      is_available: true,
    },
    {
      id: 19,
      name: "Bahir Dar - Blue Nile Falls Bus",
      type: "bus",
      from_location: "Bahir Dar City Bus Station",
      to_location: "Blue Nile Falls (Tis Abay)",
      destination_id: 5,
      destination_name: "Blue Nile Falls",
      description:
        "Local bus from Bahir Dar to the Blue Nile Falls (Tis Abay). Distance: 45 km | Travel time: 1 hour",
      price: 8,
      capacity: 20,
      available_seats: 15,
      duration: "1 hour",
      departure_time: "08:00",
      arrival_time: "09:00",
      days_available: ["Daily"],
      rating: 4.3,
      reviews: 56,
      image: yegna9,
      amenities: ["Scenic Route"],
      is_available: true,
    },
    {
      id: 20,
      name: "Bahir Dar - Lake Tana Boat Transfer",
      type: "bus",
      from_location: "Bahir Dar (Lake Tana Port)",
      to_location: "Lake Tana Monasteries",
      destination_id: 4,
      destination_name: "Lake Tana Monasteries",
      description:
        "Boat transfer from Bahir Dar to Lake Tana Monasteries. Distance: 10 km | Travel time: 30 minutes",
      price: 12,
      capacity: 15,
      available_seats: 10,
      duration: "30 min",
      departure_time: "09:00",
      arrival_time: "09:30",
      days_available: ["Daily"],
      rating: 4.7,
      reviews: 89,
      image: zemen,
      amenities: ["Guide", "Life Jackets"],
      is_available: true,
    },
    // ============================================
    // 🚌 ADDITIONAL BUS ROUTES
    // ============================================
    {
      id: 21,
      name: "Addis Ababa - Harar Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Harar City Bus Station",
      destination_id: 15,
      destination_name: "Harar Jugol",
      description:
        "Bus from Addis Ababa to Harar (via Dire Dawa). Distance: 530 km | Travel time: 8 hours",
      price: 30,
      capacity: 40,
      available_seats: 25,
      duration: "8 hours",
      departure_time: "06:00",
      arrival_time: "14:00",
      days_available: ["Daily"],
      rating: 4.1,
      reviews: 76,
      image: zemen1,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 22,
      name: "Addis Ababa - Assosa Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Assosa Town Bus Station",
      destination_id: 29,
      destination_name: "Assosa Cultural Festival",
      description:
        "Bus from Addis Ababa to Assosa. Distance: 680 km | Travel time: 10 hours",
      price: 40,
      capacity: 40,
      available_seats: 20,
      duration: "10 hours",
      departure_time: "05:00",
      arrival_time: "15:00",
      days_available: ["Mon", "Wed", "Fri"],
      rating: 3.9,
      reviews: 54,
      image: zemen2,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
    {
      id: 23,
      name: "Addis Ababa - Gambela Bus",
      type: "bus",
      from_location: "Addis Ababa (Merkato Bus Station)",
      to_location: "Gambela Town Bus Station",
      destination_id: 30,
      destination_name: "Gambela Cultural Festival",
      description:
        "Bus from Addis Ababa to Gambela. Distance: 750 km | Travel time: 12 hours",
      price: 45,
      capacity: 40,
      available_seats: 18,
      duration: "12 hours",
      departure_time: "05:30",
      arrival_time: "17:30",
      days_available: ["Tue", "Thu", "Sat"],
      rating: 3.8,
      reviews: 43,
      image: zemen3,
      amenities: ["AC", "Refreshments", "Rest Stops"],
      is_available: true,
    },
  ];

  // ============================================
  // LOAD DATA
  // ============================================
  useEffect(() => {
    setTimeout(() => {
      setTransportOptions(sampleTransport);
      setFilteredTransport(sampleTransport);

      const uniqueDests = [
        ...new Set(sampleTransport.map((t) => t.destination_name)),
      ];
      setDestinations(uniqueDests);

      setLoading(false);
    }, 500);
  }, []);

  // ============================================
  // FILTER & SORT LOGIC
  // ============================================
  useEffect(() => {
    let result = [...transportOptions];

    if (searchTerm) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.from_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.to_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.destination_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedType !== "all") {
      result = result.filter((t) => t.type === selectedType);
    }

    if (selectedDestination !== "all") {
      result = result.filter((t) => t.destination_name === selectedDestination);
    }

    result = result.filter(
      (t) => t.price >= priceRange.min && t.price <= priceRange.max,
    );

    result = result.filter((t) => t.is_available);

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "price":
          comparison = a.price - b.price;
          break;
        case "duration":
          comparison = a.duration.localeCompare(b.duration);
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "capacity":
          comparison = a.capacity - b.capacity;
          break;
        default:
          comparison = a.id - b.id;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTransport(result);
  }, [
    searchTerm,
    selectedType,
    selectedDestination,
    priceRange,
    sortBy,
    sortOrder,
    transportOptions,
  ]);

  // ============================================
  // TOGGLE TRANSPORT SELECTION
  // ============================================
  const toggleSelection = (id) => {
    setSelectedTransport((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      setTotalSelected(newSelection.length);
      return newSelection;
    });
  };

  // ============================================
  // GET ICON FOR TRANSPORT TYPE
  // ============================================
  const getTypeIcon = (type) => {
    const icons = {
      flight: "",
      bus: "",
      train: "🚂",
      "4x4": "🚙",
      minivan: "🚐",
    };
    return icons[type] || "🚗";
  };

  // ============================================
  // GET TYPE COLOR
  // ============================================
  const getTypeColor = (type) => {
    const colors = {
      flight: "#2563eb",
      bus: "#059669",
      train: "#7c3aed",
      "4x4": "#d97706",
      minivan: "#dc2626",
    };
    return colors[type] || "#6b7280";
  };

  // ============================================
  // GET TYPE LABEL
  // ============================================
  const getTypeLabel = (type) => {
    const labels = {
      flight: "Flight",
      bus: "Bus",
      train: "Train",
      "4x4": "4x4 Off-Road",
      minivan: "Minivan",
    };
    return labels[type] || type;
  };

  // ============================================
  // RENDER STAR RATING
  // ============================================
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <span className="stars">
        {"⭐".repeat(fullStars)}
        {halfStar ? "⭐" : ""}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };

  // ============================================
  // HANDLE BOOKING NAVIGATION
  // ============================================
  const handleContinue = () => {
    if (selectedTransport.length > 0) {
      localStorage.setItem(
        "selectedTransport",
        JSON.stringify(selectedTransport),
      );
      navigate("/hotels");
    }
  };

  // ============================================
  // RESET FILTERS
  // ============================================
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedDestination("all");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("price");
    setSortOrder("asc");
  };

  // ============================================
  // RENDER LOADING
  // ============================================
  if (loading) {
    return (
      <div className="transport-page">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading transport options...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="transport-page">
      <Navbar />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="transport-hero">
        <div className="container">
          <div className="transport-hero-content">
            <h1> Transport Options</h1>
            <p>Find the best way to explore Ethiopia's wonders</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">{transportOptions.length}</span>
                <span className="stat-label">Routes Available</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">{destinations.length}</span>
                <span className="stat-label">Destinations</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">{totalSelected}</span>
                <span className="stat-label">Selected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FILTERS SECTION */}
      {/* ============================================ */}
      <section className="filters-section">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, route, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>

            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "▲ Hide Filters" : "▼ Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="filters-grid">
              {/* Type Filter */}
              <div className="filter-group">
                <label>Transport Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="flight"> Flight</option>
                  <option value="bus"> Bus</option>
                  <option value="train"> Train</option>
                  <option value="4x4"> 4x4</option>
                  <option value="minivan"> Minivan</option>
                </select>
              </div>

              {/* Destination Filter */}
              <div className="filter-group">
                <label>Destination</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  <option value="all">All Destinations</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label>
                  Price Range: ${priceRange.min} - ${priceRange.max}
                </label>
                <div className="price-slider">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <label>Sort By</label>
                <div className="sort-group">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price">Price</option>
                    <option value="duration">Duration</option>
                    <option value="rating">Rating</option>
                    <option value="capacity">Capacity</option>
                  </select>
                  <button
                    className={`sort-order ${sortOrder === "asc" ? "active" : ""}`}
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>

              <button className="reset-filters" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* RESULTS SECTION */}
      {/* ============================================ */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <span className="results-count">
              {filteredTransport.length} transport options found
            </span>
            {selectedTransport.length > 0 && (
              <span className="selected-count">
                ✅ {selectedTransport.length} selected
              </span>
            )}
          </div>

          {filteredTransport.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🚫</div>
              <h3>No Transport Options Found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="transport-grid">
              {filteredTransport.map((transport) => (
                <div
                  key={transport.id}
                  className={`transport-card ${selectedTransport.includes(transport.id) ? "selected" : ""}`}
                  onClick={() => toggleSelection(transport.id)}
                >
                  {/* Image */}
                  <div className="card-image">
                    <img src={transport.image} alt={transport.name} />
                    <div
                      className="card-type-badge"
                      style={{ background: getTypeColor(transport.type) }}
                    >
                      {getTypeIcon(transport.type)}{" "}
                      {getTypeLabel(transport.type)}
                    </div>
                    {transport.available_seats > 10 ? (
                      <div className="availability-badge available">
                        Available
                      </div>
                    ) : transport.available_seats > 0 ? (
                      <div className="availability-badge limited">
                        Limited Seats
                      </div>
                    ) : (
                      <div className="availability-badge full">
                        Fully Booked
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{transport.name}</h3>
                      <div className="rating">
                        {renderStars(transport.rating)}
                        <span className="rating-value">{transport.rating}</span>
                        <span className="review-count">
                          ({transport.reviews})
                        </span>
                      </div>
                    </div>

                    <div className="route-info">
                      <span className="from">📍 {transport.from_location}</span>
                      <span className="arrow">→</span>
                      <span className="to">📍 {transport.to_location}</span>
                    </div>

                    {transport.destination_name && (
                      <div className="destination-tag">
                        🏷️ {transport.destination_name}
                      </div>
                    )}

                    <p className="description">{transport.description}</p>

                    <div className="card-details">
                      <div className="detail-item">
                        <span className="detail-icon">⏱️</span>
                        <span>{transport.duration}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">🕐</span>
                        <span>
                          {transport.departure_time} - {transport.arrival_time}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">👥</span>
                        <span>
                          {transport.available_seats}/{transport.capacity} seats
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span>{transport.days_available.join(", ")}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    {transport.amenities && transport.amenities.length > 0 && (
                      <div className="amenities">
                        {transport.amenities.map((amenity, index) => (
                          <span key={index} className="amenity-tag">
                            ✅ {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="card-footer">
                      <div className="price-section">
                        {transport.price > 0 ? (
                          <>
                            <span className="price">${transport.price}</span>
                            <span className="per-person">/ person</span>
                          </>
                        ) : (
                          <span className="price-free">🌍 Hub</span>
                        )}
                      </div>
                      <div className="selection-indicator">
                        {selectedTransport.includes(transport.id) ? (
                          <span className="selected-badge">✅ Selected</span>
                        ) : (
                          <span className="select-hint">Click to select</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================ */}
          {/* CONTINUE BUTTON */}
          {/* ============================================ */}
          {selectedTransport.length > 0 && (
            <div className="continue-section">
              <div className="continue-box">
                <div className="continue-info">
                  <span className="selected-info">
                    ✅ {selectedTransport.length} transport option(s) selected
                  </span>
                  <span className="total-price">
                    Total: $
                    {selectedTransport.reduce((sum, id) => {
                      const item = transportOptions.find((t) => t.id === id);
                      return sum + (item ? item.price : 0);
                    }, 0)}
                  </span>
                </div>
                <button className="continue-btn" onClick={handleContinue}>
                  Continue to Hotels →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Transport;