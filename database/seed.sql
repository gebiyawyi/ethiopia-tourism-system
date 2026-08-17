-- ============================================
-- SEED DATA FOR ETHIOPIA TOURISM
-- ============================================

USE tourism_db;

-- ============================================
-- 1. INSERT ADMIN USER
-- ============================================
-- Password: Admin@123456 (bcrypt hashed)
INSERT IGNORE INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@exploreethiopia.com', '$2b$10$w7QJXp5yZ4KjHm0Lk9N8qOe7R6tY4uI3oP2lKjHm0Lk9N8qOe7R6tY4u', 'System Administrator', 'admin');

-- ============================================
-- 2. INSERT DESTINATIONS
-- ============================================
INSERT INTO destinations (name, slug, region, sub_region, description, short_description, price_per_person, rating, is_featured, attractions, best_time, duration) VALUES
('Lalibela Rock Churches', 'lalibela-rock-churches', 'Amhara', 'North Wollo', 
 'The Lalibela Rock Churches are a UNESCO World Heritage Site featuring 11 monolithic churches carved from the living rock in the 12th century. These remarkable structures, still active places of worship today, are connected by a network of tunnels and passages, representing a "New Jerusalem" for pilgrims.',
 '11 monolithic churches carved from rock in the 12th century',
 1200.00, 4.8, TRUE,
 '["Rock-hewn churches", "Ancient architecture", "UNESCO World Heritage", "Pilgrimage site"]',
 'October to March', '2-3 days'),

('Simien Mountains National Park', 'simien-mountains', 'Amhara', 'North Gondar',
 'The Simien Mountains National Park is a UNESCO World Heritage Site renowned for its dramatic landscapes, deep valleys, and jagged peaks. Home to unique wildlife including the Gelada baboon and Ethiopian wolf, the park offers spectacular trekking experiences.',
 'Breathtaking landscapes with dramatic escarpments',
 1500.00, 4.9, TRUE,
 '["Trekking", "Wildlife viewing", "Gelada baboons", "Scenic viewpoints"]',
 'October to May', '3-5 days'),

('Danakil Depression', 'danakil-depression', 'Afar', 'Afar Triangle',
 'The Danakil Depression is one of the most extreme and fascinating places on Earth. It features colorful sulfur springs, vast salt flats, and active volcanoes like Erta Ale with its permanent lava lake. Despite being one of the hottest places on the planet, this surreal landscape attracts adventurers from around the world.',
 'One of the hottest places on Earth with surreal landscapes',
 1800.00, 5.0, TRUE,
 '["Erta Ale volcano", "Salt flats", "Sulfur springs", "Camel caravans"]',
 'November to February', '2-3 days'),

('Axum Obelisks', 'axum-obelisks', 'Tigray', 'Axum',
 'The ancient city of Axum was once the heart of the powerful Aksumite Empire. Today, it is famous for its towering obelisks, royal tombs, and the legendary Church of Our Lady Mary of Zion, which is said to house the Ark of the Covenant.',
 'Ancient civilization with towering obelisks',
 900.00, 4.6, TRUE,
 '["Ancient obelisks", "Royal tombs", "Church of Mary of Zion", "Archaeological sites"]',
 'October to March', '1-2 days'),

('Omo Valley Tribes', 'omo-valley-tribes', 'Southern Nations', 'Omo Valley',
 'The Omo Valley is a cultural treasure trove, home to some of Ethiopia\'s most fascinating indigenous tribes including the Hamer, Mursi, Karo, and Dassanech. This remote region offers a unique glimpse into ancient traditions, body painting, lip plates, and vibrant ceremonies.',
 'Unique cultural experience with indigenous tribes',
 1400.00, 4.7, TRUE,
 '["Tribal villages", "Body painting", "Lip plates", "Cultural ceremonies"]',
 'October to March', '4-6 days'),

('Harar Jugol', 'harar-jugol', 'Harari', 'Harar',
 'Harar Jugol is a UNESCO World Heritage site and one of the holiest cities in Islam. The fortified historic town features over 80 mosques, colorful markets, and the unique tradition of feeding wild hyenas.',
 'Fortified historic town with rich Islamic heritage',
 800.00, 4.5, FALSE,
 '["Historic walls", "Mosques", "Hyena feeding", "Colorful markets"]',
 'October to February', '1-2 days');

-- ============================================
-- 3. INSERT HOTELS
-- ============================================
INSERT INTO hotels (name, destination_id, region, description, price_per_night, rating, amenities, is_available, address, contact_phone) VALUES
('Lalibela Lodge', 1, 'Amhara', 'Beautiful lodge overlooking the Lalibela rock churches with stunning views and traditional Ethiopian hospitality.', 150.00, 4.8, '["Free WiFi", "Restaurant", "Parking", "Air Conditioning", "24/7 Reception", "Mountain Views"]', TRUE, 'Lalibela, Amhara Region', '+251 912 345 678'),

('Simien Mountain Resort', 2, 'Amhara', 'Perfect base for exploring the Simien Mountains with panoramic views, comfortable rooms, and guided trekking services.', 120.00, 4.7, '["Free WiFi", "Restaurant", "Parking", "Mountain Views", "Fireplace", "Trekking Guides"]', TRUE, 'Gondar, Amhara Region', '+251 913 456 789'),

('Danakil Desert Camp', 3, 'Afar', 'Experience the desert with comfortable camping facilities, guided tours, and unique star-gazing experiences in the Danakil Depression.', 80.00, 4.5, '["Camping", "Meals", "Guide Service", "Star Gazing", "Bonfire", "Camel Tours"]', TRUE, 'Danakil Depression, Afar Region', '+251 914 567 890'),

('Axum Heritage Hotel', 4, 'Tigray', 'Heritage hotel in the ancient city of Axum near the obelisks, offering comfortable accommodations with historical charm.', 90.00, 4.4, '["Free WiFi", "Restaurant", "Parking", "Heritage Tours", "Garden"]', TRUE, 'Axum, Tigray Region', '+251 915 678 901'),

('Omo Valley Resort', 5, 'Southern Nations', 'Modern resort in the heart of Omo Valley with cultural experiences, comfortable rooms, and guided tribal village tours.', 100.00, 4.6, '["Free WiFi", "Restaurant", "Pool", "Parking", "Spa", "Cultural Tours"]', TRUE, 'Jinka, Southern Ethiopia', '+251 916 789 012'),

('Harar Guest House', 6, 'Harari', 'Charming guesthouse in the historic walled city of Harar with traditional architecture and warm hospitality.', 70.00, 4.3, '["Free WiFi", "Breakfast", "Cultural Tours", "Terrace", "Garden"]', TRUE, 'Harar Jugol, Harari Region', '+251 917 890 123'),

('Bahir Dar Resort', NULL, 'Amhara', 'Beautiful resort on the shores of Lake Tana near the Blue Nile Falls, offering boat tours and lake views.', 110.00, 4.5, '["Free WiFi", "Restaurant", "Pool", "Lake Views", "Boat Tours", "Garden"]', TRUE, 'Bahir Dar, Amhara Region', '+251 918 901 234'),

('Bale Mountain Lodge', NULL, 'Oromia', 'Luxury lodge in the Bale Mountains with unique wildlife experiences, hiking trails, and stunning mountain views.', 130.00, 4.7, '["Free WiFi", "Restaurant", "Parking", "Hiking Trails", "Wildlife Viewing", "Fireplace"]', TRUE, 'Bale Mountains, Oromia Region', '+251 919 012 345');

-- ============================================
-- 4. VERIFY DATA
-- ============================================
SELECT '✅ Database seeded successfully!' AS status;
SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) AS total_destinations FROM destinations;
SELECT COUNT(*) AS total_hotels FROM hotels;