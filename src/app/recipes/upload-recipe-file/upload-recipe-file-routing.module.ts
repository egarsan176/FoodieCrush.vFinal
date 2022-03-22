import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadRecipeFileComponent } from './upload-recipe-file.component';

const routes: Routes = [{ path: '', component: UploadRecipeFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRecipeFileRoutingModule { }
