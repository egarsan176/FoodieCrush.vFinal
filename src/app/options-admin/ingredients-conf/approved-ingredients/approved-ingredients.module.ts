import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedIngredientsRoutingModule } from './approved-ingredients-routing.module';
import { ApprovedIngredientsComponent } from './approved-ingredients.component';


@NgModule({
  declarations: [
    ApprovedIngredientsComponent
  ],
  imports: [
    CommonModule,
    ApprovedIngredientsRoutingModule
  ]
})
export class ApprovedIngredientsModule { }
