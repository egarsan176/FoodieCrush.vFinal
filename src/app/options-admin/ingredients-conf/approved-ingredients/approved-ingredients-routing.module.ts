import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedIngredientsComponent } from './approved-ingredients.component';

const routes: Routes = [{ path: '', component: ApprovedIngredientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedIngredientsRoutingModule { }
