import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ServiceRoutingModule } from './service-routing.module';
import { AddBookComponent } from './add-book/add-book.component';



@NgModule({
  declarations: [
    HomeComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ServiceRoutingModule,
    matbutton
    
  ]
})
export class ServiceModule { }
