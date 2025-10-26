# Food Waste Reduction Platform

## Project BFB321 - Group 15
*University of Pretoria - Faculty of Engineering*  
*Built Environment and Information Technology*

### Team Members:
- MASINGE T.E - u22592220
- MANTHATA F - u21574830  
- MAUBANE L.S - u22629689
- CELE M.K - u23749556

### Project Overview
A web-based platform designed to reduce retail food waste through improved supply chain and inventory control. The system provides real-time inventory tracking, demand forecasting, and expiry alerts to help retailers minimize food waste.

### Features
- *Role-based Dashboard* (Employee & Manager views)
- *Real-time Inventory Management*
- *Demand Forecasting Module*
- *Expiry Alert System*
- *User Authentication*

### Technology Stack
- HTML5, CSS3, JavaScript
- Local Storage for data persistence
- Responsive Web Design

### How to Run
1. Clone this repository
2. Open login.html in a web browser
3. Use demo credentials:
   - Manager: manager@foodsave.com / pass123
   - Employee: emp@foodsave.com / pass123

### Project Structure
# BFB Food Waste Project

## Database Entity Relationship Diagram

```mermaid
erDiagram
    users {
        INTEGER user_id PK
        VARCHAR username
        VARCHAR password_hash
        VARCHAR email
        VARCHAR role
        DATETIME created_at
    }

    suppliers {
        INTEGER supplier_id PK
        VARCHAR supplier_name
        VARCHAR contact_email
        VARCHAR phone
    }

    inventory {
        INTEGER item_id PK
        VARCHAR item_name
        VARCHAR category
        INTEGER quantity
        DATE expiry_date
        INTEGER supplier_id FK
        DATETIME added_date
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
    inventory ||--o{ waste_records : "tracks_waste_for"
```