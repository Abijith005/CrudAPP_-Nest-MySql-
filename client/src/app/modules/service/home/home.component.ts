import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _authService:AuthService,
    private _matDialog:MatDialog){}


  openAddBookForm(){
this._matDialog.open(AddBookComponent,{
  width:'500px',
  height:'720px',
  disableClose:true
})
  }

}
