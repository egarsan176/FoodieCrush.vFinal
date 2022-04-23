import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/Auth.guard';
import { OptionsUserComponent } from './options-user.component';

const routes: Routes = [
  { path: '', component: OptionsUserComponent, canActivate: [AuthGuard] },
  {
    path: 'myRecipes',
    loadChildren: () =>
      import('../options-user/show-recipes-user/show-recipes-user.module').then(
        (m) => m.ShowRecipesUserModule
      ),
  },
  {
    path: 'uploadRecipe',
    loadChildren: () =>
      import(
        '../options-user/upload-recipe-form/upload-recipe-form.module'
      ).then((m) => m.UploadRecipeFormModule),
  },
  { path: 'notifUser', loadChildren: () => import('./show-notifications-user/show-notifications-user.module').then(m => m.ShowNotificationsUserModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsUserRoutingModule {}
