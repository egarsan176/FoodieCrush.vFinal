import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllIngredientsComponent } from './all-ingredients.component';

const routes: Routes = [{ path: '', component: AllIngredientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllIngredientsRoutingModule { }
