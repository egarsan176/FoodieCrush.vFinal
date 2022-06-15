import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRecipeComponent } from './search-recipe.component';

const routes: Routes = [{ path: '', component: SearchRecipeComponent }, { path: 'searchByName', loadChildren: () => import('./search-by-name/search-by-name.module').then(m => m.SearchByNameModule) }, { path: 'searchByIngredients', loadChildren: () => import('./search-by-ingredients/search-by-ingredients.module').then(m => m.SearchByIngredientsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRecipeRoutingModule { }
