import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDetailsRecipeComponent } from './show-details-recipe.component';

const routes: Routes = [{ path: '', component: ShowDetailsRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowDetailsRecipeRoutingModule { }
