import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSVService {
  private filePath = 'assets/data-source/data-source.csv';

  constructor(private http: HttpClient) {}

  /**
   * Reads the CSV file and returns the data as an array of objects.
   */
  readCSV(): Observable<any[]> {
    return this.http.get(this.filePath, { responseType: 'text' })
      .pipe(
        map((csvData: string) => this.parseCSVData(csvData))
      );
  }

  /**
   * Parses the CSV data and converts it into an array of objects.
   * @param csvData The CSV data to parse.
   * @returns An array of objects representing the CSV data.
   */
  private parseCSVData(csvData: string): any[] {
    const lines = csvData.split('\n');
    const headers: string[] = lines[0].split(',');
    const data = [];
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const item: any = {};
  
      for (let j = 0; j < headers.length; j++) {
        item[headers[j]] = values[j];
      }
  
      data.push(item);
    }
  
    return data;
  }

  // Add methods for CRUD operations on the CSV file here
}
