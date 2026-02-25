import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeServicesService } from '../services/employee-services.service';
import { Employees } from '../models/Employees.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  idCard: number = 0;
  
  constructor(private AcRouter: ActivatedRoute,private router: Router,private EmpSer: EmployeeServicesService){}

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


  
  ngOnInit(): void {
    
    let oki = sessionStorage.getItem('idCard')
    this.idCard = parseInt(oki || '',10);
 
    this.EmpSer.getLogEmployee(this.idCard).subscribe({
     next: ResBody =>{
      this.LoggedEmployee = ResBody;
     }
    });
    
    
  }



  

}
