import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowDetailsRecipeRoutingModule } from './show-details-recipe-routing.module';
import { ShowDetailsRecipeComponent } from './show-details-recipe.component';


@NgModule({
  declarations: [
    ShowDetailsRecipeComponent
  ],
  imports: [
    CommonModule,
    ShowDetailsRecipeRoutingModule
  ]
})
export class ShowDetailsRecipeModule { }
