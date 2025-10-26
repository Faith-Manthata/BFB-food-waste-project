PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    expiry_date TEXT
);

CREATE TABLE IF NOT EXISTS inventory_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inventory_id INTEGER,
    movement_type TEXT NOT NULL,
    quantity REAL NOT NULL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(inventory_id) REFERENCES inventory(id)
);

INSERT INTO users (name, email, role)
VALUES ('Alice Manager', 'alice@example.com', 'manager');

INSERT INTO inventory (name, quantity, expiry_date)
VALUES 
('Apples', 50, '2025-11-01'),
('Tomatoes', 30, '2025-10-28');
