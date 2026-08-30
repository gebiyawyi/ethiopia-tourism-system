import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./DestinationDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
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
import turmimarket from "../../assets/images/turmimarket.png";
import harar from "../../assets/images/harar.png";
import hararcityfes from "../../assets/images/hararcityfes.png";
import bale from "../../assets/images/bale.png";
import SofOmar from "../../assets/images/SofOmar.png";
import LakeLangano from "../../assets/images/LakeLangano.png";
import NationalMuseum from "../../assets/images/NationalMuseum.png";
import MountEntoto from "../../assets/images/MountEntoto.png";
import Merkato from "../../assets/images/Merkato.png";
import ethiopiaMap from "../../assets/images/flag.png";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=500&fit=crop";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  const destinationData = {
    0: {
      id: 0,
      name: "🇪🇹 Ethiopia - The Land of Origins",
      region: "Nationwide",
      subRegion: "All Regions",
      description:
        "Ethiopia is a country of immense diversity and ancient history. Known as the 'Land of Origins', it is home to some of the oldest human fossils, ancient civilizations, and rich cultural heritage.",
      fullDescription:
        "Ethiopia is a country of immense diversity and ancient history. Known as the 'Land of Origins', it is home to some of the oldest human fossils, ancient civilizations, and rich cultural heritage. From the rock-hewn churches of Lalibela to the colorful tribes of the Omo Valley, Ethiopia offers a journey through time and culture.\n\nThe country boasts over 80 ethnic groups, each with their own language, culture, and traditions. The Ethiopian Orthodox Church, one of the oldest Christian denominations in the world, has shaped the country's history and architecture. The stunning landscapes range from the highest peaks of the Simien Mountains to the lowest point on Earth at the Danakil Depression.",
      image: ethiopiaMap || FALLBACK_IMAGE,
      price: 0,
      rating: 4.9,
      reviews: 5000,
      attractions: [
        "Ancient History",
        "Cultural Diversity",
        "UNESCO Sites",
        "Unique Cuisine",
        "Traditional Coffee Ceremony",
        "Religious Heritage",
      ],
      bestTime: "Year-round",
      howToGet:
        "International flights arrive at Addis Ababa Bole International Airport. Domestic flights, buses, and 4x4 vehicles connect to all regions.",
      whatToBring:
        "Comfortable walking shoes, sun protection, camera, light jacket for highlands",
    },
    1: {
      id: 1,
      name: "Lalibela Rock Churches",
      region: "Amhara",
      subRegion: "North Wollo",
      description:
        "11 monolithic churches carved from rock in the 12th century, a UNESCO World Heritage Site",
      fullDescription:
        "The Lalibela Rock Churches are one of the most extraordinary architectural achievements in the world. Built in the 12th century under King Lalibela, these 11 monolithic churches were carved entirely from the living rock. Each church is a masterpiece of engineering and faith, connected by a network of tunnels and passages.\n\nThe churches are still active places of worship today, attracting pilgrims from across Ethiopia and the world. The most famous is Bete Giyorgis (Church of St. George), carved in the shape of a cross and standing 15 meters high.",
      image: lalibela || FALLBACK_IMAGE,
      price: 1200,
      rating: 4.8,
      reviews: 1234,
      attractions: [
        "Rock Churches",
        "Ancient History",
        "Pilgrimage",
        "UNESCO Site",
        "Tunnels & Passages",
      ],
      bestTime: "dec 28-29",
      howToGet:
        "Fly from Addis Ababa to Lalibela (1 hour) or take a bus (8-10 hours).",
      whatToBring:
        "Comfortable shoes, hat, water bottle, camera, flashlight for tunnels",
    },
    2: {
      id: 2,
      name: "Simien Mountains National Park",
      region: "Amhara",
      subRegion: "North Gondar",
      description:
        "Breathtaking landscapes with dramatic escarpments and unique wildlife including Gelada baboons",
      fullDescription:
        "The Simien Mountains National Park is a UNESCO World Heritage Site known for its dramatic landscapes, deep valleys, and unique wildlife. The park is home to the Gelada baboon, Ethiopian wolf, and Walia ibex.\n\nThe park offers some of the best trekking in Africa with stunning views of the escarpment and the surrounding lowlands. The highest peak, Ras Dashen, stands at 4,543 meters.",
      image: semien1 || FALLBACK_IMAGE,
      price: 1500,
      rating: 4.9,
      reviews: 987,
      attractions: [
        "Trekking",
        "Wildlife",
        "Scenic Views",
        "UNESCO Site",
        "Gelada Baboons",
      ],
      bestTime: "Year Around",
      howToGet: "Fly to Gondar then drive 2-3 hours to the park entrance.",
      whatToBring: "Trekking gear, warm clothes, camera, snacks, water",
    },
    3: {
      id: 3,
      name: "Gondar Castles",
      region: "Amhara",
      subRegion: "Gondar",
      description:
        'The "Camelot of Africa" featuring medieval castles and royal palaces from the 17th century',
      fullDescription:
        "Gondar was the capital of Ethiopia during the 17th and 18th centuries. The city is famous for its medieval castles and palaces, earning it the nickname 'Camelot of Africa'.\n\nThe Royal Enclosure contains several castles built by successive emperors, including the impressive Castle of Emperor Fasilides. The city also features the Debre Berhan Selassie Church, known for its beautiful ceiling murals.",
      image: gondar || FALLBACK_IMAGE,
      price: 800,
      rating: 4.6,
      reviews: 654,
      attractions: [
        "Castles",
        "Royal History",
        "Architecture",
        "UNESCO Site",
        "Murals",
      ],
      bestTime: "Year Around",
      howToGet: "Fly from Addis Ababa to Gondar or take a bus.",
      whatToBring: "Comfortable shoes, camera, sun protection",
    },
    4: {
      id: 4,
      name: "Lake Tana Monasteries",
      region: "Amhara",
      subRegion: "Bahir Dar",
      description:
        "Sacred lake with ancient island monasteries and churches dating back to the 14th century",
      fullDescription:
        "Lake Tana is Ethiopia's largest lake and the source of the Blue Nile. The lake is dotted with islands that contain ancient monasteries and churches, some dating back to the 14th century.\n\nThe most famous monasteries include Ura Kidane Mehret, Kibran Gabriel, and Narga Selassie. They contain beautiful frescoes, ancient manuscripts, and religious artifacts.",
      image: tana2 || FALLBACK_IMAGE,
      price: 600,
      rating: 4.5,
      reviews: 543,
      attractions: [
        "Lake Tours",
        "Monasteries",
        "Bird Watching",
        "Boat Cruises",
        "Frescoes",
      ],
      bestTime: "Year Around",
      howToGet: "Fly to Bahir Dar or drive from Addis Ababa.",
      whatToBring: "Camera, hat, water, comfortable shoes",
    },
    5: {
      id: 5,
      name: "Blue Nile Falls",
      region: "Amhara",
      subRegion: "Bahir Dar",
      description:
        'Spectacular waterfall known as "Tis Issat" - the Smoking Water',
      fullDescription:
        "The Blue Nile Falls, known locally as 'Tis Issat' or 'Smoking Water', is one of the most spectacular waterfalls in Africa. The falls are 42 meters high and create a mist that rises like smoke.\n\nThe falls are best viewed during the rainy season (June to September) when the water flow is at its peak. Visitors can hike to viewpoints and take boat trips to see the falls from different angles.",
      image: BlueNilefalls || FALLBACK_IMAGE,
      price: 400,
      rating: 4.4,
      reviews: 432,
      attractions: [
        "Waterfalls",
        "Hiking",
        "Photography",
        "Nature",
        "Boat Trips",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Bahir Dar (1 hour) then hike to the falls.",
      whatToBring: "Hiking shoes, camera, rain jacket, water",
    },
    6: {
      id: 6,
      name: "Axum Obelisks",
      region: "Tigray",
      subRegion: "Axum",
      description:
        "Ancient city with towering obelisks, royal tombs, and the legendary Ark of the Covenant",
      fullDescription:
        "Axum was the capital of the ancient Aksumite Empire, one of the great civilizations of the ancient world. The city is famous for its towering obelisks, royal tombs, and the legendary Ark of the Covenant.\n\nThe obelisks are carved from single pieces of granite and stand up to 24 meters tall. The ruins of the ancient city include palaces, tombs, and the famous Ezana Stone.",
      image: axum || FALLBACK_IMAGE,
      price: 900,
      rating: 4.6,
      reviews: 765,
      attractions: [
        "Ancient History",
        "Archaeology",
        "Obelisks",
        "UNESCO Site",
        "Ark of the Covenant",
      ],
      bestTime: "Year Around",
      howToGet: "Fly from Addis Ababa to Axum or drive.",
      whatToBring: "Comfortable shoes, camera, sun protection",
    },
    7: {
      id: 7,
      name: "Tigray Rock-Hewn Churches",
      region: "Tigray",
      subRegion: "Gheralta",
      description:
        "Over 100 ancient rock-hewn churches scattered across the dramatic Tigray landscape",
      fullDescription:
        "The Tigray region is home to over 100 ancient rock-hewn churches, many carved into cliffs and mountainsides. These churches date from the 4th to the 15th centuries and are some of the oldest Christian sites in the world.\n\nThe churches are accessed by climbing, often using ropes or ladders. The most famous include Abuna Yemata Guh, which requires a steep climb to reach.",
      image: rock || FALLBACK_IMAGE,
      price: 700,
      rating: 4.7,
      reviews: 543,
      attractions: [
        "Rock Churches",
        "Climbing",
        "Ancient Art",
        "UNESCO Site",
        "Views",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Mekele or fly to nearby airports.",
      whatToBring: "Hiking shoes, rope, camera, water",
    },
    8: {
      id: 8,
      name: "Debre Damo Monastery",
      region: "Tigray",
      subRegion: "Adwa",
      description:
        "Ancient monastery perched on a mountain plateau, accessible only by climbing a rope",
      fullDescription:
        "Debre Damo is one of the oldest monasteries in Ethiopia, dating back to the 6th century. It is perched on a mountain plateau and is accessible only by climbing a rope.\n\nThe monastery contains a collection of ancient manuscripts and religious artifacts. The climb is challenging but offers spectacular views of the surrounding landscape.",
      image: debredamo || FALLBACK_IMAGE,
      price: 500,
      rating: 4.3,
      reviews: 321,
      attractions: [
        "Monastery",
        "Climbing",
        "Religious History",
        "Scenic Views",
        "Manuscripts",
      ],
      bestTime: "Year Around",
      howToGet:
        "Drive from Axum or Adwa, then walk to the base of the plateau.",
      whatToBring: "Hiking shoes, water, camera",
    },
    9: {
      id: 9,
      name: "Danakil Depression",
      region: "Afar",
      subRegion: "Afar Triangle",
      description:
        "One of the hottest places on Earth with colorful sulfur springs, salt flats, and active volcanoes",
      fullDescription:
        "The Danakil Depression is one of the most extreme places on Earth. Located 125 meters below sea level, it is one of the hottest and lowest places on the planet.\n\nThe region features colorful sulfur springs, vast salt flats, and active volcanoes like Erta Ale. The landscape is otherworldly, with yellow, green, and orange mineral deposits creating a surreal environment.",
      image: denkele1 || FALLBACK_IMAGE,
      price: 1800,
      rating: 5.0,
      reviews: 876,
      attractions: [
        "Volcanoes",
        "Salt Flats",
        "Extreme Adventure",
        "Sulfur Springs",
        "Unique Landscape",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Mekele with a 4x4 vehicle and guide.",
      whatToBring: "Sunscreen, water, camera, hat, sunglasses",
    },
    10: {
      id: 10,
      name: "Erta Ale Volcano",
      region: "Afar",
      subRegion: "Danakil",
      description:
        "Active shield volcano with one of the world's longest-standing lava lakes",
      fullDescription:
        "Erta Ale is an active shield volcano in the Danakil Depression. It is famous for having one of the world's longest-standing lava lakes, which has been active for decades.\n\nThe trek to the volcano involves hiking at night to avoid the extreme heat. Visitors can camp on the rim and witness the glowing lava lake.",
      image: ertalie || FALLBACK_IMAGE,
      price: 2000,
      rating: 4.9,
      reviews: 654,
      attractions: [
        "Volcano",
        "Lava Lake",
        "Night Trekking",
        "Adventure",
        "Stargazing",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Mekele, then trek to the summit.",
      whatToBring: "Warm clothes for night, water, camera, headlamp",
    },
    11: {
      id: 11,
      name: "Dallol Sulfur Springs",
      region: "Afar",
      subRegion: "Danakil",
      description:
        "Colorful hydrothermal field with yellow, green, and orange mineral deposits",
      fullDescription:
        "Dallol is a hydrothermal field in the Danakil Depression known for its vibrant colors. The area features yellow, green, and orange mineral deposits created by hot springs and volcanic activity.\n\nThe colorful landscape is otherworldly and offers incredible photographic opportunities. Dallol holds the record for the highest average temperature on Earth.",
      image: DallolSprings || FALLBACK_IMAGE,
      price: 1600,
      rating: 4.8,
      reviews: 543,
      attractions: [
        "Sulfur Springs",
        "Photography",
        "Geothermal",
        "Unique Landscape",
        "Colorful Minerals",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Mekele with a 4x4 vehicle and guide.",
      whatToBring: "Camera, sunscreen, water, hat",
    },
    12: {
      id: 12,
      name: "Omo Valley Tribes",
      region: "Southern",
      subRegion: "Omo Valley",
      description:
        "Rich cultural heritage with indigenous tribes like the Hamer, Mursi, and Karo",
      fullDescription:
        "The Omo Valley is home to some of the most fascinating indigenous tribes in Africa. The Hamer, Mursi, and Karo tribes have preserved their traditional way of life for centuries.\n\nVisitors can witness traditional ceremonies, visit tribal villages, and learn about the unique customs and traditions of these communities. The valley offers a glimpse into a world that has remained unchanged for millennia.",
      image: ommo1 || FALLBACK_IMAGE,
      price: 1100,
      rating: 4.7,
      reviews: 765,
      attractions: [
        "Cultural Tours",
        "Tribal Villages",
        "Traditional Ceremonies",
        "Photography",
        "Bull Jumping",
      ],
      bestTime: "Year Around",
      howToGet: "Fly to Jinka or drive from Addis Ababa (3-4 days).",
      whatToBring: "Camera, respect for local culture, gifts for tribes",
    },
    13: {
      id: 13,
      name: "Mago National Park",
      region: "Southern",
      subRegion: "Omo Valley",
      description:
        "National park home to the Mursi people and diverse wildlife including elephants and buffalos",
      fullDescription:
        "Mago National Park is located in the Omo Valley and is home to the Mursi people as well as diverse wildlife. The park features elephants, buffalos, giraffes, and many bird species.\n\nThe park offers safari experiences and cultural tours to visit Mursi villages. The landscape is varied, with savannah, forests, and rivers.",
      image: Mago || FALLBACK_IMAGE,
      price: 800,
      rating: 4.4,
      reviews: 432,
      attractions: [
        "Wildlife Safari",
        "Mursi Tribe",
        "Bird Watching",
        "Nature",
        "Savannah Views",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Jinka to the park entrance.",
      whatToBring: "Camera, binoculars, water, sun protection",
    },
    14: {
      id: 14,
      name: "Turmi Market",
      region: "Southern",
      subRegion: "Omo Valley",
      description:
        "Vibrant Saturday market where different tribes gather to trade and socialize",
      fullDescription:
        "The Turmi market is a vibrant gathering place where tribes from across the Omo Valley come to trade and socialize. Held every Saturday, the market is a colorful display of traditional culture.\n\nVisitors can see tribal people in traditional attire, buy local crafts, and experience the lively atmosphere. The market is a great place for photography and cultural immersion.",
      image: turmimarket || FALLBACK_IMAGE,
      price: 500,
      rating: 4.3,
      reviews: 321,
      attractions: [
        "Local Market",
        "Culture",
        "Photography",
        "Traditional Crafts",
        "Tribal Gatherings",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Jinka or Arba Minch.",
      whatToBring: "Camera, cash for purchases, respect for locals",
    },
    15: {
      id: 15,
      name: "Harar Jugol",
      region: "Harari",
      subRegion: "Harar",
      description:
        "Fortified historic town with unique culture, architecture, and the famous hyena feeding",
      fullDescription:
        "Harar Jugol is a fortified historic town that is a UNESCO World Heritage Site. The town features over 80 mosques, traditional Harari houses, and a unique culture.\n\nThe town is famous for the nightly hyena feeding ceremony, where hyenas are fed by locals outside the city walls. The market and alleyways offer a glimpse into the town's rich history.",
      image: harar || FALLBACK_IMAGE,
      price: 800,
      rating: 4.5,
      reviews: 654,
      attractions: [
        "Historic Walls",
        "Hyena Feeding",
        "Museums",
        "UNESCO Site",
        "Traditional Houses",
      ],
      bestTime: "Year Around",
      howToGet: "Fly from Addis Ababa to Harar or drive.",
      whatToBring: "Camera, comfortable shoes, curiosity",
    },
    16: {
      id: 16,
      name: "Harar Old Town",
      region: "Harari",
      subRegion: "Harar",
      description:
        "Ancient walled city with 82 mosques and traditional Harari houses",
      fullDescription:
        "Harar Old Town is a maze of narrow alleyways, ancient mosques, and traditional Harari houses. The town has 82 mosques and is considered the fourth holiest city in Islam.\n\nThe traditional Harari houses are unique, with ornate decorations and distinct architecture. The market offers local crafts, textiles, and traditional food.",
      image: hararcityfes || FALLBACK_IMAGE,
      price: 600,
      rating: 4.4,
      reviews: 432,
      attractions: [
        "Old City",
        "Mosques",
        "Traditional Houses",
        "Culture",
        "Local Market",
      ],
      bestTime: "Year Around",
      howToGet: "Fly from Addis Ababa to Harar or drive.",
      whatToBring: "Camera, comfortable shoes, respect for religious sites",
    },
    17: {
      id: 17,
      name: "Bale Mountains National Park",
      region: "Oromia",
      subRegion: "Bale",
      description:
        "Home to the Ethiopian wolf and unique Afro-alpine ecosystem with stunning landscapes",
      fullDescription:
        "The Bale Mountains National Park is home to the Ethiopian wolf, the world's rarest canid. The park features a unique Afro-alpine ecosystem with stunning landscapes.\n\nVisitors can trek through the mountains, spot wildlife, and enjoy the beautiful scenery. The park is a bird-watcher's paradise with over 300 bird species.",
      image: bale || FALLBACK_IMAGE,
      price: 1000,
      rating: 4.7,
      reviews: 543,
      attractions: [
        "Wildlife",
        "Trekking",
        "Ethiopian Wolf",
        "Bird Watching",
        "Scenic Views",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Addis Ababa or fly to Goba.",
      whatToBring: "Trekking gear, warm clothes, camera, binoculars",
    },
    18: {
      id: 18,
      name: "Sof Omar Caves",
      region: "Oromia",
      subRegion: "Bale",
      description:
        "One of the longest cave systems in Africa with underground rivers and limestone formations",
      fullDescription:
        "The Sof Omar Caves are one of the longest cave systems in Africa, with over 15 kilometers of passages. The caves feature underground rivers, limestone formations, and unique ecosystems.\n\nThe caves are accessible to visitors who can explore the main chambers and see the impressive rock formations. The caves are considered sacred by locals.",
      image: SofOmar || FALLBACK_IMAGE,
      price: 700,
      rating: 4.3,
      reviews: 321,
      attractions: [
        "Cave Exploration",
        "Underground Rivers",
        "Rock Formations",
        "Adventure",
        "Sacred Site",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Addis Ababa or Goba.",
      whatToBring: "Headlamp, water, comfortable shoes, camera",
    },
    19: {
      id: 19,
      name: "Lake Langano",
      region: "Oromia",
      subRegion: "Rift Valley",
      description:
        "Beautiful lake in the Ethiopian Rift Valley perfect for swimming and bird watching",
      fullDescription:
        "Lake Langano is a beautiful lake in the Ethiopian Rift Valley, known for its clear waters and bird watching opportunities. Unlike other Rift Valley lakes, Lake Langano is safe for swimming.\n\nVisitors can relax on the beach, swim, and watch the numerous bird species that inhabit the lake. The surrounding area offers hiking and nature walks.",
      image: LakeLangano || FALLBACK_IMAGE,
      price: 500,
      rating: 4.2,
      reviews: 432,
      attractions: [
        "Swimming",
        "Bird Watching",
        "Lake Views",
        "Relaxation",
        "Nature Walks",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Addis Ababa (3 hours) or from nearby towns.",
      whatToBring: "Swimsuit, towel, camera, sun protection",
    },
    20: {
      id: 20,
      name: "National Museum of Ethiopia",
      region: "Addis Ababa",
      subRegion: "Addis Ababa",
      description:
        'Home to the famous fossil "Lucy" and extensive collection of Ethiopian artifacts',
      fullDescription:
        "The National Museum of Ethiopia is the premier museum in the country. It is home to the famous fossil 'Lucy' (Australopithecus afarensis), one of the most complete early hominid skeletons ever found.\n\nThe museum also houses extensive collections of Ethiopian artifacts, including ancient tools, religious items, and cultural objects. Visitors can learn about the country's rich history and cultural heritage.",
      image: NationalMuseum || FALLBACK_IMAGE,
      price: 300,
      rating: 4.6,
      reviews: 876,
      attractions: ["Museum", "Lucy Fossil", "History", "Culture", "Artifacts"],
      bestTime: "Year-round",
      howToGet:
        "Located in Addis Ababa, accessible by taxi or public transport.",
      whatToBring: "Camera, curiosity, comfortable shoes",
    },
    21: {
      id: 21,
      name: "Mount Entoto",
      region: "Addis Ababa",
      subRegion: "Addis Ababa",
      description:
        "Highest peak near Addis Ababa with panoramic views and historic churches",
      fullDescription:
        "Mount Entoto is the highest peak near Addis Ababa, offering panoramic views of the city and surrounding landscapes. The mountain is known for its historic churches and eucalyptus forests.\n\nVisitors can hike to the summit, visit the Entoto Maryam Church, and enjoy the peaceful atmosphere. The mountain is a popular escape from the city.",
      image: MountEntoto || FALLBACK_IMAGE,
      price: 400,
      rating: 4.4,
      reviews: 654,
      attractions: [
        "Mountain Views",
        "Hiking",
        "Churches",
        "Nature",
        "Panoramic Scenery",
      ],
      bestTime: "Year Around",
      howToGet: "Drive from Addis Ababa (30 minutes) or hike from the city.",
      whatToBring: "Hiking shoes, camera, water, warm clothes",
    },
    22: {
      id: 22,
      name: "Merkato Market",
      region: "Addis Ababa",
      subRegion: "Addis Ababa",
      description:
        "One of the largest open-air markets in Africa with everything from spices to crafts",
      fullDescription:
        "Merkato is one of the largest open-air markets in Africa, covering several square kilometers in Addis Ababa. The market sells everything from spices and coffee to traditional crafts and electronics.\n\nVisitors can explore the maze of stalls, experience local culture, and buy authentic Ethiopian products. The market is a vibrant and bustling place that offers a true taste of Addis Ababa.",
      image: Merkato || FALLBACK_IMAGE,
      price: 200,
      rating: 4.3,
      reviews: 543,
      attractions: [
        "Shopping",
        "Local Culture",
        "Spices",
        "Crafts",
        "Bustling Atmosphere",
      ],
      bestTime: "Year-round",
      howToGet: "Located in Addis Ababa, accessible by taxi or bus.",
      whatToBring: "Cash, camera, bargaining skills, comfortable shoes",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const data = destinationData[id];
      if (data) {
        setDestination(data);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const getRegionIcon = (region) => {
    const icons = {
      Nationwide: "",
      Amhara: "",
      Tigray: "",
      Afar: "",
      Southern: "",
      Harari: "",
      Oromia: "",
      "Addis Ababa": "",
    };
    return icons[region] || "";
  };

  // ✅ FIXED: handleBack function properly defined
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading destination...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="detail-page">
        <Navbar />
        <div className="not-found">
          <h2>Destination not found</h2>
          <Link to="/destinations" className="btn-primary">
            Back to Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Navbar />
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="detail-hero-overlay">
          <div className="container">
            <h1>{destination.name}</h1>
            <div className="detail-meta">
              <span className="detail-region">
                {getRegionIcon(destination.region)} {destination.region}
              </span>
              <span className="detail-subregion">{destination.subRegion}</span>
            </div>
            <div className="detail-rating">
              {destination.rating} ({destination.reviews} reviews)
            </div>
          </div>
        </div>
      </section>

      <div className="back-button-container">
        <div className="container">
          <button className="back-btn" onClick={handleBack}>
            ← Back to Destinations
          </button>
        </div>
      </div>

      <section className="detail-content section">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-main">
              <div className="detail-description">
                <p>{destination.description}</p>
                <div className="full-description">
                  {destination.fullDescription
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>Attractions</h3>
                <div className="attraction-list">
                  {destination.attractions.map((item, index) => (
                    <span key={index} className="attraction-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-info-box">
                  <h4>Best Time to Visit</h4>
                  <p>{destination.bestTime}</p>
                </div>
                <div className="detail-info-box">
                  <h4>How to Get There</h4>
                  <p>{destination.howToGet}</p>
                </div>
                <div className="detail-info-box">
                  <h4>What to Bring</h4>
                  <p>{destination.whatToBring}</p>
                </div>
              </div>
            </div>

            <div className="detail-sidebar">
              <div className="sidebar-card">
                <Link to="/destinations" className="browse-link">
                  ← Browse All Destinations
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

export default DestinationDetail;
