import { Component } from '@angular/core';
import { EmployeeServicesService } from '../../services/employee-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../../models/Employees.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   
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
    
    navigateToMyWork(): void{
      this.router.navigate(['/Home',this.IdCard,'My-Work']);
    }
  
  
  
  
  
  
  





}
