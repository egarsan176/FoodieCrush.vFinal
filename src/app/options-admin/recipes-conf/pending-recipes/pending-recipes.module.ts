import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRecipesRoutingModule } from './pending-recipes-routing.module';
import { PendingRecipesComponent } from './pending-recipes.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PendingRecipesComponent],
  imports: [
    CommonModule,
    PendingRecipesRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
  ],
})
export class PendingRecipesModule {}
