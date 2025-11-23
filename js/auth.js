// Add API login to existing auth.js - PUT THIS AT THE TOP
async function handleLogin(username, password, userRole) {
    const result = await FoodSaveAPI.login(username, password, userRole);
    
    if (result.success) {
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        if (userRole === 'employee') {
            window.location.href = 'dashboard-employee.html';
        } else {
            window.location.href = 'index.html';
        }
        return true;
    }
    return false;
}

// Then find the login form in your existing code and modify it:
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userRole = document.getElementById('userRole').value;
            
            // Try API login first
            const apiSuccess = await handleLogin(username, password, userRole);
            
            if (!apiSuccess) {
                // Fallback to your original demo auth (keep your existing code here)
                if ((username === 'emp@foodsave.com' && password === 'pass123') ||
                    (username === 'manager@foodsave.com' && password === 'pass123') ||
                    (username === 'admin' && password === 'admin')) {
                    
                    localStorage.setItem('userRole', userRole);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', username);
                    
                    if (userRole === 'employee') {
                        window.location.href = 'dashboard-employee.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    alert('Invalid credentials');
                }
            }
        });
    }
    
    // Keep your existing auth check code below...
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userRole = document.getElementById('userRole').value;
            
            // Demo authentication
            if ((username === 'emp@foodsave.com' && password === 'pass123') ||
                (username === 'manager@foodsave.com' && password === 'pass123') ||
                (username === 'admin' && password === 'admin')) {
                
                // Store user info
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                
                // Redirect based on role
                if (userRole === 'employee') {
                    window.location.href = 'dashboard-employee.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('Invalid credentials. Please use:\nEmployee: emp@foodsave.com / pass123\nManager: manager@foodsave.com / pass123');
            }
        });
    }
    
    // Check if user is already logged in (on all pages)
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // User is logged in
        console.log('User is logged in as:', localStorage.getItem('userRole'));
    } else {
        // If not on login page, redirect to login
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
});