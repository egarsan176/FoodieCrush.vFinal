import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedCommentsRoutingModule } from './approved-comments-routing.module';
import { ApprovedCommentsComponent } from './approved-comments.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ApprovedCommentsComponent],
  imports: [
    CommonModule,
    ApprovedCommentsRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class ApprovedCommentsModule {}
