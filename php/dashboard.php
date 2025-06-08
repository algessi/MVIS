<?php require 'auth_check.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Motor Vehicle Inventory System</title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="stylesheet" href="../css/responsive.css">
</head>
<body>
    <div class="dashboard-container">
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
            <!-- User Profile Section -->
            <div class="user-profile-section">
                <div class="user-avatar">
                    <div class="avatar-circle">
                        <?php echo isset($_SESSION['username']) ? strtoupper(substr($_SESSION['username'], 0, 1)) : 'U'; ?>
                    </div>
                </div>
                <div class="user-info">
                    <h3><?php echo isset($_SESSION['fullname']) ? $_SESSION['fullname'] : 'User'; ?></h3>
                    <p><?php echo isset($_SESSION['role']) ? $_SESSION['role'] : 'User'; ?></p>
                </div>
            </div>

            <a href="#dashboard" class="nav-item active" data-page="dashboard">
                📊 Dashboard
            </a>
            <a href="#profile" class="nav-item" data-page="profile">
                👤 My Profile
            </a>
            <a href="#add-vehicle" class="nav-item" data-page="add-vehicle">
                ➕ Add New Vehicle
            </a>
            <a href="#manage-vehicles" class="nav-item" data-page="manage-vehicles">
                🚗 Manage Vehicles
            </a>
            <a href="#upload-excel" class="nav-item" data-page="upload-excel">
                📁 Upload Excel File
            </a>
            <a href="#settings" class="nav-item" data-page="settings">
                ⚙️ Settings
            </a>
        </nav>

        <main class="main-dashboard">
            <!-- Dashboard Overview Page -->
            <div id="dashboard-page" class="page active">
                <h2>Vehicle Inventory Overview</h2>
                
                <!-- Dashboard Statistics -->
                <div class="dashboard-stats">
                    <!-- Stats will be populated by JavaScript -->
                </div>

                <!-- Search and Filter Section -->
                <div class="search-filter-section">
                    <h3 style="margin-bottom: 1rem;">Search & Filter</h3>
                    <div class="search-filter-grid">
                        <div class="form-group">
                            <input type="text" id="search-input" placeholder="Search vehicles..." />
                        </div>
                        <div class="form-group">
                            <select id="filter-select">
                                <option value="">All Conditions</option>
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select id="center-filter">
                                <option value="">All Centers</option>
                                <option value="main">Main Office</option>
                                <option value="branch1">Branch 1</option>
                                <option value="branch2">Branch 2</option>
                            </select>
                        </div>
                        <button id="search-btn" class="btn btn-primary">Search</button>
                    </div>
                </div>

                <!-- Recent Entries will be populated by JavaScript -->
            </div>

            <!-- Profile Page -->
            <div id="profile-page" class="page">
                <h2>My Profile</h2>
                <div class="profile-section">
                    <div class="form-section">
                        <h3>Personal Information</h3>
                        <form id="profile-form">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="fullName">Full Name</label>
                                    <input type="text" id="fullName" name="fullName" value="<?php echo isset($_SESSION['fullname']) ? htmlspecialchars($_SESSION['fullname']) : ''; ?>" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" name="email" value="<?php echo isset($_SESSION['email']) ? htmlspecialchars($_SESSION['email']) : ''; ?>" required>
                                </div>
                                <div class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" name="username" value="<?php echo isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : ''; ?>" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <input type="text" id="role" name="role" value="<?php echo isset($_SESSION['role']) ? htmlspecialchars($_SESSION['role']) : 'User'; ?>" readonly>
                                </div>
                            </div>
                            <div class="action-buttons">
                                <button type="submit" class="btn btn-primary">Update Profile</button>
                            </div>
                        </form>
                    </div>

                    <div class="password-section">
                        <h3>Change Password</h3>
                        <div class="form-section">
                            <form id="password-form">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="currentPassword">Current Password</label>
                                        <input type="password" id="currentPassword" name="currentPassword" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="newPassword">New Password</label>
                                        <input type="password" id="newPassword" name="newPassword" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="confirmPassword">Confirm New Password</label>
                                        <input type="password" id="confirmPassword" name="confirmPassword" required>
                                    </div>
                                </div>
                                <div class="action-buttons">
                                    <button type="submit" class="btn btn-primary">Change Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add Vehicle Page -->
            <div id="add-vehicle-page" class="page">
                <h2>Add New Vehicle</h2>
                <div class="form-section">
                    <form id="vehicle-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="oldPropertyNumber">Old Property Number</label>
                                <input type="text" id="oldPropertyNumber" name="oldPropertyNumber" required>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <input type="text" id="description" name="description" required>
                            </div>
                            <div class="form-group">
                                <label for="acquiredDate">Acquired Date</label>
                                <input type="date" id="acquiredDate" name="acquiredDate" required>
                            </div>
                            <div class="form-group">
                                <label for="estimatedLife">Estimated Life (years)</label>
                                <input type="number" id="estimatedLife" name="estimatedLife" min="1" required>
                            </div>
                            <div class="form-group">
                                <label for="center">Respective Center</label>
                                <select id="center" name="center" required>
                                    <option value="">Select Center</option>
                                    <option value="Main Office">Main Office</option>
                                    <option value="Branch 1">Branch 1</option>
                                    <option value="Branch 2">Branch 2</option>
                                    <option value="Regional Office">Regional Office</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="acquisitionCost">Acquisition Cost</label>
                                <input type="number" id="acquisitionCost" name="acquisitionCost" step="0.01" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="carryingAmount">Carrying Amount</label>
                                <input type="number" id="carryingAmount" name="carryingAmount" step="0.01" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="newPropertyNumber">New Property Number</label>
                                <input type="text" id="newPropertyNumber" name="newPropertyNumber" required>
                            </div>
                            <div class="form-group">
                                <label for="location">Location/Whereabouts</label>
                                <input type="text" id="location" name="location" required>
                            </div>
                            <div class="form-group">
                                <label for="condition">Condition</label>
                                <select id="condition" name="condition" required>
                                    <option value="">Select condition</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="poor">Poor</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="driverName">Driver's Name</label>
                                <input type="text" id="driverName" name="driverName" required>
                            </div>
                            <div class="form-group">
                                <label for="registeredName">Registered Name in PAR</label>
                                <input type="text" id="registeredName" name="registeredName" required>
                            </div>
                            <div class="form-group">
                                <label for="certificateNumber">Certificate Number</label>
                                <input type="text" id="certificateNumber" name="certificateNumber" required>
                            </div>
                            <div class="form-group" style="grid-column: 1 / -1;">
                                <label for="remarks">Remarks</label>
                                <textarea id="remarks" name="remarks" rows="3" placeholder="Additional notes or remarks..."></textarea>
                            </div>
                        </div>
                        <div class="action-buttons">
                            <button type="submit" class="btn btn-primary">Save Vehicle</button>
                            <button type="reset" class="btn btn-secondary">Clear Form</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Manage Vehicles Page -->
            <div id="manage-vehicles-page" class="page">
                <h2>Manage Vehicles</h2>
                <div class="data-grid">
                    <!-- Vehicle list will be populated by JavaScript -->
                    <p class="text-center">Loading vehicles...</p>
                </div>
            </div>

            <!-- Upload Excel Page -->
            <div id="upload-excel-page" class="page">
                <h2>Upload Excel File</h2>
                <div class="form-section">
                    <h3>Bulk Import Vehicles</h3>
                    <p style="margin-bottom: 1.5rem; color: var(--neutral-600);">
                        Upload an Excel file (.xlsx or .xls) containing vehicle data. 
                        Make sure your file follows the required format.
                    </p>
                    
                    <div class="file-upload-area" id="file-upload-area">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
                            <h4>Drag and drop your Excel file here</h4>
                            <p style="margin: 1rem 0; color: var(--neutral-600);">or</p>
                            <button type="button" class="btn btn-primary" onclick="document.getElementById('excelFile').click()">
                                Browse Files
                            </button>
                            <input type="file" id="excelFile" accept=".xlsx,.xls" style="display: none;">
                        </div>
                    </div>
                    
                    <div class="action-buttons" style="margin-top: 1.5rem;">
                        <button id="uploadExcel" class="btn btn-primary">Upload and Process</button>
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('excelFile').value = ''">
                            Clear Selection
                        </button>
                    </div>
                    
                    <div style="margin-top: 2rem; padding: 1rem; background: var(--neutral-100); border-radius: var(--border-radius);">
                        <h4>File Format Requirements:</h4>
                        <ul style="margin-top: 0.5rem; color: var(--neutral-700);">
                            <li>Excel file (.xlsx or .xls format)</li>
                            <li>First row should contain column headers</li>
                            <li>Required columns: Property Number, Description, Driver Name, etc.</li>
                            <li>Maximum file size: 10MB</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Settings Page -->
            <div id="settings-page" class="page">
                <h2>Settings</h2>
                
                <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
                <!-- Admin Settings -->
                <div class="form-section">
                    <h3>User Management</h3>
                    <p style="margin-bottom: 1.5rem;">Manage system users and their permissions.</p>
                    
                    <div class="action-buttons mb-4">
                        <button class="btn btn-primary" onclick="dashboard.showAddUserForm()">
                            Add New User
                        </button>
                        <button class="btn btn-secondary" onclick="dashboard.loadUsersList()">
                            Refresh Users List
                        </button>
                    </div>
                    
                    <div id="users-list">
                        <!-- Users list will be populated by JavaScript -->
                    </div>
                </div>

                <div class="form-section">
                    <h3>System Settings</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="sessionTimeout">Session Timeout (minutes)</label>
                            <select id="sessionTimeout">
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="maxFileSize">Max Upload File Size (MB)</label>
                            <input type="number" id="maxFileSize" value="10" min="1" max="100">
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary">Save Settings</button>
                    </div>
                </div>
                <?php else: ?>
                <!-- User Settings -->
                <div class="form-section">
                    <h3>Account Preferences</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="notifications">Email Notifications</label>
                            <select id="notifications">
                                <option value="all">All notifications</option>
                                <option value="important">Important only</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="language">Language</label>
                            <select id="language">
                                <option value="en">English</option>
                                <option value="fil">Filipino</option>
                            </select>
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary">Save Preferences</button>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </main>
    </div>

    <script src="../js/dashboard.js"></script>
</body>
</html>