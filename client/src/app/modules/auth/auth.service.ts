import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IapiResponse } from 'src/interfaces/IapiResponse';
import { IuserRegData } from 'src/interfaces/IuserReg';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _http:HttpClient) { }

  userRegister(data:IuserRegData){
    return this._http.post<IapiResponse>('/auth/register',data)
  }

  userLogin(data:IuserRegData){
    return this._http.post<IapiResponse>('/auth/login',data)
  }

  getNewAccessToken(){
    console.log('123456789');
    
    return this._http.get<IapiResponse>('/auth/getNewAccessToken')
  }

  apicall(){
    return this._http.get<string>('/crud/hello',{observe:'response'})
  }

}
