import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'  
  },
  { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) }, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'optionsUser', loadChildren: () => import('./options-user/options-user.module').then(m => m.OptionsUserModule) },
  { path: 'optionsADMIN', loadChildren: () => import('./options-admin/options-admin.module').then(m => m.OptionsADMINModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
