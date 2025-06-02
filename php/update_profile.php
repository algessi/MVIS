<?php
require 'auth_check.php';
require 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = $_SESSION['userId'];
    
    $sql = "UPDATE users SET fullname = ?, email = ? WHERE id = ?";
    
    try {
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $data['fullName'], $data['email'], $userId);
        
        if ($stmt->execute()) {
            $_SESSION['fullname'] = $data['fullName'];
            $_SESSION['email'] = $data['email'];
            echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating profile']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>