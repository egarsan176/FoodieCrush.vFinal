import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowDetailsRecipeRoutingModule } from './show-details-recipe-routing.module';
import { ShowDetailsRecipeComponent } from './show-details-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowDetailsRecipeComponent],
  imports: [
    CommonModule,
    ShowDetailsRecipeRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [ShowDetailsRecipeComponent],
})
export class ShowDetailsRecipeModule {}
