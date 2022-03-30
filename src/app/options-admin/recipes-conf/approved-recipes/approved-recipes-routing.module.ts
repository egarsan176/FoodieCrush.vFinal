import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedRecipesComponent } from './approved-recipes.component';

const routes: Routes = [{ path: '', component: ApprovedRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedRecipesRoutingModule { }
