import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VegetablesInCold } from 'src/app/model/vegetable-in-cold';
import { VegetableService } from './vegetableService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vegetable-add',
  templateUrl: '../view/vegetableAddView.html',
  styleUrls: ['../view/vegetableAdd.css']
})
export class VegetableAddComponent implements OnInit {
  form: FormGroup;
  @Output() inventoryAdded = new EventEmitter<VegetablesInCold>();

  constructor(private fb: FormBuilder, private vegetableService: VegetableService, private router: Router) {
    this.form = this.fb.group({
      refDate: [''],
      dguid: [''],
      typeOfProduct: [''],
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
    });
  }

  ngOnInit(): void {}

  onSubmitAdd(): void {
    if (this.form.valid) {
      const newVegetable: VegetablesInCold = this.form.value;
      this.vegetableService.createVegetable(newVegetable).subscribe(() => {
        this.inventoryAdded.emit(newVegetable);
        this.router.navigate(['/vegetables']); // Navigate back to the list of vegetables
      });
    }
  }
}
