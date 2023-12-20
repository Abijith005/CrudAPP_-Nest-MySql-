import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceRoutingModule } from './service-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import {MatButtonModule} from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateBooksComponent } from './update-books/update-books.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddBookComponent,
    UpdateBooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceRoutingModule,
    MatButtonModule,
    MatDialogModule

    
    
  ]
})
export class ServiceModule { }
