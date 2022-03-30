import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesConfComponent } from './recipes-conf.component';

const routes: Routes = [
  { path: '', component: RecipesConfComponent },
  {
    path: 'recipeDetail',
    loadChildren: () =>
      import(
        './details-recipe-from-admin/details-recipe-from-admin.module'
      ).then((m) => m.DetailsRecipeFromAdminModule),
  },
  {
    path: 'pendingRecipes',
    loadChildren: () =>
      import('./pending-recipes/pending-recipes.module').then(
        (m) => m.PendingRecipesModule
      ),
  },
  {
    path: 'approvedRecipes',
    loadChildren: () =>
      import('./approved-recipes/approved-recipes.module').then(
        (m) => m.ApprovedRecipesModule
      ),
  },
  {
    path: 'allRecipes',
    loadChildren: () =>
      import('./all-recipes/all-recipes.module').then(
        (m) => m.AllRecipesModule
      ),
  },
  { path: 'newRecipe', loadChildren: () => import('./new-recipe/new-recipe.module').then(m => m.NewRecipeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesConfRoutingModule {}
