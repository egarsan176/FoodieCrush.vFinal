import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/Auth.guard';
import { UploadRecipeFormComponent } from './upload-recipe-form.component';

const routes: Routes = [
  { path: '', component: UploadRecipeFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRecipeFormRoutingModule {}
