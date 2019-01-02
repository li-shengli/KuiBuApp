import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { NewTaskComponent } from './new-task/new-task.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DataSyncComponent } from './data-sync/data-sync.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'data_sync', component: DataSyncComponent, canActivate: [AuthGuard] },
    { path: 'user_profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'new_task', component: NewTaskComponent , canActivate: [AuthGuard] },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);