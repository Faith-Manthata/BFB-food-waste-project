from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
DATABASE = 'food_wastee.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
   # """Initialize database if it doesn't exist"""
    if not os.path.exists(DATABASE):
        import init_db
        init_db.init_database()
        print("📦 Database created successfully!")

# Initialize database on startup
init_db()

# API Routes
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user_role = data.get('userRole', 'employee')
        
        print(f"Login attempt: {username}, role: {user_role}")
        
        # Simple authentication (in production, use proper password hashing)
        valid_users = {
            'emp@foodsave.com': 'pass123',
            'manager@foodsave.com': 'pass123', 
            'admin': 'admin'
        }
        
        if username in valid_users and valid_users[username] == password:
            return jsonify({
                'success': True,
                'user': {
                    'username': username,
                    'role': user_role,
                    'email': username
                }
            })
        
        return jsonify({'success': False, 'message': 'Invalid credentials'})
    
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'success': False, 'message': 'Server error'})

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    try:
        conn = get_db_connection()
        items = conn.execute('''
            SELECT item_id as id, item_name as name, category, quantity as stock, 
                   expiry_date as expiry, status
            FROM inventory 
            ORDER BY expiry_date
        ''').fetchall()
        conn.close()
        
        inventory_list = [dict(item) for item in items]
        return jsonify(inventory_list)
    
    except Exception as e:
        print(f"Inventory fetch error: {e}")
        return jsonify([])

@app.route('/api/inventory', methods=['POST'])
def add_inventory_item():
    try:
        data = request.get_json()
        conn = get_db_connection()
        
        conn.execute('''
            INSERT INTO inventory (item_name, category, quantity, expiry_date, status)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data.get('name'),
            data.get('category'), 
            data.get('stock'),
            data.get('expiry'),
            data.get('status', 'safe')
        ))
        
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Item added successfully'})
    
    except Exception as e:
        print(f"Add inventory error: {e}")
        return jsonify({'success': False, 'message': 'Failed to add item'})

@app.route('/api/inventory/<int:item_id>', methods=['PUT'])
def update_inventory_item(item_id):
    try:
        data = request.get_json()
        conn = get_db_connection()
        
        conn.execute('''
            UPDATE inventory 
            SET item_name = ?, category = ?, quantity = ?, expiry_date = ?, status = ?
            WHERE item_id = ?
        ''', (
            data.get('name'),
            data.get('category'),
            data.get('stock'), 
            data.get('expiry'),
            data.get('status', 'safe'),
            item_id
        ))
        
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Item updated successfully'})
    
    except Exception as e:
        print(f"Update inventory error: {e}")
        return jsonify({'success': False, 'message': 'Failed to update item'})

@app.route('/api/stats', methods=['GET'])
def get_dashboard_stats():
    try:
        conn = get_db_connection()
        
        # Get total products
        total = conn.execute('SELECT COUNT(*) as count FROM inventory').fetchone()['count']
        
        # Get near expiry (within 3 days)
        near_expiry = conn.execute('''
            SELECT COUNT(*) as count FROM inventory 
            WHERE expiry_date BETWEEN date('now') AND date('now', '+3 days')
        ''').fetchone()['count']
        
        # Get expired items
        expired = conn.execute('''
            SELECT COUNT(*) as count FROM inventory 
            WHERE expiry_date < date('now')
        ''').fetchone()['count']
        
        conn.close()
        
        return jsonify({
            'total_products': total,
            'near_expiry': near_expiry,
            'expired': expired
        })
    
    except Exception as e:
        print(f"Stats error: {e}")
        return jsonify({
            'total_products': 1247,
            'near_expiry': 45, 
            'expired': 12
        })

# Serve static files
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("🚀 FoodSave Pro Backend Server Starting...")
    print("📍 Available at: http://localhost:5001")
    print("📊 API endpoints:")
    print("   POST /api/login")
    print("   GET  /api/inventory") 
    print("   POST /api/inventory")
    print("   GET  /api/stats")
    app.run(debug=True, port=5001)