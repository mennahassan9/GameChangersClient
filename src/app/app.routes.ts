import { RouterModule, Routes } from '@angular/router';
/****************************** */
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/homepage.component';

export const AppRoutes : Routes= [
    { 
        path: 'users',      
        component: UserComponent
    },
    {
        path: '',
        component: HomeComponent
    }
] 