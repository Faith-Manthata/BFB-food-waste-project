class FoodSaveAPI {
    static async login(username, password, userRole) {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password, userRole})
            });
            return await res.json();
        } catch {
            return {success: false};
        }
    }

    static async getInventory() {
        try {
            const res = await fetch('/api/inventory');
            return await res.json();
        } catch {
            return this.getSampleData();
        }
    }

    static async addItem(item) {
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item)
            });
            return await res.json();
        } catch {
            return {success: false};
        }
    }

    static getSampleData() {
        return [
            {id: 1, name: "Milk - 2%", category: "Dairy", stock: 45, expiry: "2024-01-15", status: "urgent"},
            {id: 2, name: "Chicken Breast", category: "Meat", stock: 23, expiry: "2024-01-18", status: "warning"},
            {id: 3, name: "Apples", category: "Produce", stock: 78, expiry: "2024-01-25", status: "safe"}
        ];
    }
}