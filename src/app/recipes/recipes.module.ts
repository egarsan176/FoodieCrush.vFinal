import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from '../shared/shared.module';
import { ShowDetailsRecipeModule } from './show-details-recipe/show-details-recipe.module';

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RecipesRoutingModule, SharedModule],
  exports: [ShowDetailsRecipeModule],
})
export class RecipesModule {}
