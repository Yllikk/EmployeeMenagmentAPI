import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersWork } from '../models/UsersWork.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkServicesService {

  baseApiUrl : string = "https://localhost:7272/";

    constructor(private http : HttpClient) { }

  
  GetWork() : Observable<UsersWork[]>{
    return this.http.get<UsersWork[]>(this.baseApiUrl + 'api/UsersWork');
  }  

  GetAllUsersWork(WorkId: number) : Observable<UsersWork[]>{
    return this.http.get<UsersWork[]>(this.baseApiUrl + 'api/UsersWork/'+ WorkId);
  }  

  GetWorkByID(WorkId: number) : Observable<UsersWork>{
    return this.http.get<UsersWork>(this.baseApiUrl + 'api/UsersWork/GetWorkByID/'+ WorkId);
  }  

  AddWork(work: UsersWork) : Observable<UsersWork>{
  return this.http.post<UsersWork>(this.baseApiUrl + 'api/UsersWork',work);
  }

  UpdateWork(work: UsersWork) : Observable<UsersWork>{
    return this.http.put<UsersWork>(this.baseApiUrl + 'api/UsersWork',work);
  }

  deleteUser(WorkId: number): Observable<UsersWork>{
    return this.http.delete<UsersWork>(this.baseApiUrl + 'api/UsersWork/'+WorkId);
   }


}
