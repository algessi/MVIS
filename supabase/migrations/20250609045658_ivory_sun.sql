-- Motor Vehicle Inventory System Database Setup
-- For phpMyAdmin Import

-- Create database
CREATE DATABASE IF NOT EXISTS `vehicle_inventory` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `vehicle_inventory`;

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `fullname` varchar(100) NOT NULL,
    `email` varchar(150) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` enum('admin','user') DEFAULT 'user',
    `is_active` tinyint(1) DEFAULT 1,
    `reset_token` varchar(255) DEFAULT NULL,
    `reset_expires` datetime DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `username` (`username`),
    KEY `idx_email` (`email`),
    KEY `idx_username` (`username`),
    KEY `idx_role` (`role`),
    KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- VEHICLES TABLE
-- =============================================
CREATE TABLE `vehicles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `old_property_number` varchar(50) NOT NULL,
    `description` text NOT NULL,
    `acquired_date` date NOT NULL,
    `estimated_life` int(11) NOT NULL CHECK (`estimated_life` > 0),
    `center` varchar(100) NOT NULL,
    `acquisition_cost` decimal(15,2) NOT NULL CHECK (`acquisition_cost` >= 0),
    `carrying_amount` decimal(15,2) NOT NULL CHECK (`carrying_amount` >= 0),
    `new_property_number` varchar(50) NOT NULL,
    `location` varchar(200) NOT NULL,
    `condition_status` enum('excellent','good','fair','poor') NOT NULL,
    `driver_name` varchar(100) NOT NULL,
    `registered_name` varchar(100) NOT NULL,
    `certificate_number` varchar(50) NOT NULL,
    `remarks` text DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
    `last_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `new_property_number` (`new_property_number`),
    KEY `idx_new_property_number` (`new_property_number`),
    KEY `idx_condition_status` (`condition_status`),
    KEY `idx_center` (`center`),
    KEY `idx_driver_name` (`driver_name`),
    KEY `idx_date_added` (`date_added`),
    KEY `idx_vehicles_search` (`description`(100),`new_property_number`,`driver_name`),
    KEY `idx_vehicles_filter` (`center`,`condition_status`,`date_added`),
    KEY `created_by` (`created_by`),
    CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- INSERT DEFAULT DATA
-- =============================================

-- Insert default users
-- Password for both users: Admin123!
INSERT INTO `users` (`fullname`, `email`, `username`, `password`, `role`) VALUES
('System Administrator', 'admin@mvis.com', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Test User', 'user@mvis.com', 'testuser', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Insert sample vehicle data
INSERT INTO `vehicles` (
    `old_property_number`, `description`, `acquired_date`, `estimated_life`, `center`,
    `acquisition_cost`, `carrying_amount`, `new_property_number`, `location`,
    `condition_status`, `driver_name`, `registered_name`, `certificate_number`, `remarks`, `created_by`
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

-- =============================================
-- SHOW RESULTS
-- =============================================
SELECT 'Database setup completed successfully!' as Status;
SELECT 'Users created:' as Info;
SELECT id, fullname, email, username, role, is_active FROM users;

SELECT 'Vehicles created:' as Info;
SELECT id, new_property_number, description, center, condition_status, driver_name FROM vehicles;