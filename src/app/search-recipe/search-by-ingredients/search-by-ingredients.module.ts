import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchByIngredientsRoutingModule } from './search-by-ingredients-routing.module';
import { SearchByIngredientsComponent } from './search-by-ingredients.component';


@NgModule({
  declarations: [
    SearchByIngredientsComponent
  ],
  imports: [
    CommonModule,
    SearchByIngredientsRoutingModule
  ]
})
export class SearchByIngredientsModule { }
