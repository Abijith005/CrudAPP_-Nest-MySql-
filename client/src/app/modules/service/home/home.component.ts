import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { ServiceService } from '../service.service';
import { Subject, takeUntil } from 'rxjs';
import { IbookData } from 'src/interfaces/IbookData';
import { environment } from 'src/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // variable declarations
  bookDatas!:IbookData[]
  url=environment.apiUrl
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _service: ServiceService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._service.fetchAllBooks().pipe(takeUntil(this._ngUnsubscribe$)).subscribe(res=>{      
      this.bookDatas=res
      
    });
  }

  openAddBookForm() {
    this._matDialog.open(AddBookComponent, {
      width: '500px',
      height: '720px',
      disableClose: true,
    });
  }
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
