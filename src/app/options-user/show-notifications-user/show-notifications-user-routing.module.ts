import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowNotificationsUserComponent } from './show-notifications-user.component';

const routes: Routes = [{ path: '', component: ShowNotificationsUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowNotificationsUserRoutingModule { }
