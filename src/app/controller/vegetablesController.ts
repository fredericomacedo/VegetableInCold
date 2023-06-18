import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
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
  vegetableCreated: VegetablesInCold = new VegetablesInCold();
  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) { }


  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.fetchVegetablesData();
  }

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
  
    for (let i = 1; i <= 100; i++) {
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
      vegetable.Geo = row._1;
      vegetable.Dguid = row._2;
      vegetable.TypeOfProduct = row._3;
      vegetable.TypeOfStorage = row._4;
      vegetable.Uom = row._5;
      vegetable.UomId = row._6;
      vegetable.ScalarFactor = row._7;
      vegetable.ScalarId = row._8;
      vegetable.Vector = row._9;
      vegetable.Coordinate = row._10;
      vegetable.Value = row._11;
      vegetable.Status = row._12;
      vegetable.Symbol = row._13;
      vegetable.Terminated = row._14;
      vegetable.Decimals = row._15;
  
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
  }
  /**
   * 
   * @param newInventory 
   */
  onInventoryAdded(newInventory: VegetablesInCold = new VegetablesInCold()) {
    const csvRow = {
      _0: newInventory.RefDate,
      _1: newInventory.Geo,
      _2: newInventory.Dguid,
      _3: newInventory.TypeOfProduct,
      _4: newInventory.TypeOfStorage,
      _5: newInventory.Uom,
      _6: newInventory.UomId,
      _7: newInventory.ScalarFactor,
      _8: newInventory.ScalarId,
      _9: newInventory.Vector,
      _10: newInventory.Coordinate,
      _11: newInventory.Value,
      _12: newInventory.Status,
      _13: newInventory.Symbol,
      _14: newInventory.Terminated,
      _15: newInventory.RefDate,
      _16: newInventory.Decimals
    };
  
    console.log(csvRow);
    this.vegetablesList.push(newInventory);
    this.addRowToCSV(csvRow);
    };

   
  /**
   * Add a row to the CSV file via the server API
   * @param newRow The new row to be added
   */
  addRowToCSV(newRow: { [_: string]: string } = {}) {
    const apiUrl = 'http://localhost:3000/api/csv';

    this.http.post(apiUrl, newRow)
      .subscribe(
        () => {
          console.log('Row added successfully!');
          //this.vegetablesList.push(newRow); // Add the new row to the local data
          this.changeDetectorRef.detectChanges(); // Trigger change detection to update the table
        },
        (error) => {
          console.log('An error occurred while adding the row:', error);
        }
      );
  }

  /**
   * Example function to demonstrate adding a row
   * This can be called when you want to add a new row from your application
   * You can modify this function as per your requirements and call it accordingly
   
  exampleAddRow() {
    const newRow: VegetablesInCold = new VegetablesInCold();
    newRow.RefDate = '2023-05-25';
    newRow.Geo = 'Sample Geo';
    newRow.Dguid = 'Sample Dguid';
    // Assign values to other properties of the newRow object
    
    this.addRowToCSV(newRow);
  }*/
}
