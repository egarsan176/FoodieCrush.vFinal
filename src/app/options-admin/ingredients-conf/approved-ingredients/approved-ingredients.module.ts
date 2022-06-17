import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedIngredientsRoutingModule } from './approved-ingredients-routing.module';
import { ApprovedIngredientsComponent } from './approved-ingredients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ApprovedIngredientsComponent],
  imports: [
    CommonModule,
    ApprovedIngredientsRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
  ],
})
export class ApprovedIngredientsModule {}
