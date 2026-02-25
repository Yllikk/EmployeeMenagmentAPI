import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkServicesService } from '../../../services/work-services.service';
import { UsersWork } from '../../../models/UsersWork.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrl: './edit-work.component.css'
})
export class EditWorkComponent implements OnInit{


  UserWork : UsersWork = {
    id : 0,
    workName: '',
    workDescription: '',
    userID: 0
  }

  isReadOnly = false;

  editButtonText = 'Edit';

  constructor(private AcRouter: ActivatedRoute,private route: Router,private WorkService: WorkServicesService,
    private location: Location 
  ){}


  ngOnInit(): void {
    this.AcRouter.paramMap.subscribe({
      next: params =>{
        const idCardParam = params.get('WorkId');
        if(idCardParam){
         this.UserWork.id =+ idCardParam;
         console.log(this.UserWork.id);
        }
      }
    });

    this.WorkService.GetWorkByID(this.UserWork.id).subscribe({
      next: ResponseBody =>{
        this.UserWork = ResponseBody
        
      }
    });

  }

    DeleteWork(WorkId: number) {
    this.WorkService.deleteUser(WorkId).subscribe({
      next: res =>{
        // this.route.navigate(['AdminHome/'+this.UserWork.userID+'/My-Work']);
        this.location.back();
      }
    });
    }

    CancelWork() {
      window.location.reload();
    }


    toggleEdit() {
      this.isReadOnly = !this.isReadOnly;
  
      this.editButtonText = this.isReadOnly ? 'Update' : 'Edit';
  
      if (!this.isReadOnly) {
        
        this.WorkService.UpdateWork(this.UserWork).subscribe({
        next: res =>{
          // this.route.navigate(['AdminHome/'+this.UserWork.userID+'/My-Work']);
          this.location.back();
        }
        });
      }
    }


}
