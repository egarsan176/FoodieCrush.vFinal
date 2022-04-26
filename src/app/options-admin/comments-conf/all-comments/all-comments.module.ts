import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCommentsRoutingModule } from './all-comments-routing.module';
import { AllCommentsComponent } from './all-comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [AllCommentsComponent],
  imports: [
    CommonModule,
    AllCommentsRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class AllCommentsModule {}
