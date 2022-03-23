import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCategoriesComponent } from './show-categories.component';

const routes: Routes = [{ path: ':id', component: ShowCategoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowCategoriesRoutingModule {}
