<?php
require 'db.php';
header('Content-Type: application/json');

$sql = "SELECT * FROM vehicles ORDER BY date_added DESC";
$result = $conn->query($sql);

$vehicles = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $vehicles[] = $row;
    }
}

echo json_encode(['success' => true, 'data' => $vehicles]);
?>