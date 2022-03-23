import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRecipeFormRoutingModule } from './upload-recipe-form-routing.module';
import { UploadRecipeFormComponent } from './upload-recipe-form.component';
import { UploadRecipeFileModule } from '../upload-recipe-file/upload-recipe-file.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadRecipeFormComponent],
  imports: [
    CommonModule,
    UploadRecipeFormRoutingModule,
    UploadRecipeFileModule,
    FormsModule,
  ],
})
export class UploadRecipeFormModule {}
