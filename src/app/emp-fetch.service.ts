import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Emp } from './emp.model';
//import fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class EmpFetchService {

  constructor(private http: HttpClient) { }

  handleError : any;
  configUrl = 'http://localhost:3000/';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getConfig(){
    return this.http.get(this.configUrl+'getEmployees');
  }

  // addConfig (myData: any): Observable<Emp> {
  //   return this.http.put<Emp>(this.configUrl+'addEmployee', myData, this.httpOptions)
  // }

  updateConfig (myData: any): Observable<boolean> {
    return this.http.patch<boolean>(this.configUrl+'updateEmployee', myData, this.httpOptions);
  }

  deleteConfig(myData: any) {
    return this.http.post<boolean>(this.configUrl+'deleteEmployee', myData);
  }

}
