import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingRecipesComponent } from './pending-recipes.component';

const routes: Routes = [{ path: '', component: PendingRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRecipesRoutingModule { }
