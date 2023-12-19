import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { IuserRegData } from 'src/interfaces/IuserReg';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  // variable declaration
  isSubmitted: boolean = false;
  registrationFrom: FormGroup = new FormGroup({});

  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.registrationFrom = this._fb.group({
      name: ['', [Validators.required]],
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

    const data = this.registrationFrom.getRawValue();

    this._authService
      .userRegister(data)
      .pipe(takeUntil(this._ngUnsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          this._router.navigate(['./']);
          this._toast.success({
            detail: 'Success',
            summary: res.message,
            duration: 3000,
          });
        } else {
          this._toast.error({
            detail: 'Email Rejected',
            summary: res.message,
            duration: 3000,
          });
        }
      });
  }
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
