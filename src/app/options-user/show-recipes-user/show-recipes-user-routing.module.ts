import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/Auth.guard';

import { ShowRecipesUserComponent } from './show-recipes-user.component';

const routes: Routes = [
  { path: '', component: ShowRecipesUserComponent, canActivate: [AuthGuard] },
  { path: 'recipeDetails', loadChildren: () => import('./details-recipe-from-user/details-recipe-from-user.module').then(m => m.DetailsRecipeFromUserModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowRecipesUserRoutingModule {}
