# FoodSave Pro - Food Waste Reduction Platform

## Project BFB321 - Group 15
*University of Pretoria - Faculty of Engineering, Built Environment and Information Technology*

## 👥 Team Members
- **MASINGE T.E** - u22592220 (Database Architect & Backend Developer)
- **MANTHATA F** - u21574830 (Project Manager & Lead Developer)  
- **MAUBANE L.S** - u22629689 (Frontend Developer & UI/UX Designer)
- **CELE M.K** - u23749556 (Backend Developer & System Integration)

## 🚀 How to Run Our Application

### Quick Setup (4 Steps):
1. **Install Dependencies**: `pip install flask flask-cors`
2. **Initialize Database**: `python init_db.py`
3. **Start Server**: `python app.py`
4. **Open Browser**: Go to `http://localhost:5001/index.html`

### Login Credentials:
- **Manager**: `manager@foodsave.com` / `pass123`
- **Employee**: `emp@foodsave.com` / `pass123`
- **Admin**: `admin` / `admin`

## 🎯 About Our Project
FoodSave Pro is a full-stack web application that helps retailers reduce food waste through intelligent inventory management. The system provides real-time tracking of food products, predicts demand using AI algorithms, and sends automated alerts for expiring items. Managers get comprehensive analytics across multiple stores while employees can efficiently manage daily operations.

## 🛠 Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask, SQLite Database
- **API**: RESTful architecture with JWT authentication
- **Design**: Responsive web design with modern UI/UX

## 📋 Key Features
- **Role-based Dashboards**: Separate interfaces for managers and employees
- **Real-time Inventory Management**: Track stock levels and expiry dates
- **Demand Forecasting**: AI-powered predictions for better ordering
- **Expiry Alert System**: Automated notifications for soon-to-expire products
- **Live Analytics**: Real-time metrics and performance tracking
- **Multi-store Support**: Manage multiple retail locations

## 🗄 Database Schema
Our SQLite database includes four main tables:
- **users**: User accounts and authentication
- **inventory**: Product information and stock levels
- **waste_records**: Track wasted items and reasons
- **suppliers**: Supplier information and contacts

## 🔧 API Endpoints
- `POST /api/login` - User authentication
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Add new product
- `PUT /api/inventory/<id>` - Update product
- `GET /api/stats` - Get dashboard statistics

## 🐛 Troubleshooting Common Issues

**Port 5000 Already in Use:**
```bash
python app.py --port=8000

## Database Entity Relationship Diagram

```mermaid
erDiagram
    users {
        INTEGER user_id PK
        VARCHAR username UK
        VARCHAR password_hash
        VARCHAR email UK
        VARCHAR role
        DATETIME created_at
    }
    
    inventory {
        INTEGER item_id PK
        VARCHAR item_name
        VARCHAR category
        INTEGER quantity
        DATE expiry_date
        INTEGER supplier_id FK
        DATETIME added_date
        VARCHAR status
    }
    
    suppliers {
        INTEGER supplier_id PK
        VARCHAR supplier_name
        VARCHAR contact_email
        VARCHAR phone
    }
    
    waste_records {
        INTEGER waste_id PK
        INTEGER item_id FK
        INTEGER quantity_wasted
        TEXT reason
        DATETIME date_recorded
        INTEGER recorded_by FK
    }

    users ||--o{ waste_records : "records"
    suppliers ||--o{ inventory : "supplies"
    inventory ||--o{ waste_records : "wasted_from"