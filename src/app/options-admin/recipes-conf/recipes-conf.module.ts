import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesConfRoutingModule } from './recipes-conf-routing.module';
import { RecipesConfComponent } from './recipes-conf.component';


@NgModule({
  declarations: [
    RecipesConfComponent
  ],
  imports: [
    CommonModule,
    RecipesConfRoutingModule
  ]
})
export class RecipesConfModule { }
