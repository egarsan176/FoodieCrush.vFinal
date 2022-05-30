import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRecipesUserRoutingModule } from './show-recipes-user-routing.module';
import { ShowRecipesUserComponent } from './show-recipes-user.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsRecipeFromUserComponent } from './details-recipe-from-user/details-recipe-from-user.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShowRecipesUserComponent,
    DetailsRecipeFromUserComponent,
    EditRecipeComponent,
  ],
  imports: [
    CommonModule,
    ShowRecipesUserRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShowRecipesUserModule {}

// npm install primeng --save
// VirtualScrolling depends on @angular/cdk's ScrollingModule so begin with installing CDK if not already installed.
// npm install @angular/cdk --save
// npm install primeicons --save
// npm install @angular/animations --save
