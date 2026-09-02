
import lalibelalodge from "../assets/images/LalibelaLodge.png";
import semienresort from "../assets/images/SimienResort.png";
import danikilhotel from "../assets/images/danikilhotel.png";
import ommoresort from "../assets/images/OmoResort.png";
import axumhotel from "../assets/images/axumhotel.png";
import hararguest from "../assets/images/HararGuest.png";
import balelodge from "../assets/images/BaleLodge.png";
import BahirDarResort from "../assets/images/BahirDarResort.png";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop";

export const hotelsData = [
  {
    id: 1,
    name: "Lalibela Lodge",
    destination: "Lalibela",
    location: "Lalibela, Amhara",
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
      "Beautiful lodge overlooking the Lalibela rock churches with stunning views.",
    longDescription:
      "Nestled in the heart of Lalibela, this lodge offers breathtaking views of the ancient rock-hewn churches. Experience authentic Ethiopian hospitality with modern comforts while exploring one of Ethiopia's most remarkable cultural destinations.",
    contact: "+251 911 234 567",
    email: "info@lalibelalodge.com",
    availability: "Available",
  },
  {
    id: 2,
    name: "Simien Mountain Resort",
    destination: "Gondar",
    location: "Gondar, Amhara",
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
      "Perfect base for exploring the Simien Mountains with panoramic views.",
    longDescription:
      "Located at the foothills of the Simien Mountains, this resort offers easy access to trekking routes and stunning views of the escarpment. Guests can enjoy peaceful surroundings, comfortable accommodation, and an unforgettable mountain experience.",
    contact: "+251 922 345 678",
    email: "info@simienresort.com",
    availability: "Available",
  },
  {
    id: 3,
    name: "Danakil Desert Camp",
    destination: "Danakil",
    location: "Danakil, Afar",
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
      "Experience the desert with comfortable camping and guided tours.",
    longDescription:
      "An unforgettable desert camping experience in the Danakil Depression. Sleep under the stars and explore one of the most extreme environments on Earth with experienced guides and comfortable camping facilities.",
    contact: "+251 933 456 789",
    email: "info@danakilcamp.com",
    availability: "Limited",
  },
  {
    id: 4,
    name: "Omo Valley Resort",
    destination: "Jinka",
    location: "Jinka, Southern Ethiopia",
    region: "Southern",
    rating: 4.6,
    price: 100,
    image: ommoresort || FALLBACK_IMAGE,
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Pool",
      "Parking",
      "Spa",
    ],
    description:
      "Modern resort in the heart of Omo Valley with cultural experiences.",
    longDescription:
      "Located in the heart of the Omo Valley, this modern resort provides comfortable accommodation and convenient access to cultural experiences, local communities, and the beautiful landscapes of southern Ethiopia.",
    contact: "+251 944 567 890",
    email: "info@omovalleyresort.com",
    availability: "Available",
  },
  {
    id: 5,
    name: "Axum Heritage Hotel",
    destination: "Axum",
    location: "Axum, Tigray",
    region: "Tigray",
    rating: 4.4,
    price: 90,
    image: axumhotel || FALLBACK_IMAGE,
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Parking",
      "Heritage Tours",
    ],
    description:
      "Heritage hotel in the ancient city of Axum near the obelisks.",
    longDescription:
      "Stay in the historic city of Axum and discover its remarkable cultural heritage. The hotel provides comfortable accommodation near the famous obelisks and other important historical attractions.",
    contact: "+251 955 678 901",
    email: "info@axumheritage.com",
    availability: "Available",
  },
  {
    id: 6,
    name: "Harar Guest House",
    destination: "Harar",
    location: "Harar, Harari",
    region: "Harari",
    rating: 4.3,
    price: 70,
    image: hararguest || FALLBACK_IMAGE,
    amenities: [
      "Free WiFi",
      "Breakfast",
      "Cultural Tours",
      "Terrace",
    ],
    description:
      "Charming guesthouse in the historic walled city of Harar.",
    longDescription:
      "Experience the unique atmosphere of Harar from this charming guesthouse. Enjoy traditional hospitality while exploring the historic walled city, local markets, traditional architecture, and rich cultural heritage.",
    contact: "+251 966 789 012",
    email: "info@hararguesthouse.com",
    availability: "Available",
  },
  {
    id: 7,
    name: "Bale Mountain Lodge",
    destination: "Bale",
    location: "Bale, Oromia",
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
      "Luxury lodge in the Bale Mountains with unique wildlife experiences.",
    longDescription:
      "Enjoy a peaceful stay in the Bale Mountains surrounded by spectacular highland landscapes and wildlife. The lodge provides access to hiking trails and nature experiences in one of Ethiopia's most beautiful mountain regions.",
    contact: "+251 977 890 123",
    email: "info@balemountainlodge.com",
    availability: "Available",
  },
  {
    id: 8,
    name: "Bahir Dar Resort",
    destination: "Bahir Dar",
    location: "Bahir Dar, Amhara",
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
      "Beautiful resort on the shores of Lake Tana near the Blue Nile Falls.",
    longDescription:
      "Relax in beautiful Bahir Dar near Lake Tana. This resort provides comfortable accommodation, beautiful lake views, and convenient access to boat tours and the spectacular Blue Nile Falls.",
    contact: "+251 988 901 234",
    email: "info@bahirdarresort.com",
    availability: "Available",
  },
];

export { FALLBACK_IMAGE };

