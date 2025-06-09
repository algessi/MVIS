<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "vehicle_inventory";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4 for proper Unicode support
$conn->set_charset("utf8mb4");

// Enable error reporting for development
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
?>