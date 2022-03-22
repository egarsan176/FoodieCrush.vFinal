import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadRecipeFormComponent } from './upload-recipe-form.component';

const routes: Routes = [{ path: '', component: UploadRecipeFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRecipeFormRoutingModule { }
