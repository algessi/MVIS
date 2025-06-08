// Enhanced Application JavaScript
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormSwitching();
        this.setupPasswordToggles();
        this.setupFormSubmissions();
        this.setupValidation();
        this.setInitialFocus();
    }

    // Form visibility functions
    showLogin() {
        this.hideAllForms();
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('username').focus();
    }

    showRegistration() {
        this.hideAllForms();
        document.getElementById('registration-container').classList.remove('hidden');
        document.getElementById('reg-fullname').focus();
    }

    showForgotPassword() {
        this.hideAllForms();
        document.getElementById('forgot-password-container').classList.remove('hidden');
        document.getElementById('reset-email').focus();
    }

    hideAllForms() {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('registration-container').classList.add('hidden');
        document.getElementById('forgot-password-container').classList.add('hidden');
    }

    setupFormSwitching() {
        // Make functions globally available
        window.showLogin = () => this.showLogin();
        window.showRegistration = () => this.showRegistration();
        window.showForgotPassword = () => this.showForgotPassword();
    }

    // Password toggle functionality
    setupPasswordToggles() {
        const toggleButtons = document.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            button.innerHTML = '👁';
            
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '👁' : '🙈';
            });
        });
    }

    // Form submission handling
    setupFormSubmissions() {
        this.setupLoginForm();
        this.setupRegistrationForm();
        this.setupForgotPasswordForm();
    }

    setupLoginForm() {
        const loginForm = document.getElementById('login-form');
        if (!loginForm) return;

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = loginForm.querySelector('#username').value;
            const password = loginForm.querySelector('#password').value;
            
            if (!this.validateLoginForm(username, password)) {
                return;
            }
            
            const submitButton = loginForm.querySelector('.primary-button');
            this.setLoadingState(submitButton, true);
            
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                
                const response = await fetch('php/login.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.text();
                
                if (data.trim() === 'success') {
                    this.showMessage('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'php/dashboard.php';
                    }, 1000);
                } else {
                    this.showError(loginForm, data);
                }
            } catch (error) {
                this.showError(loginForm, 'Network error. Please try again.');
                console.error('Login error:', error);
            } finally {
                this.setLoadingState(submitButton, false);
            }
        });
    }

    setupRegistrationForm() {
        const registrationForm = document.getElementById('registration-form');
        if (!registrationForm) return;

        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = this.getFormData(registrationForm);
            
            if (!this.validateRegistrationForm(formData)) {
                return;
            }
            
            const submitButton = registrationForm.querySelector('.primary-button');
            this.setLoadingState(submitButton, true);
            
            try {
                const response = await fetch('php/register.php', {
                    method: 'POST',
                    body: new FormData(registrationForm)
                });
                
                const data = await response.text();
                
                if (data.trim() === 'success') {
                    this.showMessage('Registration successful! Please sign in.', 'success');
                    setTimeout(() => {
                        this.showLogin();
                    }, 2000);
                } else {
                    this.showError(registrationForm, data);
                }
            } catch (error) {
                this.showError(registrationForm, 'Network error. Please try again.');
                console.error('Registration error:', error);
            } finally {
                this.setLoadingState(submitButton, false);
            }
        });
    }

    setupForgotPasswordForm() {
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        if (!forgotPasswordForm) return;

        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = forgotPasswordForm.querySelector('#reset-email').value;
            
            if (!this.validateEmail(email)) {
                this.showError(forgotPasswordForm, 'Please enter a valid email address');
                return;
            }
            
            const submitButton = forgotPasswordForm.querySelector('.primary-button');
            this.setLoadingState(submitButton, true);
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                this.showMessage(`Password reset instructions have been sent to ${email}`, 'success');
                setTimeout(() => {
                    this.showLogin();
                }, 3000);
            } catch (error) {
                this.showError(forgotPasswordForm, 'Error sending reset email. Please try again.');
                console.error('Password reset error:', error);
            } finally {
                this.setLoadingState(submitButton, false);
            }
        });
    }

    // Validation
    setupValidation() {
        // Real-time validation for registration form
        const regForm = document.getElementById('registration-form');
        if (regForm) {
            const passwordInput = regForm.querySelector('#reg-password');
            const emailInput = regForm.querySelector('#reg-email');
            const usernameInput = regForm.querySelector('#reg-username');

            if (passwordInput) {
                passwordInput.addEventListener('input', () => {
                    this.validatePasswordStrength(passwordInput);
                });
            }

            if (emailInput) {
                emailInput.addEventListener('blur', () => {
                    this.validateEmailField(emailInput);
                });
            }

            if (usernameInput) {
                usernameInput.addEventListener('blur', () => {
                    this.validateUsernameField(usernameInput);
                });
            }
        }
    }

    validateLoginForm(username, password) {
        if (!username || !password) {
            this.showError(document.getElementById('login-form'), 'Please enter both username and password');
            return false;
        }
        return true;
    }

    validateRegistrationForm(formData) {
        if (!formData.fullname || !formData.email || !formData.username || !formData.password) {
            this.showError(document.getElementById('registration-form'), 'All fields are required');
            return false;
        }
        
        if (!this.validateEmail(formData.email)) {
            this.showError(document.getElementById('registration-form'), 'Please enter a valid email address');
            return false;
        }
        
        if (!this.validatePassword(formData.password)) {
            this.showError(document.getElementById('registration-form'), 'Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters');
            return false;
        }
        
        return true;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }

    validatePasswordStrength(passwordInput) {
        const password = passwordInput.value;
        const strength = this.getPasswordStrength(password);
        
        // Remove existing strength indicator
        const existingIndicator = passwordInput.parentElement.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        if (password.length > 0) {
            const indicator = document.createElement('div');
            indicator.className = `password-strength strength-${strength.level}`;
            indicator.innerHTML = `
                <div class="strength-bar">
                    <div class="strength-fill" style="width: ${strength.percentage}%"></div>
                </div>
                <span class="strength-text">${strength.text}</span>
            `;
            passwordInput.parentElement.appendChild(indicator);
        }
    }

    getPasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        const levels = [
            { level: 'weak', text: 'Weak', percentage: 20 },
            { level: 'fair', text: 'Fair', percentage: 40 },
            { level: 'good', text: 'Good', percentage: 60 },
            { level: 'strong', text: 'Strong', percentage: 80 },
            { level: 'very-strong', text: 'Very Strong', percentage: 100 }
        ];
        
        return levels[Math.min(score - 1, 4)] || levels[0];
    }

    validateEmailField(emailInput) {
        const email = emailInput.value;
        const isValid = this.validateEmail(email);
        
        this.setFieldValidation(emailInput, isValid, isValid ? '' : 'Please enter a valid email address');
    }

    validateUsernameField(usernameInput) {
        const username = usernameInput.value;
        const isValid = username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
        
        this.setFieldValidation(usernameInput, isValid, isValid ? '' : 'Username must be at least 3 characters and contain only letters, numbers, and underscores');
    }

    setFieldValidation(field, isValid, message) {
        field.classList.toggle('invalid', !isValid);
        field.classList.toggle('valid', isValid);
        
        // Remove existing validation message
        const existingMessage = field.parentElement.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (!isValid && message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'validation-message';
            messageElement.textContent = message;
            field.parentElement.appendChild(messageElement);
        }
    }

    // Utility functions
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    setLoadingState(button, loading) {
        const spinner = button.querySelector('.spinner');
        const buttonText = button.querySelector('span');
        
        if (loading) {
            button.disabled = true;
            if (spinner) spinner.style.display = 'block';
            if (buttonText) buttonText.textContent = 'Processing...';
            button.classList.add('loading');
        } else {
            button.disabled = false;
            if (spinner) spinner.style.display = 'none';
            if (buttonText) {
                // Reset text based on form type
                if (button.closest('#login-form')) {
                    buttonText.textContent = 'Sign In';
                } else if (button.closest('#registration-form')) {
                    buttonText.textContent = 'Register';
                } else if (button.closest('#forgot-password-form')) {
                    buttonText.textContent = 'Reset Password';
                }
            }
            button.classList.remove('loading');
        }
    }

    showError(form, message) {
        this.showMessage(message, 'error', form);
    }

    showMessage(message, type = 'info', container = null) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <span>${message}</span>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Insert message
        const targetContainer = container || document.querySelector('.form-container:not(.hidden)');
        if (targetContainer) {
            targetContainer.insertBefore(messageDiv, targetContainer.firstChild);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }

    setInitialFocus() {
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.focus();
        }
    }
}

// Enhanced animations and interactions
class UIEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
        this.setupThemeToggle();
    }

    setupAnimations() {
        // Staggered form field animations
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.primary-button, .link-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-1px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });

        // Input focus animations
        const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    setupKeyboardNavigation() {
        // Enter key navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                const form = e.target.closest('form');
                if (form) {
                    const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]'));
                    const currentIndex = inputs.indexOf(e.target);
                    
                    if (currentIndex < inputs.length - 1) {
                        e.preventDefault();
                        inputs[currentIndex + 1].focus();
                    }
                }
            }
        });

        // Escape key to close messages
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const messages = document.querySelectorAll('.message');
                messages.forEach(msg => msg.remove());
            }
        });
    }

    setupAccessibility() {
        // High contrast mode detection
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }

        // Reduced motion detection
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }

        // Focus management
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = Array.from(document.querySelectorAll(focusableElements));
                const currentIndex = focusable.indexOf(document.activeElement);
                
                if (e.shiftKey) {
                    // Shift + Tab (backwards)
                    if (currentIndex <= 0) {
                        e.preventDefault();
                        focusable[focusable.length - 1].focus();
                    }
                } else {
                    // Tab (forwards)
                    if (currentIndex >= focusable.length - 1) {
                        e.preventDefault();
                        focusable[0].focus();
                    }
                }
            }
        });
    }

    setupThemeToggle() {
        // Auto dark mode based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        }

        // Listen for theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            document.body.classList.toggle('dark-theme', e.matches);
        });
    }
}

// Initialize application
let authManager;
let uiEnhancements;

document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
    uiEnhancements = new UIEnhancements();
    
    // Show login form by default
    authManager.showLogin();
    
    console.log('Motor Vehicle Inventory System initialized');
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    
    // Show user-friendly error message
    if (authManager) {
        authManager.showMessage('An unexpected error occurred. Please refresh the page and try again.', 'error');
    }
});

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}