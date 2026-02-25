import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/AdminHome/admin-home/admin-home.component';
import { RegisterRequestsComponent } from './components/RegisterRequests/register-requests/register-requests.component';
import { AboutComponent } from './components/About/about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ManageUsersComponent } from './components/UserMenagment/manage-users/manage-users.component';
import { MyWorkComponent } from './components/MyWork/My-Work/my-work.component';
import { AddWorkComponent } from './components/MyWork/Add-Work/add-work/add-work.component';
import { EditWorkComponent } from './components/MyWork/edit-work/edit-work.component';
import { MakeAnnouncementComponent } from './components/AnnouncementsComp/make-announcement/make-announcement.component';


const routes: Routes = [
{
  "path":'Login',
  "component": LoginComponent
},
{
  "path":'Register',
  "component": RegisterComponent
},
{
  "path":'Home/:idCard',
  "component": HomeComponent
},
{
  "path":'About',
  "component": AboutComponent
},
{
 "path": 'AdminHome/:idCard',
 "component": AdminHomeComponent,
},
{
 "path": 'AdminHome/:idCard/RegisterRequests',
 "component": RegisterRequestsComponent
},
{
  "path": 'AdminHome/:idCard/My-Profile',
  "component": MyProfileComponent
},
{
  "path": 'Home/:idCard/My-Profile',
  "component": MyProfileComponent
},
{
  "path": 'AdminHome/:idCard/User-Menagement',
  "component": ManageUsersComponent
},
{
  "path": 'AdminHome/:idCard/My-Work',
  "component": MyWorkComponent
},
{
  "path": 'Home/:idCard/My-Work',
  "component": MyWorkComponent
},
{
  "path": 'AdminHome/:idCard/My-Work/Add_Work',
  "component": AddWorkComponent
},
{
  "path": 'Home/:idCard/My-Work/Add_Work',
  "component": AddWorkComponent
},
{
  "path": 'AdminHome/:idCard/My-Work/Edit_Work/:WorkId',
  "component": EditWorkComponent
},
{
  "path": 'Home/:idCard/My-Work/Edit_Work/:WorkId',
  "component": EditWorkComponent
},
{
  "path": 'AdminHome/:idCard/Create-Announcement',
  "component": MakeAnnouncementComponent
},
{
  "path":'', redirectTo: 'Login', pathMatch: 'full'
  
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
