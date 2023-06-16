import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';

@Component({
  selector: 'app-vegetables-detail',
  templateUrl: '../view/vegetables-detail.component.html',
  styleUrls: ['../view/vegetables-detail.component.css']
})
export class VegetablesDetailComponent implements OnInit {
  @Input() selectedVegetable: VegetablesInCold | null = null;

  @Output() inventoryCreated  = new EventEmitter<{
    refDate: string,
    dguid: string,
    areaProductionValue: string,
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
                                  
  }>();

  

  newRefDate = '';
  newDguid= '';
  newAreaProductionValue = '';
  newUom = '';
  newUomId = '';
  newScalarFactor = '';
  newScalarId = '';
  newVector = '';
  newCoordinate = '';
  newValue = '';
  newStatus = '';
  newSymbol = '';
  newTerminated = '';
  newDecimals = '';
/**
 * 
 */
  constructor() {

  }


  onAddInventory() {
    this.inventoryCreated.emit({
      refDate: this.newRefDate,
      dguid: this.newDguid,
      areaProductionValue: this.newAreaProductionValue,
      uom: this.newUom,
      uomId: this.newUomId,
      scalarFactor: this.newScalarFactor,
      scalarId: this.newScalarId,
      vector: this.newVector,
      coordinate: this.newCoordinate,
      value: this.newValue,
      status: this.newStatus,
      symbol: this.newSymbol,
      terminated: this.newTerminated,
      decimals: this.newDecimals


    });

  }
  ngOnInit(): void {
      
  }
}
