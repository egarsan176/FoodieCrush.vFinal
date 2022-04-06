import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedRecipesRoutingModule } from './approved-recipes-routing.module';
import { ApprovedRecipesComponent } from './approved-recipes.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ApprovedRecipesComponent],
  imports: [
    CommonModule,
    ApprovedRecipesRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
  ],
})
export class ApprovedRecipesModule {}
