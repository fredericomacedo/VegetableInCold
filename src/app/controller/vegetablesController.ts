import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';

@Component({
  selector: 'app-vegetables-controller',
  templateUrl: '../view/vegetablesView.html',
  styleUrls: ['../view/vegetables.component.css']
})
/**
 * Class VegetablesController to interact with view and model app 
 */
export class VegetableComponent implements OnInit {
  @Output() vegetableSelected = new EventEmitter<VegetablesInCold>();
/**
 * 
 */
  vegetableItem: VegetablesInCold = new VegetablesInCold();
  vegetablesList: VegetablesInCold[] = [];
  vegetableCreated: VegetablesInCold = new VegetablesInCold();
  constructor(private http: HttpClient) { }


  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.fetchVegetablesData('assets/data-source/data-source.csv');
  }
  loadSavedFile(){
    this.vegetablesList = [];
    this.fetchVegetablesData('assets/data-source/new-data-source.csv')
  }

  onDeleteVegetable(index: number) {
    this.vegetablesList.splice(index, 1); // Remove the vegetable at the specified index
  }
  
  

  fetchVegetablesData(filePath: string) {
    console.log(filePath);
  
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
    console.log(this.vegetablesList[0]);
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
    
  
    this.vegetablesList.unshift(newInventory);
    console.log(this.vegetablesList);
    
    //this.addRowToCSV(csvRow);
    };

  


   /**
    * 
    * @param vegetablesList 
    */
    onClickSave() {
      const apiEndpoint = 'http://localhost:3000/api/csv';
      const jsonVegetablesList = JSON.stringify(this.vegetablesList);
      this.http.post(apiEndpoint, this.vegetablesList)
        .subscribe(
          () => {
            console.log('Vegetables list saved as CSV successfully');
            // Handle success
          },
          (error) => {
            console.log('An error occurred while saving vegetables list:', error);
            // Handle error
          }
        );
    }
  
    
    
  
}
