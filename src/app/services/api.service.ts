//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:3000/students';
  server: string = "http://localhost/gradbook/server_api/";

  constructor(private http: HttpClient) { }

  // Http Options
 

  postData(body:any, file:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

		return this.http.post(this.server + file, JSON.stringify(body), httpOptions).pipe(res => res);
	}
}