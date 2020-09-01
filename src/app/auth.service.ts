import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData = {} as any;
  private destn4 = {} as any;


  constructor() { }

  public setUser(userData:any) {
    this.userData = userData;

  }

  currentUser() {
    return this.userData;
  }
}
