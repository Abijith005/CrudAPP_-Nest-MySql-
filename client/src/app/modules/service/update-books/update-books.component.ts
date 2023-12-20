import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IbookData } from 'src/interfaces/IbookData';

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.css'],
})
export class UpdateBooksComponent implements OnInit {
  // variable declarations
  isSubmitted = false;
  debounceTimeOut:any
  uploadedImage:any
  editForm: FormGroup = new FormGroup({});
  constructor(
    @Inject(MAT_DIALOG_DATA)private data:IbookData,
    private _fb: FormBuilder,
    private _matDialogRef:MatDialogRef<UpdateBooksComponent>) {}

  ngOnInit(): void {
    this.editForm = this._fb.group({
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
      coverPhoto: [null, [Validators.required]],
    });
    this.editForm.patchValue(this.data)
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

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      this.uploadedImage = target.files[0];
    }
  }
  close() {
    this._matDialogRef.close();
  }

  get formControls() {
    return this.editForm.controls;
  }

  onSubmit() {}
}
