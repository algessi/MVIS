<?php
require 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $sql = "INSERT INTO vehicles (
        old_property_number,
        description,
        acquired_date,
        estimated_life,
        center,
        acquisition_cost,
        carrying_amount,
        new_property_number,
        location,
        condition_status,
        remarks,
        driver_name,
        registered_name,
        certificate_number,
        date_added
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    
    try {
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssisssssssssss",
            $data['oldPropertyNumber'],
            $data['description'],
            $data['acquiredDate'],
            $data['estimatedLife'],
            $data['center'],
            $data['acquisitionCost'],
            $data['carryingAmount'],
            $data['newPropertyNumber'],
            $data['location'],
            $data['condition'],
            $data['remarks'],
            $data['driverName'],
            $data['registeredName'],
            $data['certificateNumber']
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Vehicle added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error adding vehicle']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>