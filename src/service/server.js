const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const { Readable } = require('stream');
const cors = require('cors');

// Enable CORS
app.use(cors());
// Middleware to parse JSON request body
app.use(express.json());



/// API endpoint to save the vegetablesList as a new CSV file
app.post('/api/csv', (req, res) => {
  const vegetablesList = req.body;
  const filePath = 'src/assets/data-source/new-data-source.csv';
  console.log(vegetablesList);
  if (!vegetablesList) {
    res.sendStatus(400);
    return;
  }

  // Convert vegetablesList to CSV content
  if (vegetablesList.length === 0) {
    res.sendStatus(204); // No Content
    return;
  }

  const headers = Object.keys(vegetablesList[0]);
  const csvContent = [
    headers.join(','),
    ...vegetablesList.map((row) => headers.map((header) => row[header]).join(','))
  ].join('\n');

  // Write the CSV content to the file
  fs.writeFileSync(filePath, csvContent, 'utf-8');

  res.sendStatus(200);
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
