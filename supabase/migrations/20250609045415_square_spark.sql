/*
  # Create users table for authentication and user management

  1. New Tables
    - `users`
      - `id` (int, primary key, auto increment)
      - `fullname` (varchar, user's full name)
      - `email` (varchar, unique email address)
      - `username` (varchar, unique username)
      - `password` (varchar, hashed password)
      - `role` (enum, user role: admin or user)
      - `is_active` (boolean, account status)
      - `reset_token` (varchar, password reset token)
      - `reset_expires` (datetime, token expiration)
      - `created_at` (timestamp, account creation date)
      - `updated_at` (timestamp, last update date)

  2. Security
    - Unique constraints on email and username
    - Default role is 'user'
    - Default active status is true
    - Automatic timestamps for tracking
*/

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

-- Insert default admin user (password: Admin123!)
INSERT INTO users (fullname, email, username, password, role) VALUES 
('System Administrator', 'admin@mvis.com', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');