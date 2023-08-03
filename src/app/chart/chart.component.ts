import { Component, OnInit, OnDestroy } from '@angular/core';
import { VegetableService } from '../controller/vegetableService';
import { VegetablesInCold } from '../model/vegetable-in-cold';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
interface DataPoint {
  label: string;
  y: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  vegetablesList: VegetablesInCold[] = [];
  vegetablesSubscription!: Subscription;
  currentType = 'product'; // variable to store the typo of chart
  
  //Initial chart configurations 
  chartOptions = {
    theme: "light2",
    title: {
      
      text: "Vegetables in Cold Storage"
    },
    data: [{
      type: "column",
      dataPoints: [] as DataPoint[]
    }]                
  };

  //Constructor 
  constructor(private vegetableService: VegetableService, private cd: ChangeDetectorRef) {}
  /**
   * ngOnInit initialize vegetables from vegetable listener and render the chart
   */
  ngOnInit() {
    this.vegetablesSubscription = this.vegetableService.vegetables$
      .subscribe((vegetables: VegetablesInCold[]) => {
        
        this.vegetablesList = vegetables;
        this.updateChartData();
      });
  }
  /**
   * A callback method that performs custom clean-up, 
   * invoked immediately before a directive, pipe, 
   * or service instance is destroyed.
   */
  ngOnDestroy() {
    if (this.vegetablesSubscription) {
      this.vegetablesSubscription.unsubscribe();
    }
  }
  /**
   * To save user option to render the chart
   * @param type product or storage type
   */
  toggleData(type: string) {
    this.currentType = type;
    this.updateChartData();
    console.log("Current type in toggleData event ", this.currentType);
  }
  
/**
 * Aggregate values form vegetables list according the user option
 * Sort chart on descending order
 * Create new chart option
 */
  updateChartData() {
    const dataPoints: DataPoint[] = [];
    const valueMap: { [key: string]: number } = {};
  
    for (let i = 0; i < this.vegetablesList.length; i++) {
      let veg = this.vegetablesList[i];
      let key = this.currentType === 'product' ? veg.typeOfProduct : veg.typeOfStorage;
  
      if (valueMap[key]) {
        valueMap[key] += Number(veg.value);
      } else {
        valueMap[key] = Number(veg.value);
      }
    }
  
    for (let key in valueMap) {
      dataPoints.push({ label: key, y: valueMap[key] });
    }
  
    // Sort by y value
    dataPoints.sort((a, b) => a.y - b.y);
  
    // Create a new chartOptions object
    this.chartOptions = {
      theme: this.chartOptions.theme,
      title: {
        text: "Vegetables in Cold Storage by " + (this.currentType === 'product' ? 'Product' : 'Storage')
      },
      data: [{
        type: "bar",
        dataPoints: dataPoints
      }]
    };
  }
  
  
}
