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
  currentType = 'product';

  chartOptions = {
    title: {
      text: "Vegetables in Cold Storage"
    },
    data: [{
      type: "column",
      dataPoints: [] as DataPoint[]
    }]                
  };

  constructor(private vegetableService: VegetableService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.vegetablesSubscription = this.vegetableService.vegetables$
      .subscribe((vegetables: VegetablesInCold[]) => {
        
        this.vegetablesList = vegetables;
        this.updateChartData();
      });
  }
  
  ngOnDestroy() {
    if (this.vegetablesSubscription) {
      this.vegetablesSubscription.unsubscribe();
    }
  }

  toggleData(type: string) {
    this.currentType = type;
    this.updateChartData();
    console.log("Current type in toggleData event ", this.currentType);
  }
  

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
