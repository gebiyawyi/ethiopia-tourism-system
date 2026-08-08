-- ============================================
-- ETHIOPIA TOURISM DATABASE
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS tourism_db;
USE tourism_db;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    profile_image VARCHAR(500),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- ============================================
-- DESTINATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS destinations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    region VARCHAR(100),
    sub_region VARCHAR(100),
    description TEXT,
    short_description VARCHAR(255),
    image VARCHAR(500),
    price_per_person DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    attractions JSON,
    best_time VARCHAR(100),
    duration VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_region (region),
    INDEX idx_featured (is_featured)
);

-- ============================================
-- HOTELS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hotels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    destination_id INT,
    region VARCHAR(100),
    description TEXT,
    image VARCHAR(500),
    price_per_night DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0,
    amenities JSON,
    is_available BOOLEAN DEFAULT TRUE,
    address VARCHAR(200),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL,
    INDEX idx_destination (destination_id),
    INDEX idx_region (region)
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    booking_type ENUM('tour', 'hotel') NOT NULL,
    destination_id INT,
    hotel_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_guests INT DEFAULT 1,
    total_price DECIMAL(10, 2),
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    destination_id INT,
    hotel_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    INDEX idx_destination (destination_id),
    INDEX idx_hotel (hotel_id)
);

-- ============================================
-- INSERT ADMIN USER
-- ============================================
-- Password: Admin@123 (hashed)
INSERT IGNORE INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@exploreethiopia.com', '$2b$10$hashedpasswordhere', 'System Admin', 'admin');

-- ============================================
-- SAMPLE DATA
-- ============================================
INSERT INTO destinations (name, slug, region, sub_region, description, price_per_person, rating, is_featured) VALUES
('Lalibela Rock Churches', 'lalibela-rock-churches', 'Amhara', 'North Wollo', '11 monolithic churches carved from rock in the 12th century', 1200.00, 4.8, TRUE),
('Simien Mountains National Park', 'simien-mountains', 'Amhara', 'North Gondar', 'Breathtaking landscapes with dramatic escarpments', 1500.00, 4.9, TRUE),
('Danakil Depression', 'danakil-depression', 'Afar', 'Afar Triangle', 'One of the hottest places on Earth', 1800.00, 5.0, TRUE);

SELECT '✅ Database setup complete!' AS message;