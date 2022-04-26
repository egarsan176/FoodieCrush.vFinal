import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedCommentsComponent } from './approved-comments.component';

const routes: Routes = [{ path: '', component: ApprovedCommentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedCommentsRoutingModule { }
