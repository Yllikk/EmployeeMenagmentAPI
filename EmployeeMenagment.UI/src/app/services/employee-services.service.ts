import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employees } from '../models/Employees.model';
import { RegEmployee } from '../models/RegEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  baseApiUrl : string = "https://localhost:7272/";
  constructor(private http : HttpClient) { }

 getAllEmployees(): Observable<Employees[]>{
  return this.http.get<Employees[]>(this.baseApiUrl + 'api/Employee');
 }
 addEmployee(ReggedEmployee: Employees): Observable<Employees>{
  return this.http.post<Employees>(this.baseApiUrl + 'api/Employee',ReggedEmployee);
 }

 //Ka mu perdor nga Homefaqet me morr Logged in IDCard
 getLogEmployee(idCard : number): Observable<Employees>{
  return this.http.get<Employees>(this.baseApiUrl + 'api/Employee/' + idCard);
 }

 //Kontrolluar se a ekziston useri i logguar
 getLogUser(idCard:number , password:string): Observable<Employees>{


  const params = new HttpParams()
    .set('idCard', idCard.toString())  // Convert idCard to string
    .set('password', password);        // Add password as a query parameter

  return this.http.get<Employees>(this.baseApiUrl+ 'api/Employee/GetLogUser', { params });

 }

 updateEmployee(IdCard: number,Updatedemp: Employees): Observable<Employees>{
  return this.http.put<Employees>(this.baseApiUrl + 'api/Employee/'+IdCard,Updatedemp)
 }

 deleteUser(IdCard: number): Observable<Employees>{
  return this.http.delete<Employees>(this.baseApiUrl + 'api/Employee/'+IdCard);
 }

}
