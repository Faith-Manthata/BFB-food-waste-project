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