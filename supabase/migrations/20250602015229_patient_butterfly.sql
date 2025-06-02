CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    old_property_number VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    acquired_date DATE NOT NULL,
    estimated_life INT NOT NULL,
    center VARCHAR(100) NOT NULL,
    acquisition_cost DECIMAL(15,2) NOT NULL,
    carrying_amount DECIMAL(15,2) NOT NULL,
    new_property_number VARCHAR(50) NOT NULL,
    location VARCHAR(200) NOT NULL,
    condition_status VARCHAR(50) NOT NULL,
    remarks TEXT,
    driver_name VARCHAR(100) NOT NULL,
    registered_name VARCHAR(100) NOT NULL,
    certificate_number VARCHAR(50) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);