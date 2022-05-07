import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipeRoutingModule } from './search-recipe-routing.module';
import { SearchRecipeComponent } from './search-recipe.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchRecipeComponent],
  imports: [CommonModule, SearchRecipeRoutingModule, SharedModule],
})
export class SearchRecipeModule {}
