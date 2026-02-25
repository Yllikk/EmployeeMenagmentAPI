import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employees } from '../models/Employees.model';
import { RegEmployee } from '../models/RegEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {
  
  baseApiUrl : string = "https://localhost:7272/";

  constructor(private http : HttpClient) { }

 
 addRegEmployee(ReggedEmployee: Employees): Observable<Employees>{
  return this.http.post<Employees>(this.baseApiUrl + 'api/RequestedRegisters',ReggedEmployee);
 }
 
 getRegEmployees(): Observable<Employees[]>{
  return this.http.get<Employees[]>(this.baseApiUrl + 'api/RequestedRegisters');
 }

 getEmployee(idCard : number): Observable<Employees>{
  return this.http.get<Employees>(this.baseApiUrl + 'api/RequestedRegisters/' + idCard);
 }

 deleteRegEmp(delIdCard: number): Observable<Employees>{
  return this.http.delete<Employees>(this.baseApiUrl + 'api/RequestedRegisters/' + delIdCard);
 }


}
