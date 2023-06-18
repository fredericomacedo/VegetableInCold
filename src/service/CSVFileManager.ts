const fs = require('fs');

export class CSVFileManager {
  filePath: string;
  constructor(filePath: any) {
    this.filePath = 'assets/data-source/data-source.csv';
  }
  
  readCSVFile() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      const rows = fileData.split('\n');
      return rows;
    } catch (error) {
      console.error('An error occurred while reading the CSV file:', error);
      return null;
    }
  }

  createCSVRow(rowData: any[]) {
    try {
      const row = rowData.join(',') + '\n';
      fs.appendFileSync(this.filePath, row, 'utf8');
      console.log('Row created successfully');
    } catch (error) {
      console.error('An error occurred while creating a new row:', error);
    }
  }

  updateCSVRow(rowIndex: number, updatedRowData: any[]) {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      const rows = fileData.split('\n');
      
      if (rowIndex >= 0 && rowIndex < rows.length) {
        rows[rowIndex] = updatedRowData.join(',');
        const updatedData = rows.join('\n');
        fs.writeFileSync(this.filePath, updatedData, 'utf8');
        console.log('Row updated successfully');
      } else {
        console.error('Invalid row index');
      }
    } catch (error) {
      console.error('An error occurred while updating the row:', error);
    }
  }

  deleteCSVRow(rowIndex: number) {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      const rows = fileData.split('\n');
      
      if (rowIndex >= 0 && rowIndex < rows.length) {
        rows.splice(rowIndex, 1);
        const updatedData = rows.join('\n');
        fs.writeFileSync(this.filePath, updatedData, 'utf8');
        console.log('Row deleted successfully');
      } else {
        console.error('Invalid row index');
      }
    } catch (error) {
      console.error('An error occurred while deleting the row:', error);
    }
  }
}

module.exports = CSVFileManager;
