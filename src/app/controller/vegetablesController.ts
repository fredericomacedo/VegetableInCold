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
  /**
   * Check if item is editable
   */
  editable = false;

  constructor(private http: HttpClient) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.fetchVegetablesData();
  }

  /**
   * Loads the saved file.
   */
  loadSavedFile() {
    this.vegetablesList = [];
    this.fetchVegetablesData();

    
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


  onEditVegetable(index: number) {
    if (index !== null) {
      //this.vegetablesList.splice(index, 1); // Remove the vegetable at the specified index
      this.editable = true
    }
    else {
      console.log('index null, no register was deleted')
    }
  }

  /**
   * Fetches vegetables data from the specified file path.
   * @param filePath The file path to fetch the data from.
   */
  fetchVegetablesData() {
    const apiUrl = 'http://localhost:3000/vegetables';
  
    try {
      this.http.get<any[]>(apiUrl).subscribe({
        next: (data: any[]) => {
          this.populateVegetablesList(data);
          console.log(data)
        },
        error: (error) => {
          console.log('An error occurred while fetching vegetable data:', error);
        }
      });
    } catch (error) {
      console.log('An error occurred while fetching vegetable data:', error);
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
      vegetable.Id = row.id.toString();
      vegetable.RefDate = row.refDate;
      vegetable.Geo = row.geo;
      vegetable.Dguid = row.dguid;
      vegetable.TypeOfProduct = row.typeOfProduct;
      vegetable.TypeOfStorage = row.typeOfStorage;
      vegetable.Uom = row.uom;
      vegetable.UomId = row.uomId;
      vegetable.ScalarFactor = row.scalarFactor;
      vegetable.ScalarId = row.scalarId;
      vegetable.Vector = row.vector;
      vegetable.Coordinate = row.coordinate;
      vegetable.Value = row.value;
      vegetable.Status = row.status;
      vegetable.Symbol = row.symbol;
      vegetable.Terminated = row.isterminated;
      vegetable.Decimals = row.decimals;
  
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
    const apiUrl = 'http://localhost:3000/vegetables';
  
    this.http.post(apiUrl, newInventory).subscribe(
      () => {
        // POST request successful, prepend the new inventory to the vegetablesList
        this.vegetablesList.unshift(newInventory);
        console.log(this.vegetablesList);
      },
      (error) => {
        console.log('An error occurred while adding the inventory:', error);
      }
    );
  }
  

  /**
   * Saves the vegetables list.
   */
  onClickSave() {
    const apiEndpoint = 'http://localhost:3000/api/csv';
    const jsonVegetablesList = JSON.stringify(this.vegetablesList);
    this.editable = false;
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
