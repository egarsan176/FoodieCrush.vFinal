import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingCommentsComponent } from './pending-comments.component';

const routes: Routes = [{ path: '', component: PendingCommentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingCommentsRoutingModule { }
