import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRecipeFromAdminRoutingModule } from './details-recipe-from-admin-routing.module';
import { DetailsRecipeFromAdminComponent } from './details-recipe-from-admin.component';
import { ShowDetailsRecipeModule } from 'src/app/recipes/show-details-recipe/show-details-recipe.module';

@NgModule({
  declarations: [DetailsRecipeFromAdminComponent],
  imports: [
    CommonModule,
    DetailsRecipeFromAdminRoutingModule,
    ShowDetailsRecipeModule,
  ],
})
export class DetailsRecipeFromAdminModule {}
