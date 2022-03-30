import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRecipesComponent } from './all-recipes.component';

const routes: Routes = [{ path: '', component: AllRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllRecipesRoutingModule { }
