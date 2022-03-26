import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  {
    path: 'details',
    loadChildren: () =>
      import('./show-details-recipe/show-details-recipe.module').then(
        (m) => m.ShowDetailsRecipeModule
      ),
  },

  {
    path: 'uploadFileRecipe',
    loadChildren: () =>
      import('./upload-recipe-file/upload-recipe-file.module').then(
        (m) => m.UploadRecipeFileModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./show-categories/show-categories.module').then(
        (m) => m.ShowCategoriesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
