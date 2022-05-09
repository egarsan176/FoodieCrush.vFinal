import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchByIngredientsRoutingModule } from './search-by-ingredients-routing.module';
import { SearchByIngredientsComponent } from './search-by-ingredients.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SearchByIngredientsComponent],
  imports: [
    CommonModule,
    SearchByIngredientsRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class SearchByIngredientsModule {}
