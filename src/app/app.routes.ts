import { RouterModule, Routes } from '@angular/router';
/****************************** */
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component';

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
        path: '',
        component: HomeComponent
    },
    {
        path: 'authenticate/:id',
        component: AuthenticateUserComponent
    }
] 