const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const port = 7005;

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

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to store location data
app.post('/store-location', (req, res) => {
  const { latitude, longitude } = req.body;

  // Insert the latitude, longitude, and timestamp into MySQL
  const query = 'INSERT INTO gps_records (Latitude, Longitude) VALUES (?, ?)';
  db.execute(query, [latitude, longitude], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error storing location data');
    }
    res.send('Location data stored successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
