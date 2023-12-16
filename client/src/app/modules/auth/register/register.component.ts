import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { IuserRegData } from 'src/interfaces/IuserReg';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // variable declaration
  isSubmitted: boolean = false;
  registrationFrom: FormGroup = new FormGroup({});

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.registrationFrom = this._fb.group({
      userName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^.{4,}$/)]],
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

    const data: IuserRegData = {
      name: this.formControl['userName'].value,
      email: this.formControl['email'].value,
      password: this.formControl['password'].value,
    };

    this._authService.userRegister(data).subscribe((res) => {
      
      if (res.success) {
        this._router.navigate(['./'])
      }
    });
  }

  api(){
    this._authService.apicall().subscribe(res=>{
      console.log('this is my res',res.headers);
      
      console.log(res,'response for ai call');
      
    })
  }
}
