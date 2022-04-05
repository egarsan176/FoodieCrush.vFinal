import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsConfRoutingModule } from './ingredients-conf-routing.module';
import { IngredientsConfComponent } from './ingredients-conf.component';


@NgModule({
  declarations: [
    IngredientsConfComponent
  ],
  imports: [
    CommonModule,
    IngredientsConfRoutingModule
  ]
})
export class IngredientsConfModule { }
