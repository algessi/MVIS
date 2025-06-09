/*
  # Complete Database Setup for Motor Vehicle Inventory System
  
  This file contains the complete database structure including:
  1. Database creation
  2. Users table with authentication
  3. Vehicles table with inventory management
  4. Sample data for testing
  
  Run this file to set up the complete database structure.
*/

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `vehicle_inventory` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `vehicle_inventory`;

-- Users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(255) NULL,
    reset_expires DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- Vehicles table for motor vehicle inventory
CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    old_property_number VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    acquired_date DATE NOT NULL,
    estimated_life INT NOT NULL CHECK (estimated_life > 0),
    center VARCHAR(100) NOT NULL,
    acquisition_cost DECIMAL(15,2) NOT NULL CHECK (acquisition_cost >= 0),
    carrying_amount DECIMAL(15,2) NOT NULL CHECK (carrying_amount >= 0),
    new_property_number VARCHAR(50) NOT NULL UNIQUE,
    location VARCHAR(200) NOT NULL,
    condition_status ENUM('excellent', 'good', 'fair', 'poor') NOT NULL,
    driver_name VARCHAR(100) NOT NULL,
    registered_name VARCHAR(100) NOT NULL,
    certificate_number VARCHAR(50) NOT NULL,
    remarks TEXT NULL,
    created_by INT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_new_property_number (new_property_number),
    INDEX idx_condition_status (condition_status),
    INDEX idx_center (center),
    INDEX idx_driver_name (driver_name),
    INDEX idx_date_added (date_added),
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default admin user
-- Password: Admin123! (hashed with PHP password_hash)
INSERT INTO users (fullname, email, username, password, role) VALUES 
('System Administrator', 'admin@mvis.com', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Test User', 'user@mvis.com', 'testuser', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Insert sample vehicle data
INSERT INTO vehicles (
    old_property_number, description, acquired_date, estimated_life, center,
    acquisition_cost, carrying_amount, new_property_number, location,
    condition_status, driver_name, registered_name, certificate_number, remarks, created_by
) VALUES 
('OLD-001', 'Toyota Hilux 2020 4x4 Pickup Truck', '2020-01-15', 10, 'Main Office',
 1500000.00, 1200000.00, 'MV-2024-001', 'Main Office Parking Area', 'excellent',
 'Juan Dela Cruz', 'Juan Dela Cruz', 'CERT-001', 'Regular maintenance up to date. Excellent condition.', 1),

('OLD-002', 'Isuzu D-Max 2019 Crew Cab 4WD', '2019-06-20', 10, 'Branch 1',
 1300000.00, 950000.00, 'MV-2024-002', 'Branch 1 Vehicle Garage', 'good',
 'Maria Santos', 'Maria Santos', 'CERT-002', 'Minor scratches on left side panel. Overall good condition.', 1),

('OLD-003', 'Mitsubishi Strada 2018 GLX 4x4', '2018-03-10', 10, 'Regional Office',
 1100000.00, 750000.00, 'MV-2024-003', 'Regional Office Compound', 'fair',
 'Pedro Garcia', 'Pedro Garcia', 'CERT-003', 'Needs tire replacement soon. Engine runs well.', 1),

('OLD-004', 'Ford Ranger 2021 Wildtrak', '2021-08-05', 10, 'Branch 2',
 1800000.00, 1500000.00, 'MV-2024-004', 'Branch 2 Parking Lot', 'excellent',
 'Ana Rodriguez', 'Ana Rodriguez', 'CERT-004', 'Brand new condition. All features working perfectly.', 1),

('OLD-005', 'Nissan Navara 2017 Calibre', '2017-12-12', 10, 'Main Office',
 1200000.00, 800000.00, 'MV-2024-005', 'Main Office Fleet Area', 'good',
 'Carlos Mendoza', 'Carlos Mendoza', 'CERT-005', 'Regular service completed. Good working condition.', 1);

-- Create indexes for better performance
CREATE INDEX idx_vehicles_search ON vehicles(description, new_property_number, driver_name);
CREATE INDEX idx_vehicles_filter ON vehicles(center, condition_status, date_added);

-- Show table structures
DESCRIBE users;
DESCRIBE vehicles;

-- Show sample data
SELECT 'Users Table:' as Info;
SELECT id, fullname, email, username, role, is_active, created_at FROM users;

SELECT 'Vehicles Table:' as Info;
SELECT id, new_property_number, description, center, condition_status, driver_name, date_added FROM vehicles LIMIT 5;