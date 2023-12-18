import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  // variable declarations
  private debounceTimeOut: any;
  addForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _matDialogRef: MatDialogRef<HomeComponent>,
    private _service: ServiceService
  ) {}

  ngOnInit(): void {
    this.addForm = this._fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d{1,9}(,\d{3})*(\.\d+)?$/),
        ],
      ],
      bookType: ['', [Validators.required]],
      language: ['', [Validators.required]],
      shortDescription: ['', Validators.required],
      coverPhoto: ['', Validators.required],
    });
  }

  get formControls() {
    return this.addForm.controls;
  }

  limitWords(event: Event) {
    clearTimeout(this.debounceTimeOut);
    this.debounceTimeOut = setTimeout(() => {
      const textArea = event.target as HTMLInputElement;
      const value = textArea.value;
      if (value.split(/\s+/).length >= 143 || value.split('').length >= 243) {
        this.formControls['shortDescription'].setErrors({ limit: true });
      }
    }, 300);
  }

  onSubmit() {
    const coverPhoto = this.formControls['coverPhoto'].value;

    if (!/\.(jpg|png|jpg|gif)$/i.test(coverPhoto)) {
      this.formControls['coverPhoto'].setErrors({ type: true });
    }

    if (this.formControls['bookType'].value == 'Select Type') {
      this.formControls['bookType'].setErrors({ valid: true });
    }
    if (this.formControls['language'].value == 'Select Language') {
      this.formControls['language'].setErrors({ valid: true });
    }
    this.isSubmitted = true;
    if (!this.addForm.valid) {
      return;
    }

    const data = this.addForm.getRawValue();
    console.log(data);

    console.log(this.formControls['coverPhoto'].value);
    
    
    this._service.addBook(data).subscribe((res) => {
      console.log(res);
    });
  }

  close() {
    this._matDialogRef.close();
  }
}
