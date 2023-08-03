import { Component } from '@angular/core';
import { VegetablesInCold } from '../model/vegetable-in-cold';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: '../view/header.component.html',
  styleUrls: ['../view/header.component.css']
})
export class HeaderComponent {
  collapsed = true;


  vegetablesList: VegetablesInCold[] = [];
  constructor(private http: HttpClient) { }

  /**
   * Receive the vegetable list from the child (vegetablesController.ts)
   * @param vegetables 
   */
  receiveVegetablesList(vegetables: VegetablesInCold[]) {
    this.vegetablesList = vegetables;
  }
  /**
   * To export the actual vegetablesList to CSV file
   */
  onClickSave() {
   
    const apiEndpoint = 'http://localhost:3000/api/csv';
    this.http.post(apiEndpoint, this.vegetablesList, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .subscribe(
      () => {
        console.log('Vegetables list saved as CSV successfully');
      },
      (error) => {
        console.log('An error occurred while saving vegetables list:', error);
      }
    );
  }
}
