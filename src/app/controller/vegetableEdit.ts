import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';
import { VegetableService } from './vegetableService';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-vegetable-edit',
  templateUrl: '../view/vegetableEditVeiw.html',
  styleUrls: ['../view/vegetableEdit.css']
})
export class VegetableEdit implements OnInit {
  form: FormGroup;
  vegetableId!: string | null;
  @Input() selectedVegetable: VegetablesInCold | null = null;
  @Output() inventoryEdited = new EventEmitter<VegetablesInCold>();

  constructor(private fb: FormBuilder, private vegetableService: VegetableService, private route: ActivatedRoute) { 
    this.form = this.fb.group({
      refDate: [''],
      dguid: [''],
      typeOfProduct: [''],
      typeOfStorage: [''],
      uom: [''],
      uomId: [''],
      scalarFactor: [''],
      scalarId: [''],
      vector: [''],
      coordinate: [''],
      value: [''],
      status: [''],
      symbol: [''],
      terminated: [''],
      decimals: ['']
      // add more form fields here
    });
  }

  ngOnInit(): void {
    this.vegetableId = this.route.snapshot.paramMap.get('id');
    
    if (this.vegetableId) {
      this.vegetableService.getVegetable(this.vegetableId)
      .pipe(take(1))
      .subscribe((vegetable: VegetablesInCold) => {
        this.form.patchValue(vegetable);
      });
    }
  }


  onSubmitEdit(): void {
    if (this.form.valid) {
        const updatedVegetable = { ...this.form.value, id: this.vegetableId };
        this.vegetableService.updateVegetable(updatedVegetable).subscribe((updated: boolean) => {
          if(updated){
            this.inventoryEdited.emit(updatedVegetable);
          }
        });
      }
  }
}
