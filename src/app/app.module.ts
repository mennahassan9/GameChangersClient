import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { PaginationModule, ModalModule  } from 'ngx-bootstrap';
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
import { RegisterTeamComponent } from './register-team/register-team.component';
import { RegisterIdeaComponent } from './register-idea/register-idea.component';
import { InviteTeamMemberComponent } from './invite-team-member/invite-team-member.component';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component';
import { ViewIdeaComponent } from './view-idea/view-idea.component';
import { AdminViewIdeasComponent } from './admin/admin-view-ideas/admin-view-ideas.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { JudgeHomeComponent } from './judge-home/judge-home.component';
import { JudgeIdeaComponent } from './judge-idea/judge-idea.component';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
/*************************************** */
import { LoginService } from './Services/login.service';
import { TeamService } from './Services/team.service';
import { IdeaService } from './Services/idea.service';
import { HeaderButtonsService } from './Services/headerButtons.service';
import { JudgingService } from './Services/judging.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { AuthService } from './Services/auth.service';
import { AuthGuardJudgeService } from './Services/auth-guard-judge';
import { DefaultGuardService } from './Services/default-guard.service';
import { AdminService } from './Services/admin.service';
import { AuthGuardAdminService } from './Services/auth-guard-admin';
import { DomainService } from './Services/domain.service';
import { IdeaChallengeService } from './Services/idea-challenge.service';

import { Ng2TableModule  } from 'ng2-table/ng2-table';
import { ChartsModule } from 'ng2-charts';
import { DeadlineComponent } from './deadline/deadline.component';
import { JudgeControlComponent } from './judge-control/judge-control.component';
import { AdminViewUsersComponent } from './admin/admin-view-users/admin-view-users.component';
import { AdminTopIdeasComponent } from './admin/admin-top-ideas/admin-top-ideas.component';
import { AdminViewUserComponent } from './admin/admin-view-user/admin-view-user.component';
import { AdminViewUserTeamComponent } from './admin/admin-view-user-team/admin-view-user-team.component';
import { AdminViewUserIdeaComponent } from './admin/admin-view-user-idea/admin-view-user-idea.component';
import { AdminEmailDomainComponent } from './admin/admin-email-domain/admin-email-domain.component';
import { AdminIdeaChallengeComponent } from './admin/admin-idea-challenge/admin-idea-challenge.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminViewTeamsComponent } from './admin/admin-view-teams/admin-view-teams.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { ViewInvitationsComponent } from './view-invitations/view-invitations.component';
import { LowerCaseInputDirective } from './lowercase.directive';
import { JoinTeamComponent } from './join-team/join-team.component';
 




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
    CreateTeamStatusComponent,
    RegisterIdeaComponent,
    ViewIdeaComponent,
    JudgeHomeComponent,
    JudgeIdeaComponent,
    UnauthorizedComponent,
    AdminViewIdeasComponent,
    DeadlineComponent,
    JudgeControlComponent,
    AdminViewUsersComponent,
    AdminTopIdeasComponent,
    
    

    AdminViewUserComponent,
    AdminViewUserTeamComponent,
    AdminViewUserIdeaComponent,
    AdminEmailDomainComponent,
    AdminIdeaChallengeComponent,
    AdminDashboardComponent,
    SidenavComponent,
    AdminViewTeamsComponent,
    EditQuestionsComponent,
    ViewInvitationsComponent,
    AdminSettingsComponent,
    AdminViewTeamsComponent,
    LowerCaseInputDirective,
    JoinTeamComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    BrowserModule,
    FormsModule,
    ChartsModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2TableModule,
    Angular2FontawesomeModule,
    LocalStorageModule.withConfig({
        prefix: 'my-app',
        storageType: 'localStorage'
    }),
    DndModule.forRoot(),
    LocalStorageModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    LoginService,
    InviteTeamMemberComponent,
    TeamService,
    IdeaService,
    HeaderButtonsService,
    JudgingService,
    AuthGuardService,
    AuthService,
    AuthGuardJudgeService,
    DefaultGuardService,
    AdminService,
    AuthGuardAdminService,
    
    DomainService,
    IdeaChallengeService

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
