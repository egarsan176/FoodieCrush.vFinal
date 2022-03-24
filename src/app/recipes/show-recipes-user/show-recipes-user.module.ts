import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRecipesUserRoutingModule } from './show-recipes-user-routing.module';
import { ShowRecipesUserComponent } from './show-recipes-user.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ShowRecipesUserComponent],
  imports: [
    CommonModule,
    ShowRecipesUserRoutingModule,
    TableModule,
    ButtonModule,
  ],
})
export class ShowRecipesUserModule {}

// npm install primeng --save
// VirtualScrolling depends on @angular/cdk's ScrollingModule so begin with installing CDK if not already installed.
// npm install @angular/cdk --save
// npm install primeicons --save
