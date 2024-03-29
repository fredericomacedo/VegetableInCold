import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VegetablesDetailComponent } from './controller/vegetables-detail.component';
import { HeaderComponent } from './controller/header.component';
import { VegetableComponent } from './controller/vegetablesController';
import { FormsModule } from '@angular/forms';
import { VegetableEdit } from './controller/vegetableEdit';
import { ReactiveFormsModule } from '@angular/forms';
import { VegetableAddComponent } from './controller/vegetableAddComponent';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartComponent } from './chart/chart.component';
@NgModule({
  declarations: [
    AppComponent,
    VegetablesDetailComponent,
    HeaderComponent,
    VegetableEdit,
    VegetableComponent,
    VegetableAddComponent,
    ChartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
