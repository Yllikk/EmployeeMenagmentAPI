import { Component, OnInit } from '@angular/core';
import { EmployeeServicesService } from '../../../services/employee-services.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employees } from '../../../models/Employees.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  
  IdCard: number = 0;
  Status: string = '';


  constructor(private EmpService: EmployeeServicesService,private Acrouter: ActivatedRoute,private router: Router){}
  
  LoggedEmployee : Employees = {
    // id: '',
    idCard: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    isAdmin: false,
    phoneNumber: ''
  };
  
  checkStatus(isAdmin: boolean): void{
    if(isAdmin){
      this.Status = "Admin";
    }else{
      this.Status = "Employee"
    }
    
  }

  ngOnInit(): void {
    
  console.clear()
    
    this.Acrouter.paramMap.subscribe({
      next: (params) => {
        const idCardParam = params.get('idCard'); 

        
        if (idCardParam) {
          this.IdCard = +idCardParam; 
          sessionStorage.setItem('idCard',this.IdCard.toString());

          
          this.EmpService.getLogEmployee(this.IdCard).subscribe({
            next: (response) => {
              this.LoggedEmployee = response;
              this.checkStatus(this.LoggedEmployee.isAdmin)
            },
            error: (err) => {
              
              this.router.navigate(['Login']);
              console.clear()
            }
          });
        } 
      },
      error: (err) => {
        
        console.error('Error with route parameters:', err);
      }
    });
  

  }


  navigateToRegisterRequests(): void {
    // Programmatically navigate to RegisterRequests page
    this.router.navigate(['/AdminHome', this.IdCard, 'RegisterRequests']);
  }

  navigateToUserMenagment(): void{
    this.router.navigate(['/AdminHome', this.IdCard, 'User-Menagement']);
  }

  navigateToMyWork(): void{
    this.router.navigate(['/AdminHome',this.IdCard,'My-Work']);
  }

  naviagteToMakeAnnouncement(): void{
    this.router.navigate(['/AdminHome', this.IdCard, 'User-Menagement']);
  }



}

