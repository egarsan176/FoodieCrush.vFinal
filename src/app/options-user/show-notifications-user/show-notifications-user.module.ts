import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowNotificationsUserRoutingModule } from './show-notifications-user-routing.module';
import { ShowNotificationsUserComponent } from './show-notifications-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ShowNotificationsUserComponent],
  imports: [
    CommonModule,
    ShowNotificationsUserRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class ShowNotificationsUserModule {}
