import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedRecipesRoutingModule } from './approved-recipes-routing.module';
import { ApprovedRecipesComponent } from './approved-recipes.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ApprovedRecipesComponent],
  imports: [
    CommonModule,
    ApprovedRecipesRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
})
export class ApprovedRecipesModule {}
