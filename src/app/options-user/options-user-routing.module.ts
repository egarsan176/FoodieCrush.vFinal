import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/Auth.guard';
import { OptionsUserComponent } from './options-user.component';

const routes: Routes = [{ path: '', component: OptionsUserComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsUserRoutingModule { }
