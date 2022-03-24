import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesConfComponent } from './recipes-conf.component';

const routes: Routes = [{ path: '', component: RecipesConfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesConfRoutingModule { }
