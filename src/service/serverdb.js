const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware
// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'vegetable',
  password: 'vegetables',
  database: 'vegetables',
});

// Get all vegetables
app.get('/vegetables', async (req, res) => {
  
  try{

    // Get a connection from the pool
  const connection = await pool.getConnection();
  
  // Execute the query
  const [rows] = await connection.query('SELECT * FROM Vegetables');

  // Release the connection
  connection.release();
  // Send the rows as a JSON response
  res.json(rows);

  } catch (error){
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });

  }
  
});

// Get a specific vegetable by ID
app.get('/vegetables/:id',  async (req, res) => {
  
  try {
    const vegetableId = req.params.id;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query with the user ID as a parameter
    const [rows] = await connection.query('SELECT * FROM Vegetables WHERE id = ?', [vegetableId]);

    // Release the connection
    connection.release();

    if (rows.length > 0) {
      // Send the user as a JSON response
      res.json(rows[0]);
    } else {
      // User not found, send a 404 response
      res.status(404).json({ message: 'Vegetable register not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});

// Create a new vegetable
app.post('/vegetables', async (req, res) => {
  try {
    const {refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals } = req.body;
    // Get a connection from the pool
    const connection = await pool.getConnection(); 
    
    // Execute the query with the vegetable data as parameters
    await connection.query(
        
        'INSERT INTO Vegetables (refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      , [refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals]

    ); 
    // Release the connection
    connection.release();  
    // Send a success response
    res.sendStatus(201);
    }
  catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});

// Update a vegetable
'UPDATE Vegetables SET refDate = ?, geo = ?, dguid = ?, typeOfProduct = ?, typeOfStorage = ?, uom = ?, uomId = ?, scalarFactor = ?, scalarId = ?, vector = ?, coordinate = ?, value = ?, status = ?, symbol = ?, isterminated = ?, decimals = ? WHERE id = ?'
app.put('/vegetables/:id', async(req, res) => {
  
    try {
      const vegetableIdId = req.params.id;
      const {refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals} = req.body;
    
      // Get a connection from the pool
      const connection = await pool.getConnection();
  
      // Execute the query with the user data and ID as parameters
      await connection.query(
        'UPDATE Vegetables SET refDate = ?, geo = ?, dguid = ?, typeOfProduct = ?, typeOfStorage = ?, uom = ?, uomId = ?, scalarFactor = ?, scalarId = ?, vector = ?, coordinate = ?, value = ?, status = ?, symbol = ?, isterminated = ?, decimals = ? WHERE id = ?'
        ,[refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals, vegetableIdId]
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

// Delete a vegetable
app.delete('/vegetables/:id', async (req, res) => {
  
  try {
    const vegetableId = req.params.id;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query with the user ID as a parameter
    await connection.query('DELETE FROM Vegetables WHERE id = ?', [vegetableId]);

    // Release the connection
    connection.release();

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});


app.post('/api/csv', async (req, res) => {
  const vegetablesList = req.body;
  const filePath = 'src/assets/data-source/new-data-source.csv';
  const dirPath = 'src/assets/data-source/';
  
  if (!vegetablesList) {
    res.status(400).json({ message: 'No data provided' });
    return;
  }

  // create the directories if they do not exist
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Convert vegetablesList to CSV content
  if (vegetablesList.length === 0) {
    res.status(204).send(); // No Content
    return;
  }

  const headers = Object.keys(vegetablesList[0]);
  const csvContent = [
    headers.join(','),
    ...vegetablesList.map((row) => headers.map((header) => row[header]).join(','))
  ].join('\n');

  // Write the CSV content to the file
  try {
    await fs.promises.writeFile(filePath, csvContent, 'utf-8');
    res.status(200).send();
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).json({ message: 'Error writing to file' });
  }
});




// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
