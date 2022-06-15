import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchByNameComponent } from './search-by-name.component';

const routes: Routes = [{ path: '', component: SearchByNameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchByNameRoutingModule { }
