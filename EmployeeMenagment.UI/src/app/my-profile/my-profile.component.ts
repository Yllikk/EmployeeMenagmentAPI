import { Component, OnInit } from '@angular/core';
import { Employees } from '../models/Employees.model';
import { EmployeeServicesService } from '../services/employee-services.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  constructor(private empService: EmployeeServicesService){}
  
  idCard: number = 0;
  
  isReadOnly = true;

  editButtonText = 'Edit';
  
  ngOnInit(): void {
    let oki = sessionStorage.getItem('idCard')
    this.idCard = parseInt(oki || '',10);
    this.empService.getLogEmployee(this.idCard).subscribe({
      next: response =>{
        console.log(response.name)
        this.LoggedEmployee = response;
      }
    });
  }

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


  toggleEdit() {
    this.isReadOnly = !this.isReadOnly;

    this.editButtonText = this.isReadOnly ? 'Edit' : 'Save';

    if (this.isReadOnly) {
      console.log(this.idCard)
      this.empService.updateEmployee(this.idCard,this.LoggedEmployee).subscribe({
        next: Response=>{
          console.log("Funksionoj")
          this.ngOnInit
        },
        error: err=>{
          console.log(err)
        }
      });
    }
  }







}
