const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'cst8334',
  password: 'cst8334',
  database: 'vms_blockchain',
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [rows] = await connection.query('SELECT * FROM User');

    // Release the connection
    connection.release();

    // Send the rows as a JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query with the user ID as a parameter
    const [rows] = await connection.query('SELECT * FROM User WHERE user_id = ?', [userId]);

    // Release the connection
    connection.release();

    if (rows.length > 0) {
      // Send the user as a JSON response
      res.json(rows[0]);
    } else {
      // User not found, send a 404 response
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { last_name, first_name, email, phone } = req.body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query with the user data as parameters
    await connection.query(
      'INSERT INTO User (last_name, first_name, email, phone) VALUES (?, ?, ?, ?)',
      [last_name, first_name, email, phone]
    );

    // Release the connection
    connection.release();

    // Send a success response
    res.sendStatus(201);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an existing user
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { last_name, first_name, email, phone } = req.body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query with the user data and ID as parameters
    await connection.query(
      'UPDATE User SET last_name = ?, first_name = ?, email = ?, phone = ? WHERE user_id = ?',
      [last_name, first_name, email, phone, userId]
    );

    // Release the connection
    connection.release();

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query with the user ID as a parameter
    await connection.query('DELETE FROM User WHERE user_id = ?', [userId]);

    // Release the connection
    connection.release();

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
