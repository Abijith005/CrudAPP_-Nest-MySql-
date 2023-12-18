import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  // userRegister(data:IuserRegData){
  //   return this._http.post<IapiResponse>('/auth/register',data)
  // }

  // userLogin(data:IuserRegData){
  //   return this._http.post<IapiResponse>('/auth/login',data)
  // }

 


}
