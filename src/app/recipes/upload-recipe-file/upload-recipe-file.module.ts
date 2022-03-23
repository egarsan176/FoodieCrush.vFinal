import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRecipeFileRoutingModule } from './upload-recipe-file-routing.module';
import { UploadRecipeFileComponent } from './upload-recipe-file.component';

@NgModule({
  declarations: [UploadRecipeFileComponent],
  imports: [CommonModule, UploadRecipeFileRoutingModule],
  exports: [UploadRecipeFileComponent],
})
export class UploadRecipeFileModule {}
