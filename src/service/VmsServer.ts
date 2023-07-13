import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';

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
app.get('/users', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM User');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM User WHERE user_id = ?', [userId]);
    connection.release();

    const resultRows = rows as mysql.RowDataPacket[];
    if (resultRows.length > 0) {
      res.json(resultRows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { last_name, first_name, email, phone } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO User (last_name, first_name, email, phone) VALUES (?, ?, ?, ?)',
      [last_name, first_name, email, phone]
    );
    connection.release();
    res.sendStatus(201);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an existing user
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { last_name, first_name, email, phone } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE User SET last_name = ?, first_name = ?, email = ?, phone = ? WHERE user_id = ?',
      [last_name, first_name, email, phone, userId]
    );
    connection.release();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM User WHERE user_id = ?', [userId]);
    connection.release();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/login', async (req, res) => {
  try {
    const { email } = req.query;

    // Fetch user from the database by email
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM User WHERE email = ?';
    const [rows] = await connection.execute(query, [email]);
    connection.end();

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    res.status(200).json(user);
  } catch (error) {
    console.error('An error occurred while fetching a user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
