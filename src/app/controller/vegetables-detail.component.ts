import { Component,  Input, OnInit } from '@angular/core';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vegetables-detail',
  templateUrl: '../view/vegetables-detail.component.html',
  styleUrls: ['../view/vegetables-detail.component.css']
})
/**
 * Component to display the details of a selected vegetable and allow adding new inventory.
 */
export class VegetablesDetailComponent implements OnInit {
  /**
   * Input property to receive the selected vegetable from the parent component
   * and show detail in this form
   */ 
  @Input() selectedVegetable: VegetablesInCold | null = null; 

  
  /**
   * initialize a router to navigate between screens 
   * @param router 
   */
  constructor(private router: Router) {
    // 
  }
  
  
  
  /**
   * Navigate to the VegetableEditComponent with the id of the selected vegetable
   */
  onClickEdit() {
    
    this.router.navigate(['/edit-vegetable', this.selectedVegetable?.Id]);
  }
  /**
   * Navigate to add vegetable using router passing the actual 
   * vegetable inventory id to be fetch in the VegetableAdd.component
   */
  onClickAdd(){
    this.router.navigate(['/vegetables/add']);
  }
  ngOnInit(): void {
    
  }
}


/**
   * Add a new inventory item based on the entered details and emit it to the parent component.
   * 
   * 
   * 
    @Output() inventoryCreated = new EventEmitter<VegetablesInCold>(); 
  // properties of vegetable
  newRefDate = '';
  newGeo = '';
  newDguid = '';
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

    this.inventoryCreated.emit(newInventory); // Emit the new inventory item to the parent component.
  }
   */