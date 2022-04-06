import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { RecipeFormTemplateComponent } from './recipe-form-template/recipe-form-template.component';
import { RecipeDetailsTemplateComponent } from './recipe-details-template/recipe-details-template.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    RecipeFormTemplateComponent,
    RecipeDetailsTemplateComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, //para que funcione routerLink de la navbar
    FormsModule,
  ],
  exports: [
    //para poder usar estos componentes en otros módulos
    NavbarComponent,
    FooterComponent,
    RecipeFormTemplateComponent,
    RecipeDetailsTemplateComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
