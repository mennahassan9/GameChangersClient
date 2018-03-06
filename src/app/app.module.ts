import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';

  /*************************************** */
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './homepage/homepage.component';
import {UserService} from './Services/user.service';
import { ProfileComponent } from './profile/profile.component';
/*************************************** */
import { LoginService } from './Services/login.service';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    AuthenticateUserComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LocalStorageModule.withConfig({
        prefix: 'my-app',
        storageType: 'localStorage'
    }),
    DndModule.forRoot()
  ],
  providers: [
    UserService,
    LoginService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
