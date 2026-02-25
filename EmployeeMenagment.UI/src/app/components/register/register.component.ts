import { Component, OnInit } from '@angular/core';
import { Employees } from '../../models/Employees.model';
import { EmployeeServicesService } from '../../services/employee-services.service';
import { Router } from '@angular/router';
import { EMPTY, empty } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { RegisteredUserService } from '../../services/registered-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  badEmail: boolean = false;
  badSurname: boolean = false;
  badName: boolean = false;
  badIDCard: boolean = false;
  badPassword: boolean = false;



  RegEmployee : Employees = {
    // id: '',
    idCard: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    isAdmin: false,
    phoneNumber: ''
  };


  EmployeesArr: Employees[] = [];

  constructor(private Empservices: EmployeeServicesService,private Regservices: RegisteredUserService, private router: Router){}



  ngOnInit(): void {
    
  }
 
  onRegister(): void {
    //this.RegEmployee.phoneNumber = "0";

    this.badEmail = false;
    this.badSurname = false;
    this.badName = false;
    this.badIDCard = false;
    this.badPassword = false;

    this.formCheck();

    if(this.CheckValid()){
      if(this.RegEmployee.isAdmin == true)
        {
          this.Empservices.addEmployee(this.RegEmployee).subscribe({
            next: (RegEmployees) =>{
              this.router.navigateByUrl(`/AdminHome/${this.RegEmployee.idCard}`);
            },
            error: (response) =>{
              if (response.status === 409) {
                alert("Nje User me kete IDCard/Email aktualisht ekziston ose po pret konfirmim");
              }
            }
          });
        }else 
        {
           this.Regservices.addRegEmployee(this.RegEmployee).subscribe({
            next: () => {
              this.router.navigate(['Login'])
              alert("Ju lutem prisni per konfirmimin e regjistrimit nga nje Admin!");
            },
            error: (response) =>{
              if (response.status === 409) {
                alert("Nje User me kete IDCard/Email aktualisht ekziston ose po pret konfirmim");
              }
            }
           });
        }
    }

    
  }

  formCheck(): void{

    if(this.RegEmployee.idCard === 0 || this.RegEmployee.idCard.toString() === ''){
      this.badIDCard = true
    }else{}

    if(this.RegEmployee.password === ''){
      this.badPassword = true;
    }else{}

    if(this.RegEmployee.name === ''){
      this.badName = true;
    }else{}

    if(this.RegEmployee.email === ''){
      this.badEmail = true;
    }else{}

    if(this.RegEmployee.surname === ''){
      this.badSurname = true;
    }else{}

  }




 CheckValid(): boolean{
 
  if(this.badIDCard == false && this.badPassword == false && this.badName == false && this.badSurname == false && this.badEmail == false){
    return true;
  }
  else{
    return false;
  }
  
  
 }





  


}
