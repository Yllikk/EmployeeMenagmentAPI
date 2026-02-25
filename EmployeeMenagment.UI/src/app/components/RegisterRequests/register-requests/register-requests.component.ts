import { Component, OnInit } from '@angular/core';
import { Employees } from '../../../models/Employees.model';
import { RegisteredUserService } from '../../../services/registered-user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeServicesService } from '../../../services/employee-services.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrl: './register-requests.component.css'
})
export class RegisterRequestsComponent implements OnInit {

  IdCard: number = 0;
  
  KaRequests: boolean = false;

  RequestUsers: Employees[]= [];

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
    this.RegService.getRegEmployees().subscribe({
      next: response => {
       this.RequestUsers = response;
       
       if(response.length > 0){
        this.KaRequests = true;
       }else{
        this.KaRequests = false;
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



  approveUser(user: Employees): void{
    this.employee.idCard = user.idCard
    this.employee.name = user.name
    this.employee.surname = user.surname
    this.employee.email = user.email
    this.employee.password = user.password
    this.employee.isAdmin = user.isAdmin

    // Masi ne backend qikjo getEmployee e kqyr userin edhe a eshte te ata qe po presin regjistrim per kete arsye
    // po na vyn niher me fshi prej liste tani me shtu ne list te employeeve

    console.log(!this.getEmployee(this.employee.idCard))
    if(!this.getEmployee(this.employee.idCard))
    {
      
          this.RegService.deleteRegEmp(this.employee.idCard).subscribe({
            next: response =>{
              // this.ngOnInit();

              this.EmpService.addEmployee(this.employee).subscribe({
                next: Response => {
                  this.ngOnInit();
                  console.clear();
                } 
              
              
              });

            },
            error: err =>{
              console.log(err)
              console.log("ok");
            }
          });
        
      }
    // this.EmpService.addEmployee(this.employee).subscribe({
    //  next: Response =>{
    //   this.RegService.deleteRegEmp(this.employee.idCard).subscribe({
    //     next: res =>{
    //       this.ngOnInit();
    //       console.clear();
    //     }
    //   });
    //  }
    // });

    }

    disaproveEmployee(user: Employees): void{
      this.employee.idCard = user.idCard
      this.employee.name = user.name
      this.employee.surname = user.surname
      this.employee.email = user.email
      this.employee.password = user.password
      this.employee.isAdmin = user.isAdmin

      this.RegService.deleteRegEmp(this.employee.idCard).subscribe({
        next: response =>{
          this.ngOnInit();
          console.clear();
        }
      })
    }

    


  addEmployee(): void {
    this.EmpService.addEmployee(this.employee).subscribe({
      next: (response)=>{
        console.log("boni");

        this.router.navigate(['Login']);
      }
      });
  }
  
  

  getEmployee(idCard: number): boolean{
    let exists: boolean = false;

   this.EmpService.getLogEmployee(idCard).subscribe({
    next: res =>{
      exists = true;
    }
   });
   return exists;

  }

  


}
