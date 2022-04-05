import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRecipeRoutingModule } from './new-recipe-routing.module';
import { NewRecipeComponent } from './new-recipe.component';
import { UploadRecipeFileModule } from 'src/app/recipes/upload-recipe-file/upload-recipe-file.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NewRecipeComponent],
  imports: [
    CommonModule,
    NewRecipeRoutingModule,
    SharedModule,
    UploadRecipeFileModule,
  ],
})
export class NewRecipeModule {}
