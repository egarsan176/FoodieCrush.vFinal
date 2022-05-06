import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/Auth.guard';
import { DetailsRecipeFromUserComponent } from './details-recipe-from-user/details-recipe-from-user.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

import { ShowRecipesUserComponent } from './show-recipes-user.component';

const routes: Routes = [
  { path: '', component: ShowRecipesUserComponent, canActivate: [AuthGuard] },
  { path: 'recipeDetails/:id', component: DetailsRecipeFromUserComponent },
  {
    path: 'edit/:id',
    component: EditRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowRecipesUserRoutingModule {}
