import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsConfComponent } from './ingredients-conf.component';

const routes: Routes = [{ path: '', component: IngredientsConfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsConfRoutingModule { }
