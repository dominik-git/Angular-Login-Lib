import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginLibService {

  constructor() { }

  login(){
    console.log("login");
  }
}
