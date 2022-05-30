import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchByNameRoutingModule } from './search-by-name-routing.module';
import { SearchByNameComponent } from './search-by-name.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SearchByNameComponent],
  imports: [CommonModule, SearchByNameRoutingModule, FormsModule, SharedModule],
})
export class SearchByNameModule {}
