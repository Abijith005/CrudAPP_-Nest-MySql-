import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { regData } from 'src/interfaces/IuserReg';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // variable declaration
  isSubmitted: boolean = false;
  registrationFrom: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder,
    private _userService:UserService
    ) {}

  ngOnInit(): void {
    this.registrationFrom = this._fb.group({
      userName: ['', [Validators.required]],
      email:['',[Validators.required,Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^.{4}$/)]],
      confirmPassword: ['', [Validators.required]],

    });
  }

  public get formControl() {
    return this.registrationFrom.controls;
  }

  onRegister() {
    
    if (
      this.formControl['password'].value !=
      this.formControl['confirmPassword'].value
    ) {
      this.formControl['confirmPassword'].setErrors({ notMatching: true });
    }

    this.isSubmitted = true;
    if (!this.registrationFrom.valid) {
      return;
    }

    const data:regData={
      name:this.formControl['userName'].value,
      email:this.formControl['email'].value,
      password:this.formControl['password'].value,
    }

    this._userService.userRegister(data).subscribe(res=>{
      console.log(res);
      
    })


  }
}
