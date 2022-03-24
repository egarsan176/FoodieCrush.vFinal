import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersConfComponent } from './users-conf.component';

const routes: Routes = [{ path: '', component: UsersConfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersConfRoutingModule { }
