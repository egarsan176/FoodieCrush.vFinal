import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingCommentsRoutingModule } from './pending-comments-routing.module';
import { PendingCommentsComponent } from './pending-comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [PendingCommentsComponent],
  imports: [
    CommonModule,
    PendingCommentsRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class PendingCommentsModule {}
