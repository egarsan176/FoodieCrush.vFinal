import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingIngredientsComponent } from './pending-ingredients.component';

const routes: Routes = [{ path: '', component: PendingIngredientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingIngredientsRoutingModule { }
