const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const { Readable } = require('stream');
const cors = require('cors');

//Enable CORS
app.use(cors());
// Middleware to parse JSON request body
app.use(express.json());

// API endpoint to read the CSV file
app.get('/api/csv', (req, res) => {
  const filePath = 'src/assets/data-source/data-source.csv';
  const csvData = fs.readFileSync(filePath, 'utf-8');

  parseCSVData(csvData)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log('An error occurred while parsing CSV data:', error);
      res.sendStatus(500);
    });
});

/// API endpoint to add a row to the CSV file
app.post('/api/csv', (req, res) => {
  const newRow = req.body;
  const filePath = 'src/assets/data-source/data-source.csv';
  const csvData = fs.readFileSync(filePath, 'utf-8');

  parseCSVData(csvData)
    .then((rows) => {
      rows.splice(1, 0, newRow); // Insert the new row after the header
      const updatedCSVData = convertToCSV(rows);
      fs.writeFileSync(filePath, updatedCSVData, 'utf-8');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('An error occurred while parsing CSV data:', error);
      res.sendStatus(500);
    });
});

// API endpoint to delete a row from the CSV file
app.delete('/api/csv/:id', (req, res) => {
  const id = req.params.id; // Assuming the row is identified by an 'id' field
  const filePath = 'assets/data-source/data-source.csv';
  const csvData = fs.readFileSync(filePath, 'utf-8');

  parseCSVData(csvData)
    .then((rows) => {
      const rowIndex = rows.findIndex((row) => row.id === id);
      if (rowIndex !== -1) {
        rows.splice(rowIndex, 1);
        const updatedCSVData = convertToCSV(rows);
        fs.writeFileSync(filePath, updatedCSVData, 'utf-8');
        res.sendStatus(200);
      } else {
        res.sendStatus(404); // Row not found
      }
    })
    .catch((error) => {
      console.log('An error occurred while parsing CSV data:', error);
      res.sendStatus(500);
    });
});

// API endpoint to update a row in the CSV file
app.put('/api/csv/:id', (req, res) => {
  const id = req.params.id; // Assuming the row is identified by an 'id' field
  const updatedRow = req.body;
  const filePath = 'assets/data-source/data-source.csv';
  const csvData = fs.readFileSync(filePath, 'utf-8');

  parseCSVData(csvData)
    .then((rows) => {
      const rowIndex = rows.findIndex((row) => row.id === id);
      if (rowIndex !== -1) {
        rows[rowIndex] = updatedRow;
        const updatedCSVData = convertToCSV(rows);
        fs.writeFileSync(filePath, updatedCSVData, 'utf-8');
        res.sendStatus(200);
      } else {
        res.sendStatus(404); // Row not found
      }
    })
    .catch((error) => {
      console.log('An error occurred while parsing CSV data:', error);
      res.sendStatus(500);
    });
});

// API endpoint to read a specific row from the CSV file
app.get('/api/csv/:id', (req, res) => {
  const id = req.params.id; // Assuming the row is identified by an 'id' field
  const filePath = 'assets/data-source/data-source.csv';
  const csvData = fs.readFileSync(filePath, 'utf-8');

  parseCSVData(csvData)
    .then((rows) => {
      const row = rows.find((row) => row.id === id);
      if (row) {
        res.json(row);
      } else {
        res.sendStatus(404); // Row not found
      }
    })
    .catch((error) => {
      console.log('An error occurred while parsing CSV data:', error);
      res.sendStatus(500);
    });
});

// Helper function to parse CSV data
function parseCSVData(csvData) {
  return new Promise((resolve, reject) => {
    const rows = [];
    Readable.from(csvData)
      .pipe(csv({ headers: true }))
      .on('data', (data) => {
        rows.push(data);
      })
      .on('end', () => {
        resolve(rows);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Helper function to convert rows to CSV data
function convertToCSV(rows) {
  const headers = Object.keys(rows[0]);
  const csvData = [];

  // Add the headers to the CSV data
  csvData.push(headers.join(','));

  // Add the rows to the CSV data
  rows.forEach((row) => {
    const values = headers.map((header) => row[header]);
    csvData.push(values.join(','));
  });

  return csvData.join('\n');
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
