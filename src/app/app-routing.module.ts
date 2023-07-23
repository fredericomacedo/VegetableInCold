import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VegetableEdit } from './controller/vegetableEdit';
import { VegetableComponent } from './controller/vegetablesController';
import { VegetableAddComponent } from './controller/vegetableAddComponent';
const routes: Routes = [
  { path: 'vegetables', component: VegetableComponent },
  { path: 'vegetables/add', component: VegetableAddComponent },

  { path: 'edit-vegetable/:id', component: VegetableEdit },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
