import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsUserRoutingModule } from './options-user-routing.module';
import { OptionsUserComponent } from './options-user.component';

@NgModule({
  declarations: [OptionsUserComponent],
  imports: [CommonModule, OptionsUserRoutingModule],
  exports: [],
})
export class OptionsUserModule {}
