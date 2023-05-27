import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { VegetablesListComponent } from './vegetables/vegetables-list/vegetables-list.component';
import { VegetablesDetailComponent } from './vegetables/vegetables-detail/vegetables-detail.component';
import { VegetableItemComponent } from './vegetables/vegetables-list/vegetable-item/vegetable-item.component';

@NgModule({
  declarations: [
    AppComponent,
    VegetablesComponent,
    VegetablesListComponent,
    VegetablesDetailComponent,
    VegetableItemComponent
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
