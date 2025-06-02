<?php require 'auth_check.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Motor Vehicle Inventory System</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
    <header class="header">
        <div class="header-content">
            <div class="logo-container">
                <div class="logo">
                    <img src="../images/assets-logo.jpg" alt="AMD Logo">
                </div>
                <div class="logo-text">
                    <h1>Motor Vehicle Inventory System</h1>
                </div>
            </div>
            <div class="header-actions">
                <div class="session-timer">
                    Session expires in: <span id="session-timer">15:00</span>
                </div>
                <button id="logout-btn" class="logout-button">Sign Out</button>
            </div>
        </div>
    </header>

    <nav class="sidenav">
        <a href="#dashboard" class="nav-item active" data-page="dashboard">
            Dashboard
        </a>
        <a href="#add-vehicle" class="nav-item" data-page="add-vehicle">
            Add New Vehicle
        </a>
        <a href="#manage-vehicles" class="nav-item" data-page="manage-vehicles">
            Manage Vehicles
        </a>
        <a href="#upload-excel" class="nav-item" data-page="upload-excel">
            Upload Excel File
        </a>
        <a href="#settings" class="nav-item" data-page="settings">
            Settings
        </a>
    </nav>

    <main class="main-dashboard">
        <div id="dashboard-page" class="page active">
            <h2>Vehicle Inventory Overview</h2>
            <div class="data-grid">
                <!-- Grid content will be dynamically populated -->
            </div>
        </div>

        <div id="add-vehicle-page" class="page hidden">
            <h2>Add New Vehicle</h2>
            <form id="vehicle-form" class="form-section">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="oldPropertyNumber">Old Property Number</label>
                        <input type="text" id="oldPropertyNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="text" id="description" required>
                    </div>
                    <div class="form-group">
                        <label for="acquiredDate">Acquired Date</label>
                        <input type="date" id="acquiredDate" required>
                    </div>
                    <div class="form-group">
                        <label for="estimatedLife">Estimated Life (years)</label>
                        <input type="number" id="estimatedLife" required>
                    </div>
                    <div class="form-group">
                        <label for="center">Respective Center</label>
                        <input type="text" id="center" required>
                    </div>
                    <div class="form-group">
                        <label for="acquisitionCost">Acquisition Cost</label>
                        <input type="number" id="acquisitionCost" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="carryingAmount">Carrying Amount</label>
                        <input type="number" id="carryingAmount" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="newPropertyNumber">New Property Number</label>
                        <input type="text" id="newPropertyNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="location">Location/Whereabouts</label>
                        <input type="text" id="location" required>
                    </div>
                    <div class="form-group">
                        <label for="condition">Condition</label>
                        <select id="condition" required>
                            <option value="">Select condition</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="remarks">Remarks</label>
                        <textarea id="remarks"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="driverName">Driver's Name</label>
                        <input type="text" id="driverName" required>
                    </div>
                    <div class="form-group">
                        <label for="registeredName">Registered Name in PAR</label>
                        <input type="text" id="registeredName" required>
                    </div>
                    <div class="form-group">
                        <label for="certificateNumber">Certificate Number</label>
                        <input type="text" id="certificateNumber" required>
                    </div>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn btn-primary">Save Vehicle</button>
                    <button type="reset" class="btn btn-secondary">Clear Form</button>
                </div>
            </form>
        </div>

        <div id="manage-vehicles-page" class="page hidden">
            <h2>Manage Vehicles</h2>
            <div class="data-grid">
                <!-- Vehicle list will be dynamically populated -->
            </div>
        </div>

        <div id="upload-excel-page" class="page hidden">
            <h2>Upload Excel File</h2>
            <div class="form-section">
                <div class="form-group">
                    <label for="excelFile">Select Excel File</label>
                    <input type="file" id="excelFile" accept=".xlsx,.xls">
                </div>
                <div class="action-buttons">
                    <button id="uploadExcel" class="btn btn-primary">Upload</button>
                </div>
            </div>
        </div>

        <div id="settings-page" class="page hidden">
            <h2>Settings</h2>
            <div class="settings-panel">
                <div class="settings-section">
                    <h3>Profile Settings</h3>
                    <form id="profile-form" class="form-grid">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="action-buttons">
                            <button type="submit" class="btn btn-primary">Update Profile</button>
                        </div>
                    </form>
                </div>

                <div class="settings-section">
                    <h3>Change Password</h3>
                    <form id="password-form" class="form-grid">
                        <div class="form-group">
                            <label for="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="newPassword">New Password</label>
                            <input type="password" id="newPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <input type="password" id="confirmPassword" required>
                        </div>
                        <div class="action-buttons">
                            <button type="submit" class="btn btn-primary">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <script src="../js/dashboard.js"></script>
</body>
</html>