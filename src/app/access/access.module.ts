import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorService } from '../services/email-validator.service';
import { ValidatorService } from '../services/validator.service';
import { RegisterComponent } from './register/register.component';
import { AccessService } from '../services/access.service';
import { UsernameValidatorService } from '../services/username-validator.service';

@NgModule({
  declarations: [AccessComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AccessService,
    EmailValidatorService,
    ValidatorService,
    UsernameValidatorService,
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AccessModule {}
