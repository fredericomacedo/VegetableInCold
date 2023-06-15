import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';

@Component({
  selector: 'app-vegetables-controller',
  templateUrl: '../view/vegetablesView.html',
  styleUrls: ['../view/vegetables.component.css']
})
export class VegetableComponent implements OnInit {
  @Output() vegetableSelected = new EventEmitter<
  {
    refDate: string;
    dguid: string;
    areaProductionValue: string;
    uom: string;
    uomId: string;
    scalarFactor: string;
    scalarId: string;
    vector: string;
    coordinate: string;
    value: string;
    status: string;
    symbol: string;
    terminated: string;
    decimals: string;
  }>();
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
   */
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
  }

  /**
   * Parses the CSV data and populates the vegetables list.
   * @param csvData The CSV data to parse.
   */
  parseCSVData(csvData: string) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
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
  /**
   * Handle the click event and pass the selected vegetable to another component or perform any desired action
   * @param vegetable 
   */

  onClickTable() {
    this.vegetableSelected
  }
}
