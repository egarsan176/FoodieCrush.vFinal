import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsConfRoutingModule } from './comments-conf-routing.module';
import { CommentsConfComponent } from './comments-conf.component';


@NgModule({
  declarations: [
    CommentsConfComponent
  ],
  imports: [
    CommonModule,
    CommentsConfRoutingModule
  ]
})
export class CommentsConfModule { }
