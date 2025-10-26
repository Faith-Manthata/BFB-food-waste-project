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
-- Insert sample users
INSERT INTO users (username, password_hash, email, role) VALUES 
('admin', 'hashed_password_1', 'admin@bfb.com', 'manager'),
('employee1', 'hashed_password_2', 'emp1@bfb.com', 'employee'),
('employee2', 'hashed_password_3', 'emp2@bfb.com', 'employee');

-- Insert sample suppliers
INSERT INTO suppliers (supplier_name, contact_email, phone) VALUES 
('Fresh Farms Co.', 'contact@freshfarms.com', '555-0101'),
('Quality Meats Ltd.', 'sales@qualitymeats.com', '555-0102'),
('Dairy Delights Inc.', 'info@dairydelights.com', '555-0103');

-- Insert sample inventory
INSERT INTO inventory (item_name, category, quantity, expiry_date, supplier_id) VALUES 
('Organic Apples', 'Fruits', 150, '2024-02-15', 1),
('Chicken Breast', 'Meat', 75, '2024-01-20', 2),
('Whole Milk', 'Dairy', 50, '2024-01-25', 3),
('Carrots', 'Vegetables', 200, '2024-02-10', 1);

-- Insert sample waste records
INSERT INTO waste_records (item_id, quantity_wasted, reason, recorded_by) VALUES 
(1, 5, 'Bruised during transport', 2),
(2, 2, 'Approaching expiry date', 3),
(4, 8, 'Spoilage due to temperature fluctuation', 2);