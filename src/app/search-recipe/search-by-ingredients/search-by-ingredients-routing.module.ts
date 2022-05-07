import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchByIngredientsComponent } from './search-by-ingredients.component';

const routes: Routes = [{ path: '', component: SearchByIngredientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchByIngredientsRoutingModule { }
