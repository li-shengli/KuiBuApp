import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent }  from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NewTaskComponent } from './new-task/new-task.component';
import {MatCardModule} from '@angular/material/card';
import {ChartModule} from 'angular-highcharts';

import { routing }        from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, TaskService, WechatShareService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { fakeBackendProvider } from './_helpers';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConnectUsComponent } from './connect-us/connect-us.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DataSyncComponent } from './data-sync/data-sync.component';
import { DialogConfirmDialog } from './delete-confirm/delete-confirm.component';
import { DoneConfirmComponent } from './done-confirm/done-confirm.component';
import { MatMenuModule} from '@angular/material/menu';
import { TaskSharingComponent } from './task-sharing/task-sharing.component';
import { QrcodeDisplayComponent } from './qrcode-display/qrcode-display.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConnectUsComponent,
    UserProfileComponent,
    DataSyncComponent,
    DialogConfirmDialog,
    DoneConfirmComponent,
    TaskSharingComponent,
    QrcodeDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatSidenavModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatMenuModule,
    routing
  ],
  entryComponents: [
    NewTaskComponent,
    ConnectUsComponent,
    DialogConfirmDialog,
    DoneConfirmComponent,
    TaskSharingComponent,
    QrcodeDisplayComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    TaskService,
    WechatShareService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
