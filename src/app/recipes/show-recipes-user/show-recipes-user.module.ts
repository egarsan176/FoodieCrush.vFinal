import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRecipesUserRoutingModule } from './show-recipes-user-routing.module';
import { ShowRecipesUserComponent } from './show-recipes-user.component';

@NgModule({
  declarations: [ShowRecipesUserComponent],
  imports: [CommonModule, ShowRecipesUserRoutingModule],
})
export class ShowRecipesUserModule {}
