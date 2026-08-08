import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import timiket from "../../assets/images/timiket.png";
import hidar from "../../assets/images/hidartsion.png";
import ashenda from "../../assets/images/ashenda2.png";
import chrismass from "../../assets/images/chrismass.png";
import meskel from "../../assets/images/meskel.png";
import agew from "../../assets/images/agew.png";
import tanamonastery from "../../assets/images/tanamonastery.png";
import afar from "../../assets/images/afar.png";
import afarsalt from "../../assets/images/afarsalt.png";
import irrecha from "../../assets/images/irrecha.png";
import gadda from "../../assets/images/gadda.png";
import balliemountain from "../../assets/images/balliemountain.png";
import ommotribe from "../../assets/images/ommotribe.png";
import murssi from "../../assets/images/murssi.png";
import turmimarket from "../../assets/images/turmimarket.png";
import fiche from "../../assets/images/fiche.png";
import hararihyna from "../../assets/images/hararihyna.png";
import hararcityfes from "../../assets/images/hararcityfes.png";
import eid from "../../assets/images/eid.png";
import mewlid from "../../assets/images/mewlid.png";
import remedan from "../../assets/images/remedan.png";
import enkutatash from "../../assets/images/enkutatash.png";
import buhie1 from "../../assets/images/buhie1.png";
import lidet from "../../assets/images/lidet.png";
import adwa from "../../assets/images/adwa.png";
import flag from "../../assets/images/flag.png";
import benishangul from "../../assets/images/benishangul.png";
import gambella from "../../assets/images/gambella.png";
import diredawa from "../../assets/images/diredawa.png";
import eida from "../../assets/images/eida.png";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const eventsData = [
    // ===== TIGRAY REGION =====
    {
      id: 1,
      title: "Timkat - Ethiopian Epiphany",
      amharicTitle: "ጥምቀት",
      description:
        "One of the most colorful festivals in Ethiopia, celebrating the baptism of Jesus Christ. The festival features elaborate processions, singing, and water blessing.",
      startDate: "Jan 19, 2026",
      endDate: "Jan 20, 2026",
      location: "Axum, Tigray & Nationwide",
      region: "Tigray",
      category: "Religious",
      image: timiket,
      highlights: [
        "Colorful Processions",
        "Church Ceremonies",
        "Water Blessing",
        "Traditional Music",
        "White Garments",
      ],
    },
    {
      id: 2,
      title: "Hidar Tsion - Feast of St. Mary of Zion",
      amharicTitle: "ሕዳር ጽዮን",
      description:
        "Celebration of the Virgin Mary at the Church of Our Lady Mary of Zion in Axum, one of the most sacred sites in Ethiopia.",
      startDate: "Nov 21, 2026",
      endDate: "Nov 21, 2026",
      location: "Axum, Tigray Region",
      region: "Tigray",
      category: "Religious",
      image: hidar,
      highlights: [
        "Church Ceremonies",
        "Pilgrimage",
        "Traditional Music",
        "Cultural Performances",
      ],
    },
    {
      id: 3,
      title: "Ashenda - Celebration of Girls",
      amharicTitle: "አሸንዳ",
      description:
        "A colorful cultural festival celebrating young women with music, dance, and traditional attire across Tigray region.",
      startDate: "Aug 22, 2026",
      endDate: "Aug 25, 2026",
      location: "Tigray Region",
      region: "Tigray",
      category: "Cultural",
      image: ashenda,
      highlights: [
        "Traditional Dance",
        "Music",
        "Colorful Attire",
        "Community Celebration",
        "Girls Empowerment",
      ],
    },

    // ===== AMHARA REGION =====
    {
      id: 4,
      title: "Lalibela Christmas - Genna",
      amharicTitle: "ገና",
      description:
        "Celebration of the birth of Jesus Christ at the rock-hewn churches of Lalibela, with traditional church services and the ancient game of Genna.",
      startDate: "Jan 7, 2026",
      endDate: "Jan 7, 2026",
      location: "Lalibela, Amhara Region",
      region: "Amhara",
      category: "Religious",
      image: chrismass,
      highlights: [
        "Church Services",
        "Traditional Games",
        "Festive Meals",
        "White Garments",
        "Pilgrimage",
      ],
    },
    {
      id: 5,
      title: "Meskel - Finding of the True Cross",
      amharicTitle: "መስቀል",
      description:
        "A vibrant religious celebration with massive bonfires, colorful processions, and traditional music commemorating the discovery of the True Cross.",
      startDate: "Sep 27, 2026",
      endDate: "Sep 27, 2026",
      location: "Gondar, Amhara & Nationwide",
      region: "Amhara",
      category: "Religious",
      image: meskel,
      highlights: [
        "Massive Bonfires",
        "Colorful Processions",
        "Traditional Music",
        "Church Ceremonies",
        "Cross Decoration",
      ],
    },
    {
      id: 6,
      title: "Agew Horse Festival",
      amharicTitle: "የአገው ፈረስ ጨዋታ",
      description:
        "Traditional Agew horse racing and equestrian festival celebrating the rich cultural heritage of the Agew people in the Awi Zone.",
      startDate: "Oct 15, 2026",
      endDate: "Oct 17, 2026",
      location: "Awi Zone, Amhara Region",
      region: "Amhara",
      category: "Cultural",
      image: agew,
      highlights: [
        "Horse Racing",
        "Equestrian Skills",
        "Traditional Music",
        "Cultural Exhibitions",
        "Agew Heritage",
      ],
    },
    {
      id: 7,
      title: "Lake Tana Monasteries Festival",
      amharicTitle: "የጣና ሃይቅ ገዳማት በዓል",
      description:
        "Celebration at the ancient island monasteries of Lake Tana, featuring traditional prayers, music, and boat processions.",
      startDate: "Apr 25, 2026",
      endDate: "Apr 26, 2026",
      location: "Lake Tana, Bahir Dar",
      region: "Amhara",
      category: "Religious",
      image: tanamonastery,
      highlights: [
        "Boat Processions",
        "Monastery Ceremonies",
        "Traditional Music",
        "Prayers",
      ],
    },
    {
      id: 8,
      title: "Gish Abay Coffee Festival",
      amharicTitle: "የጊሽ አባይ ቡና ፌስቲቫል",
      description:
        "Celebration of the birthplace of coffee in the Gish Abay area, featuring traditional coffee ceremonies and cultural performances.",
      startDate: "Mar 20, 2026",
      endDate: "Mar 22, 2026",
      location: "Gish Abay, Amhara Region",
      region: "Amhara",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop",
      highlights: [
        "Coffee Ceremony",
        "Cultural Performances",
        "Traditional Foods",
        "Coffee History",
      ],
    },

    // ===== AFAR REGION =====
    {
      id: 9,
      title: "Kulle - Afar Cultural Festival",
      amharicTitle: "ኩሌ",
      description:
        "Traditional Afar cultural festival featuring camel racing, traditional dances, and showcasing the rich nomadic heritage of the Afar people.",
      startDate: "Mar 15, 2026",
      endDate: "Mar 17, 2026",
      location: "Afar Region",
      region: "Afar",
      category: "Cultural",
      image: afar,
      highlights: [
        "Camel Racing",
        "Traditional Dances",
        "Nomadic Heritage",
        "Cultural Exhibitions",
        "Traditional Foods",
      ],
    },
    {
      id: 10,
      title: "Danakil Salt Caravan Festival",
      amharicTitle: "የዳናክል ጨው መጓጓዣ",
      description:
        "Celebration of the ancient salt trade in the Danakil Depression, featuring camel caravans and traditional salt mining demonstrations.",
      startDate: "Nov 20, 2026",
      endDate: "Nov 22, 2026",
      location: "Danakil Depression, Afar Region",
      region: "Afar",
      category: "Cultural",
      image: afarsalt,
      highlights: [
        "Camel Caravans",
        "Salt Mining",
        "Traditional Trade",
        "Cultural Demonstrations",
      ],
    },

    // ===== OROMIA REGION =====
    {
      id: 11,
      title: "Irreecha - Oromo Thanksgiving",
      amharicTitle: "ኢሬቻ",
      description:
        "The largest Oromo cultural festival, celebrating the end of the rainy season with colorful gatherings around lakes and rivers.",
      startDate: "Oct 5, 2026",
      endDate: "Oct 6, 2026",
      location: "Bishoftu, Oromia Region",
      region: "Oromia",
      category: "Cultural",
      image: irrecha,
      highlights: [
        "Massive Gatherings",
        "Traditional Music",
        "Dance Performances",
        "Thanksgiving",
        "Cultural Unity",
      ],
    },
    {
      id: 12,
      title: "Gada System Celebration",
      amharicTitle: "ጋዳ",
      description:
        "Celebration of the traditional Gada governance system of the Oromo people, recognized as UNESCO Intangible Cultural Heritage.",
      startDate: "Nov 15, 2026",
      endDate: "Nov 18, 2026",
      location: "Oromia Region",
      region: "Oromia",
      category: "Cultural",
      image: gadda,
      highlights: [
        "Traditional Governance",
        "Cultural Performances",
        "Community Gatherings",
        "UNESCO Heritage",
      ],
    },
    {
      id: 13,
      title: "Bale Mountains Trekking Festival",
      amharicTitle: "የባሌ ተራራ የእግር ጉዞ ፌስቲቫል",
      description:
        "Annual trekking festival in the Bale Mountains National Park, celebrating Ethiopia's unique Afro-alpine ecosystem and wildlife.",
      startDate: "Jun 5, 2026",
      endDate: "Jun 8, 2026",
      location: "Bale Mountains, Oromia",
      region: "Oromia",
      category: "Nature",
      image: balliemountain,
      highlights: [
        "Trekking",
        "Wildlife Viewing",
        "Nature Photography",
        "Eco-Tourism",
      ],
    },

    // ===== SOUTHERN REGION =====
    {
      id: 14,
      title: "Omo Valley Tribes Festival",
      amharicTitle: "የኦሞ ሸለቆ ጎሳዎች በዓል",
      description:
        "Cultural festival celebrating the diverse tribes of the Omo Valley, featuring traditional body painting, dances, and ceremonies.",
      startDate: "Mar 10, 2026",
      endDate: "Mar 12, 2026",
      location: "Omo Valley, Southern Ethiopia",
      region: "Southern",
      category: "Cultural",
      image: ommotribe,
      highlights: [
        "Body Painting",
        "Traditional Dances",
        "Tribal Ceremonies",
        "Cultural Performances",
      ],
    },
    {
      id: 15,
      title: "Mursi Cultural Festival",
      amharicTitle: "የሙርሲ ባህል ፌስቲቫል",
      description:
        "Celebration of the unique culture of the Mursi people, featuring traditional body painting, lip plates, and cultural performances.",
      startDate: "Apr 5, 2026",
      endDate: "Apr 7, 2026",
      location: "Omo Valley, Southern Ethiopia",
      region: "Southern",
      category: "Cultural",
      image: murssi,
      highlights: [
        "Body Painting",
        "Lip Plates",
        "Traditional Dances",
        "Tribal Traditions",
      ],
    },
    {
      id: 16,
      title: "Turmi Market Festival",
      amharicTitle: "የቱርሚ ገበያ በዓል",
      description:
        "Vibrant Saturday market festival where different tribes gather to trade, socialize, and celebrate their unique traditions.",
      startDate: "Nov 10, 2026",
      endDate: "Nov 12, 2026",
      location: "Turmi, Omo Valley",
      region: "Southern",
      category: "Cultural",
      image: turmimarket,
      highlights: [
        "Local Market",
        "Culture",
        "Traditional Crafts",
        "Community Gathering",
      ],
    },

    // ===== SIDAMA REGION =====
    {
      id: 17,
      title: "Fichee-Chambalaalla - Sidama New Year",
      amharicTitle: "ፊቼ-ቻምባላላ",
      description:
        "Traditional New Year celebration of the Sidama people, featuring cultural performances, traditional foods, and community gatherings. UNESCO Intangible Cultural Heritage.",
      startDate: "Dec 12, 2026",
      endDate: "Dec 13, 2026",
      location: "Sidama Region",
      region: "Sidama",
      category: "Cultural",
      image: fiche,
      highlights: [
        "Cultural Performances",
        "Traditional Foods",
        "Community Gatherings",
        "UNESCO Heritage",
      ],
    },

    // ===== HARARI REGION =====
    {
      id: 18,
      title: "Harar Hyena Feeding Festival",
      amharicTitle: "የሀረር ጅቦች መመገቢያ",
      description:
        "Unique cultural tradition in Harar where the local people feed wild hyenas, symbolizing the peaceful coexistence between humans and animals.",
      startDate: "Sep 2, 2026",
      endDate: "Sep 3, 2026",
      location: "Harar Jugol, Harari Region",
      region: "Harari",
      category: "Cultural",
      image: hararihyna,
      highlights: [
        "Hyena Feeding",
        "Cultural Traditions",
        "Night Experience",
        "UNESCO Site",
      ],
    },
    {
      id: 19,
      title: "Harar Old Town Festival",
      amharicTitle: "የሀረር አሮጌ ከተማ በዓል",
      description:
        "Celebration of the rich history and culture of Harar's ancient walled city, featuring traditional music, dances, and local cuisine.",
      startDate: "Oct 10, 2026",
      endDate: "Oct 12, 2026",
      location: "Harar, Harari Region",
      region: "Harari",
      category: "Cultural",
      image: hararcityfes,
      highlights: [
        "Historical Tours",
        "Traditional Music",
        "Local Cuisine",
        "Cultural Exhibitions",
      ],
    },

    // ===== MUSLIM FESTIVALS =====
    {
      id: 20,
      title: "Eid al-Fitr - End of Ramadan",
      amharicTitle: "የዒድ አልፈጥር",
      description:
        "Celebration marking the end of the holy month of Ramadan, featuring special prayers, festive meals, and community gatherings across Ethiopia.",
      startDate: "Mar 30, 2026",
      endDate: "Apr 1, 2026",
      location: "Nationwide (Especially Harar, Addis Ababa, Dire Dawa)",
      region: "Nationwide",
      category: "Muslim",
      image: eid,
      highlights: [
        "Special Prayers",
        "Festive Meals",
        "Community Gatherings",
        "Charity Giving",
      ],
    },
    {
      id: 21,
      title: "Eid al-Adha - Feast of Sacrifice",
      amharicTitle: "የዒድ አልአድሃ",
      description:
        "Islamic festival commemorating the willingness of Prophet Ibrahim to sacrifice his son, marked by prayers and the sacrifice of animals.",
      startDate: "Jun 6, 2026",
      endDate: "Jun 8, 2026",
      location: "Nationwide (Especially Harar, Addis Ababa, Dire Dawa)",
      region: "Nationwide",
      category: "Muslim",
      image: eida,
      highlights: [
        "Prayers",
        "Animal Sacrifice",
        "Festive Meals",
        "Community Gatherings",
      ],
    },
    {
      id: 22,
      title: "Mawlid - Birth of the Prophet Muhammad",
      amharicTitle: "መውሊድ",
      description:
        "Celebration of the birth of Prophet Muhammad, featuring religious sermons, poetry recitations, and community feasts.",
      startDate: "Sep 15, 2026",
      endDate: "Sep 16, 2026",
      location: "Nationwide (Especially Harar, Addis Ababa)",
      region: "Nationwide",
      category: "Muslim",
      image: mewlid,
      highlights: [
        "Religious Sermons",
        "Poetry Recitations",
        "Community Feasts",
        "Prayers",
      ],
    },
    {
      id: 23,
      title: "Ramadan - Holy Month",
      amharicTitle: "ረመዳን",
      description:
        "The holy month of fasting, prayer, and reflection observed by Muslims across Ethiopia, ending with the celebration of Eid al-Fitr.",
      startDate: "Feb 28, 2026",
      endDate: "Mar 29, 2026",
      location: "Nationwide",
      region: "Nationwide",
      category: "Muslim",
      image: remedan,
      highlights: [
        "Fasting",
        "Prayers",
        "Charity Giving",
        "Community Activities",
      ],
    },

    // ===== NATIONAL & OTHER FESTIVALS =====
    {
      id: 24,
      title: "Enkutatash - Ethiopian New Year",
      amharicTitle: "እንቁጣጣሽ",
      description:
        "Celebrate the Ethiopian New Year with traditional feasts, coffee ceremonies, and the blooming of yellow daisies across the country.",
      startDate: "Sep 11, 2026",
      endDate: "Sep 12, 2026",
      location: "Nationwide",
      region: "Nationwide",
      category: "Festival",
      image: enkutatash,
      highlights: [
        "New Year Celebrations",
        "Coffee Ceremony",
        "Traditional Feasts",
        "Yellow Daisies",
      ],
    },
    {
      id: 25,
      title: "Buhe - Transfiguration Celebration",
      amharicTitle: "ቡሄ",
      description:
        "Celebration of the Transfiguration of Jesus Christ, marked by traditional songs, bonfires, and festive meals.",
      startDate: "Aug 19, 2026",
      endDate: "Aug 19, 2026",
      location: "Nationwide",
      region: "Nationwide",
      category: "Religious",
      image: buhie1,
      highlights: [
        "Bonfires",
        "Traditional Songs",
        "Family Gatherings",
        "Festive Meals",
      ],
    },
    {
      id: 26,
      title: "Ledet - Ethiopian Easter",
      amharicTitle: "ልደት",
      description:
        "Celebration of the resurrection of Jesus Christ with overnight church services, festive meals, and traditional songs and dances.",
      startDate: "Apr 19, 2026",
      endDate: "Apr 20, 2026",
      location: "Nationwide",
      region: "Nationwide",
      category: "Religious",
      image: lidet,
      highlights: [
        "Overnight Services",
        "Festive Meals",
        "Traditional Music",
        "Family Gatherings",
      ],
    },
    {
      id: 27,
      title: "Ethiopian Victory Day - Battle of Adwa",
      amharicTitle: "የአድዋ ድል",
      description:
        "Commemoration of the Ethiopian victory at the Battle of Adwa in 1896, a significant event in African history marking the defeat of colonial forces.",
      startDate: "Mar 2, 2026",
      endDate: "Mar 2, 2026",
      location: "Nationwide",
      region: "Nationwide",
      category: "National",
      image: adwa,
      highlights: [
        "Parades",
        "Patriotic Songs",
        "Cultural Performances",
        "Historical Reenactments",
      ],
    },
    {
      id: 28,
      title: "Ethiopian Flag Day",
      amharicTitle: "የኢትዮጵያ ባንዲራ ቀን",
      description:
        "Celebration of the Ethiopian flag and national pride, featuring cultural events and performances across the country.",
      startDate: "Oct 11, 2026",
      endDate: "Oct 11, 2026",
      location: "Nationwide",
      region: "Nationwide",
      category: "National",
      image: flag,
      highlights: [
        "Flag Ceremonies",
        "Cultural Events",
        "Patriotic Celebrations",
        "Community Gatherings",
      ],
    },

    // ===== OTHER REGIONS =====
    {
      id: 29,
      title: "Assosa Cultural Festival",
      amharicTitle: "የአሶሳ ባህል ፌስቲቫል",
      description:
        "Celebration of the rich cultural heritage of the Benishangul-Gumuz region, featuring traditional dances, music, and cultural exhibitions.",
      startDate: "May 10, 2026",
      endDate: "May 12, 2026",
      location: "Assosa, Benishangul-Gumuz",
      region: "Benishangul-Gumuz",
      category: "Cultural",
      image: benishangul,
      highlights: [
        "Traditional Dances",
        "Music",
        "Cultural Exhibitions",
        "Community Gatherings",
      ],
    },
    {
      id: 30,
      title: "Gambela Cultural Festival",
      amharicTitle: "የጋምቤላ ባህል ፌስቲቫል",
      description:
        "Celebration of the diverse cultures of the Gambela region, featuring traditional music, dances, and the rich heritage of the Anyuak and Nuer people.",
      startDate: "Jun 20, 2026",
      endDate: "Jun 22, 2026",
      location: "Gambela Region",
      region: "Gambela",
      category: "Cultural",
      image: gambella,
      highlights: [
        "Traditional Dances",
        "Music",
        "Anyuak Heritage",
        "Nuer Heritage",
      ],
    },
    {
      id: 31,
      title: "Dire Dawa Cultural Festival",
      amharicTitle: "የድሬዳዋ ባህል ፌስቲቫል",
      description:
        "Celebration of the diverse cultures of Dire Dawa and the Somali region, featuring traditional music, dances, and cultural performances.",
      startDate: "Dec 5, 2026",
      endDate: "Dec 7, 2026",
      location: "Dire Dawa & Somali Region",
      region: "Dire Dawa",
      category: "Cultural",
      image: diredawa,
      highlights: [
        "Traditional Dances",
        "Music",
        "Cultural Performances",
        "Camel Racing",
      ],
    },
  ];

  // ============================================
  // CATEGORIES
  // ============================================
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Religious", label: "⛪ Religious" },
    { value: "Cultural", label: "🎭 Cultural" },
    { value: "Muslim", label: "🕌 Muslim" },
    { value: "Festival", label: "🎉 Festival" },
    { value: "National", label: "🇪🇹 National" },
    { value: "Nature", label: "🌿 Nature" },
  ];

  // ============================================
  // REGIONS
  // ============================================
  const regions = [
    { value: "all", label: "All Regions" },
    { value: "Nationwide", label: "🇪🇹 Nationwide" },
    { value: "Tigray", label: "🏛️ Tigray" },
    { value: "Amhara", label: "⛰️ Amhara" },
    { value: "Afar", label: "🌋 Afar" },
    { value: "Oromia", label: "🌿 Oromia" },
    { value: "Southern", label: "🎭 Southern" },
    { value: "Sidama", label: "🌺 Sidama" },
    { value: "Harari", label: "🕌 Harari" },
    { value: "Benishangul-Gumuz", label: "🌍 Benishangul-Gumuz" },
    { value: "Gambela", label: "🌴 Gambela" },
    { value: "Dire Dawa", label: "🌊 Dire Dawa" },
  ];

  // ============================================
  // GET CATEGORY COLOR
  // ============================================
  const getCategoryColor = (category) => {
    const colors = {
      Religious: "#7c3aed",
      Cultural: "#d97706",
      Muslim: "#059669",
      Festival: "#dc2626",
      National: "#1e3a5f",
      Nature: "#16a34a",
    };
    return colors[category] || "#6b7280";
  };

  // ============================================
  // GET REGION ICON
  // ============================================
  const getRegionIcon = (region) => {
    const icons = {
      Nationwide: "🇪🇹",
      Tigray: "🏛️",
      Amhara: "⛰️",
      Afar: "🌋",
      Oromia: "🌿",
      Southern: "🎭",
      Sidama: "🌺",
      Harari: "🕌",
      "Benishangul-Gumuz": "🌍",
      Gambela: "🌴",
      "Dire Dawa": "🌊",
    };
    return icons[region] || "📍";
  };

  // ============================================
  // OPEN/CLOSE MODAL
  // ============================================
  const openEventModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeEventModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    document.body.style.overflow = "unset";
  };

  // ============================================
  // FILTER LOGIC
  // ============================================
  useEffect(() => {
    setTimeout(() => {
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = events;

    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.amharicTitle.includes(searchTerm),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((event) => event.category === selectedCategory);
    }

    if (selectedRegion !== "all") {
      result = result.filter((event) => event.region === selectedRegion);
    }

    setFilteredEvents(result);
  }, [searchTerm, selectedCategory, selectedRegion, events]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedRegion("all");
  };

  return (
    <div className="events-page">
      {/* ===== HERO SECTION ===== */}
      <section className="events-hero">
        <div className="events-hero-content">
          <h1>🎪 Ethiopian Events & Festivals</h1>
          <p>
            Discover {eventsData.length} vibrant celebrations across all regions
            of Ethiopia
          </p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="events-filters">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search events..."
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="filter-select"
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="reset-filters" onClick={resetFilters}>
              ↺ Reset
            </button>
          </div>

          <div className="active-filters">
            {selectedCategory !== "all" && (
              <span className="active-filter">
                {categories.find((c) => c.value === selectedCategory)?.label}
                <button onClick={() => setSelectedCategory("all")}>✕</button>
              </span>
            )}
            {selectedRegion !== "all" && (
              <span className="active-filter">
                {regions.find((r) => r.value === selectedRegion)?.label}
                <button onClick={() => setSelectedRegion("all")}>✕</button>
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
              {loading ? "Loading..." : `${filteredEvents.length} events found`}
            </h3>
            {!loading && filteredEvents.length > 0 && (
              <span className="results-subtitle">
                Showing {filteredEvents.length} of {events.length} events
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== EVENTS GRID ===== */}
      <section className="section events-grid-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No events found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-badges">
                      <span
                        className="event-category"
                        style={{ background: getCategoryColor(event.category) }}
                      >
                        {event.category}
                      </span>
                      <span className="event-region">
                        {getRegionIcon(event.region)} {event.region}
                      </span>
                    </div>
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
                      {event.highlights.slice(0, 4).map((item, index) => (
                        <span key={index} className="highlight-tag">
                          ✨ {item}
                        </span>
                      ))}
                      {event.highlights.length > 4 && (
                        <span className="highlight-tag more">
                          +{event.highlights.length - 4}
                        </span>
                      )}
                    </div>

                    {/* ✅ FIXED: Learn More button opens modal */}
                    <button
                      className="event-btn"
                      onClick={() => openEventModal(event)}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* EVENT DETAIL MODAL */}
      {/* ============================================ */}
      {showModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={closeEventModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeEventModal}>
              ✕
            </button>

            <div className="modal-image">
              <img src={selectedEvent.image} alt={selectedEvent.title} />
              <div className="modal-badges">
                <span
                  className="modal-category"
                  style={{
                    background: getCategoryColor(selectedEvent.category),
                  }}
                >
                  {selectedEvent.category}
                </span>
                <span className="modal-region">
                  {getRegionIcon(selectedEvent.region)} {selectedEvent.region}
                </span>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedEvent.title}</h2>
                {selectedEvent.amharicTitle && (
                  <span className="modal-amharic">
                    {selectedEvent.amharicTitle}
                  </span>
                )}
              </div>

              <p className="modal-full-description">
                {selectedEvent.description}
              </p>

              <div className="modal-details">
                <div className="modal-detail-item">
                  <span className="modal-detail-icon">📅</span>
                  <div>
                    <span className="modal-detail-label">Start Date</span>
                    <span className="modal-detail-value">
                      {selectedEvent.startDate}
                    </span>
                  </div>
                </div>
                {selectedEvent.endDate &&
                  selectedEvent.endDate !== selectedEvent.startDate && (
                    <div className="modal-detail-item">
                      <span className="modal-detail-icon">📅</span>
                      <div>
                        <span className="modal-detail-label">End Date</span>
                        <span className="modal-detail-value">
                          {selectedEvent.endDate}
                        </span>
                      </div>
                    </div>
                  )}
                <div className="modal-detail-item">
                  <span className="modal-detail-icon">📍</span>
                  <div>
                    <span className="modal-detail-label">Location</span>
                    <span className="modal-detail-value">
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-highlights">
                <h4>✨ Event Highlights</h4>
                <div className="modal-highlights-list">
                  {selectedEvent.highlights.map((item, index) => (
                    <span key={index} className="modal-highlight-tag">
                      ✨ {item}
                    </span>
                  ))}
                </div>
              </div>

              <button className="modal-book-btn">Book Now</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== BACK TO HOME ===== */}
      <section className="events-back">
        <div className="container">
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Events;
