const csvtojson = require('csvtojson');
const fs = require('fs');
const mysql = require('mysql2');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'vegetable',
  password: 'vegetables',
  database: 'vegetables',
});

let rowDataBatch = [];

// Open the CSV file and read its contents
csvtojson()
  .fromFile(__dirname + '/data-source.csv')
  .subscribe((jsonObj, lineNumber) => {
    rowDataBatch.push([
      jsonObj.REF_DATE,
      jsonObj.GEO,
      jsonObj.DGUID,
      jsonObj.TypeOfProduct,
      jsonObj.TypeOfStorage,
      jsonObj.UOM,
      jsonObj.UOM_ID,
      jsonObj.SCALAR_FACTOR,
      jsonObj.SCALAR_ID,
      jsonObj.VECTOR,
      jsonObj.COORDINATE,
      jsonObj.VALUE,
      jsonObj.STATUS,
      jsonObj.SYMBOL,
      jsonObj.TERMINATED,
      jsonObj.DECIMALS,
    ]);

    if (rowDataBatch.length === 30) {
      let batch = [...rowDataBatch];
      rowDataBatch = [];

      return new Promise((resolve, reject) => {
        const query = `
          INSERT INTO Vegetables (refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals)
          VALUES ?
        `;

        pool.query(query, [batch], (error, results) => {
          if (error) {
            console.error('Error inserting row:', error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
  })
  .then(() => {
    console.log('CSV file successfully imported into MySQL.');
    pool.end();
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
