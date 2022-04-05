import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsConfComponent } from './comments-conf.component';

const routes: Routes = [{ path: '', component: CommentsConfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsConfRoutingModule { }
