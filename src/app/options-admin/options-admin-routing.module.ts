import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsADMINComponent } from './options-admin.component';

const routes: Routes = [{ path: '', component: OptionsADMINComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsADMINRoutingModule { }
