import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IapiResponse } from 'src/interfaces/IapiResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) { }

  addBook(data:FormData){
    
    return this._http.post<IapiResponse>('/crud/addBook',data)
  }
}
