import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesConfRoutingModule } from './recipes-conf-routing.module';
import { RecipesConfComponent } from './recipes-conf.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { UploadRecipeFileModule } from 'src/app/recipes/upload-recipe-file/upload-recipe-file.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RecipesConfComponent],
  imports: [
    CommonModule,
    RecipesConfRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
    UploadRecipeFileModule,
  ],
})
export class RecipesConfModule {}
