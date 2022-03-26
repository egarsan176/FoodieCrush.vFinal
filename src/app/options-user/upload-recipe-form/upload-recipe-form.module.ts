import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRecipeFormRoutingModule } from './upload-recipe-form-routing.module';
import { UploadRecipeFormComponent } from './upload-recipe-form.component';
import { UploadRecipeFileModule } from '../../recipes/upload-recipe-file/upload-recipe-file.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UploadRecipeFormComponent],
  imports: [
    CommonModule,
    UploadRecipeFormRoutingModule,
    UploadRecipeFileModule,
    FormsModule,
    SharedModule,
  ],
  exports: [],
})
export class UploadRecipeFormModule {}
