document.addEventListener('DOMContentLoaded', function() {
    console.log('FoodSave Pro - Main application loaded');
    
    // Check authentication status
    checkAuthStatus();
    
    // Initialize dashboard functionality
    initializeDashboard();
    
    // Add navigation active state
    updateActiveNav();
    
    // Add interactive elements
    initializeInteractiveElements();
});

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Redirect to login if not authenticated
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    console.log(`User logged in as: ${userRole}`);
    
    // Update UI based on user role
    updateUIForUserRole(userRole);
}

function updateUIForUserRole(role) {
    const userInfoElements = document.querySelectorAll('.user-info');
    
    userInfoElements.forEach(element => {
        if (element.querySelector('span')) {
            const currentText = element.querySelector('span').textContent;
            if (!currentText.includes(role)) {
                element.querySelector('span').textContent = `${currentText} (${role.charAt(0).toUpperCase() + role.slice(1)})`;
            }
        }
    });
    
    // Show/hide elements based on role
    if (role === 'employee') {
        // Hide manager-only features
        const managerElements = document.querySelectorAll('.manager-only');
        managerElements.forEach(el => el.style.display = 'none');
    }
}

function initializeDashboard() {
    // Update real-time stats
    updateDashboardStats();
    
    // Initialize category cards
    initializeCategoryCards();
    
    // Initialize alerts
    initializeAlerts();
    
    // Initialize forecasting
    initializeForecasting();
}

function updateDashboardStats() {
    // Simulate real-time data updates
    setInterval(() => {
        const totalProducts = Math.floor(1200 + Math.random() * 100);
        const nearExpiry = Math.floor(40 + Math.random() * 20);
        const expired = Math.floor(10 + Math.random() * 5);
        
        // Update stat cards if they exist
        const totalProductsEl = document.querySelector('.stat-number:not(.warning):not(.danger)');
        const nearExpiryEl = document.querySelector('.stat-number.warning');
        const expiredEl = document.querySelector('.stat-number.danger');
        
        if (totalProductsEl) totalProductsEl.textContent = totalProducts.toLocaleString();
        if (nearExpiryEl) nearExpiryEl.textContent = nearExpiry;
        if (expiredEl) expiredEl.textContent = expired;
        
    }, 5000); // Update every 5 seconds
}

function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const stockLevel = this.querySelector('.level').textContent;
            const expiryCount = this.querySelector('.expiry-count').textContent;
            
            alert(`Category: ${category}\nStock Level: ${stockLevel}\n${expiryCount}`);
            
            // Navigate to inventory with filter applied
            // window.location.href = `inventory.html?category=${category}`;
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initializeAlerts() {
    const alertItems = document.querySelectorAll('.alert-item');
    
    alertItems.forEach(alert => {
        alert.addEventListener('click', function() {
            const productName = this.querySelector('h4').textContent;
            const expiryInfo = this.querySelector('p').textContent;
            const category = this.querySelector('.alert-category').textContent;
            
            if (this.classList.contains('urgent')) {
                const action = confirm(`URGENT: ${productName} expires today!\n\nTake action now?`);
                if (action) {
                    window.location.href = 'alerts.html';
                }
            } else {
                alert(`Alert: ${productName}\n${expiryInfo}\nCategory: ${category}`);
            }
        });
    });
}

function initializeForecasting() {
    const forecastButton = document.querySelector('.forecasting-panel .view-all');
    if (forecastButton) {
        forecastButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Opening detailed forecasting analysis...');
            window.location.href = 'forecasting.html';
        });
    }
    
    // Animate forecast chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        // Set initial height to 0
        const targetHeight = bar.style.height;
        bar.style.height = '0%';
        
        // Animate to target height
        setTimeout(() => {
            bar.style.transition = 'height 1s ease';
            bar.style.height = targetHeight;
        }, index * 200);
    });
}

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializeInteractiveElements() {
    // Role switching functionality
    const switchButtons = document.querySelectorAll('.btn-secondary, .btn-primary');
    switchButtons.forEach(button => {
        if (button.textContent.includes('Employee') || button.textContent.includes('Manager')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetRole = this.textContent.includes('Employee') ? 'employee' : 'manager';
                
                if (confirm(`Switch to ${targetRole} view?`)) {
                    localStorage.setItem('userRole', targetRole);
                    if (targetRole === 'employee') {
                        window.location.href = 'dashboard-employee.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }
            });
        }
    });
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('.logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                // Clear authentication data
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userRole');
                localStorage.removeItem('username');
                
                // Redirect to login
                window.location.href = 'login.html';
            }
        });
    });
    
    // Add loading states to buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading animation
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Restore after 2 seconds (simulate action)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function calculateDaysUntilExpiry(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        border-left: 4px solid ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : '#3498db'};
        z-index: 1000;
        max-width: 300px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Export functions for use in other modules
window.FoodSaveApp = {
    showNotification,
    formatDate,
    calculateDaysUntilExpiry
};

console.log('Main application initialized successfully');