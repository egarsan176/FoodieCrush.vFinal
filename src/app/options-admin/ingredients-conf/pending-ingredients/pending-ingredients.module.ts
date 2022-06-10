import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingIngredientsRoutingModule } from './pending-ingredients-routing.module';
import { PendingIngredientsComponent } from './pending-ingredients.component';


@NgModule({
  declarations: [
    PendingIngredientsComponent
  ],
  imports: [
    CommonModule,
    PendingIngredientsRoutingModule
  ]
})
export class PendingIngredientsModule { }
