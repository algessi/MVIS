// Session Management
let sessionTimeout;
const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes

function resetSession() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(handleSessionTimeout, SESSION_DURATION);
    updateSessionTimer(SESSION_DURATION);
}

function handleSessionTimeout() {
    alert('Your session has expired. Please log in again.');
    window.location.href = '../index.html';
}

function updateSessionTimer(duration) {
    const timerElement = document.getElementById('session-timer');
    let timeLeft = duration;

    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft -= 1000;
            setTimeout(updateDisplay, 1000);
        }
    };

    updateDisplay();
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show corresponding page
            const targetPage = item.getAttribute('data-page');
            pages.forEach(page => {
                page.classList.add('hidden');
                if (page.id === `${targetPage}-page`) {
                    page.classList.remove('hidden');
                }
            });

            resetSession();
        });
    });
}

// Form Handling
function setupForms() {
    const vehicleForm = document.getElementById('vehicle-form');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                oldPropertyNumber: document.getElementById('oldPropertyNumber').value,
                description: document.getElementById('description').value,
                acquiredDate: document.getElementById('acquiredDate').value,
                estimatedLife: document.getElementById('estimatedLife').value,
                center: document.getElementById('center').value,
                acquisitionCost: document.getElementById('acquisitionCost').value,
                carryingAmount: document.getElementById('carryingAmount').value,
                newPropertyNumber: document.getElementById('newPropertyNumber').value,
                location: document.getElementById('location').value,
                condition: document.getElementById('condition').value,
                remarks: document.getElementById('remarks').value,
                driverName: document.getElementById('driverName').value,
                registeredName: document.getElementById('registeredName').value,
                certificateNumber: document.getElementById('certificateNumber').value
            };

            // Send to backend
            fetch('../php/save_vehicle.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Vehicle data saved successfully!');
                    vehicleForm.reset();
                } else {
                    alert('Error saving vehicle data: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving the data.');
            });

            resetSession();
        });
    }

    // Profile form handling
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle profile update
            resetSession();
        });
    }

    // Password form handling
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle password change
            resetSession();
        });
    }
}

// Excel Upload Handling
function setupExcelUpload() {
    const uploadButton = document.getElementById('uploadExcel');
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            const fileInput = document.getElementById('excelFile');
            const file = fileInput.files[0];

            if (!file) {
                alert('Please select a file first.');
                return;
            }

            const formData = new FormData();
            formData.append('excel_file', file);

            fetch('../php/upload_excel.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('File uploaded and processed successfully!');
                    fileInput.value = '';
                } else {
                    alert('Error processing file: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while uploading the file.');
            });

            resetSession();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupForms();
    setupExcelUpload();
    resetSession();

    // Set up session refresh on user activity
    ['click', 'keypress', 'mousemove', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetSession);
    });

    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                window.location.href = '../php/logout.php';
            }
        });
    }
});