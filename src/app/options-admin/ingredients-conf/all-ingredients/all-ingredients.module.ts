import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllIngredientsRoutingModule } from './all-ingredients-routing.module';
import { AllIngredientsComponent } from './all-ingredients.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [AllIngredientsComponent],
  imports: [
    CommonModule,
    AllIngredientsRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class AllIngredientsModule {}
