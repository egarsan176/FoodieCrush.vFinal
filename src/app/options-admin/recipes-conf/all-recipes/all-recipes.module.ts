import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRecipesRoutingModule } from './all-recipes-routing.module';
import { AllRecipesComponent } from './all-recipes.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AllRecipesComponent],
  imports: [
    CommonModule,
    AllRecipesRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
  ],
})
export class AllRecipesModule {}
