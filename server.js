const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12788074',
  password: 'pVac3jPV4d',
  database: 'sql12788074',
});

// ✅ Registration API
app.post('/api/register', (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  db.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
    [first_name, last_name, email, password],
    (err) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      return res.json({ success: true });
    }
  );
});

// ✅ Login API
app.post('/api/login-auth', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err || results.length === 0) {
        return res.json({ success: false });
      } else {
        return res.json({ success: true });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
