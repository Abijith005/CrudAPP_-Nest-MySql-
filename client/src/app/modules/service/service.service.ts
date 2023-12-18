import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) { }

  addBook(data:any){
    return this._http.post<any>('/crud/addBook',data)
  }
}
