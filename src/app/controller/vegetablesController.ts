import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';

@Component({
  selector: 'app-vegetables-controller',
  templateUrl: '../view/vegetablesView.html',
  styleUrls: ['../view/vegetables.component.css']
})
export class VegetableComponent implements OnInit {
  @Output() vegetableSelected = new EventEmitter<VegetablesInCold>();

  vegetableItem: VegetablesInCold = new VegetablesInCold();

  
  vegetablesList: VegetablesInCold[] = [];
  
  constructor(private http: HttpClient) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.fetchVegetablesData();
  }

  /**
   * Fetches vegetables data from the CSV file.
   
  fetchVegetablesData() {
    const filePath = 'assets/data-source/data-source.csv';

    this.http.get(filePath, { responseType: 'text' })
      .pipe(
        // Add any necessary operators here, such as map, filter, etc.
      )
      .subscribe(
        (data: string) => {
          this.parseCSVData(data);
        },
        (error) => {
          console.log('An error occurred while fetching CSV data:', error);
        }
      );
  }*/
  
  

  /**
   * Parses the CSV data and populates the vegetables list.
   * @param csvData The CSV data to parse.
   
  parseCSVData(csvData: string) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    for (let i = 1; i <= 100; i++) {
      const values = lines[i].split(',');

      const vegetable: VegetablesInCold = new VegetablesInCold();
      vegetable.RefDate = values[0];
      vegetable.Dguid = values[1];
      vegetable.AreaProductionValue = values[2];
      vegetable.Uom = values[3];
      vegetable.UomId = values[4];
      vegetable.ScalarFactor = values[5];
      vegetable.ScalarId = values[6];
      vegetable.Vector = values[7];
      vegetable.Coordinate = values[8];
      vegetable.Value = values[9];
      vegetable.Status = values[10];
      vegetable.Symbol = values[11];
      vegetable.Terminated = values[12];
      vegetable.Decimals = values[13];

      this.vegetablesList.push(vegetable);
    }
  }
  secound solution....
  
  fetchVegetablesData() {
    const serverUrl = 'http://localhost:3000/api/csv';
  
    this.http.get<any[]>(serverUrl)
      .subscribe(
        (data: any[]) => {
          this.parseCSVData(data);
        },
        (error) => {
          console.log('An error occurred while fetching CSV data:', error);
        }
      );
  }
  
  parseCSVData(data: any[]) {
    let count = 0;
  
    for (const row of data) {
      const vegetable: VegetablesInCold = new VegetablesInCold();
      vegetable.RefDate = row.refDate;
      vegetable.Dguid = row.dguid;
      vegetable.AreaProductionValue = row.areaProductionValue;
      vegetable.Uom = row.uom;
      vegetable.UomId = row.uomId;
      vegetable.ScalarFactor = row.scalarFactor;
      vegetable.ScalarId = row.scalarId;
      vegetable.Vector = row.vector;
      vegetable.Coordinate = row.coordinate;
      vegetable.Value = row.value;
      vegetable.Status = row.status;
      vegetable.Symbol = row.symbol;
      vegetable.Terminated = row.terminated;
      vegetable.Decimals = row.decimals;
      this.vegetablesList.push(vegetable);
      console.log(row);
  
      count++;
      if (count === 100) {
        break;
      }
    }
  }
  */

  fetchVegetablesData() {
    const filePath = 'assets/data-source/data-source.csv';
  
    this.http.get(filePath, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          const parsedData = this.parseCSVData(data);
          this.populateVegetablesList(parsedData);
        },
        (error) => {
          console.log('An error occurred while fetching CSV data:', error);
        }
      );
  }
  
  parseCSVData(csvData: string) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
  
    const parsedData = [];
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
  
      const row: { [key: string]: string } = {};
      for (let j = 0; j < headers.length; j++) {
        row[`_${j}`] = values[j];
      }
  
      parsedData.push(row);
    }
  
    return parsedData;
  }
  
  populateVegetablesList(data: any[]) {
    for (const row of data) {
      const vegetable: VegetablesInCold = new VegetablesInCold();
      vegetable.RefDate = row._0;
      vegetable.Dguid = row._1;
      vegetable.AreaProductionValue = row._2;
      vegetable.Uom = row._3;
      vegetable.UomId = row._4;
      vegetable.ScalarFactor = row._5;
      vegetable.ScalarId = row._6;
      vegetable.Vector = row._7;
      vegetable.Coordinate = row._8;
      vegetable.Value = row._9;
      vegetable.Status = row._10;
      vegetable.Symbol = row._11;
      vegetable.Terminated = row._12;
      vegetable.Decimals = row._13;
  
      this.vegetablesList.push(vegetable);
    }
  }
  
  
  /**
   * Handle the click event and pass the selected vegetable to another component or perform any desired action
   * @param vegetable 
   */

  onClickTable(vegetable: VegetablesInCold) {
    this.vegetableItem = vegetable;
    this.vegetableSelected.emit(this.vegetableItem);
    
  
    this.vegetableSelected.emit(this.vegetableItem);
  }
  
}
