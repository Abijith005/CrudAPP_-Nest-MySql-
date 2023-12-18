import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _authService:AuthService){}


  apicall(){
this._authService.apicall().subscribe(res=>{
  console.log(res);
  
})
  }
}
