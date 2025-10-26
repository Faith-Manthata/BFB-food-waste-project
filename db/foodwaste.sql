PRAGMA foreign_keys = ON;

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Vendors (food suppliers/donors)
CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendor_name TEXT NOT NULL,
    contact_email TEXT
);

-- Products (inventory)
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    vendor_id INTEGER,
    quantity INTEGER NOT NULL,
    expiry_date TEXT,
    FOREIGN KEY (category_id) REFERENCES product_categories(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

-- Inventory history (IN/OUT)
CREATE TABLE IF NOT EXISTS stock_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    change_amount INTEGER NOT NULL,
    update_type TEXT CHECK (update_type IN ('IN','OUT')) NOT NULL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample Data
INSERT INTO product_categories (name) VALUES
('Fruit'), ('Vegetables'), ('Dairy'), ('Bakery'), ('Canned Food');

INSERT INTO vendors (vendor_name, contact_email) VALUES
('FoodBank SA', 'contact@foodbank.co.za');

INSERT INTO products (name, category_id, vendor_id, quantity, expiry_date) VALUES
('Apples', 1, 1, 50, '2025-11-01'),
('Tomatoes', 2, 1, 30, '2025-10-28'),
('Milk 1L', 3, 1, 20, '2025-10-30');

INSERT INTO stock_updates (product_id, change_amount, update_type) VALUES
(1, 50, 'IN'),
(2, 30, 'IN'),
(3, 20, 'IN');
