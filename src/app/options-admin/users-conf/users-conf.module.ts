import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersConfRoutingModule } from './users-conf-routing.module';
import { UsersConfComponent } from './users-conf.component';


@NgModule({
  declarations: [
    UsersConfComponent
  ],
  imports: [
    CommonModule,
    UsersConfRoutingModule
  ]
})
export class UsersConfModule { }
