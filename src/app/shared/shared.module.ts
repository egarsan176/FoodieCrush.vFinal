import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AccessService } from '../services/access.service';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule //para que funcione routerLink de la navbar
  ],
  exports: [  //para poder usar estos componentes en otros módulos
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
