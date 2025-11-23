from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3

app = Flask(__name__, static_folder='.')
CORS(app)

# Simple authentication
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
        return jsonify({'success': True, 'role': data.get('userRole')})
    
    return jsonify({'success': False}), 401

# Inventory API
@app.route('/api/inventory')
def get_inventory():
    conn = sqlite3.connect('food_wastee.db')
    conn.row_factory = sqlite3.Row
    items = conn.execute('SELECT * FROM inventory').fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])

@app.route('/api/inventory', methods=['POST'])
def add_item():
    data = request.get_json()
    conn = sqlite3.connect('food_wastee.db')
    conn.execute('INSERT INTO inventory (item_name, category, quantity, expiry_date) VALUES (?, ?, ?, ?)',
                 (data['name'], data['category'], data['stock'], data['expiry']))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# Dashboard stats
@app.route('/api/stats')
def get_stats():
    return jsonify({
        'total_products': 1247,
        'near_expiry': 45,
        'expired': 12
    })

# Serve all files
@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True, port=5000)