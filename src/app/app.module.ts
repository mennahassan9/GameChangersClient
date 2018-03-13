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
import { ViewTeamComponent } from './view-team/view-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { AppRoutes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './homepage/homepage.component';
import { UserService } from './Services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CreateTeamStatusComponent } from './create-team-status/create-team-status.component';

/*************************************** */
import { LoginService } from './Services/login.service';
import { InviteTeamMemberComponent } from './invite-team-member/invite-team-member.component';
import { RegisterTeamComponent } from './register-team/register-team.component';
import { TeamService} from './Services/team.service'
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
    InviteTeamMemberComponent,
    RegisterTeamComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    AuthenticateUserComponent,
    EditTeamComponent,
    ViewTeamComponent,
    CreateTeamStatusComponent
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
    LoginService,
    InviteTeamMemberComponent,
    TeamService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
