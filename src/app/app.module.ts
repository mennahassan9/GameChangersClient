import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DndModule} from 'ng2-dnd';

  /*************************************** */
=======
/****************************************/
>>>>>>> cb1e982e03b972441e5d4f0bedb4214d0c3a8f1e
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './homepage/homepage.component';
/*************************************** */



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
