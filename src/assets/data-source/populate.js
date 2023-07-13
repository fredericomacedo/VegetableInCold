const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql2');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'vegetable',
  password: 'vegetables',
  database: 'vegetables',
});

// Open the CSV file and read its contents
fs.createReadStream(__dirname + '/data-source.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Map the CSV row data to the corresponding database columns
    const rowData = [
      row.REF_DATE,
      row.GEO,
      row.DGUID,
      row.TypeOfProduct,
      row.TypeOfStorage,
      row.UOM,
      row.UOM_ID,
      row.SCALAR_FACTOR,
      row.SCALAR_ID,
      row.VECTOR,
      row.COORDINATE,
      row.VALUE,
      row.STATUS,
      row.SYMBOL,
      row.TERMINATED,
      row.DECIMALS,
    ];

    // Construct the SQL query to insert the data into the MySQL table
    const query = `
      INSERT INTO Vegetables (refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the SQL query with the row data
    pool.query(query, rowData, (error, results) => {
      if (error) {
        console.error('Error inserting row:', error);
      }
      
    });
    
  })
  .on('end', () => {
    console.log('CSV file successfully imported into MySQL.');
    // Close the connection pool
    pool.end();
  });
