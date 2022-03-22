import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowCategoriesRoutingModule } from './show-categories-routing.module';
import { ShowCategoriesComponent } from './show-categories.component';


@NgModule({
  declarations: [
    ShowCategoriesComponent
  ],
  imports: [
    CommonModule,
    ShowCategoriesRoutingModule
  ]
})
export class ShowCategoriesModule { }
