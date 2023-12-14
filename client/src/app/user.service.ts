import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { regData } from 'src/interfaces/IuserReg';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  userRegister(data:regData){
    return this._http.post<string>('/auth/register',data)
  }

 


}
