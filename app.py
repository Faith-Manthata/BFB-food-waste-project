from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__)

# Connect to database
def get_db():
    conn = sqlite3.connect('food_wastee.db')
    conn.row_factory = sqlite3.Row
    return conn

# API ROUTES
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    valid_users = {
        'emp@foodsave.com': 'pass123',
        'manager@foodsave.com': 'pass123',
        'admin': 'admin'
    }
    
    if username in valid_users and valid_users[username] == password:
        return jsonify({'success': True})
    return jsonify({'success': False})

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    conn = get_db()
    items = conn.execute('SELECT * FROM inventory').fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])

@app.route('/api/inventory', methods=['POST'])
def add_inventory():
    data = request.get_json()
    conn = get_db()
    conn.execute('INSERT INTO inventory (item_name, category, quantity, expiry_date) VALUES (?, ?, ?, ?)',
                (data['name'], data['category'], data['stock'], data['expiry']))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/stats')
def get_stats():
    return jsonify({
        'total_products': 1247,
        'near_expiry': 45,
        'expired': 12
    })

# Serve static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path == '':
        return send_from_directory('.', 'index.html')
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("🚀 FULL BACKEND RUNNING!")
    print("📍 OPEN: http://localhost:5000/login.html")
    app.run(port=5000)