import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsADMINRoutingModule } from './options-admin-routing.module';
import { OptionsADMINComponent } from './options-admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OptionsADMINComponent],
  imports: [CommonModule, OptionsADMINRoutingModule, SharedModule],
})
export class OptionsADMINModule {}
