import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // variable declarations

  loginForm: FormGroup = new FormGroup({});
  passwordVisibility: boolean = false;
  passwordType = 'password';
  isSubmitted: boolean = false;

  constructor(private _authService: AuthService, private _fb: FormBuilder,
    private _router:Router
    ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^.{4,}$/)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  showPassword() {
    this.passwordVisibility = !this.passwordVisibility;
    if (this.passwordVisibility) {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  onLogin() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    const data=this.loginForm.getRawValue()
    this._authService.userLogin(data).subscribe((res) => {
      if (res.success) {
        localStorage.setItem('accessToken', res.accessToken!); 
        localStorage.setItem('refreshToken', res.refreshToken!); 

        this._router.navigate(['home'])
      }
    });
  }
}
