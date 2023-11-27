const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_management'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create a table for employees
db.query(`CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob DATE,
  salary DECIMAL(10, 2),
  joiningDate DATE,
  relievingDate DATE,
  contact VARCHAR(20),
  status ENUM('active', 'inactive') DEFAULT 'active'
)`, (err) => {
  if (err) {
    console.error('Error creating employees table:', err);
  } else {
    console.log('Employees table created');
  }
});

// Get all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Add a new employee
app.post('/api/employees', (req, res) => {
  const employee = req.body;
  db.query('INSERT INTO employees SET ?', employee, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      employee.id = result.insertId;
      res.json(employee);
    }
  });
});

// Edit an existing employee
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  db.query('UPDATE employees SET ? WHERE id = ?', [updates, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id, ...updates });
    }
  });
});

// Delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Employee deleted successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
