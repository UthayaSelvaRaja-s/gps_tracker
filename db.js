const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default MySQL user in XAMPP
  password: "", // Default password is empty in XAMPP
  database: "gps_tracker_db",
  port: 3306, // Default MySQL port in XAMPP
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully!");
  }
});

module.exports = db;
