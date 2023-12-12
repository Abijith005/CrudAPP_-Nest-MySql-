import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // variable declaration
  registrationFrom:FormGroup=new FormGroup({})

  constructor(private _fb:FormBuilder){

  }

  ngOnInit(): void {

    this.registrationFrom=this._fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required,Validators.pattern('')]],
      confirmPassword:['',[Validators.required,Validators.pattern('')]]
    })
    
  }

  public get formControl(){
    return this.registrationFrom.controls
  }

  onRegister(){
    console.log('form registered');
    
  }

}
