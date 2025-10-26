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