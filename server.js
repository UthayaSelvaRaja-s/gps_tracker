const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
// const db = mysql.createConnection({
//   host: "127.0.0.1", // Change if using an external DB
//   user: "root",
//   password: "", // Add your MySQL password
//   database: "gps_tracker_db", // Database Name
// });
// MySQL connection
const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',   // Use your MySQL username
//   password: '',   // Use your MySQL password
//   database: 'gpsData'
     host: "210.18.139.40",
    user: "root",
    password: "nastaf@321!",
    database: "jessycabs_db"
});

db.connect((err) => {
  if (err) console.error("Database Connection Failed:", err);
  else console.log("Connected to MySQL Database");
});

// API Route to Receive GPS Data
app.post("/api/gps", (req, res) => {
  const { latitude, longitude, altitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing GPS data" });
  }

  const sql = "INSERT INTO gps_data (latitude, longitude, altitude) VALUES (?, ?, ?)";
  db.query(sql, [latitude, longitude, altitude], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "GPS data stored successfully" });
  });
});

// Start Server
const PORT = process.env.PORT || 7005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
