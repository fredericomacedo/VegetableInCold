const fs = require('fs');
const csv = require('fast-csv');
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'vegetable',
  password: 'vegetables',
  database: 'vegetables',
});

let dataBatch = [];
const BATCH_SIZE = 30;

fs.createReadStream('data-source.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', async (row) => {
    dataBatch.push(row);

    // When we've collected a batch, insert it into the database
    if (dataBatch.length === BATCH_SIZE) {
      await insertBatch(dataBatch);
      dataBatch = [];
    }
  })
  .on('end', async () => {
    // Insert remaining rows
    if (dataBatch.length > 0) {
      await insertBatch(dataBatch);
    }
    console.log('CSV file successfully processed');
  });

async function insertBatch(dataBatch) {
  // Get a connection from the pool
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (const row of dataBatch) {
      const {REF_DATE, GEO, DGUID, TypeOfProduct, TypeOfStorage, UOM, UOM_ID, SCALAR_FACTOR, SCALAR_ID, VECTOR, COORDINATE, VALUE, STATUS, SYMBOL, TERMINATED, DECIMALS} = row;
      // Insert the batch into the database
      await connection.query('INSERT INTO Vegetables (refDate, geo, dguid, typeOfProduct, typeOfStorage, uom, uomId, scalarFactor, scalarId, vector, coordinate, value, status, symbol, isterminated, decimals) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [REF_DATE, GEO, DGUID, TypeOfProduct, TypeOfStorage, UOM, UOM_ID, SCALAR_FACTOR, SCALAR_ID, VECTOR, COORDINATE, VALUE, STATUS, SYMBOL, TERMINATED, DECIMALS]);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Failed to insert batch:', error);
  } finally {
    connection.release();
  }
}
