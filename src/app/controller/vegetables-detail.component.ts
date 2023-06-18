import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';

@Component({
  selector: 'app-vegetables-detail',
  templateUrl: '../view/vegetables-detail.component.html',
  styleUrls: ['../view/vegetables-detail.component.css']
})
export class VegetablesDetailComponent implements OnInit {
  @Input() selectedVegetable: VegetablesInCold | null = null;

  @Output() inventoryCreated  = new EventEmitter<VegetablesInCold>();

  

  newRefDate = '';
  newGeo = '';
  newDguid= '';
  newTypeOfProduct = '';
  newTypeOfStorage = '';
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

  /**
   * 
   */
  onAddInventory() {
    const newInventory: VegetablesInCold = new VegetablesInCold();
    newInventory.RefDate = this.newRefDate;
    newInventory.Geo = this.newGeo;
    newInventory.Dguid = this.newDguid;
    newInventory.TypeOfProduct = this.newTypeOfProduct;
    newInventory.TypeOfStorage = this.newTypeOfStorage;
    newInventory.Uom = this.newUom;
    newInventory.UomId = this.newUomId;
    newInventory.ScalarFactor = this.newScalarFactor;
    newInventory.ScalarId = this.newScalarId;
    newInventory.Vector = this.newVector;
    newInventory.Coordinate = this.newCoordinate;
    newInventory.Value = this.newValue;
    newInventory.Status = this.newStatus;
    newInventory.Symbol = this.newSymbol;
    newInventory.Terminated = this.newTerminated;
    newInventory.Decimals = this.newDecimals;
  
    this.inventoryCreated.emit(newInventory);
  }
   
  
  
  
  
  
  ngOnInit(): void {
      
  }
}
