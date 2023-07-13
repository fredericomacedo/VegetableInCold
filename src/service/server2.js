const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'vegetable',
  password: 'vegetables',
  database: 'vegetables',
});

// Get all vegetables
app.get('/vegetables', (req, res) => {
  const query = 'SELECT * FROM Vegetables';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

// Get a specific vegetable by ID
app.get('/vegetables/:id', (req, res) => {
  const vegetableId = req.params.id;
  const query = 'SELECT * FROM Vegetables WHERE id = ?';
  const values = [vegetableId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Vegetable not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new vegetable
app.post('/vegetables', (req, res) => {
  const vegetable = req.body;
  const query = 'INSERT INTO Vegetables SET ?';

  pool.query(query, vegetable, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json({ id: results.insertId });
  });
});

// Update a vegetable
app.put('/vegetables/:id', (req, res) => {
  const vegetableId = req.params.id;
  const updatedVegetable = req.body;
  const query = 'UPDATE Vegetables SET ? WHERE id = ?';
  const values = [updatedVegetable, vegetableId];

  pool.query(query, values, (error) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json({ message: 'Vegetable updated successfully' });
  });
});

// Delete a vegetable
app.delete('/vegetables/:id', (req, res) => {
  const vegetableId = req.params.id;
  const query = 'DELETE FROM Vegetables WHERE id = ?';
  const values = [vegetableId];

  pool.query(query, values, (error) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json({ message: 'Vegetable deleted successfully' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
