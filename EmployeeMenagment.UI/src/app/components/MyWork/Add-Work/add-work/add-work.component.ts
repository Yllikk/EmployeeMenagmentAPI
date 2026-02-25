import { Component, OnInit } from '@angular/core';
import { UsersWork } from '../../../../models/UsersWork.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkServicesService } from '../../../../services/work-services.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css'
})
export class AddWorkComponent implements OnInit{


  UserWork: UsersWork ={
    id: 0,
    workName:'',
    workDescription:'',
    userID:0
  }

  constructor(private AcRouter: ActivatedRoute,private route: Router,private WorkService: WorkServicesService,
    private location: Location
  ){}


  ngOnInit(): void {
    this.AcRouter.paramMap.subscribe({
      next: params =>{
        const idCardParam = params.get('idCard');
        if(idCardParam){
         this.UserWork.userID =+ idCardParam;
        }
      }
    });
  }



  AddWork(work: UsersWork) {
    this.WorkService.AddWork(work).subscribe({
      next: Response=>{
        // const currentUrl = this.AcRouter.snapshot.url.join('/');
        // const newPath = `${currentUrl}/My-Work/Add_Work`;
        // this.route.navigate(['AdminHome/'+this.UserWork.userID+'/My-Work']);
        this.location.back();
      },
      error: response=>{
        console.log(response)
        alert("Ju lutem plotesoni te gjitha te dhenat");
      }
    });
       
    }

    CancelWork(){
      // this.route.navigate(['AdminHome/'+this.UserWork.userID+'/My-Work']);
      this.location.back();
    }


}
