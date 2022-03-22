import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRecipeFormRoutingModule } from './upload-recipe-form-routing.module';
import { UploadRecipeFormComponent } from './upload-recipe-form.component';


@NgModule({
  declarations: [
    UploadRecipeFormComponent
  ],
  imports: [
    CommonModule,
    UploadRecipeFormRoutingModule
  ]
})
export class UploadRecipeFormModule { }
