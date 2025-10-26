const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'foodwaste.db');
const db = new sqlite3.Database(dbPath);

const migration = fs.readFileSync(path.resolve(__dirname, 'migrations.sql'), 'utf8');
db.exec(migration);

module.exports = db;
