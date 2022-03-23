import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/Auth.guard';
import { AccessModule } from './access/access.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'; //npm install @auth0/angular-jwt
import { AccessService } from './services/access.service';
import { UserSubjectNavBarService } from './services/UserSubjectNavBar.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccessModule
  ],
  providers: [AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, UserSubjectNavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
