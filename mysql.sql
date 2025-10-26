-- Users Table
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK(role IN ('manager', 'employee')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE inventory (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    expiry_date DATE NOT NULL,
    supplier_id INTEGER,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- Waste Records Table
CREATE TABLE waste_records (
    waste_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    quantity_wasted INTEGER NOT NULL,
    reason TEXT,
    date_recorded DATETIME DEFAULT CURRENT_TIMESTAMP,
    recorded_by INTEGER NOT NULL,
    FOREIGN KEY (item_id) REFERENCES inventory(item_id),
    FOREIGN KEY (recorded_by) REFERENCES users(user_id)
);

-- Suppliers Table (Additional table for normalization)
CREATE TABLE suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100),
    phone VARCHAR(20)
);