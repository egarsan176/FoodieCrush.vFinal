import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { RecipesService } from '../services/Recipes.service';

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RecipesRoutingModule],
  providers: [RecipesService],
})
export class RecipesModule {}
