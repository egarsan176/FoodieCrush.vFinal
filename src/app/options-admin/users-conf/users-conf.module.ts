import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersConfRoutingModule } from './users-conf-routing.module';
import { UsersConfComponent } from './users-conf.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersConfComponent],
  imports: [
    CommonModule,
    UsersConfRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class UsersConfModule {}
