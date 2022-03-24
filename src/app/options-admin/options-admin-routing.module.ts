import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsADMINComponent } from './options-admin.component';

const routes: Routes = [
  { path: '', component: OptionsADMINComponent },
  {
    path: 'usersConf',
    loadChildren: () =>
      import('./users-conf/users-conf.module').then((m) => m.UsersConfModule),
  },
  {
    path: 'recipesConf',
    loadChildren: () =>
      import('./recipes-conf/recipes-conf.module').then(
        (m) => m.RecipesConfModule
      ),
  },
  {
    path: 'commentsConf',
    loadChildren: () =>
      import('./comments-conf/comments-conf.module').then(
        (m) => m.CommentsConfModule
      ),
  },
  { path: 'ingredientsConf', loadChildren: () => import('./ingredients-conf/ingredients-conf.module').then(m => m.IngredientsConfModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsADMINRoutingModule {}
