// Dashboard JavaScript - Enhanced Version
class DashboardManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.sessionTimeout = null;
        this.SESSION_DURATION = 15 * 60 * 1000; // 15 minutes
        this.vehicles = [];
        this.users = [];
        this.currentUser = null;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupFileUpload();
        this.setupSearch();
        this.loadDashboardData();
        this.resetSession();
        this.setupEventListeners();
        this.loadUserProfile();
    }

    // Session Management
    resetSession() {
        clearTimeout(this.sessionTimeout);
        this.sessionTimeout = setTimeout(() => this.handleSessionTimeout(), this.SESSION_DURATION);
        this.updateSessionTimer(this.SESSION_DURATION);
    }

    handleSessionTimeout() {
        alert('Your session has expired. Please log in again.');
        window.location.href = '../index.html';
    }

    updateSessionTimer(duration) {
        const timerElement = document.getElementById('session-timer');
        if (!timerElement) return;

        let timeLeft = duration;
        const updateDisplay = () => {
            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color based on time left
            if (minutes < 2) {
                timerElement.style.color = '#ef4444';
            } else if (minutes < 5) {
                timerElement.style.color = '#f59e0b';
            } else {
                timerElement.style.color = 'white';
            }
            
            if (timeLeft > 0) {
                timeLeft -= 1000;
                setTimeout(updateDisplay, 1000);
            }
        };

        updateDisplay();
    }

    // Navigation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const pages = document.querySelectorAll('.page');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetPage = item.getAttribute('data-page');
                this.showPage(targetPage);
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                this.resetSession();
            });
        });
    }

    showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === `${pageId}-page`) {
                page.classList.add('active');
            }
        });
        
        this.currentPage = pageId;
        
        // Load page-specific data
        switch(pageId) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'manage-vehicles':
                this.loadVehiclesList();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    // Dashboard Data Loading
    async loadDashboardData() {
        try {
            // Load vehicle statistics
            const response = await fetch('../php/get_vehicles.php');
            const data = await response.json();
            
            if (data.success) {
                this.vehicles = data.data;
                this.updateDashboardStats();
                this.updateRecentEntries();
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    updateDashboardStats() {
        const statsContainer = document.querySelector('.dashboard-stats');
        if (!statsContainer) return;

        const totalVehicles = this.vehicles.length;
        const activeVehicles = this.vehicles.filter(v => v.condition_status !== 'poor').length;
        const recentEntries = this.vehicles.filter(v => {
            const entryDate = new Date(v.date_added);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return entryDate > weekAgo;
        }).length;

        statsContainer.innerHTML = `
            <div class="stat-card">
                <h3>Total Vehicles</h3>
                <div class="stat-number">${totalVehicles}</div>
                <div class="stat-label">Registered vehicles</div>
            </div>
            <div class="stat-card">
                <h3>Active Vehicles</h3>
                <div class="stat-number">${activeVehicles}</div>
                <div class="stat-label">In good condition</div>
            </div>
            <div class="stat-card">
                <h3>Recent Entries</h3>
                <div class="stat-number">${recentEntries}</div>
                <div class="stat-label">Added this week</div>
            </div>
            <div class="stat-card">
                <h3>Quick Actions</h3>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="dashboard.showPage('add-vehicle')">
                        Add Vehicle
                    </button>
                </div>
            </div>
        `;
    }

    updateRecentEntries() {
        const recentContainer = document.querySelector('.recent-entries');
        if (!recentContainer) {
            // Create recent entries section if it doesn't exist
            const dashboardPage = document.getElementById('dashboard-page');
            if (dashboardPage) {
                const recentSection = document.createElement('div');
                recentSection.className = 'recent-entries';
                recentSection.innerHTML = `
                    <h3 style="margin-bottom: 1rem;">Recent Entries</h3>
                    <div class="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Property Number</th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Condition</th>
                                    <th>Date Added</th>
                                </tr>
                            </thead>
                            <tbody id="recent-entries-tbody">
                            </tbody>
                        </table>
                    </div>
                `;
                dashboardPage.appendChild(recentSection);
            }
        }

        const tbody = document.getElementById('recent-entries-tbody');
        if (!tbody) return;

        const recentVehicles = this.vehicles
            .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
            .slice(0, 5);

        tbody.innerHTML = recentVehicles.map(vehicle => `
            <tr>
                <td>${vehicle.new_property_number}</td>
                <td>${vehicle.description}</td>
                <td>${vehicle.location}</td>
                <td>
                    <span class="status-badge status-${vehicle.condition_status}">
                        ${vehicle.condition_status}
                    </span>
                </td>
                <td>${new Date(vehicle.date_added).toLocaleDateString()}</td>
            </tr>
        `).join('');
    }

    // Form Handling
    setupForms() {
        this.setupVehicleForm();
        this.setupProfileForm();
        this.setupPasswordForm();
        this.setupUserManagementForm();
    }

    setupVehicleForm() {
        const vehicleForm = document.getElementById('vehicle-form');
        if (!vehicleForm) return;

        vehicleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = this.getFormData(vehicleForm);
            const submitBtn = vehicleForm.querySelector('button[type="submit"]');
            
            this.setLoadingState(submitBtn, true);
            
            try {
                const response = await fetch('../php/save_vehicle.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showMessage('Vehicle saved successfully!', 'success');
                    vehicleForm.reset();
                    this.loadDashboardData(); // Refresh data
                } else {
                    this.showMessage('Error: ' + result.message, 'error');
                }
            } catch (error) {
                this.showMessage('An error occurred while saving the vehicle.', 'error');
                console.error('Error:', error);
            } finally {
                this.setLoadingState(submitBtn, false);
                this.resetSession();
            }
        });
    }

    setupProfileForm() {
        const profileForm = document.getElementById('profile-form');
        if (!profileForm) return;

        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = this.getFormData(profileForm);
            const submitBtn = profileForm.querySelector('button[type="submit"]');
            
            this.setLoadingState(submitBtn, true);
            
            try {
                const response = await fetch('../php/update_profile.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showMessage('Profile updated successfully!', 'success');
                    this.loadUserProfile(); // Refresh user data
                } else {
                    this.showMessage('Error: ' + result.message, 'error');
                }
            } catch (error) {
                this.showMessage('An error occurred while updating profile.', 'error');
                console.error('Error:', error);
            } finally {
                this.setLoadingState(submitBtn, false);
                this.resetSession();
            }
        });
    }

    setupPasswordForm() {
        const passwordForm = document.getElementById('password-form');
        if (!passwordForm) return;

        passwordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = this.getFormData(passwordForm);
            
            // Validate passwords match
            if (formData.newPassword !== formData.confirmPassword) {
                this.showMessage('New passwords do not match.', 'error');
                return;
            }
            
            const submitBtn = passwordForm.querySelector('button[type="submit"]');
            this.setLoadingState(submitBtn, true);
            
            try {
                const response = await fetch('../php/change_password.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showMessage('Password changed successfully!', 'success');
                    passwordForm.reset();
                } else {
                    this.showMessage('Error: ' + result.message, 'error');
                }
            } catch (error) {
                this.showMessage('An error occurred while changing password.', 'error');
                console.error('Error:', error);
            } finally {
                this.setLoadingState(submitBtn, false);
                this.resetSession();
            }
        });
    }

    setupUserManagementForm() {
        // This would be for admin users to manage other users
        const userForm = document.getElementById('user-management-form');
        if (!userForm) return;

        // Implementation for user management
    }

    // File Upload
    setupFileUpload() {
        const fileInput = document.getElementById('excelFile');
        const uploadBtn = document.getElementById('uploadExcel');
        const uploadArea = document.querySelector('.file-upload-area');

        if (!fileInput || !uploadBtn) return;

        // Drag and drop functionality
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    this.handleFileUpload();
                }
            });

            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });
        }

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                this.handleFileUpload();
            }
        });

        uploadBtn.addEventListener('click', () => {
            this.handleFileUpload();
        });
    }

    async handleFileUpload() {
        const fileInput = document.getElementById('excelFile');
        const uploadBtn = document.getElementById('uploadExcel');
        
        if (!fileInput.files.length) {
            this.showMessage('Please select a file first.', 'error');
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('excel_file', file);

        this.setLoadingState(uploadBtn, true);

        try {
            const response = await fetch('../php/upload_excel.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showMessage('File uploaded and processed successfully!', 'success');
                fileInput.value = '';
                this.loadDashboardData(); // Refresh data
            } else {
                this.showMessage('Error: ' + result.message, 'error');
            }
        } catch (error) {
            this.showMessage('An error occurred while uploading the file.', 'error');
            console.error('Error:', error);
        } finally {
            this.setLoadingState(uploadBtn, false);
            this.resetSession();
        }
    }

    // Search and Filter
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const filterSelect = document.getElementById('filter-select');
        const searchBtn = document.getElementById('search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.debounce(() => this.performSearch(), 300);
            });
        }

        if (filterSelect) {
            filterSelect.addEventListener('change', () => {
                this.performSearch();
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }
    }

    performSearch() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const filterValue = document.getElementById('filter-select')?.value || '';

        let filteredVehicles = this.vehicles;

        // Apply search filter
        if (searchTerm) {
            filteredVehicles = filteredVehicles.filter(vehicle => 
                vehicle.description.toLowerCase().includes(searchTerm) ||
                vehicle.new_property_number.toLowerCase().includes(searchTerm) ||
                vehicle.driver_name.toLowerCase().includes(searchTerm) ||
                vehicle.location.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        if (filterValue) {
            filteredVehicles = filteredVehicles.filter(vehicle => 
                vehicle.condition_status === filterValue ||
                vehicle.center.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        this.displayVehiclesList(filteredVehicles);
    }

    // Vehicle List Management
    async loadVehiclesList() {
        try {
            const response = await fetch('../php/get_vehicles.php');
            const data = await response.json();
            
            if (data.success) {
                this.vehicles = data.data;
                this.displayVehiclesList(this.vehicles);
            }
        } catch (error) {
            console.error('Error loading vehicles:', error);
            this.showMessage('Error loading vehicles list.', 'error');
        }
    }

    displayVehiclesList(vehicles) {
        const container = document.querySelector('#manage-vehicles-page .data-grid');
        if (!container) return;

        if (vehicles.length === 0) {
            container.innerHTML = '<p class="text-center">No vehicles found.</p>';
            return;
        }

        container.innerHTML = `
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Property Number</th>
                            <th>Description</th>
                            <th>Driver</th>
                            <th>Location</th>
                            <th>Condition</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vehicles.map(vehicle => `
                            <tr>
                                <td>${vehicle.new_property_number}</td>
                                <td>${vehicle.description}</td>
                                <td>${vehicle.driver_name}</td>
                                <td>${vehicle.location}</td>
                                <td>
                                    <span class="status-badge status-${vehicle.condition_status}">
                                        ${vehicle.condition_status}
                                    </span>
                                </td>
                                <td>${new Date(vehicle.date_added).toLocaleDateString()}</td>
                                <td>
                                    <button class="btn btn-secondary btn-sm" onclick="dashboard.editVehicle(${vehicle.id})">
                                        Edit
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="dashboard.deleteVehicle(${vehicle.id})">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Settings Management
    loadSettings() {
        // Load user-specific settings based on role
        // This would include user management for admins
    }

    // User Profile
    async loadUserProfile() {
        // Load current user profile data
        // This would typically come from session or API call
    }

    // Utility Functions
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    setLoadingState(button, loading) {
        if (loading) {
            button.disabled = true;
            button.innerHTML = button.innerHTML + ' <div class="spinner-small"></div>';
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.innerHTML = button.innerHTML.replace(/<div class="spinner-small"><\/div>/, '');
            button.classList.remove('loading');
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = message;

        // Insert at top of current page
        const currentPageElement = document.querySelector('.page.active');
        if (currentPageElement) {
            currentPageElement.insertBefore(messageDiv, currentPageElement.firstChild);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    debounce(func, wait) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(func, wait);
    }

    // Event Listeners
    setupEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to log out?')) {
                    window.location.href = '../php/logout.php';
                }
            });
        }

        // Session refresh on user activity
        ['click', 'keypress', 'mousemove', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => this.resetSession());
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const sidenav = document.querySelector('.sidenav');
        
        if (menuToggle && sidenav) {
            menuToggle.addEventListener('click', () => {
                sidenav.classList.toggle('open');
            });
        }
    }

    // Vehicle Management Actions
    editVehicle(vehicleId) {
        // Implementation for editing vehicle
        console.log('Edit vehicle:', vehicleId);
    }

    deleteVehicle(vehicleId) {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            // Implementation for deleting vehicle
            console.log('Delete vehicle:', vehicleId);
        }
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new DashboardManager();
});

// Export for global access
window.dashboard = dashboard;