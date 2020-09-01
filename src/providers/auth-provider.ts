import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Student } from '../models/student';
// import { Observable, throwError } from 'rxjs';
 import { retry, catchError, timeout, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'

@Injectable()
export class AuthProvider {

  server: string = "http://localhost/gradbook/server_api/";

  constructor(private http: HttpClient) { }

  postData(body:any, file:any){

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
		return this.http.post(this.server + file, JSON.stringify(body), httpOptions).timeout(59000).map(res=>res);
     
    
}
}
