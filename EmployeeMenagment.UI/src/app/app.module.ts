import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './components/AdminHome/admin-home/admin-home.component';
import { RegisterRequestsComponent } from './components/RegisterRequests/register-requests/register-requests.component';
import { AboutComponent } from './components/About/about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ManageUsersComponent } from './components/UserMenagment/manage-users/manage-users.component';
import { MyWorkComponent } from './components/MyWork/My-Work/my-work.component';
import { AddWorkComponent } from './components/MyWork/Add-Work/add-work/add-work.component';
import { EditWorkComponent } from './components/MyWork/edit-work/edit-work.component';
import { MakeAnnouncementComponent } from './components/AnnouncementsComp/make-announcement/make-announcement.component';
import { AnnouncementsComponent } from './components/AnnouncementsComp/announcements/announcements.component';

//import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminHomeComponent,
    RegisterRequestsComponent,
    AboutComponent,
    NavbarComponent,
    MyProfileComponent,
    ManageUsersComponent,
    MyWorkComponent,
    AddWorkComponent,
    EditWorkComponent,
    MakeAnnouncementComponent,
    AnnouncementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
