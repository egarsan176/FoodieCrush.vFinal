import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRecipeFromUserRoutingModule } from './details-recipe-from-user-routing.module';
import { DetailsRecipeFromUserComponent } from './details-recipe-from-user.component';
import { ShowDetailsRecipeModule } from 'src/app/recipes/show-details-recipe/show-details-recipe.module';

@NgModule({
  declarations: [DetailsRecipeFromUserComponent],
  imports: [
    CommonModule,
    DetailsRecipeFromUserRoutingModule,
    ShowDetailsRecipeModule,
  ],
})
export class DetailsRecipeFromUserModule {}
