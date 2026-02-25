import { Component, OnInit } from '@angular/core';
import { EmployeeServicesService } from '../../../services/employee-services.service';
import { RegisteredUserService } from '../../../services/registered-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../../../models/Employees.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit{

  IdCard: number = 0;
    
  KaUsers: boolean = false;
  
  Users: Employees[]= [];
  
    employee : Employees = {
      // id: '',
      idCard: 0,
      name: '',
      surname: '',
      email: '',
      password: '',
      isAdmin: false,
      phoneNumber: ''
    };
    
    constructor(private EmpService: EmployeeServicesService,private RegService: RegisteredUserService,private router: Router,private Acrouter: ActivatedRoute){}
    
    ngOnInit(): void {
      this.EmpService.getAllEmployees().subscribe({
        next: response => {
          response.forEach(user => {
            if(!user.isAdmin){
              this.Users.push(user);
            }
          });
         //this.RequestUsers = response;
        
         if(this.Users.length > 0){
          this.KaUsers = true;
         }else{
          this.KaUsers = false;
         }
  
        },
        error: errorcall =>{
          console.log(errorcall);
        }
      });
  
     // this.checkIfTableisEmpty();
  
     this.Acrouter.paramMap.subscribe({
      next: (params) => {
        
        const idCardParam = params.get('idCard'); 
        if(idCardParam)
          {
            this.IdCard = +idCardParam;}
        
      }
      });
    }
  
  
  
    
  
      deleteUser(user: Employees): void{
        this.employee.idCard = user.idCard
        this.employee.name = user.name
        this.employee.surname = user.surname
        this.employee.email = user.email
        this.employee.password = user.password
        this.employee.isAdmin = user.isAdmin
  
        this.EmpService.deleteUser(this.employee.idCard).subscribe({
          next: response =>{
            this.Users = this.Users.filter(u => u.idCard !== user.idCard);
            console.clear();
          }
        })
      }
  
      
  
  
    





}
