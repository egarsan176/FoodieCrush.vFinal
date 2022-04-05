import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsUserRoutingModule } from './options-user-routing.module';
import { OptionsUserComponent } from './options-user.component';
import { UploadRecipeFormModule } from './upload-recipe-form/upload-recipe-form.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OptionsUserComponent],
  imports: [CommonModule, OptionsUserRoutingModule],
  exports: [],
})
export class OptionsUserModule {}
