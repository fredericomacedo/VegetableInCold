import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VegetableEdit } from './controller/vegetableEdit';
const routes: Routes = [
  { path: 'edit-vegetable/:id', component: VegetableEdit },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
