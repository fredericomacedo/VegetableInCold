import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';

@Component({
  selector: 'app-vegetables-controller',
  templateUrl: '../view/vegetablesView.html',
  styleUrls: ['../view/vegetables.component.css']
})
/**
 * Component to control the interaction between the view and the model for vegetables.
 * by Frederico Lucio Macedo
 */
export class VegetableComponent implements OnInit {
  /**
   * Event emitter for the selected vegetable.
   */
  @Output() vegetableSelected = new EventEmitter<VegetablesInCold>();

  /**
   * The selected vegetable item.
   */
  vegetableItem: VegetablesInCold = new VegetablesInCold();

  /**
   * The list of vegetables.
   */
  vegetablesList: VegetablesInCold[] = [];

  /**
   * The vegetable created.
   */
  vegetableCreated: VegetablesInCold = new VegetablesInCold();

  constructor(private http: HttpClient) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.fetchVegetablesData('assets/data-source/data-source.csv');
  }

  /**
   * Loads the saved file.
   */
  loadSavedFile() {
    this.vegetablesList = [];
    this.fetchVegetablesData('assets/data-source/new-data-source.csv');

    
  }

  /**
   * Deletes a vegetable from the list.
   * @param index The index of the vegetable to delete.
   */
  onDeleteVegetable(index: number) {
    if (index !== null) {
      this.vegetablesList.splice(index, 1); // Remove the vegetable at the specified index
    }
    else {
      console.log('index null, no register was deleted')
    }
  }

  /**
   * Fetches vegetables data from the specified file path.
   * @param filePath The file path to fetch the data from.
   */
  fetchVegetablesData(filePath: string) {
    console.log(filePath);
  
    try {
      this.http.get(filePath, { responseType: 'text' }).subscribe(
        (data: string) => {
          const parsedData = this.parseCSVData(data);
          this.populateVegetablesList(parsedData);
        },
        (error) => {
          console.log('An error occurred while fetching CSV data:', error);
        }
      );
    } catch (error) {
      console.log('An error occurred while fetching CSV data:', error);
    }
  }
  

  /**
   * Parses the CSV data and returns the parsed data.
   * @param csvData The CSV data to parse.
   * @returns The parsed data.
   */
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

  /**
   * Populates the vegetables list with data.
   * @param data The data to populate the vegetables list with.
   */
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
   * Handles the click event on a table row and emits the selected vegetable.
   * @param vegetable The selected vegetable.
   */
  onClickTable(vegetable: VegetablesInCold) {
    this.vegetableItem = vegetable;
    this.vegetableSelected.emit(this.vegetableItem);
  }

  /**
   * Adds a new inventory item to the list.
   * @param newInventory The new inventory item to add.
   */
  onInventoryAdded(newInventory: VegetablesInCold = new VegetablesInCold()) {
    this.vegetablesList.unshift(newInventory);
    console.log(this.vegetablesList);
  }

  /**
   * Saves the vegetables list.
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
