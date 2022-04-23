import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCommentsComponent } from './all-comments.component';

const routes: Routes = [{ path: '', component: AllCommentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCommentsRoutingModule { }
