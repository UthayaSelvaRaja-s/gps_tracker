
    const express = require("express");
    const mysql = require("mysql2");
    const app = express();



    db.connect((err) => {
        if (err) {
            console.error("Database connection failed:", err);
        } else {
            console.log("Connected to MySQL");
        }
    });

    // Middleware to parse JSON data
    app.use(express.json());

    // API endpoint to receive GPS data
    app.get("/api/gpsdata", (req, res) => {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: "Latitude and Longitude are required" });
        }

        const sql = "INSERT INTO gps_data (Latitude, Longitude, timestampdata) VALUES (?, ?, NOW())";
        db.query(sql, [lat, lng], (err, result) => {
            if (err) {
                console.error("Error inserting GPS data:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "GPS data stored successfully", id: result.insertId });
        });
    });

    // Start the server
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });

