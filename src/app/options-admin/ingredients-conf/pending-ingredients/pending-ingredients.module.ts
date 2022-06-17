import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingIngredientsRoutingModule } from './pending-ingredients-routing.module';
import { PendingIngredientsComponent } from './pending-ingredients.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [PendingIngredientsComponent],
  imports: [
    CommonModule,
    PendingIngredientsRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
  ],
})
export class PendingIngredientsModule {}
