import { RouterModule, Routes } from '@angular/router';
/****************************** */
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterTeamComponent } from './register-team/register-team.component';
import { RegisterIdeaComponent } from './register-idea/register-idea.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { ViewIdeaComponent } from './view-idea/view-idea.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component';
import { CreateTeamStatusComponent } from './create-team-status/create-team-status.component';
import { JudgeHomeComponent } from './judge-home/judge-home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { JudgeIdeaComponent } from './judge-idea/judge-idea.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AuthGuardJudgeService } from './Services/auth-guard-judge';
import { DefaultGuardService } from './Services/default-guard.service';
import { AdminViewIdeasComponent } from './admin/admin-view-ideas/admin-view-ideas.component';
import { AuthGuardAdminService } from './Services/auth-guard-admin';
import { JudgeControlComponent } from './judge-control/judge-control.component';
import { AdminViewUsersComponent } from './admin/admin-view-users/admin-view-users.component';
import { AdminTopIdeasComponent } from './admin/admin-top-ideas/admin-top-ideas.component';
import { AdminViewUserComponent } from './admin/admin-view-user/admin-view-user.component';
import { AdminViewUserTeamComponent } from './admin/admin-view-user-team/admin-view-user-team.component';
import { AdminViewUserIdeaComponent } from './admin/admin-view-user-idea/admin-view-user-idea.component';
import { AdminEmailDomainComponent } from './admin/admin-email-domain/admin-email-domain.component';
import { AdminIdeaChallengeComponent } from './admin/admin-idea-challenge/admin-idea-challenge.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminViewTeamsComponent } from './admin/admin-view-teams/admin-view-teams.component';
import {EditQuestionsComponent} from './edit-questions/edit-questions.component';
import { ViewInvitationsComponent } from './view-invitations/view-invitations.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { ViewAllTeamsComponent } from './view-all-teams/view-all-teams.component';
import { ViewAllIdeasComponent } from './view-all-ideas/view-all-ideas.component';
import { LeaderDashboardComponent } from './leader-dashboard/leader-dashboard.component';
import { LeaderViewUsersComponent } from './leader-view-users/leader-view-users.component';
import { LeaderViewTeamsComponent } from './leader-view-teams/leader-view-teams.component';
import { InviteLeaderComponent } from './admin/invite-leader/invite-leader.component';
import { InviteJudgeComponent } from './admin/invite-judge/invite-judge.component';
import { JudgeViewIdeasComponent } from './judge-view-ideas/judge-view-ideas.component';
import { JudgeViewTeamIdeaComponent } from './judge-view-team-idea/judge-view-team-idea.component';


export const AppRoutes : Routes= [

    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'admin/ideas',
        component: AdminViewIdeasComponent,
        canActivate: [AuthGuardAdminService]
    },
    { 
        path: 'admin/topideas',  
            
        component: AdminTopIdeasComponent,
        canActivate: [AuthGuardAdminService]
        
    },
    {
        path: 'signup',
        component: RegistrationComponent
        // ca
    },
    {
        path: 'admin/users',
        component: AdminViewUsersComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/user',
        component: AdminViewUserComponent,
    },
    {
        path: 'admin/viewTeam/:id',
        component: AdminViewUserTeamComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/edit-questions',
        component: EditQuestionsComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/viewIdea/:id',
        component: AdminViewUserIdeaComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/invite-judge',
        component: InviteJudgeComponent
    },
    {
        path: 'signin',
        component: LoginComponent,
        canActivate: [DefaultGuardService]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'registerTeam',
        component : RegisterTeamComponent,
    },
    {
        path: 'registerIdea',
        component : RegisterIdeaComponent,
    },
    {
        path: 'view-invitations',
        component: ViewInvitationsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'viewTeam/:teamName',
        component : ViewTeamComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'viewIdea',
        component : ViewIdeaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'judge/viewIdea/:teamName',
        component : JudgeViewTeamIdeaComponent,
        canActivate: [AuthGuardJudgeService]
    },
    {
        path: 'editTeam',
        component : EditTeamComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'teams',
        component : ViewAllTeamsComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'ideas',
        component : ViewAllIdeasComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'teams/join/:teamname',
        component : JoinTeamComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:token',
        component: PasswordResetComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [DefaultGuardService]
    },
    {
        path: 'create-team-status',
        component: CreateTeamStatusComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'authenticate/:id',
        component: AuthenticateUserComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'judge',
        component: JudgeHomeComponent,
        canActivate: [AuthGuardJudgeService]
    },
    {
        path: 'judge/idea',
        component: JudgeIdeaComponent,
        canActivate: [AuthGuardJudgeService]
    },
    {
        path: 'judge/ideas',
        component: JudgeViewIdeasComponent,
        canActivate: [AuthGuardJudgeService]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'team-control',
        component: JudgeControlComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/domains',
        component: AdminEmailDomainComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/idea-challenges',
        component: AdminIdeaChallengeComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/settings',
        component: AdminSettingsComponent,
        canActivate: [AuthGuardAdminService]
    },
    {
        path: 'admin/teams',
        component: AdminViewTeamsComponent
    },
    {
        path: 'leader/dashboard',
        component: LeaderDashboardComponent
    },
    {
        path: 'leader/users',
        component: LeaderViewUsersComponent
    },
    {
        path: 'leader/teams',
        component: LeaderViewTeamsComponent
    },
    {
        path:'admin/invite-leaders',
        component: InviteLeaderComponent
    }
];
