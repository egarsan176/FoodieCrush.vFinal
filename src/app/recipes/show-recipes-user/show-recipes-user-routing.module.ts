import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowRecipesUserComponent } from './show-recipes-user.component';

const routes: Routes = [{ path: '', component: ShowRecipesUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRecipesUserRoutingModule { }
