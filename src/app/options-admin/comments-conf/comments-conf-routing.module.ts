import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsConfComponent } from './comments-conf.component';

const routes: Routes = [{ path: '', component: CommentsConfComponent }, { path: 'allComments', loadChildren: () => import('./all-comments/all-comments.module').then(m => m.AllCommentsModule) }, { path: 'approvedComments', loadChildren: () => import('./approved-comments/approved-comments.module').then(m => m.ApprovedCommentsModule) }, { path: 'pendingComments', loadChildren: () => import('./pending-comments/pending-comments.module').then(m => m.PendingCommentsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsConfRoutingModule { }
