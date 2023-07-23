import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vegetables-detail',
  templateUrl: '../view/vegetables-detail.component.html',
  styleUrls: ['../view/vegetables-detail.component.css']
})
/**
 * Component to display the details of a selected vegetable and allow adding new inventory.
 */
export class VegetablesDetailComponent implements OnInit {
  @Input() selectedVegetable: VegetablesInCold | null = null; // Input property to receive the selected vegetable from the parent component.

  @Output() inventoryCreated = new EventEmitter<VegetablesInCold>(); // Output property to emit the newly created inventory to the parent component.

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
  /**
   * Constructor for the component.
   */
  constructor(private router: Router) {
    // 
  }
  
  /**
   * Add a new inventory item based on the entered details and emit it to the parent component.
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

    this.inventoryCreated.emit(newInventory); // Emit the new inventory item to the parent component.
  }
  onClickEdit() {
    // Navigate to the VegetableEditComponent with the id of the selected vegetable
    this.router.navigate(['/edit-vegetable', this.selectedVegetable?.Id]);
  }
  ngOnInit(): void {
    
  }
}
