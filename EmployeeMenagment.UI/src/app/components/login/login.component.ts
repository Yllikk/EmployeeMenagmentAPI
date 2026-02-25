import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServicesService } from '../../services/employee-services.service';
import { RegisteredUserService } from '../../services/registered-user.service';
import { Router } from '@angular/router';
import { Employees } from '../../models/Employees.model';
import { RegEmployee } from '../../models/RegEmployee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  badIDCard: boolean = false;
  badPassword: boolean = false;

  badIDCardForm: boolean = false;
  badPasswordForm: boolean = false;


  registeredEmp: RegEmployee = {
    idCard: 0,
    password: ''
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


  EmployeesArr: Employees[] = [];

  constructor(private Empservices: EmployeeServicesService,private Regservices: RegisteredUserService, private router: Router){}



  formCheck(): void{

    if(this.registeredEmp.idCard === 0 || this.registeredEmp.idCard.toString() === ''){
      this.badIDCard = true
    }else{}

    if(this.registeredEmp.password === ''){
      this.badPassword = true;
    }

  }




 CheckValid(): boolean{
 
  if(this.badIDCard == false && this.badPassword == false){
    return true;
  }
  else{
    return false;
  }
  
  
 }

 onLogin(): void {

    this.badIDCard = false;
    this.badPassword = false;
    this.badIDCardForm = false;
    this.badPasswordForm = false;


    this.formCheck();
    
    

     if(this.CheckValid()){

      this.Empservices.getLogUser(this.registeredEmp.idCard,this.registeredEmp.password).subscribe({
        next: (body) => {

          
          if(body) {
                             console.log(body.password)
            if(body.password !== null)
                           {
                this.LoggedEmployee = body;


          if(this.LoggedEmployee.isAdmin == true)
          {
             
              this.router.navigateByUrl(`/AdminHome/${this.registeredEmp.idCard}`);
            
             
          }else if(this.LoggedEmployee.isAdmin == false){
            //this.router.navigate(["Home/:idCard"]);
            this.router.navigateByUrl(`/Home/${this.registeredEmp.idCard}`);
          }

          }else {
                              this.badPasswordForm = true;
               }

          
             }
             else {  //if(body..)
         console.log("erdh te else per mi kqyr incorrect format")
         this.badIDCardForm = true;
         
      }
                   
        },

        error: response => {
        alert("Ju lutem shkruani te dhenat mire ose nuk keni qasje ne login");
        }
       });


     }






  }




}
