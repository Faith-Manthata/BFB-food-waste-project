document.addEventListener('DOMContentLoaded', function() {
    console.log('Inventory management system loaded');
    
    // Sample inventory data
    const inventoryData = [
        {
            id: 1,
            name: "Milk - 2%",
            category: "Dairy",
            stock: 45,
            expiry: "2024-01-15",
            status: "urgent"
        },
        {
            id: 2,
            name: "Chicken Breast",
            category: "Meat",
            stock: 23,
            expiry: "2024-01-18",
            status: "warning"
        },
        {
            id: 3,
            name: "Whole Wheat Bread",
            category: "Bakery",
            stock: 15,
            expiry: "2024-01-17",
            status: "warning"
        },
        {
            id: 4,
            name: "Apples",
            category: "Produce",
            stock: 78,
            expiry: "2024-01-25",
            status: "safe"
        },
        {
            id: 5,
            name: "Yogurt",
            category: "Dairy",
            stock: 32,
            expiry: "2024-01-22",
            status: "safe"
        }
    ];

    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterInventory(searchTerm);
        });
    }

    // Category filter
    const categoryFilter = document.querySelector('.filter-select');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            filterInventoryByCategory(e.target.value);
        });
    }

    // Status filter
    const statusFilter = document.querySelectorAll('.filter-select')[1];
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            filterInventoryByStatus(e.target.value);
        });
    }

    function filterInventory(searchTerm) {
        const rows = document.querySelectorAll('.inventory-table tbody tr');
        
        rows.forEach(row => {
            const productName = row.cells[0].textContent.toLowerCase();
            const category = row.cells[1].textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || category.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function filterInventoryByCategory(category) {
        const rows = document.querySelectorAll('.inventory-table tbody tr');
        
        rows.forEach(row => {
            const rowCategory = row.cells[1].textContent;
            
            if (category === 'all' || rowCategory === category) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function filterInventoryByStatus(status) {
        const rows = document.querySelectorAll('.inventory-table tbody tr');
        
        rows.forEach(row => {
            const statusElement = row.querySelector('.status');
            const rowStatus = statusElement ? statusElement.className.replace('status ', '') : '';
            
            if (status === 'all' || rowStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Add product functionality
    const addProductBtn = document.querySelector('.btn-primary');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            const productName = prompt('Enter product name:');
            if (productName) {
                const category = prompt('Enter category (Dairy, Produce, Meat, Bakery, Deli):');
                const stock = prompt('Enter stock quantity:');
                const expiry = prompt('Enter expiry date (YYYY-MM-DD):');
                
                if (productName && category && stock && expiry) {
                    addNewProduct(productName, category, parseInt(stock), expiry);
                }
            }
        });
    }

    function addNewProduct(name, category, stock, expiry) {
        const tableBody = document.querySelector('.inventory-table tbody');
        const newRow = document.createElement('tr');
        
        // Determine status based on expiry date
        const today = new Date();
        const expiryDate = new Date(expiry);
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let status = 'safe';
        let statusClass = 'safe';
        let expiryClass = 'expiry-safe';
        
        if (daysUntilExpiry <= 0) {
            status = 'urgent';
            statusClass = 'urgent';
            expiryClass = 'expiry-urgent';
        } else if (daysUntilExpiry <= 3) {
            status = 'warning';
            statusClass = 'warning';
            expiryClass = 'expiry-warning';
        }
        
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td>${stock} units</td>
            <td class="${expiryClass}">${expiry}</td>
            <td><span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
            <td>
                <button class="btn-small" onclick="editProduct(this)">Edit</button>
                <button class="btn-small ${status === 'urgent' ? 'danger' : status === 'warning' ? 'warning' : ''}" 
                        onclick="applyAction(this, '${status}')">
                    ${status === 'urgent' ? 'Discount' : status === 'warning' ? 'Promote' : 'View'}
                </button>
            </td>
        `;
        
        tableBody.appendChild(newRow);
        alert(`Product "${name}" added successfully!`);
    }

    // Edit product function
    window.editProduct = function(button) {
        const row = button.closest('tr');
        const cells = row.cells;
        
        const currentName = cells[0].textContent;
        const currentCategory = cells[1].textContent;
        const currentStock = cells[2].textContent.replace(' units', '');
        const currentExpiry = cells[3].textContent;
        
        const newName = prompt('Edit product name:', currentName);
        if (newName) {
            const newCategory = prompt('Edit category:', currentCategory);
            const newStock = prompt('Edit stock quantity:', currentStock);
            const newExpiry = prompt('Edit expiry date (YYYY-MM-DD):', currentExpiry);
            
            if (newName && newCategory && newStock && newExpiry) {
                cells[0].textContent = newName;
                cells[1].textContent = newCategory;
                cells[2].textContent = newStock + ' units';
                cells[3].textContent = newExpiry;
                
                // Update status based on new expiry
                updateProductStatus(row, newExpiry);
                
                alert('Product updated successfully!');
            }
        }
    };

    function updateProductStatus(row, expiry) {
        const statusCell = row.cells[4];
        const actionCell = row.cells[5];
        const today = new Date();
        const expiryDate = new Date(expiry);
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let status = 'safe';
        let statusClass = 'safe';
        let expiryClass = 'expiry-safe';
        let actionText = 'View';
        let actionClass = '';
        
        if (daysUntilExpiry <= 0) {
            status = 'urgent';
            statusClass = 'urgent';
            expiryClass = 'expiry-urgent';
            actionText = 'Discount';
            actionClass = 'danger';
        } else if (daysUntilExpiry <= 3) {
            status = 'warning';
            statusClass = 'warning';
            expiryClass = 'expiry-warning';
            actionText = 'Promote';
            actionClass = 'warning';
        }
        
        // Update status cell
        statusCell.innerHTML = `<span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
        
        // Update expiry date class
        row.cells[3].className = expiryClass;
        
        // Update action button
        const actionButton = actionCell.querySelector('.btn-small:last-child');
        actionButton.textContent = actionText;
        actionButton.className = `btn-small ${actionClass}`;
        actionButton.onclick = function() { applyAction(this, status); };
    }

    // Apply action function
    window.applyAction = function(button, status) {
        const row = button.closest('tr');
        const productName = row.cells[0].textContent;
        
        switch(status) {
            case 'urgent':
                if (confirm(`Apply 50% discount to ${productName}?`)) {
                    alert(`50% discount applied to ${productName}!`);
                    // Here you would typically update the database
                }
                break;
            case 'warning':
                if (confirm(`Create promotion for ${productName}?`)) {
                    alert(`Promotion created for ${productName}!`);
                    // Here you would typically update the database
                }
                break;
            default:
                alert(`Viewing details for ${productName}`);
                break;
        }
    };

    // Export functionality
    const exportBtn = document.querySelector('.btn-secondary');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Generating inventory report...\nReport will be downloaded shortly.');
            // Simulate report generation
            setTimeout(() => {
                alert('Inventory report downloaded successfully!');
            }, 2000);
        });
    }

    console.log('Inventory management system ready');
});