import sqlite3
import os

def init_database():
    # Remove existing database if it exists
    if os.path.exists('food_wastee.db'):
        os.remove('food_wastee.db')
    
    conn = sqlite3.connect('food_wastee.db')
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
        CREATE TABLE users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            role VARCHAR(20) NOT NULL CHECK(role IN ('manager', 'employee')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE suppliers (
            supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplier_name VARCHAR(100) NOT NULL,
            contact_email VARCHAR(100),
            phone VARCHAR(20)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE inventory (
            item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name VARCHAR(100) NOT NULL,
            category VARCHAR(50) NOT NULL,
            quantity INTEGER NOT NULL,
            expiry_date DATE NOT NULL,
            supplier_id INTEGER,
            added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(20) DEFAULT 'safe',
            FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE waste_records (
            waste_id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER NOT NULL,
            quantity_wasted INTEGER NOT NULL,
            reason TEXT,
            date_recorded DATETIME DEFAULT CURRENT_TIMESTAMP,
            recorded_by INTEGER NOT NULL,
            FOREIGN KEY (item_id) REFERENCES inventory(item_id)
        )
    ''')
    
    # Insert sample data
    cursor.execute("INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)", 
                   ('emp@foodsave.com', 'pass123', 'emp@foodsave.com', 'employee'))
    
    cursor.execute("INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)", 
                   ('manager@foodsave.com', 'pass123', 'manager@foodsave.com', 'manager'))
    
    cursor.execute("INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)", 
                   ('admin', 'admin', 'admin@foodsave.com', 'manager'))
    
    # Insert sample inventory
    sample_inventory = [
        ('Milk - 2%', 'Dairy', 45, '2024-01-15', None, 'urgent'),
        ('Chicken Breast', 'Meat', 23, '2024-01-18', None, 'warning'),
        ('Whole Wheat Bread', 'Bakery', 15, '2024-01-17', None, 'warning'),
        ('Apples', 'Produce', 78, '2024-01-25', None, 'safe'),
        ('Yogurt', 'Dairy', 32, '2024-01-22', None, 'safe')
    ]
    
    cursor.executemany('''
        INSERT INTO inventory (item_name, category, quantity, expiry_date, supplier_id, status)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', sample_inventory)
    
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully!")

if __name__ == '__main__':
    init_database()