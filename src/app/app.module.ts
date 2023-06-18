import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VegetablesDetailComponent } from './controller/vegetables-detail.component';
import { HeaderComponent } from './controller/header.component';
import { VegetableComponent } from './controller/vegetablesController';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    VegetablesDetailComponent,
    HeaderComponent,
    VegetableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
