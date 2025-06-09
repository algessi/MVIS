/*
  # Create vehicles table for motor vehicle inventory

  1. New Tables
    - `vehicles`
      - `id` (int, primary key, auto increment)
      - `old_property_number` (varchar, legacy property number)
      - `description` (text, vehicle description)
      - `acquired_date` (date, when vehicle was acquired)
      - `estimated_life` (int, estimated life in years)
      - `center` (varchar, respective center/office)
      - `acquisition_cost` (decimal, original cost)
      - `carrying_amount` (decimal, current book value)
      - `new_property_number` (varchar, new property number)
      - `location` (varchar, current location/whereabouts)
      - `condition_status` (enum, vehicle condition)
      - `driver_name` (varchar, assigned driver)
      - `registered_name` (varchar, name in PAR)
      - `certificate_number` (varchar, certificate number)
      - `remarks` (text, additional notes)
      - `created_by` (int, user who created record)
      - `date_added` (timestamp, creation date)
      - `last_modified` (timestamp, last update date)

  2. Indexes
    - Primary key on id
    - Index on new_property_number for quick searches
    - Index on condition_status for filtering
    - Index on center for location-based queries
    - Foreign key to users table for created_by

  3. Constraints
    - Foreign key constraint to users table
    - Check constraint for positive costs
*/

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

-- Insert sample vehicle data
INSERT INTO vehicles (
    old_property_number, description, acquired_date, estimated_life, center,
    acquisition_cost, carrying_amount, new_property_number, location,
    condition_status, driver_name, registered_name, certificate_number, remarks
) VALUES 
('OLD-001', 'Toyota Hilux 2020 4x4 Pickup', '2020-01-15', 10, 'Main Office',
 1500000.00, 1200000.00, 'MV-2024-001', 'Main Office Parking', 'excellent',
 'Juan Dela Cruz', 'Juan Dela Cruz', 'CERT-001', 'Regular maintenance up to date'),

('OLD-002', 'Isuzu D-Max 2019 Crew Cab', '2019-06-20', 10, 'Branch 1',
 1300000.00, 950000.00, 'MV-2024-002', 'Branch 1 Garage', 'good',
 'Maria Santos', 'Maria Santos', 'CERT-002', 'Minor scratches on left side'),

('OLD-003', 'Mitsubishi Strada 2018', '2018-03-10', 10, 'Regional Office',
 1100000.00, 750000.00, 'MV-2024-003', 'Regional Office', 'fair',
 'Pedro Garcia', 'Pedro Garcia', 'CERT-003', 'Needs tire replacement soon');