import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // variable declarations

  passwordVisibility:boolean=false
  passwordType='password'

  constructor(private _userService:UserService){}


  showPassword(){
    this.passwordVisibility=!this.passwordVisibility
    if (this.passwordVisibility) {
      this.passwordType='text'
    }else{
      this.passwordType='password'
    }
  }

  onLogin(){
    this._userService.getToken().subscribe(data=>{
      console.log(data);
      
    })

  }

}
