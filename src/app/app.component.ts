import { Component } from '@angular/core';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedVegetable: VegetablesInCold | null = null;

  title = 'vegetables-in-cold';
  inventory = [{
    refDate: '',
    dguid: '',
    areaProductionValue: '',
    uom: '',
    uomId: '',
    scalarFactor: '',
    scalarId: '',
    vector:  '',
    coordinate:  '',
    value:  '',
    status:  '',
    symbol: '',
    terminated: '',
    decimals: ''
  }];
  onInventoryAdded(inventoryData: { refDate: string,
                                    dguid: string,
                                    areaProductionValue: string;
                                    uom: string,
                                    uomId: string,
                                    scalarFactor: string,
                                    scalarId: string,
                                    vector: string,
                                    coordinate: string,
                                    value: string,
                                    status: string,
                                    symbol: string,
                                    terminated: string,
                                    decimals: string
                                  } ) 
  {
    this.inventory.push({
      refDate: inventoryData.refDate,
      dguid: inventoryData.dguid,
      areaProductionValue: inventoryData.areaProductionValue,
      uom: inventoryData.uom,
      uomId: inventoryData.uomId,
      scalarFactor: inventoryData.scalarFactor,
      scalarId: inventoryData.scalarId,
      vector: inventoryData.vector,
      coordinate: inventoryData.coordinate,
      value: inventoryData.value,
      status: inventoryData.status,
      symbol: inventoryData.symbol,
      terminated: inventoryData.terminated,
      decimals: inventoryData.decimals


    });
  }
}
