import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-vegetable-edit',
    templateUrl: '../view/vegetableEditVeiw.html',
    styleUrls: ['../view/vegetableEdit.css']
})
export class vegetableEdit implements OnInit{
    
    
    constructor(private httpClient: HttpClient){

    }
    @Input() selectedVegetable: VegetablesInCold | null = null; // Input property to receive the selected vegetable from the parent component.
    @Output() inventoryEdited = new EventEmitter<VegetablesInCold>(); // Output property to emit the newly created inventory to the parent component.
    vegetable = new VegetablesInCold();
    
    ngOnInit(): void {
        if (this.selectedVegetable){
            this.vegetable = this.selectedVegetable;
        }
    }

    onSubmitEdit(): void {
        // Check if the selectedVegetable is not null
        if (this.selectedVegetable) {
          const url = `http://localhost:3000/vegetables/${this.selectedVegetable.Id}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
          // Create an object with the updated vegetable data
          const updatedVegetable = {
            refDate: this.vegetable.RefDate,
            geo: this.vegetable.Geo,
            dguid: this.vegetable.Dguid,
            typeOfProduct: this.vegetable.TypeOfProduct,
            typeOfStorage: this.vegetable.TypeOfStorage,
            uom: this.vegetable.Uom,
            uomId: this.vegetable.UomId,
            scalarFactor: this.vegetable.ScalarFactor,
            scalarId: this.vegetable.ScalarId,
            vector: this.vegetable.Vector,
            coordinate: this.vegetable.Coordinate,
            value: this.vegetable.Value,
            status: this.vegetable.Status,
            symbol: this.vegetable.Symbol,
            terminated: this.vegetable.Terminated,
            decimals: this.vegetable.Decimals,
            
          };
      
          // Send the PUT request with the updated vegetable data
          this.httpClient
            .put(url, updatedVegetable, { headers })
            .subscribe(
              () => {
                // Request succeeded, emit the updated vegetable to the parent component
                this.inventoryEdited.emit(this.vegetable);
              },
              (error) => {
                console.error('Error updating vegetable:', error);
              }
            );
        }
      }
      
}