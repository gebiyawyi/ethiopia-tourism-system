import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Events.css";
import { useAuth } from "../../context/AuthContext";
import guragie from "../../assets/images/guragie.png";
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

// ============================================
// 📸 DESTINATION IMAGES
// ============================================
import lalibela from "../../assets/images/lalibela.png";
import semien1 from "../../assets/images/semien1.png";
import gondar from "../../assets/images/gondar.png";
import tana2 from "../../assets/images/tana2.png";
import BlueNilefalls from "../../assets/images/BlueNilefalls.png";
import axum from "../../assets/images/axum.png";
import rock from "../../assets/images/rock.png";
import debredamo from "../../assets/images/debredamo.png";
import denkele1 from "../../assets/images/denkele1.png";
import ertalie from "../../assets/images/ertalie.png";
import DallolSprings from "../../assets/images/DallolSprings.png";
import ommo1 from "../../assets/images/ommo1.png";
import Mago from "../../assets/images/Mago.png";
import harar from "../../assets/images/harar.png";
import bale from "../../assets/images/bale.png";
import SofOmar from "../../assets/images/SofOmar.png";
import LakeLangano from "../../assets/images/LakeLangano.png";
import NationalMuseum from "../../assets/images/NationalMuseum.png";
import MountEntoto from "../../assets/images/MountEntoto.png";
import Merkato from "../../assets/images/Merkato.png";
import ethiopiaMap from "../../assets/images/flag.png";

// ============================================
// 📸 FALLBACK IMAGES
// ============================================
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop";

// ============================================
// 📸 DESTINATION DATA
// ============================================
const destinationItems = [
  {
    id: "dest-0",
    title: "🌍 Ethiopia - The Land of Origins",
    type: "destination",
    region: "Nationwide",
    subRegion: "All Regions",
    description:
      "Ethiopia is a country of immense diversity and ancient history. Known as the 'Land of Origins', it is home to some of the oldest human fossils, ancient civilizations, and rich cultural heritage.",
    image: ethiopiaMap || FALLBACK_IMAGE,
    price: 0,
    rating: 4.9,
    reviews: 5000,
    attractions: [
      "Ancient History",
      "Cultural Diversity",
      "UNESCO Sites",
      "Unique Cuisine",
    ],
    bestTime: "Year-round",
  },
  {
    id: "dest-1",
    title: "Lalibela Rock Churches",
    type: "destination",
    region: "Amhara",
    subRegion: "North Wollo",
    description:
      "11 monolithic churches carved from rock in the 12th century, a UNESCO World Heritage Site",
    image: lalibela || FALLBACK_IMAGE,
    price: 1200,
    rating: 4.8,
    reviews: 1234,
    attractions: ["Rock Churches", "Ancient History", "Pilgrimage"],
    bestTime: "October to March",
  },
  {
    id: "dest-2",
    title: "Simien Mountains National Park",
    type: "destination",
    region: "Amhara",
    subRegion: "North Gondar",
    description:
      "Breathtaking landscapes with dramatic escarpments and unique wildlife including Gelada baboons",
    image: semien1 || FALLBACK_IMAGE,
    price: 1500,
    rating: 4.9,
    reviews: 987,
    attractions: ["Trekking", "Wildlife", "Scenic Views"],
    bestTime: "September to November",
  },
  {
    id: "dest-3",
    title: "Gondar Castles",
    type: "destination",
    region: "Amhara",
    subRegion: "Gondar",
    description:
      'The "Camelot of Africa" featuring medieval castles and royal palaces from the 17th century',
    image: gondar || FALLBACK_IMAGE,
    price: 800,
    rating: 4.6,
    reviews: 654,
    attractions: ["Castles", "Royal History", "Architecture"],
    bestTime: "October to April",
  },
  {
    id: "dest-4",
    title: "Lake Tana Monasteries",
    type: "destination",
    region: "Amhara",
    subRegion: "Bahir Dar",
    description:
      "Sacred lake with ancient island monasteries and churches dating back to the 14th century",
    image: tana2 || FALLBACK_IMAGE,
    price: 600,
    rating: 4.5,
    reviews: 543,
    attractions: ["Lake Tours", "Monasteries", "Bird Watching"],
    bestTime: "November to April",
  },
  {
    id: "dest-5",
    title: "Blue Nile Falls",
    type: "destination",
    region: "Amhara",
    subRegion: "Bahir Dar",
    description:
      'Spectacular waterfall known as "Tis Issat" - the Smoking Water',
    image: BlueNilefalls || FALLBACK_IMAGE,
    price: 400,
    rating: 4.4,
    reviews: 432,
    attractions: ["Waterfalls", "Hiking", "Photography"],
    bestTime: "June to September",
  },
  {
    id: "dest-6",
    title: "Axum Obelisks",
    type: "destination",
    region: "Tigray",
    subRegion: "Axum",
    description:
      "Ancient city with towering obelisks, royal tombs, and the legendary Ark of the Covenant",
    image: axum || FALLBACK_IMAGE,
    price: 900,
    rating: 4.6,
    reviews: 765,
    attractions: ["Ancient History", "Archaeology", "Obelisks"],
    bestTime: "October to April",
  },
  {
    id: "dest-7",
    title: "Tigray Rock-Hewn Churches",
    type: "destination",
    region: "Tigray",
    subRegion: "Gheralta",
    description:
      "Over 100 ancient rock-hewn churches scattered across the dramatic Tigray landscape",
    image: rock || FALLBACK_IMAGE,
    price: 700,
    rating: 4.7,
    reviews: 543,
    attractions: ["Rock Churches", "Climbing", "Ancient Art"],
    bestTime: "October to March",
  },
  {
    id: "dest-8",
    title: "Debre Damo Monastery",
    type: "destination",
    region: "Tigray",
    subRegion: "Adwa",
    description:
      "Ancient monastery perched on a mountain plateau, accessible only by climbing a rope",
    image: debredamo || FALLBACK_IMAGE,
    price: 500,
    rating: 4.3,
    reviews: 321,
    attractions: ["Monastery", "Climbing", "Religious History"],
    bestTime: "October to April",
  },
  {
    id: "dest-9",
    title: "Danakil Depression",
    type: "destination",
    region: "Afar",
    subRegion: "Afar Triangle",
    description:
      "One of the hottest places on Earth with colorful sulfur springs, salt flats, and active volcanoes",
    image: denkele1 || FALLBACK_IMAGE,
    price: 1800,
    rating: 5.0,
    reviews: 876,
    attractions: ["Volcanoes", "Salt Flats", "Extreme Adventure"],
    bestTime: "November to March",
  },
  {
    id: "dest-10",
    title: "Erta Ale Volcano",
    type: "destination",
    region: "Afar",
    subRegion: "Danakil",
    description:
      "Active shield volcano with one of the world's longest-standing lava lakes",
    image: ertalie || FALLBACK_IMAGE,
    price: 2000,
    rating: 4.9,
    reviews: 654,
    attractions: ["Volcano", "Lava Lake", "Night Trekking"],
    bestTime: "November to March",
  },
  {
    id: "dest-11",
    title: "Dallol Sulfur Springs",
    type: "destination",
    region: "Afar",
    subRegion: "Danakil",
    description:
      "Colorful hydrothermal field with yellow, green, and orange mineral deposits",
    image: DallolSprings || FALLBACK_IMAGE,
    price: 1600,
    rating: 4.8,
    reviews: 543,
    attractions: ["Sulfur Springs", "Photography", "Geothermal"],
    bestTime: "November to March",
  },
  {
    id: "dest-12",
    title: "Omo Valley Tribes",
    type: "destination",
    region: "Southern",
    subRegion: "Omo Valley",
    description:
      "Rich cultural heritage with indigenous tribes like the Hamer, Mursi, and Karo",
    image: ommo1 || FALLBACK_IMAGE,
    price: 1100,
    rating: 4.7,
    reviews: 765,
    attractions: [
      "Cultural Tours",
      "Tribal Villages",
      "Traditional Ceremonies",
    ],
    bestTime: "November to March",
  },
  {
    id: "dest-13",
    title: "Mago National Park",
    type: "destination",
    region: "Southern",
    subRegion: "Omo Valley",
    description:
      "National park home to the Mursi people and diverse wildlife including elephants and buffalos",
    image: Mago || FALLBACK_IMAGE,
    price: 800,
    rating: 4.4,
    reviews: 432,
    attractions: ["Wildlife Safari", "Mursi Tribe", "Bird Watching"],
    bestTime: "November to March",
  },
  {
    id: "dest-14",
    title: "Turmi Market",
    type: "destination",
    region: "Southern",
    subRegion: "Omo Valley",
    description:
      "Vibrant Saturday market where different tribes gather to trade and socialize",
    image: turmimarket || FALLBACK_IMAGE,
    price: 500,
    rating: 4.3,
    reviews: 321,
    attractions: ["Local Market", "Culture", "Traditional Crafts"],
    bestTime: "November to March",
  },
  {
    id: "dest-15",
    title: "Harar Jugol",
    type: "destination",
    region: "Harari",
    subRegion: "Harar",
    description:
      "Fortified historic town with unique culture, architecture, and the famous hyena feeding",
    image: harar || FALLBACK_IMAGE,
    price: 800,
    rating: 4.5,
    reviews: 654,
    attractions: ["Historic Walls", "Hyena Feeding", "Museums"],
    bestTime: "October to April",
  },
  {
    id: "dest-16",
    title: "Harar Old Town",
    type: "destination",
    region: "Harari",
    subRegion: "Harar",
    description:
      "Ancient walled city with 82 mosques and traditional Harari houses",
    image: hararcityfes || FALLBACK_IMAGE,
    price: 600,
    rating: 4.4,
    reviews: 432,
    attractions: ["Old City", "Mosques", "Traditional Houses"],
    bestTime: "October to April",
  },
  {
    id: "dest-17",
    title: "Bale Mountains National Park",
    type: "destination",
    region: "Oromia",
    subRegion: "Bale",
    description:
      "Home to the Ethiopian wolf and unique Afro-alpine ecosystem with stunning landscapes",
    image: bale || FALLBACK_IMAGE,
    price: 1000,
    rating: 4.7,
    reviews: 543,
    attractions: ["Wildlife", "Trekking", "Ethiopian Wolf"],
    bestTime: "October to April",
  },
  {
    id: "dest-18",
    title: "Sof Omar Caves",
    type: "destination",
    region: "Oromia",
    subRegion: "Bale",
    description:
      "One of the longest cave systems in Africa with underground rivers and limestone formations",
    image: SofOmar || FALLBACK_IMAGE,
    price: 700,
    rating: 4.3,
    reviews: 321,
    attractions: ["Cave Exploration", "Underground Rivers", "Rock Formations"],
    bestTime: "October to April",
  },
  {
    id: "dest-19",
    title: "Lake Langano",
    type: "destination",
    region: "Oromia",
    subRegion: "Rift Valley",
    description:
      "Beautiful lake in the Ethiopian Rift Valley perfect for swimming and bird watching",
    image: LakeLangano || FALLBACK_IMAGE,
    price: 500,
    rating: 4.2,
    reviews: 432,
    attractions: ["Swimming", "Bird Watching", "Relaxation"],
    bestTime: "November to April",
  },
  {
    id: "dest-20",
    title: "National Museum of Ethiopia",
    type: "destination",
    region: "Addis Ababa",
    subRegion: "Addis Ababa",
    description:
      'Home to the famous fossil "Lucy" and extensive collection of Ethiopian artifacts',
    image: NationalMuseum || FALLBACK_IMAGE,
    price: 300,
    rating: 4.6,
    reviews: 876,
    attractions: ["Museum", "Lucy Fossil", "History"],
    bestTime: "Year-round",
  },
  {
    id: "dest-21",
    title: "Mount Entoto",
    type: "destination",
    region: "Addis Ababa",
    subRegion: "Addis Ababa",
    description:
      "Highest peak near Addis Ababa with panoramic views and historic churches",
    image: MountEntoto || FALLBACK_IMAGE,
    price: 400,
    rating: 4.4,
    reviews: 654,
    attractions: ["Mountain Views", "Hiking", "Churches"],
    bestTime: "October to March",
  },
  {
    id: "dest-22",
    title: "Merkato Market",
    type: "destination",
    region: "Addis Ababa",
    subRegion: "Addis Ababa",
    description:
      "One of the largest open-air markets in Africa with everything from spices to crafts",
    image: Merkato || FALLBACK_IMAGE,
    price: 200,
    rating: 4.3,
    reviews: 543,
    attractions: ["Shopping", "Local Culture", "Spices"],
    bestTime: "Year-round",
  },
];

const eventsData = [
  {
    id: 1,
    title: "Timkat - Ethiopian Epiphany",
    amharicTitle: "ጥምቀት",
    type: "event",
    description:
      "One of the most colorful festivals in Ethiopia, celebrating the baptism of Jesus Christ.",
    startDate: "Jan 10",
    endDate: "Jan 11",
    location: "Gondar & Nationwide",
    region: "Amhara",
    category: "Religious",
    image: timiket || FALLBACK_IMAGE,
    highlights: [
      "Colorful Processions",
      "Church Ceremonies",
      "Water Blessing",
      "Traditional Music",
      "White Garments",
    ],
    relatedDestinations: [
      "Lalibela Rock Churches",
      "Simien Mountains National Park",
      "Gondar Castles",
      "Lake Tana Monasteries",
      "Blue Nile Falls",
    ],
  },
  {
    id: 2,
    title: "Ashenda - Celebration of Girls",
    amharicTitle: "አሸንዳ",
    type: "event",
    description:
      "A colorful cultural festival celebrating young women with music, dance, and traditional attire.",
    startDate: "Aug 16",
    endDate: "Aug 21",
    location: "Tigray & Amhara Regions",
    region: "Amhara",
    category: "Cultural",
    image: ashenda || FALLBACK_IMAGE,
    highlights: [
      "Traditional Dance",
      "Music",
      "Colorful Attire",
      "Community Celebration",
      "Girls Empowerment",
    ],
    relatedDestinations: [
      "Lalibela Rock Churches",
      "Simien Mountains National Park",
      "Gondar Castles",
    ],
  },
  {
    id: 3,
    title: "Lalibela Christmas - Genna",
    amharicTitle: "ገና",
    type: "event",
    description:
      "Celebration of the birth of Jesus Christ at the rock-hewn churches of Lalibela.",
    location: "Lalibela, Amhara Region",
    region: "Amhara",
    category: "Religious",
    image: chrismass || FALLBACK_IMAGE,
    highlights: [
      "Church Services",
      "Traditional Games",
      "Festive Meals",
      "White Garments",
      "Pilgrimage",
    ],
    relatedDestinations: ["Lalibela Rock Churches"],
  },
  {
    id: 4,
    title: "Agew Horse Festival",
    amharicTitle: "የአገው ፈረስ ጨዋታ",
    type: "event",
    description:
      "Traditional Agew horse racing and equestrian festival celebrating the rich cultural heritage.",
    startDate: "Jan 23",
    location: "Awi Zone, Amhara Region",
    region: "Amhara",
    category: "Cultural",
    image: agew || FALLBACK_IMAGE,
    highlights: [
      "Horse Racing",
      "Equestrian Skills",
      "Traditional Music",
      "Cultural Exhibitions",
      "Agew Heritage",
    ],
    relatedDestinations: [
      "Simien Mountains National Park",
      "Gondar Castles",
      "Lake Tana Monasteries",
    ],
  },
  {
    id: 5,
    title: "Lake Tana Monasteries Festival",
    amharicTitle: "የጣና ሃይቅ ገዳማት በዓል",
    type: "event",
    description:
      "Celebration at the ancient island monasteries of Lake Tana, featuring traditional prayers and boat processions.",
    location: "Lake Tana, Bahir Dar",
    region: "Amhara",
    category: "Religious",
    image: tanamonastery || FALLBACK_IMAGE,
    highlights: [
      "Boat Processions",
      "Monastery Ceremonies",
      "Traditional Music",
      "Prayers",
    ],
    relatedDestinations: ["Lake Tana Monasteries", "Blue Nile Falls"],
  },
  {
    id: 6,
    title: "Gish Abay Coffee Festival",
    amharicTitle: "የጊሽ አባይ ቡና ፌስቲቫል",
    type: "event",
    description:
      "Celebration of the birthplace of coffee in the Gish Abay area, featuring traditional coffee ceremonies.",
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
    relatedDestinations: [
      "Simien Mountains National Park",
      "Gondar Castles",
      "Lake Tana Monasteries",
    ],
  },
  {
    id: 7,
    title: "Meskel - Finding of the True Cross",
    amharicTitle: "መስቀል",
    type: "event",
    description:
      "A vibrant religious celebration with massive bonfires, colorful processions, and traditional music.",
    startDate: "Sep 17",
    location: "Gondar, Amhara & Nationwide",
    region: "Amhara",
    category: "Religious",
    image: meskel || FALLBACK_IMAGE,
    highlights: [
      "Massive Bonfires",
      "Colorful Processions",
      "Traditional Music",
      "Church Ceremonies",
      "Cross Decoration",
    ],
    relatedDestinations: [
      "Lalibela Rock Churches",
      "Simien Mountains National Park",
      "Gondar Castles",
      "Lake Tana Monasteries",
      "Blue Nile Falls",
    ],
  },
  {
    id: 8,
    title: "Ledet - Ethiopian Easter",
    amharicTitle: "ልደት",
    type: "event",
    description:
      "Celebration of the resurrection of Jesus Christ with overnight church services and festive meals.",
    startDate: "Dec 29",
    location: "Nationwide",
    region: "Amhara",
    category: "Religious",
    image: lidet || FALLBACK_IMAGE,
    highlights: [
      "Overnight Services",
      "Festive Meals",
      "Traditional Music",
      "Family Gatherings",
    ],
    relatedDestinations: [
      "Lalibela Rock Churches",
      "Lake Tana Monasteries",
      "Gondar Castles",
    ],
  },

  // ===== TIGRAY REGION EVENTS =====
  {
    id: 9,
    title: "Timkat - Ethiopian Epiphany (Tigray)",
    amharicTitle: "ጥምቀት",
    type: "event",
    description:
      "One of the most colorful festivals in Ethiopia, celebrating the baptism of Jesus Christ.",
    startDate: "Jan 10",
    endDate: "Jan 11",
    location: "Axum, Tigray & Nationwide",
    region: "Tigray",
    category: "Religious",
    image: timiket || FALLBACK_IMAGE,
    highlights: [
      "Colorful Processions",
      "Church Ceremonies",
      "Water Blessing",
      "Traditional Music",
      "White Garments",
    ],
    relatedDestinations: [
      "Axum Obelisks",
      "Tigray Rock-Hewn Churches",
      "Debre Damo Monastery",
    ],
  },
  {
    id: 10,
    title: "Ashenda - Celebration of Girls (Tigray)",
    amharicTitle: "አሸንዳ",
    type: "event",
    description:
      "A colorful cultural festival celebrating young women with music, dance, and traditional attire.",
    startDate: "Aug 16",
    endDate: "Aug 21",
    location: "Tigray Region",
    region: "Tigray",
    category: "Cultural",
    image: ashenda || FALLBACK_IMAGE,
    highlights: [
      "Traditional Dance",
      "Music",
      "Colorful Attire",
      "Community Celebration",
      "Girls Empowerment",
    ],
    relatedDestinations: [
      "Axum Obelisks",
      "Tigray Rock-Hewn Churches",
      "Debre Damo Monastery",
    ],
  },
  {
    id: 11,
    title: "Hidar Tsion - Feast of St. Mary of Zion",
    amharicTitle: "ሕዳር ጽዮን",
    type: "event",
    description:
      "Celebration of the Virgin Mary at the Church of Our Lady Mary of Zion in Axum.",
    startDate: "Nov 21",
    location: "Axum, Tigray Region",
    region: "Tigray",
    category: "Religious",
    image: hidar || FALLBACK_IMAGE,
    highlights: [
      "Church Ceremonies",
      "Pilgrimage",
      "Traditional Music",
      "Cultural Performances",
    ],
    relatedDestinations: ["Axum Obelisks", "Tigray Rock-Hewn Churches"],
  },
  {
    id: 12,
    title: "Adwa Victory Day",
    amharicTitle: "የአድዋ ድል",
    type: "event",
    description:
      "Commemoration of the Ethiopian victory at the Battle of Adwa in 1896.",
    startDate: "Feb 23",
    location: "Adwa, Tigray & Nationwide",
    region: "Tigray",
    category: "National",
    image: adwa || FALLBACK_IMAGE,
    highlights: [
      "Parades",
      "Patriotic Songs",
      "Cultural Performances",
      "Historical Reenactments",
    ],
    relatedDestinations: [
      "Axum Obelisks",
      "Tigray Rock-Hewn Churches",
      "Debre Damo Monastery",
    ],
  },

  // ===== AFAR REGION EVENTS =====
  {
    id: 13,
    title: "Kulle - Afar Cultural Festival",
    amharicTitle: "ኩሌ",
    type: "event",
    description:
      "Traditional Afar cultural festival featuring camel racing, traditional dances, and nomadic heritage.",
    location: "Afar Region",
    region: "Afar",
    category: "Cultural",
    image: afar || FALLBACK_IMAGE,
    highlights: [
      "Camel Racing",
      "Traditional Dances",
      "Nomadic Heritage",
      "Cultural Exhibitions",
      "Traditional Foods",
    ],
    relatedDestinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol Sulfur Springs",
    ],
  },
  {
    id: 14,
    title: "Danakil Salt Caravan Festival",
    amharicTitle: "የዳናክል ጨው መጓጓዣ",
    type: "event",
    description:
      "Celebration of the ancient salt trade in the Danakil Depression, featuring camel caravans.",
    location: "Danakil Depression, Afar Region",
    region: "Afar",
    category: "Cultural",
    image: afarsalt || FALLBACK_IMAGE,
    highlights: [
      "Camel Caravans",
      "Salt Mining",
      "Traditional Trade",
      "Cultural Demonstrations",
    ],
    relatedDestinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol Sulfur Springs",
    ],
  },
  {
    id: 15,
    title: "Eid al-Adha - Feast of Sacrifice",
    amharicTitle: "የዒድ አልአድሃ",
    type: "event",
    description:
      "Islamic festival commemorating the willingness of Prophet Ibrahim to sacrifice his son.",
    location: "Nationwide (Especially Harar, Addis Ababa, Dire Dawa)",
    region: "Afar",
    category: "Muslim",
    image: eida || FALLBACK_IMAGE,
    highlights: [
      "Prayers",
      "Animal Sacrifice",
      "Festive Meals",
      "Community Gatherings",
    ],
    relatedDestinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol Sulfur Springs",
    ],
  },
  {
    id: 16,
    title: "Eid al-Fitr - End of Ramadan",
    amharicTitle: "የዒድ አልፈጥር",
    type: "event",
    description:
      "Celebration marking the end of the holy month of Ramadan, featuring special prayers and festive meals.",
    location: "Nationwide (Especially Harar, Addis Ababa, Dire Dawa)",
    region: "Afar",
    category: "Muslim",
    image: eid || FALLBACK_IMAGE,
    highlights: [
      "Special Prayers",
      "Festive Meals",
      "Community Gatherings",
      "Charity Giving",
    ],
    relatedDestinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol Sulfur Springs",
    ],
  },
  {
    id: 17,
    title: "Ramadan - Holy Month",
    amharicTitle: "ረመዳን",
    type: "event",
    description:
      "The holy month of fasting, prayer, and reflection observed by Muslims across Ethiopia.",
    location: "Nationwide",
    region: "Afar",
    category: "Muslim",
    image: remedan || FALLBACK_IMAGE,
    highlights: [
      "Fasting",
      "Prayers",
      "Charity Giving",
      "Community Activities",
    ],
    relatedDestinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol Sulfur Springs",
    ],
  },
  {
    id: 18,
    title: "Mawlid - Birth of the Prophet Muhammad",
    amharicTitle: "መውሊድ",
    type: "event",
    description:
      "Celebration of the birth of Prophet Muhammad, featuring religious sermons and community feasts.",
    location: "Nationwide (Especially Harar, Addis Ababa)",
    region: "Afar",
    category: "Muslim",
    image: mewlid || FALLBACK_IMAGE,
    highlights: [
      "Religious Sermons",
      "Poetry Recitations",
      "Community Feasts",
      "Prayers",
    ],
    relatedDestinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol Sulfur Springs",
    ],
  },

  // ===== OROMIA REGION EVENTS =====
  {
    id: 19,
    title: "Irreecha - Oromo Thanksgiving",
    amharicTitle: "ኢሬቻ",
    type: "event",
    description:
      "The largest Oromo cultural festival, celebrating the end of the rainy season with colorful gatherings around lakes and rivers.",
    location: "Bishoftu, Oromia Region",
    region: "Oromia",
    category: "Cultural",
    image: irrecha || FALLBACK_IMAGE,
    highlights: [
      "Massive Gatherings",
      "Traditional Music",
      "Dance Performances",
      "Thanksgiving",
      "Cultural Unity",
    ],
    relatedDestinations: [
      "Bale Mountains National Park",
      "Sof Omar Caves",
      "Lake Langano",
    ],
  },
  {
    id: 20,
    title: "Gada System Celebration",
    amharicTitle: "ጋዳ",
    type: "event",
    description:
      "Celebration of the traditional Gada governance system of the Oromo people, recognized as UNESCO Intangible Cultural Heritage.",
    location: "Oromia Region",
    region: "Oromia",
    category: "Cultural",
    image: gadda || FALLBACK_IMAGE,
    highlights: [
      "Traditional Governance",
      "Cultural Performances",
      "Community Gatherings",
      "UNESCO Heritage",
    ],
    relatedDestinations: [
      "Bale Mountains National Park",
      "Sof Omar Caves",
      "Lake Langano",
    ],
  },
  {
    id: 21,
    title: "Bale Mountains Trekking Festival",
    amharicTitle: "የባሌ ተራራ የእግር ጉዞ ፌስቲቫል",
    type: "event",
    description:
      "Annual trekking festival in the Bale Mountains National Park, celebrating Ethiopia's unique Afro-alpine ecosystem.",
    location: "Bale Mountains, Oromia",
    region: "Oromia",
    category: "Nature",
    image: balliemountain || FALLBACK_IMAGE,
    highlights: [
      "Trekking",
      "Wildlife Viewing",
      "Nature Photography",
      "Eco-Tourism",
    ],
    relatedDestinations: ["Bale Mountains National Park"],
  },

  // ===== SOUTHERN REGION EVENTS =====
  {
    id: 22,
    title: "Omo Valley Tribes Festival",
    amharicTitle: "የኦሞ ሸለቆ ጎሳዎች በዓል",
    type: "event",
    description:
      "Cultural festival celebrating the diverse tribes of the Omo Valley, featuring traditional body painting, dances, and ceremonies.",
    location: "Omo Valley, Southern Ethiopia",
    region: "Southern",
    category: "Cultural",
    image: ommotribe || FALLBACK_IMAGE,
    highlights: [
      "Body Painting",
      "Traditional Dances",
      "Tribal Ceremonies",
      "Cultural Performances",
    ],
    relatedDestinations: [
      "Omo Valley Tribes",
      "Mago National Park",
      "Turmi Market",
    ],
  },
  {
    id: 23,
    title: "Mursi Cultural Festival",
    amharicTitle: "የሙርሲ ባህል ፌስቲቫል",
    type: "event",
    description:
      "Celebration of the unique culture of the Mursi people, featuring traditional body painting, lip plates, and cultural performances.",
    location: "Omo Valley, Southern Ethiopia",
    region: "Southern",
    category: "Cultural",
    image: murssi || FALLBACK_IMAGE,
    highlights: [
      "Body Painting",
      "Lip Plates",
      "Traditional Dances",
      "Tribal Traditions",
    ],
    relatedDestinations: ["Omo Valley Tribes", "Mago National Park"],
  },
  {
    id: 24,
    title: "Turmi Market Festival",
    amharicTitle: "የቱርሚ ገበያ በዓል",
    type: "event",
    description:
      "Vibrant Saturday market festival where different tribes gather to trade, socialize, and celebrate their unique traditions.",
    location: "Turmi, Omo Valley",
    region: "Southern",
    category: "Cultural",
    image: turmimarket || FALLBACK_IMAGE,
    highlights: [
      "Local Market",
      "Culture",
      "Traditional Crafts",
      "Community Gathering",
    ],
    relatedDestinations: ["Omo Valley Tribes", "Turmi Market"],
  },
  {
    id: 25,
    title: "Fichee-Chambalaalla - Sidama New Year",
    amharicTitle: "ፊቼ-ቻምባላላ",
    type: "event",
    description:
      "Traditional New Year celebration of the Sidama people, featuring cultural performances, traditional foods, and community gatherings.",
    location: "Sidama Region",
    region: "Southern",
    category: "Cultural",
    image: fiche || FALLBACK_IMAGE,
    highlights: [
      "Cultural Performances",
      "Traditional Foods",
      "Community Gatherings",
      "UNESCO Heritage",
    ],
    relatedDestinations: [
      "Omo Valley Tribes",
      "Mago National Park",
      "Turmi Market",
    ],
  },
  {
    id: 26,
    title: "Meskel - Finding of the True Cross (Gurage)",
    amharicTitle: "መስቀል",
    type: "event",
    description:
      "Vibrant celebration in the Gurage Zone with massive bonfires, colorful processions, and traditional music.",
    location: "Gurage Zone, Southern Ethiopia",
    region: "Southern",
    category: "Religious",
    image: guragie || FALLBACK_IMAGE,
    highlights: [
      "Massive Bonfires",
      "Colorful Processions",
      "Traditional Music",
      "Church Ceremonies",
      "Cross Decoration",
    ],
    relatedDestinations: [
      "Omo Valley Tribes",
      "Mago National Park",
      "Turmi Market",
    ],
  },

  // ===== HARARI REGION EVENTS =====
  {
    id: 27,
    title: "Harar Hyena Feeding Festival",
    amharicTitle: "የሀረር ጅቦች መመገቢያ",
    type: "event",
    description:
      "Unique cultural tradition in Harar where the local people feed wild hyenas, symbolizing peaceful coexistence.",
    location: "Harar Jugol, Harari Region",
    region: "Harari",
    category: "Cultural",
    image: hararihyna || FALLBACK_IMAGE,
    highlights: [
      "Hyena Feeding",
      "Cultural Traditions",
      "Night Experience",
      "UNESCO Site",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },
  {
    id: 28,
    title: "Harar Old Town Festival",
    amharicTitle: "የሀረር አሮጌ ከተማ በዓል",
    type: "event",
    description:
      "Celebration of the rich history and culture of Harar's ancient walled city.",
    location: "Harar, Harari Region",
    region: "Harari",
    category: "Cultural",
    image: hararcityfes || FALLBACK_IMAGE,
    highlights: [
      "Historical Tours",
      "Traditional Music",
      "Local Cuisine",
      "Cultural Exhibitions",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },
  {
    id: 29,
    title: "Dire Dawa Cultural Festival",
    amharicTitle: "የድሬዳዋ ባህል ፌስቲቫል",
    type: "event",
    description:
      "Celebration of the diverse cultures of Dire Dawa and the Somali region.",
    location: "Dire Dawa & Somali Region",
    region: "Dire Dawa",
    category: "Cultural",
    image: diredawa || FALLBACK_IMAGE,
    highlights: [
      "Traditional Dances",
      "Music",
      "Cultural Performances",
      "Camel Racing",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },
  {
    id: 30,
    title: "Eid al-Adha - Feast of Sacrifice (Harar)",
    amharicTitle: "የዒድ አልአድሃ",
    type: "event",
    description:
      "Islamic festival commemorating the willingness of Prophet Ibrahim to sacrifice his son.",
    location: "Nationwide (Especially Harar, Addis Ababa, Dire Dawa)",
    region: "Harari",
    category: "Muslim",
    image: eida || FALLBACK_IMAGE,
    highlights: [
      "Prayers",
      "Animal Sacrifice",
      "Festive Meals",
      "Community Gatherings",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },
  {
    id: 31,
    title: "Eid al-Fitr - End of Ramadan (Harar)",
    amharicTitle: "የዒድ አልፈጥር",
    type: "event",
    description:
      "Celebration marking the end of the holy month of Ramadan, featuring special prayers and festive meals.",
    location: "Nationwide (Especially Harar, Addis Ababa, Dire Dawa)",
    region: "Harari",
    category: "Muslim",
    image: eid || FALLBACK_IMAGE,
    highlights: [
      "Special Prayers",
      "Festive Meals",
      "Community Gatherings",
      "Charity Giving",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },
  {
    id: 32,
    title: "Ramadan - Holy Month (Harar)",
    amharicTitle: "ረመዳን",
    type: "event",
    description:
      "The holy month of fasting, prayer, and reflection observed by Muslims.",
    location: "Nationwide",
    region: "Harari",
    category: "Muslim",
    image: remedan || FALLBACK_IMAGE,
    highlights: [
      "Fasting",
      "Prayers",
      "Charity Giving",
      "Community Activities",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },
  {
    id: 33,
    title: "Mawlid - Birth of the Prophet Muhammad (Harar)",
    amharicTitle: "መውሊድ",
    type: "event",
    description:
      "Celebration of the birth of Prophet Muhammad, featuring religious sermons and community feasts.",
    location: "Nationwide (Especially Harar, Addis Ababa)",
    region: "Harari",
    category: "Muslim",
    image: mewlid || FALLBACK_IMAGE,
    highlights: [
      "Religious Sermons",
      "Poetry Recitations",
      "Community Feasts",
      "Prayers",
    ],
    relatedDestinations: ["Harar Jugol", "Harar Old Town"],
  },

  // ===== ADDIS ABABA REGION EVENTS =====
  {
    id: 34,
    title: "Meskel - Finding of the True Cross (Addis)",
    amharicTitle: "መስቀል",
    type: "event",
    description:
      "A vibrant religious celebration with massive bonfires, colorful processions, and traditional music in Addis Ababa's Meskel Square.",
    location: "Meskel Square, Addis Ababa",
    region: "Addis Ababa",
    category: "Religious",
    image: meskel || FALLBACK_IMAGE,
    highlights: [
      "Massive Bonfires",
      "Colorful Processions",
      "Traditional Music",
      "Church Ceremonies",
      "Cross Decoration",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 35,
    title: "Enkutatash - Ethiopian New Year",
    amharicTitle: "እንቁጣጣሽ",
    type: "event",
    description:
      "Celebrate the Ethiopian New Year with traditional feasts, coffee ceremonies, and the blooming of yellow daisies.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Festival",
    image: enkutatash || FALLBACK_IMAGE,
    highlights: [
      "New Year Celebrations",
      "Coffee Ceremony",
      "Traditional Feasts",
      "Yellow Daisies",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 36,
    title: "Adwa Victory Day (Addis)",
    amharicTitle: "የአድዋ ድል",
    type: "event",
    description:
      "Commemoration of the Ethiopian victory at the Battle of Adwa in 1896, celebrated with parades and ceremonies.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "National",
    image: adwa || FALLBACK_IMAGE,
    highlights: [
      "Parades",
      "Patriotic Songs",
      "Cultural Performances",
      "Historical Reenactments",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 37,
    title: "Ethiopian Flag Day",
    amharicTitle: "የኢትዮጵያ ባንዲራ ቀን",
    type: "event",
    description:
      "Celebration of the Ethiopian flag and national pride, featuring cultural events and performances.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "National",
    image: flag || FALLBACK_IMAGE,
    highlights: [
      "Flag Ceremonies",
      "Cultural Events",
      "Patriotic Celebrations",
      "Community Gatherings",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 38,
    title: "Buhe - Transfiguration Celebration",
    amharicTitle: "ቡሄ",
    type: "event",
    description:
      "Celebration of the Transfiguration of Jesus Christ, marked by traditional songs, bonfires, and festive meals.",
    startDate: "Aug 13",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Religious",
    image: buhie1 || FALLBACK_IMAGE,
    highlights: [
      "Bonfires",
      "Traditional Songs",
      "Family Gatherings",
      "Festive Meals",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 39,
    title: "Timkat - Ethiopian Epiphany (Addis)",
    amharicTitle: "ጥምቀት",
    type: "event",
    description:
      "One of the most colorful festivals in Ethiopia, celebrating the baptism of Jesus Christ with processions and ceremonies.",
    startDate: "Jan 10",
    endDate: "Jan 11",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Religious",
    image: timiket || FALLBACK_IMAGE,
    highlights: [
      "Colorful Processions",
      "Church Ceremonies",
      "Water Blessing",
      "Traditional Music",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 40,
    title: "Ledet - Ethiopian Easter (Addis)",
    amharicTitle: "ልደት",
    type: "event",
    description:
      "Celebration of the resurrection of Jesus Christ with overnight church services and festive meals.",
    startDate: "Dec 29",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Religious",
    image: lidet || FALLBACK_IMAGE,
    highlights: [
      "Overnight Services",
      "Festive Meals",
      "Traditional Music",
      "Family Gatherings",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 41,
    title: "Eid al-Adha - Feast of Sacrifice (Addis)",
    amharicTitle: "የዒድ አልአድሃ",
    type: "event",
    description:
      "Islamic festival commemorating the willingness of Prophet Ibrahim to sacrifice his son.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Muslim",
    image: eida || FALLBACK_IMAGE,
    highlights: [
      "Prayers",
      "Animal Sacrifice",
      "Festive Meals",
      "Community Gatherings",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 42,
    title: "Eid al-Fitr - End of Ramadan (Addis)",
    amharicTitle: "የዒድ አልፈጥር",
    type: "event",
    description:
      "Celebration marking the end of the holy month of Ramadan, featuring special prayers and festive meals.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Muslim",
    image: eid || FALLBACK_IMAGE,
    highlights: [
      "Special Prayers",
      "Festive Meals",
      "Community Gatherings",
      "Charity Giving",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 43,
    title: "Ramadan - Holy Month (Addis)",
    amharicTitle: "ረመዳን",
    type: "event",
    description:
      "The holy month of fasting, prayer, and reflection observed by Muslims.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Muslim",
    image: remedan || FALLBACK_IMAGE,
    highlights: [
      "Fasting",
      "Prayers",
      "Charity Giving",
      "Community Activities",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },
  {
    id: 44,
    title: "Mawlid - Birth of the Prophet Muhammad (Addis)",
    amharicTitle: "መውሊድ",
    type: "event",
    description:
      "Celebration of the birth of Prophet Muhammad, featuring religious sermons and community feasts.",
    location: "Addis Ababa & Nationwide",
    region: "Addis Ababa",
    category: "Muslim",
    image: mewlid || FALLBACK_IMAGE,
    highlights: [
      "Religious Sermons",
      "Poetry Recitations",
      "Community Feasts",
      "Prayers",
    ],
    relatedDestinations: [
      "National Museum of Ethiopia",
      "Mount Entoto",
      "Merkato Market",
    ],
  },

  // ===== ETHIOPIA - LAND OF ORIGINS (All Major Events) =====
  {
    id: 45,
    title: "Ethiopian Flag Day (National)",
    amharicTitle: "የኢትዮጵያ ባንዲራ ቀን",
    type: "event",
    description:
      "Celebration of the Ethiopian flag and national pride across the entire country.",
    location: "Nationwide",
    region: "Nationwide",
    category: "National",
    image: flag || FALLBACK_IMAGE,
    highlights: [
      "Flag Ceremonies",
      "Cultural Events",
      "Patriotic Celebrations",
      "Community Gatherings",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 46,
    title: "Adwa Victory Day (National)",
    amharicTitle: "የአድዋ ድል",
    type: "event",
    description:
      "Commemoration of the Ethiopian victory at the Battle of Adwa in 1896.",
    startDate: "Feb 23",
    location: "Nationwide",
    region: "Nationwide",
    category: "National",
    image: adwa || FALLBACK_IMAGE,
    highlights: [
      "Parades",
      "Patriotic Songs",
      "Cultural Performances",
      "Historical Reenactments",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 47,
    title: "Enkutatash - Ethiopian New Year (National)",
    amharicTitle: "እንቁጣጣሽ",
    type: "event",
    description:
      "Celebrate the Ethiopian New Year across the entire country with traditional feasts and coffee ceremonies.",
    location: "Nationwide",
    region: "Nationwide",
    category: "Festival",
    image: enkutatash || FALLBACK_IMAGE,
    highlights: [
      "New Year Celebrations",
      "Coffee Ceremony",
      "Traditional Feasts",
      "Yellow Daisies",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 48,
    title: "Meskel - Finding of the True Cross (National)",
    amharicTitle: "መስቀል",
    type: "event",
    description:
      "A vibrant religious celebration across Ethiopia commemorating the discovery of the True Cross.",
    startDate: "Sep 17",
    location: "Nationwide",
    region: "Nationwide",
    category: "Religious",
    image: meskel || FALLBACK_IMAGE,
    highlights: [
      "Massive Bonfires",
      "Colorful Processions",
      "Traditional Music",
      "Church Ceremonies",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 49,
    title: "Timkat - Ethiopian Epiphany (National)",
    amharicTitle: "ጥምቀት",
    type: "event",
    description:
      "One of the most colorful festivals in Ethiopia, celebrating the baptism of Jesus Christ.",
    startDate: "Jan 10",
    endDate: "Jan 11",
    location: "Nationwide",
    region: "Nationwide",
    category: "Religious",
    image: timiket || FALLBACK_IMAGE,
    highlights: [
      "Colorful Processions",
      "Church Ceremonies",
      "Water Blessing",
      "Traditional Music",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 50,
    title: "Buhe - Transfiguration Celebration (National)",
    amharicTitle: "ቡሄ",
    type: "event",
    description:
      "Celebration of the Transfiguration of Jesus Christ across Ethiopia.",
    startDate: "Aug 13",
    location: "Nationwide",
    region: "Nationwide",
    category: "Religious",
    image: buhie1 || FALLBACK_IMAGE,
    highlights: [
      "Bonfires",
      "Traditional Songs",
      "Family Gatherings",
      "Festive Meals",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 51,
    title: "Ledet - Ethiopian Easter (National)",
    amharicTitle: "ልደት",
    type: "event",
    description:
      "Celebration of the resurrection of Jesus Christ across Ethiopia.",
    startDate: "Dec 29",
    location: "Nationwide",
    region: "Nationwide",
    category: "Religious",
    image: lidet || FALLBACK_IMAGE,
    highlights: [
      "Overnight Services",
      "Festive Meals",
      "Traditional Music",
      "Family Gatherings",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 52,
    title: "Eid al-Adha - Feast of Sacrifice (National)",
    amharicTitle: "የዒድ አልአድሃ",
    type: "event",
    description:
      "Islamic festival commemorating the willingness of Prophet Ibrahim to sacrifice his son.",
    location: "Nationwide",
    region: "Nationwide",
    category: "Muslim",
    image: eida || FALLBACK_IMAGE,
    highlights: [
      "Prayers",
      "Animal Sacrifice",
      "Festive Meals",
      "Community Gatherings",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 53,
    title: "Eid al-Fitr - End of Ramadan (National)",
    amharicTitle: "የዒድ አልፈጥር",
    type: "event",
    description: "Celebration marking the end of the holy month of Ramadan.",
    location: "Nationwide",
    region: "Nationwide",
    category: "Muslim",
    image: eid || FALLBACK_IMAGE,
    highlights: [
      "Special Prayers",
      "Festive Meals",
      "Community Gatherings",
      "Charity Giving",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 54,
    title: "Ramadan - Holy Month (National)",
    amharicTitle: "ረመዳን",
    type: "event",
    description:
      "The holy month of fasting, prayer, and reflection observed by Muslims across Ethiopia.",
    location: "Nationwide",
    region: "Nationwide",
    category: "Muslim",
    image: remedan || FALLBACK_IMAGE,
    highlights: [
      "Fasting",
      "Prayers",
      "Charity Giving",
      "Community Activities",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
  {
    id: 55,
    title: "Mawlid - Birth of the Prophet Muhammad (National)",
    amharicTitle: "መውሊድ",
    type: "event",
    description:
      "Celebration of the birth of Prophet Muhammad, featuring religious sermons and community feasts.",
    location: "Nationwide",
    region: "Nationwide",
    category: "Muslim",
    image: mewlid || FALLBACK_IMAGE,
    highlights: [
      "Religious Sermons",
      "Poetry Recitations",
      "Community Feasts",
      "Prayers",
    ],
    relatedDestinations: ["Ethiopia - The Land of Origins"],
  },
];

// ============================================
// COMPONENT
// ============================================
const Events = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // ============================================
  // GET DESTINATION FROM URL QUERY PARAM
  // ============================================
  const getDestinationFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("destination");
  };

  const destinationName = getDestinationFromUrl();

  // ============================================
  // COMBINE DESTINATIONS + EVENTS
  // ============================================
  useEffect(() => {
    setTimeout(() => {
      let combined = [];

      if (destinationName) {
        const matchedDest = destinationItems.find(
          (dest) => dest.title.toLowerCase() === destinationName.toLowerCase(),
        );
        if (matchedDest) {
          combined.push(matchedDest);
        }

        const relatedEvents = eventsData.filter((event) =>
          event.relatedDestinations.some((dest) =>
            dest.toLowerCase().includes(destinationName.toLowerCase()),
          ),
        );
        combined = [...combined, ...relatedEvents];
      } else {
        combined = [...destinationItems, ...eventsData];
      }

      setItems(combined);
      setFilteredItems(combined);
      setLoading(false);
    }, 500);
  }, [destinationName]);

  useEffect(() => {
    let result = items;

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.region.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((item) => {
        if (item.type === "destination") {
          return selectedCategory === "destination";
        }
        return item.category === selectedCategory;
      });
    }

    if (selectedRegion !== "all") {
      result = result.filter((item) => item.region === selectedRegion);
    }

    setFilteredItems(result);
  }, [searchTerm, selectedCategory, selectedRegion, items]);

  const categories = [
    { value: "all", label: "All Items" },
    { value: "destination", label: " Destinations" },
    { value: "Religious", label: " Religious" },
    { value: "Cultural", label: " Cultural" },
    { value: "Muslim", label: " Muslim" },
    { value: "Festival", label: " Festival" },
    { value: "National", label: "🇪🇹 National" },
    { value: "Nature", label: " Nature" },
  ];

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "Nationwide", label: "🇪🇹 Nationwide" },
    { value: "Amhara", label: " Amhara" },
    { value: "Tigray", label: " Tigray" },
    { value: "Afar", label: " Afar" },
    { value: "Oromia", label: " Oromia" },
    { value: "Southern", label: " Southern" },
    { value: "Sidama", label: " Sidama" },
    { value: "Harari", label: " Harari" },
    { value: "Addis Ababa", label: " Addis Ababa" },
    { value: "Dire Dawa", label: " Dire Dawa" },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      destination: "#1e3a5f",
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
      Tigray: "",
      Amhara: "",
      Afar: "",
      Oromia: "",
      Southern: "",
      Sidama: "",
      Harari: "",
      "Addis Ababa": "",
      "Dire Dawa": "",
    };
    return icons[region] || "";
  };

  const toggleSelectItem = (itemId) => {
    if (!isLoggedIn) {
      alert(" Please sign in or register to select items for your trip!");
      navigate("/login?return=/events" + location.search);
      return;
    }

    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const openItemModal = (item) => {
    if (!isLoggedIn) {
      alert(" Please sign in or register to view item details!");
      navigate("/login?return=/events" + location.search);
      return;
    }
    setSelectedItem(item);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeItemModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedRegion("all");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedItems.length > 0) {
      if (!isLoggedIn) {
        alert(" Please sign in or register to continue!");
        navigate("/login?return=/events" + location.search);
        return;
      }
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      navigate("/transport");
    }
  };

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="events-hero-content">
          <h1> Plan Your Trip</h1>
          <p>
            {destinationName
              ? `Items for ${destinationName}`
              : `Select destinations and events for your journey`}
          </p>
        </div>
      </section>
      <div className="back-button-container">
        <div className="container">
          <button className="back-btn" onClick={handleBack}>
            ← Back to Destinations
          </button>
        </div>
      </div>

      <section className="events-filters">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search destinations or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon"></span>
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
                "{searchTerm}"
                <button onClick={() => setSearchTerm("")}>✕</button>
              </span>
            )}
          </div>

          {destinationName && (
            <div className="destination-banner">
              <span className="destination-badge">
                Showing items for: <strong>{destinationName}</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h3>
              {loading ? "Loading..." : `${filteredItems.length} items found`}
            </h3>
            {!loading && filteredItems.length > 0 && (
              <span className="results-subtitle">
                Showing {filteredItems.length} items
              </span>
            )}
            {selectedItems.length > 0 && (
              <span className="selected-count">
                {selectedItems.length} selected
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section events-grid-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No items found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="items-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      {item.amharicTitle && (
                        <span className="item-amharic">
                          {item.amharicTitle}
                        </span>
                      )}
                    </div>
                    <p className="item-description">{item.description}</p>

                    <div className="item-details">
                      {item.type === "destination" ? (
                        <>
                          <div className="item-attractions">
                            {item.attractions.slice(0, 3).map((attr, index) => (
                              <span key={index} className="attraction-tag">
                                {attr}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="item-date">
                            <span className="item-icon"></span>
                            <span>{item.startDate}</span>
                            {item.endDate &&
                              item.endDate !== item.startDate && (
                                <span> - {item.endDate}</span>
                              )}
                          </div>
                          <div className="item-location">
                            <span className="item-icon"></span>
                            <span>{item.location}</span>
                          </div>
                          <div className="item-highlights">
                            {item.highlights
                              .slice(0, 3)
                              .map((highlight, index) => (
                                <span key={index} className="highlight-tag">
                                  {highlight}
                                </span>
                              ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="item-actions">
                      <button
                        className={`select-btn ${selectedItems.includes(item.id) ? "selected" : ""}`}
                        onClick={() => toggleSelectItem(item.id)}
                      >
                        {selectedItems.includes(item.id)
                          ? " Selected"
                          : "Select"}
                      </button>
                      <button
                        className="view-more-btn"
                        onClick={() => openItemModal(item)}
                      >
                        View More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedItems.length > 0 && (
        <div className="continue-section">
          <div className="continue-box">
            <div className="continue-info">
              <span className="selected-info">
                {selectedItems.length} item(s) selected
              </span>
            </div>
            <button className="continue-btn" onClick={handleContinue}>
              Continue to Transport →
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && selectedItem && (
        <div className="event-modal-overlay" onClick={closeItemModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeItemModal}>
              ✕
            </button>

            <div className="modal-image">
              <img src={selectedItem.image} alt={selectedItem.title} />
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedItem.title}</h2>
                {selectedItem.amharicTitle && (
                  <span className="modal-amharic">
                    {selectedItem.amharicTitle}
                  </span>
                )}
              </div>

              <p className="modal-full-description">
                {selectedItem.description}
              </p>

              <div className="modal-details">
                {selectedItem.type === "destination" ? (
                  <>
                    <div className="modal-detail-item">
                      <span className="modal-detail-icon"></span>
                      <div>
                        <span className="modal-detail-label">Best Time</span>
                        <span className="modal-detail-value">
                          {selectedItem.bestTime}
                        </span>
                      </div>
                    </div>
                    <div className="modal-highlights">
                      <h4> Attractions</h4>
                      <div className="modal-highlights-list">
                        {selectedItem.attractions.map((item, index) => (
                          <span key={index} className="modal-highlight-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="modal-detail-item">
                      <span className="modal-detail-icon"></span>
                      <div>
                        <span className="modal-detail-value">
                          {selectedItem.startDate}
                        </span>
                      </div>
                    </div>
                    {selectedItem.endDate &&
                      selectedItem.endDate !== selectedItem.startDate && (
                        <div className="modal-detail-item">
                          <span className="modal-detail-icon"></span>
                          <div>
                            <span className="modal-detail-value">
                              {selectedItem.endDate}
                            </span>
                          </div>
                        </div>
                      )}
                    <div className="modal-detail-item">
                      <span className="modal-detail-icon"></span>
                      <div>
                        <span className="modal-detail-label">Location</span>
                        <span className="modal-detail-value">
                          {selectedItem.location}
                        </span>
                      </div>
                    </div>
                    <div className="modal-highlights">
                      <h4> Highlights</h4>
                      <div className="modal-highlights-list">
                        {selectedItem.highlights.map((item, index) => (
                          <span key={index} className="modal-highlight-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                className={`modal-book-btn ${selectedItems.includes(selectedItem.id) ? "selected" : ""}`}
                onClick={() => {
                  toggleSelectItem(selectedItem.id);
                  closeItemModal();
                }}
              >
                {selectedItems.includes(selectedItem.id)
                  ? " Selected"
                  : "Select This Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
