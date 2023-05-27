import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VegetablesInCold } from 'model/vegetable-in-cold'; // Import your VegetablesInCold class

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {
  vegetablesList: VegetablesInCold[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchVegetablesData();
  }

  fetchVegetablesData() {
    const filePath = 'assets/data-source/data-source.csv'; // Update the file path to your CSV file

    this.http.get(filePath, { responseType: 'text' }).subscribe(
      (data: string) => {
        this.parseCSVData(data);
      },
      (error) => {
        console.log('An error occurred while fetching CSV data:', error);
      }
    );
  }

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
}

