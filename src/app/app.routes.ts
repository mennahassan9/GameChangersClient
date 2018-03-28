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
import { JudgeIdeaComponent } from './judge-idea/judge-idea.component';

export const AppRoutes : Routes= [
    { 
        path: 'users',      
        component: UserComponent
    },
    {
        path: 'signup',
        component: RegistrationComponent
    },
    {
        path: 'signin',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path:'registerTeam',
        component : RegisterTeamComponent
    },
    {
        path:'registerIdea',
        component : RegisterIdeaComponent
    },
    {
        path:'viewTeam',
        component : ViewTeamComponent
    },
    {
        path:'viewIdea',
        component : ViewIdeaComponent
    },
    {
        path:'editTeam',
        component : EditTeamComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: PasswordResetComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'create-team-status',
        component: CreateTeamStatusComponent
    },
    {
        path: 'authenticate/:id',
        component: AuthenticateUserComponent
    },
    {
        path: 'judge',
        component: JudgeHomeComponent
    },
    {
        path: 'judge/idea',
        component: JudgeIdeaComponent
    }
] 