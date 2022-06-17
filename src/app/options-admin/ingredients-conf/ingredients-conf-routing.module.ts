import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsConfComponent } from './ingredients-conf.component';

const routes: Routes = [{ path: '', component: IngredientsConfComponent }, { path: 'allIngredients', loadChildren: () => import('./all-ingredients/all-ingredients.module').then(m => m.AllIngredientsModule) }, { path: 'pendingIngredients', loadChildren: () => import('./pending-ingredients/pending-ingredients.module').then(m => m.PendingIngredientsModule) }, { path: 'approvedIngredients', loadChildren: () => import('./approved-ingredients/approved-ingredients.module').then(m => m.ApprovedIngredientsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsConfRoutingModule { }
