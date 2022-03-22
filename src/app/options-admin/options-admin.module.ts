import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsADMINRoutingModule } from './options-admin-routing.module';
import { OptionsADMINComponent } from './options-admin.component';


@NgModule({
  declarations: [
    OptionsADMINComponent
  ],
  imports: [
    CommonModule,
    OptionsADMINRoutingModule
  ]
})
export class OptionsADMINModule { }
