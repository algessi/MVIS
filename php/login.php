<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Validate input
    if (empty($username) || empty($password)) {
        echo "Username and password are required";
        exit;
    }

    try {
        // Prepare statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT id, fullname, email, username, password, role, is_active FROM users WHERE username = ? OR email = ?");
        $stmt->bind_param("ss", $username, $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Check if account is active
            if (!$user['is_active']) {
                echo "Account is deactivated. Please contact administrator.";
                exit;
            }
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['isLoggedIn'] = true;
                $_SESSION['userId'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['fullname'] = $user['fullname'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['role'] = $user['role'];
                $_SESSION['login_time'] = time();
                
                echo "success";
            } else {
                echo "Invalid username or password";
            }
        } else {
            echo "Invalid username or password";
        }
        $stmt->close();
    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        echo "An error occurred. Please try again.";
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>