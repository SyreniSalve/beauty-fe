import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomeComponent } from './components/home/home.component';
import { OwnerComponent } from './components/owner/owner.component';
import {authInterceptorProviders} from "./helpers/auth.interceptor";
import {MatTabsModule} from "@angular/material/tabs";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, DragAndDropService,
  ResizeService } from '@syncfusion/ej2-angular-schedule';
import { UserListComponent } from './components/user-list/user-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioModule} from "@angular/material/radio";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    OwnerComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent,
    AdminComponent,
    ScheduleComponent,
    UserListComponent,
    ProfileDialogComponent,
    UsersDialogComponent,
    EmployeesListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        ScheduleModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatRadioModule,
        MatBottomSheetModule,
        MatDatepickerModule,
        MatDialogModule,
    ],
  providers: [authInterceptorProviders, DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    DragAndDropService, ResizeService],
  bootstrap: [AppComponent],
  entryComponents: [ProfileDialogComponent]

})
export class AppModule { }
