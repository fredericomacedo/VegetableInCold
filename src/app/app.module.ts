import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { VegetablesComponent } from './vegetables/vegetables.component';
//import { VegetablesListComponent } from './vegetables/vegetables-list/vegetables-list.component';
import { VegetablesDetailComponent } from './appControler/vegetables-detail.component';
//import { VegetableItemComponent } from './vegetables/vegetables-list/vegetable-item/vegetable-item.component';
import { HeaderComponent } from './header/header.component';
import { VegetableComponent } from './appControler/vegetablesController';

@NgModule({
  declarations: [
    AppComponent,
    //VegetablesComponent,
    //VegetablesListComponent,
    VegetablesDetailComponent,
    //VegetableItemComponent,
    HeaderComponent,
    VegetableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
